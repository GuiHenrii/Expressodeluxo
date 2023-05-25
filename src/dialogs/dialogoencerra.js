async function dialogoencerra(client, message) {
  const texto =
    "Agradeçemos a preferencia, precisando e so entrar em contato novamente.❤ ";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}

export default dialogoencerra;
