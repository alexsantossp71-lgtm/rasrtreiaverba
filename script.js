// Dados das emendas parlamentares - Deputados Federais da Baixada Santista
const emendasData = [
    // Paulo Alexandre Barbosa - PSDB/SP
    {
        id: 1,
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 2000000,
        area: "saude",
        projeto: "Aquisição de equipamentos hospitalares para unidades de saúde de Santos",
        ano: 2024,
        status: "em-execucao"
    },
    {
        id: 2,
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 1500000,
        area: "infraestrutura",
        projeto: "Reforma e modernização de vias públicas na região central de Santos",
        ano: 2024,
        status: "planejamento"
    },
    {
        id: 3,
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 800000,
        area: "educacao",
        projeto: "Construção de quadra poliesportiva coberta em escola municipal",
        ano: 2023,
        status: "concluido"
    },
    {
        id: 4,
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 1200000,
        area: "saude",
        projeto: "Ampliação de Unidade Básica de Saúde no Jardim Castelo",
        ano: 2023,
        status: "concluido"
    },

    // Rosana Valle - PL/SP
    {
        id: 5,
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 3000000,
        area: "saude",
        projeto: "Aquisição de ambulâncias e equipamentos médicos para atendimento de emergência",
        ano: 2024,
        status: "em-execucao"
    },
    {
        id: 6,
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 1800000,
        area: "educacao",
        projeto: "Reforma e adequação de escolas municipais com acessibilidade",
        ano: 2024,
        status: "em-execucao"
    },
    {
        id: 7,
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 2500000,
        area: "infraestrutura",
        projeto: "Pavimentação e drenagem em vias públicas da Zona Noroeste",
        ano: 2023,
        status: "concluido"
    },
    {
        id: 8,
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 1000000,
        area: "cultura",
        projeto: "Revitalização de espaços culturais e centro comunitário",
        ano: 2024,
        status: "planejamento"
    },
    {
        id: 9,
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 2200000,
        area: "saude",
        projeto: "Modernização de equipamentos do Hospital Guilherme Álvaro",
        ano: 2023,
        status: "concluido"
    },

    // Delegado da Cunha - Podemos/SP
    {
        id: 10,
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 1500000,
        area: "infraestrutura",
        projeto: "Implantação de sistema de videomonitoramento urbano",
        ano: 2024,
        status: "em-execucao"
    },
    {
        id: 11,
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 900000,
        area: "educacao",
        projeto: "Equipamentos de informática e tecnologia para escolas públicas",
        ano: 2024,
        status: "planejamento"
    },
    {
        id: 12,
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 1800000,
        area: "saude",
        projeto: "Aquisição de equipamentos médicos para unidades de pronto atendimento",
        ano: 2024,
        status: "em-execucao"
    },
    {
        id: 13,
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 750000,
        area: "infraestrutura",
        projeto: "Reforma de praças e áreas de lazer em bairros periféricos",
        ano: 2023,
        status: "concluido"
    },
    {
        id: 14,
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 1100000,
        area: "cultura",
        projeto: "Reforma de biblioteca municipal e aquisição de acervo",
        ano: 2024,
        status: "planejamento"
    }
];

// Ícones e labels das áreas
const areaConfig = {
    saude: {
        icon: '🏥',
        label: 'Saúde',
        color: '#ef4444'
    },
    educacao: {
        icon: '📚',
        label: 'Educação',
        color: '#3b82f6'
    },
    infraestrutura: {
        icon: '🏗️',
        label: 'Infraestrutura',
        color: '#f59e0b'
    },
    cultura: {
        icon: '🎭',
        label: 'Cultura',
        color: '#8b5cf6'
    }
};

// Estado da aplicação
let filteredEmendas = [...emendasData];
let currentFilter = 'all';
let searchTerm = '';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeSearch();
    updateStats();
    renderEmendas();
});

// Configurar filtros
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            applyFilters();
        });
    });
}

// Configurar busca
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        applyFilters();
    });
}

// Aplicar filtros e busca
function applyFilters() {
    filteredEmendas = emendasData.filter(emenda => {
        // Filtro por área
        const matchesFilter = currentFilter === 'all' || emenda.area === currentFilter;

        // Filtro por busca
        const matchesSearch = searchTerm === '' ||
            emenda.deputado.toLowerCase().includes(searchTerm) ||
            emenda.partido.toLowerCase().includes(searchTerm) ||
            areaConfig[emenda.area].label.toLowerCase().includes(searchTerm) ||
            emenda.projeto.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    renderEmendas();
}

// Renderizar emendas
function renderEmendas() {
    const grid = document.getElementById('emendasGrid');
    const emptyState = document.getElementById('emptyState');

    if (filteredEmendas.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = filteredEmendas.map((emenda, index) => {
        const area = areaConfig[emenda.area];
        const statusLabels = {
            'em-execucao': 'Em Execução',
            'concluido': 'Concluído',
            'planejamento': 'Planejamento'
        };

        return `
            <div class="emenda-card" style="animation-delay: ${index * 0.05}s">
                <div class="emenda-header">
                    <div class="deputado-info">
                        <h3>${emenda.deputado}</h3>
                        <span class="partido-tag">${emenda.partido}</span>
                    </div>
                    <div class="valor-badge">${formatarValor(emenda.valor)}</div>
                </div>
                
                <div class="emenda-body">
                    <div class="area-tag">
                        <span class="area-icon">${area.icon}</span>
                        <span>${area.label}</span>
                    </div>
                    <p class="projeto-desc">${emenda.projeto}</p>
                </div>
                
                <div class="emenda-footer">
                    <span class="ano-tag">Ano: ${emenda.ano}</span>
                    <span class="status-tag ${emenda.status}">${statusLabels[emenda.status]}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Atualizar estatísticas
function updateStats() {
    const totalEmendas = emendasData.length;
    const totalDeputados = new Set(emendasData.map(e => e.deputado)).size;
    const totalValor = emendasData.reduce((sum, e) => sum + e.valor, 0);

    // Animação dos números
    animateValue('totalEmendas', 0, totalEmendas, 1000);
    animateValue('totalDeputados', 0, totalDeputados, 1000);

    const valorElement = document.getElementById('totalValor');
    let currentValue = 0;
    const increment = totalValor / 60;
    const duration = 1500;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= totalValor) {
            currentValue = totalValor;
            clearInterval(timer);
        }
        valorElement.textContent = formatarValor(currentValue);
    }, stepTime);
}

// Animar valores numéricos
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Formatar valores monetários
function formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}
