import pegarArquivo from "./index.js";
import listaValidada from "./http-validacao.js";
import chalk from "chalk";
import fs from "fs";

const caminho = process.argv;

async function imprimirLista(valida, resultado, identificador = "") {
  if (valida) {
    console.log(
      chalk.yellow("Lista validada:"),
      chalk.black.bgGreen(identificador),
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow("Lista de links:"),
      chalk.black.bgGreen(identificador),
      resultado
    );
  }
}

async function processarTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === "--valida";

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log(chalk.bgRed("Arquivo ou diretório não existe."));
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegarArquivo(argumentos[2]);
    imprimirLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory(caminho)) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await pegarArquivo(`${caminho}/${nomeDoArquivo}`);
      imprimirLista(valida, lista, nomeDoArquivo);
    });
  }
}

processarTexto(caminho);
