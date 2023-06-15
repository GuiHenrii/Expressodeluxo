import fs from "fs";

function buscarPizza(idProcurado) {
  const arquivo = fs.readFileSync("./pizzabella.json");
  const dados = JSON.parse(arquivo);

  const itemEncontrado = dados.find((item) => item.id === idProcurado);

  if (itemEncontrado) {
    return itemEncontrado;
  } else {
    return null;
  }
}

export default buscarPizza;