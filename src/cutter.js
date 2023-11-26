function removeAcentuacao(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function selecionaPha(nome, lista, i) {
  const novaLista = [];

  for (const tupla of lista) {
    if (i >= nome.length) {
      return lista[0][1];
    }

    if (i >= tupla[0].length) {
      continue;
    }

    if (nome[i] === tupla[0][i]) {
      novaLista.push(tupla);
    }
  }

  if (novaLista.length > 0) {
    return selecionaPha(nome, novaLista, i + 1);
  } else {
    return lista[0][1];
  }
}

function processaPha() {
  const arquivo = '/src/pha.csv';
  fetch(arquivo)
    .then(response => response.text())
    .then(textoCSV => {
      const linhas = textoCSV.split('\n');
      const dicionario = new Map();

      for (const linha of linhas) {
        const [texto, codigo] = linha.split(',');
        dicionario.set(removeAcentuacao(texto).toLowerCase(), codigo);
      }

      const lista = Array.from(dicionario.entries());
      lista.sort((a, b) => a[0].localeCompare(b[0]));

      const nomeInput = document.getElementById('nome').value;
      const tituloInput = document.getElementById('titulo').value;
      const nome = removeAcentuacao(nomeInput).toLowerCase();
      const cutter = selecionaPha(nome, lista, 0);
      const primeiraLetra = nome[0].toUpperCase();
      const codigoComLetra = primeiraLetra + cutter + tituloInput[0].toLowerCase();
      document.getElementById('resultado').innerText = 'Seu Código Cutter : '+ codigoComLetra;
    })
    .catch(error => console.error('Erro ao processar o arquivo CSV:', error));
}

function calcularPha() {
  processaPha();
}
