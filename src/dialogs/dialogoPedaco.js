async function dialogoPedaco(client, message, pizza) {
  
  const texto = `Você escolheu ${ pizza } Quantos pedaços você deseja 4 pedaços ou 8 pedaços?`;
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoPedaco;
