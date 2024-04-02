import chalk from "chalk";
import fs from "fs";

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];  
  const resultados = capturas.map((captura) => ({[captura[1]]: captura[2]}));

  return resultados;
}

function tratarErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, "Não é um arquivo."));
}

async function pegarArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(extrairLinks(texto));
  } catch (erro) {
    tratarErro(erro);
  }
  //   fs.promises
  //     .readFile(caminhoDoArquivo, encoding)
  //     .then((texto) => console.log(chalk.green(texto)))
  //     .catch(tratarErro);

  //   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
  //     if (erro) {
  //       tratarErro(erro);
  //     }
  //     console.log(chalk.green(texto));
}

pegarArquivo("./arquivos/texto.md");
// pegarArquivo("./arquivos/");
