import pegarArquivo from "./index.js";
import chalk from "chalk";
import fs from "fs";

const caminho = process.argv;

async function processarTexto(argumentos) {
  const caminho = argumentos[2];

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegarArquivo(argumentos[2]);
    console.log(chalk.yellow("Lista de links"), resultado);
  } else if (fs.lstatSync(caminho).isDirectory(caminho)) {
    const arquivos = await fs.promises.readdir(caminho);
    console.log(arquivos);
  }
}

processarTexto(caminho);
