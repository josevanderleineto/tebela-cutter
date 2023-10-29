const fs = require('fs');
const readline = require('readline');

// Função para remover acentuações e caracteres especiais
function removeAcentuacao(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para selecionar o código Cutter
function selecionaCutter(nome, lista, i) {
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
    return selecionaCutter(nome, novaLista, i + 1);
  } else {
    return lista[0][1];
  }
}

// Lê o arquivo CSV e processa a entrada do usuário
async function processaCutter() {
  const arquivo = './src/cutter.csv';
  const arquivoStream = fs.createReadStream(arquivo);
  const rl = readline.createInterface({
    input: arquivoStream,
    crlfDelay: Infinity
  });

  const dicionario = new Map();

  for await (const linha of rl) {
    const [texto, codigo] = linha.split(',');
    dicionario.set(removeAcentuacao(texto).toLowerCase(), codigo);
  }

  const lista = Array.from(dicionario.entries());
  lista.sort((a, b) => a[0].localeCompare(b[0]));

  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  input.question('Insira um nome: ', (nome) => {
    nome = removeAcentuacao(nome).toLowerCase();
    const cutter = selecionaCutter(nome, lista, 0);
    const primeiraLetra = nome[0].toUpperCase(); // Pega a primeira letra da palavra digitada e a converte para maiúscula
    const codigoComLetra = primeiraLetra + cutter; // Adiciona a primeira letra na frente do código Cutter
    console.log('Código Cutter com a Primeira Letra:', codigoComLetra);
    input.close();
  });
}

processaCutter();
