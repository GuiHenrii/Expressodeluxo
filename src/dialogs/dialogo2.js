async function dialogo2(client, message) {
  const texto =
<<<<<<< HEAD
  "Informe qual a data da viagem. Exemplo: 10/11/2023*"
=======
    "Para acessar o nosso cardápio clique no link abaixo:\n\nhttps://bit.ly/cardapiobellapizzaudi";
>>>>>>> 7c799f667bc654c18ccd1083205a8fb124a702cf
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo2;
