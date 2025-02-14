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
