import moment from "moment";
async function dialogoComprar(client, message) {
  
  const dataFormt = tratarData(message.body)
  const dataViagem = moment(dataFormt, "DD/MM/YYYY").format("YYYY-MM-DD");
   
  const texto = `Acesse o link para efetuar a compra.\nhttps://www.buson.com.br/passagem-de-onibus/patos-de-minas-mg/carmo-do-paranaiba-mg?ida=${dataViagem}\n*Lembre-se de conferir o local de partida e o destino desejado.*`;
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });


    function tratarData(data) {
      // Remover todos os caracteres não numéricos
      const numeros = data.replace(/\D/g, '');
    
      // Verificar se há 8 dígitos consecutivos
      if (numeros.length === 8) {
        // Formato: 25052023
        const dia = numeros.substring(0, 2);
        const mes = numeros.substring(2, 4);
        const ano = numeros.substring(4);
    
        return `${dia}/${mes}/${ano}`;
      } else {
        // Formatos: 25-05-2023, 25/05/2023, 25 05 2023
        const partes = numeros.match(/^(\d{2})(\d{2})(\d{4})$/); 
    
        if (partes && partes.length === 4) {
          const dia = partes[1];
          const mes = partes[2];
          const ano = partes[3];
    
          return `${dia}/${mes}/${ano}`;
        }
      }
    
      // Caso nenhum formato seja reconhecido, retornar a data original
      return data;
    }

}
export default dialogoComprar;