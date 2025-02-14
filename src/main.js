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