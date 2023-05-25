async function dialogoinicio(client, message) {
  const texto =
    "*Olá Tudo bem? Aqui é a Bia, sua atendente virtual da Expresso de Luxo🚎.*\n------------------------------------------------------\nDigite o *número* correspondente ao que você deseja:\n\n1 - Saber os Horários de Ônibus\n2 - Valores de Passagens\n3 - Comprar Passagens\n4 - Aluguel de Ônibus \n5 - Falar com Nosso Suporte\n6 - Falar no setor Administrativo\n7 - Encerrar a Conversa.";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoinicio;
