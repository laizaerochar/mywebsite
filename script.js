
const themeToggleCheckbox = document.getElementById('checkbox'); 

let dados = [];
const mainSection = document.querySelector('main section');

// LÓGICA DO MODO ESCURO

// Função para alternar entre os temas
function toggleTheme() {
    // 1. Verifica qual tema está ativo antes de alternar
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    
    // 2. Remove as classes de tema para garantir a limpeza antes de aplicar a nova
    document.body.classList.remove('dark-theme', 'light-theme');

    let newTheme;

    if (isCurrentlyDark) {
        // Se estava escuro, muda para claro
        document.body.classList.add('light-theme');
        newTheme = 'light';
    } else {
        // Se estava claro, muda para escuro
        document.body.classList.add('dark-theme');
        newTheme = 'dark';
    }
    
    // 3. Salva a preferência
    localStorage.setItem('theme', newTheme);
    
    // 4. Atualiza o estado visual do checkbox
    if (themeToggleCheckbox) {
        themeToggleCheckbox.checked = (newTheme === 'dark');
    }
}

// Função para carregar o tema preferido ao carregar a página
function loadTheme() {
    if (!themeToggleCheckbox) return; 

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme;

    if (savedTheme) {
        // Se há um tema salvo (manual), usa-o
        initialTheme = savedTheme;
    } else if (prefersDark) {
        // Se não há salvo, usa a preferência do sistema
        initialTheme = 'dark';
    } else {
        // Padrão: modo claro
        initialTheme = 'light';
    }

    // Aplica a classe correspondente ao tema inicial
    if (initialTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }

    // Garante que o checkbox reflita o tema carregado
    themeToggleCheckbox.checked = (initialTheme === 'dark');
}


async function iniciarBusca() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarConteudo(dados); 
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function renderizarConteudo(data) {
    const container = mainSection || document.body; 
    
    container.innerHTML = data.map(item => `
        <article>
            <h2>${item.nome}</h2>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        </article>
    `).join('');
}

// 1. Carrega o tema imediatamente
loadTheme(); 

// 2. Adiciona o ouvinte de evento ao checkbox (quando ele muda de estado)
if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener('change', toggleTheme);
}

// 3. Inicie a busca quando a página carregar
iniciarBusca();