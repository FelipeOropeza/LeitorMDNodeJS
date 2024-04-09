function extrairLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function verificarStatus(listaURLs) {
  return listaURLs.map(async (url) => {
    const response = await fetch(url);
    return response.status;
  });
}

export default function listaValidada(listaDeLinks) {
  const links = extrairLinks(listaDeLinks);
  const status = verificarStatus(links);
  console.log(status);
  return status;
}

// const res = await fetch("https://nodejs.org./api/documentation.json")
// if (res.ok) {
//     const data = await res.json()
//     console.log(data);
// }
