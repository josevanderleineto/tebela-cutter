document.addEventListener('DOMContentLoaded', () => {
    const navbar = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/sobre.html">Sobre</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Contatos
                </a>
                <ul class="dropdown-menu">
                  <li>
                    
                  <li>
                    <a class="dropdown-item icon-only" href="https://w.app/elcurc">
                      <i class="bi bi-whatsapp" style="font-size: 2rem; color: #25d366;"></i>
                      <span class="text-hover">WhatsApp</span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item icon-only" href="https://github.com/josevanderleineto/tebela-cutter.git" target="_blank">
                      <i class="bi bi-github" style="font-size: 2rem; color: #000;"></i>
                      <span class="text-hover">GitHub</span>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item icon-only" href="https://vanderleidev.live/" target="_blank">
                      <i class="bi bi-globe" style="font-size: 2rem; color: #0d6efd;"></i>
                      <span class="text-hover">Portifólio do responsável</span>
                    </a>
                  </li>
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    `;
  
    document.getElementById('navbar-container').innerHTML = navbar;
    
    // CSS dinâmico para ocultar o texto até o mouse passar
    const style = document.createElement('style');
    style.innerHTML = `
      .icon-only .text-hover {
        display: none;
        margin-left: 8px;
      }
      .icon-only:hover .text-hover {
        display: inline;
      }
    `;
    document.head.appendChild(style);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const footer = `
                    <div class="text-center">
                         <p>&copy; By <a href="#">Vanderlei Neto</a></p>
                    </div>
`
  
    document.getElementById('footer-container').innerHTML = footer;
  });


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
  console.log("Função calcularCutter chamada"); // Debug
  const sobrenome = document.getElementById("sobrenome").value.trim();
  let titulo = document.getElementById("titulo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!sobrenome) {
    resultado.innerHTML = "<span style='color: red;'>Por favor, insira o sobrenome.</span>";
    return;
  }

  titulo = removerArtigo(titulo);

  try {
    const response = await fetch("https://notacao-de-autor-api.vercel.app/api/data");
    const data = await response.json();

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
