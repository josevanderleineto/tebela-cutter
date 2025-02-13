// Função para remover acentuação
function removeAcentuacao(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Função para verificar e remover artigos
function removerArtigo(titulo) {
  const artigos = ["o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das", "no", "na", "nos", "nas"];
  const palavras = titulo.split(" ");
  if (palavras.length > 1 && artigos.includes(palavras[0].toLowerCase())) {
    palavras.shift(); // Remove a primeira palavra se for um artigo
  }
  return palavras.join(" ");
}

// Função para selecionar o código Cutter
function selecionaCutter(nome, lista, i) {
  const novaLista = lista.filter(tupla => i < nome.length && i < tupla[0].length && nome[i] === tupla[0][i]);
  return novaLista.length > 0 ? selecionaCutter(nome, novaLista, i + 1) : lista[0][1];
}

// Função principal para calcular o código Cutter
async function calcularCutter() {
  const sobrenome = document.getElementById("nome").value.trim();
  let titulo = document.getElementById("titulo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!sobrenome) {
    resultado.innerHTML = "<span style='color: red;'>Por favor, insira o sobrenome.</span>";
    return;
  }

  // Remover artigo do título, se existir
  titulo = removerArtigo(titulo);

  try {
    const response = await fetch("https://notacao-de-autor-api.vercel.app/api/data");
    const data = await response.json();
    
    // Formatar dados da API
    const cutterData = data.map(entry => [removeAcentuacao(entry.texto).toLowerCase(), entry.codigo]);
    cutterData.sort((a, b) => a[0].localeCompare(b[0]));

    const normalizedLastName = removeAcentuacao(sobrenome).toLowerCase();
    const cutterCode = selecionaCutter(normalizedLastName, cutterData, 0);
    const firstLetter = sobrenome[0].toUpperCase();
    const titleInitial = titulo ? titulo[0].toLowerCase() : "";

    const finalCode = `${firstLetter}${cutterCode}${titleInitial}`;
    resultado.innerHTML = `<strong>Seu Código Cutter:</strong> <span style="color: green;">${finalCode}</span>`;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    resultado.innerHTML = "<span style='color: red;'>Erro ao buscar dados. Tente novamente mais tarde.</span>";
  }
}
