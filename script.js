// Dados das emendas parlamentares - Deputados Federais da Baixada Santista
const emendasData = [
    // Paulo Alexandre Barbosa - PSDB/SP
    {
        id: 1,
        numeroEmenda: "EMD-2024-0001",
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 2000000,
        area: "saude",
        projeto: "Aquisição de equipamentos hospitalares para unidades de saúde de Santos",
        descricaoCompleta: "Destinação de recursos para aquisição de equipamentos hospitalares modernos incluindo monitores cardíacos, desfibriladores e equip amentos de UTI para as unidades de saúde do município de Santos.",
        beneficiarios: "População de Santos - estimativa de 50.000 atendimentos/ano",
        ano: 2024,
        status: "em-execucao",
        dataAprovacao: "15/03/2024"
    },
    {
        id: 2,
        numeroEmenda: "EMD-2024-0002",
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 1500000,
        area: "infraestrutura",
        projeto: "Reforma e modernização de vias públicas na região central de Santos",
        descricaoCompleta: "Projeto de recapeamento asfáltico, sinalização horizontal e vertical, e adequação de calçadas nas principais vias da região central de Santos.",
        beneficiarios: "Moradores e comerciantes da região central",
        ano: 2024,
        status: "planejamento",
        dataAprovacao: "20/04/2024"
    },
    {
        id: 3,
        numeroEmenda: "EMD-2023-0015",
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 800000,
        area: "educacao",
        projeto: "Construção de quadra poli esportiva coberta em escola municipal",
        descricaoCompleta: "Construção de quadra poliesportiva coberta com vestiários, arquibancada e iluminação adequada para atividades esportivas e culturais.",
        beneficiarios: "Aproximadamente 800 alunos da rede municipal",
        ano: 2023,
        status: "concluido",
        dataAprovacao: "10/05/2023"
    },
    {
        id: 4,
        numeroEmenda: "EMD-2023-0022",
        deputado: "Paulo Alexandre Barbosa",
        partido: "PSDB/SP",
        valor: 1200000,
        area: "saude",
        projeto: "Ampliação de Unidade Básica de Saúde no Jardim Castelo",
        descricaoCompleta: "Ampliação e reforma da UBS Jardim Castelo incluindo novos consultórios médicos, sala de procedimentos e espaço para atend imento odontológico.",
        beneficiarios: "População do Jardim Castelo - 15.000 habitantes",
        ano: 2023,
        status: "concluido",
        dataAprovacao: "08/06/2023"
    },

    // Rosana Valle -PL/SP
    {
        id: 5,
        numeroEmenda: "EMD-2024-0003",
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 3000000,
        area: "saude",
        projeto: "Aquisição de ambulâncias e equipamentos médicos para atendimento de emergência",
        descricaoCompleta: "Aquisição de 5 ambulâncias tipo D (UTI móvel) equipadas com respiradores, monitores cardíacos e demais equipamentos para atendimento de emergência.",
        beneficiarios: "Toda a população de Santos - atendimento emergencial",
        ano: 2024,
        status: "em-execucao",
        dataAprovacao: "12/02/2024"
    },
    {
        id: 6,
        numeroEmenda: "EMD-2024-0004",
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 1800000,
        area: "educacao",
        projeto: "Reforma e adequação de escolas municipais com acessibilidade",
        descricaoCompleta: "Reforma de 8 escolas municipais incluindo rampas de acesso, banheiros adaptados, piso tátil e sinalização em braile para garantir acessibilidade plena.",
        beneficiarios: "3.200 alunos, incluindo 45 alunos com deficiência",
        ano: 2024,
        status: "em-execucao",
        dataAprovacao: "25/03/2024"
    },
    {
        id: 7,
        numeroEmenda: "EMD-2023-0018",
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 2500000,
        area: "infraestrutura",
        projeto: "Pavimentação e drenagem em vias públicas da Zona Noroeste",
        descricaoCompleta: "Pavimentação asfáltica de 12 ruas e implantação de sistema de drenagem pluvial na Zona Noroeste para combate a alagamentos.",
        beneficiarios: "Aproximadamente 8.000 moradores da Zona Noroeste",
        ano: 2023,
        status: "concluido",
        dataAprovacao: "18/04/2023"
    },
    {
        id: 8,
        numeroEmenda: "EMD-2024-0005",
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 1000000,
        area: "cultura",
        projeto: "Revitalização de espaços culturais e centro comunitário",
        descricaoCompleta: "Reforma e modernização do Centro Cultural da Zona Noroeste incluindo teatro, biblioteca, salas de oficinas artísticas e espaço de convivência.",
        beneficiarios: "Comunidade local - estimativa de 500 usuários/semana",
        ano: 2024,
        status: "planejamento",
        dataAprovacao: "05/05/2024"
    },
    {
        id: 9,
        numeroEmenda: "EMD-2023-0025",
        deputado: "Rosana Valle",
        partido: "PL/SP",
        valor: 2200000,
        area: "saude",
        projeto: "Modernização de equipamentos do Hospital Guilherme Álvaro",
        descricaoCompleta: "Aquisição de tomógrafo, equipamentos de raio-X digital e sistema de gestão hospitalar informatizado para o Hospital Guilherme Álvaro.",
        beneficiarios: "População de Santos e região - 30.000 atendimentos/ano",
        ano: 2023,
        status: "concluido",
        dataAprovacao: "22/07/2023"
    },

    // Delegado da Cunha - Podemos/SP
    {
        id: 10,
        numeroEmenda: "EMD-2024-0006",
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 1500000,
        area: "infraestrutura",
        projeto: "Implantação de sistema de videomonitoramento urbano",
        descricaoCompleta: "Instalação de 80 câmeras de videomonitoramento em pontos estratégicos da cidade conectadas a central de monitoramento da Guarda Municipal.",
        beneficiarios: "Toda a população - segurança pública",
        ano: 2024,
        status: "em-execucao",
        dataAprovacao: "18/02/2024"
    },
    {
        id: 11,
        numeroEmenda: "EMD-2024-0007",
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 900000,
        area: "educacao",
        projeto: "Equipamentos de informática e tecnologia para escolas públicas",
        descricaoCompleta: "Aquisição de 300 computadores, 15 lousas digitais, projetores e impressoras para modernização dos laboratórios de informática das escolas municipais.",
        beneficiarios: "2.500 alunos da rede municipal",
        ano: 2024,
        status: "planejamento",
        dataAprovacao: "10/04/2024"
    },
    {
        id: 12,
        numeroEmenda: "EMD-2024-0008",
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 1800000,
        area: "saude",
        projeto: "Aquisição de equipamentos médicos para unidades de pronto atendimento",
        descricaoCompleta: "Compra de equipamentos médicos incluindo aparelhos de ultrassom, eletrocardiógrafos, oxímetros e macas hospitalares para UPAs da cidade.",
        beneficiarios: "População de Santos - 40.000 atendimentos/ano nas UPAs",
        ano: 2024,
        status: "em-execucao",
        dataAprovacao: "28/03/2024"
    },
    {
        id: 13,
        numeroEmenda: "EMD-2023-0020",
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 750000,
        area: "infraestrutura",
        projeto: "Reforma de praças e áreas de lazer em bairros periféricos",
        descricaoCompleta: "Revitalização de 6 praças incluindo playground infantil, academia ao ar livre, iluminação LED e paisagismo.",
        beneficiarios: "12.000 moradores de bairros periféricos",
        ano: 2023,
        status: "concluido",
        dataAprovacao: "15/06/2023"
    },
    {
        id: 14,
        numeroEmenda: "EMD-2024-0009",
        deputado: "Delegado da Cunha",
        partido: "Podemos/SP",
        valor: 1100000,
        area: "cultura",
        projeto: "Reforma de biblioteca municipal e aquisição de acervo",
        descricaoCompleta: "Reforma estrutural da Biblioteca Municipal incluindo climatização, modernização do mobiliário e aquisição de 5.000 novos livros para o acervo.",
        beneficiarios: "Comunidade leitora - 800 usuários/mês",
        ano: 2024,
        status: "planejamento",
        dataAprovacao: "22/05/2024"
    }
];

// Configuração de áreas
const areaConfig = {
    saude: { label: 'Saúde', icon: '🏥' },
    educacao: { label: 'Educação', icon: '📚' },
    infraestrutura: { label: 'Infraestrutura', icon: '🏗️' },
    cultura: { label: 'Cultura', icon: '🎭' }
};

// Estado da aplicação
let filteredEmendas = [...emendasData];
let currentFilter = 'all';
let searchTerm = '';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeSearch();
    updateKPIs();
    renderCharts();
    renderTable();
    initializeModal();
});

// Configurar filtros
function initializeFilters() {
    const filterChips = document.querySelectorAll('.chip');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
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

// Aplicar filtros
function applyFilters() {
    filteredEmendas = emendasData.filter(emenda => {
        const matchesFilter = currentFilter === 'all' || emenda.area === currentFilter;
        const matchesSearch = searchTerm === '' ||
            emenda.deputado.toLowerCase().includes(searchTerm) ||
            emenda.partido.toLowerCase().includes(searchTerm) ||
            emenda.projeto.toLowerCase().includes(searchTerm) ||
            areaConfig[emenda.area].label.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    renderTable();
}

// Atualizar KPIs
function updateKPIs() {
    const totalEmendas = emendasData.length;
    const totalDeputados = new Set(emendasData.map(e => e.deputado)).size;
    const totalValor = emendasData.reduce((sum, e) => sum + e.valor, 0);
    const totalExecucao = emendasData.filter(e => e.status === 'em-execucao').length;

    document.getElementById('totalEmendas').textContent = totalEmendas;
    document.getElementById('totalDeputados').textContent = totalDeputados;
    document.getElementById('totalValor').textContent = formatarValor(totalValor);
    document.getElementById('totalExecucao').textContent = totalExecucao;
}

// Renderizar gráficos
function renderCharts() {
    renderDeputadoChart();
    renderAreaChart();
}

// Gráfico de distribuição por deputado
function renderDeputadoChart() {
    const deputadoStats = {};

    emendasData.forEach(emenda => {
        if (!deputadoStats[emenda.deputado]) {
            deputadoStats[emenda.deputado] = 0;
        }
        deputadoStats[emenda.deputado] += emenda.valor;
    });

    const maxValor = Math.max(...Object.values(deputadoStats));
    const chartHtml = Object.entries(deputadoStats)
        .sort((a, b) => b[1] - a[1])
        .map(([deputado, valor]) => {
            const percentage = (valor / maxValor) * 100;
            const nome = deputado.split(' ').slice(0, 2).join(' ');
            return `
                <div class="chart-bar">
                    <div class="chart-bar-label">
                        <span class="chart-bar-name">${nome}</span>
                        <span class="chart-bar-value">${formatarValor(valor)}</span>
                    </div>
                    <div class="chart-bar-track">
                        <div class="chart-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');

    document.getElementById('deputadoChart').innerHTML = chartHtml;
}

// Gráfico de distribuição por área
function renderAreaChart() {
    const areaStats = {};

    emendasData.forEach(emenda => {
        if (!areaStats[emenda.area]) {
            areaStats[emenda.area] = 0;
        }
        areaStats[emenda.area] += emenda.valor;
    });

    const maxValor = Math.max(...Object.values(areaStats));
    const chartHtml = Object.entries(areaStats)
        .sort((a, b) => b[1] - a[1])
        .map(([area, valor]) => {
            const percentage = (valor / maxValor) * 100;
            return `
                <div class="chart-bar">
                    <div class="chart-bar-label">
                        <span class="chart-bar-name">${areaConfig[area].icon} ${areaConfig[area].label}</span>
                        <span class="chart-bar-value">${formatarValor(valor)}</span>
                    </div>
                    <div class="chart-bar-track">
                        <div class="chart-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');

    document.getElementById('areaChart').innerHTML = chartHtml;
}

// Renderizar tabela
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const recordCount = document.getElementById('recordCount');

    recordCount.textContent = `${filteredEmendas.length} registros`;

    if (filteredEmendas.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const tableHtml = filteredEmendas.map(emenda => {
        const statusClass = `status-${emenda.status}`;
        const statusLabels = {
            'em-execucao': 'Em Execução',
            'concluido': 'Concluído',
            'planejamento': 'Planejamento'
        };

        return `
            <tr class="table-row-clickable" data-emenda-id="${emenda.id}">
                <td>
                    <div class="table-numero">${emenda.numeroEmenda}</div>
                </td>
                <td>
                    <div class="table-deputado">${emenda.deputado}</div>
                </td>
                <td>
                    <div class="table-partido">${emenda.partido}</div>
                </td>
                <td>
                    <div class="table-projeto">${emenda.projeto}</div>
                </td>
                <td>
                    <div class="table-area">${areaConfig[emenda.area].icon} ${areaConfig[emenda.area].label}</div>
                </td>
                <td>
                    <div class="table-valor">${formatarValor(emenda.valor)}</div>
                </td>
                <td>${emenda.ano}</td>
                <td>
                    <span class="table-status ${statusClass}">${statusLabels[emenda.status]}</span>
                </td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = tableHtml;

    // Adicionar event listeners para as linhas
    document.querySelectorAll('.table-row-clickable').forEach(row => {
        row.addEventListener('click', () => {
            const emendaId = parseInt(row.dataset.emendaId);
            openModal(emendaId);
        });
    });
}

// Inicializar modal
function initializeModal() {
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // ESC para fechar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Abrir modal com detalhes da emenda
function openModal(emendaId) {
    const emenda = emendasData.find(e => e.id === emendaId);
    if (!emenda) return;

    const statusLabels = {
        'em-execucao': 'Em Execução',
        'concluido': 'Concluído',
        'planejamento': 'Planejamento'
    };

    const statusClass = `status-${emenda.status}`;

    document.getElementById('modalNumero').textContent = emenda.numeroEmenda;
    document.getElementById('modalDeputado').textContent = emenda.deputado;
    document.getElementById('modalPartido').textContent = emenda.partido;
    document.getElementById('modalArea').textContent = `${areaConfig[emenda.area].icon} ${areaConfig[emenda.area].label}`;
    document.getElementById('modalStatus').innerHTML = `<span class="table-status ${statusClass}">${statusLabels[emenda.status]}</span>`;
    document.getElementById('modalValor').textContent = formatarValor(emenda.valor);
    document.getElementById('modalAno').textContent = emenda.ano;
    document.getElementById('modalDataAprovacao').textContent = emenda.dataAprovacao;
    document.getElementById('modalProjeto').textContent = emenda.projeto;
    document.getElementById('modalDescricao').textContent = emenda.descricaoCompleta;
    document.getElementById('modalBeneficiarios').textContent = emenda.beneficiarios;

    document.getElementById('modalOverlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.body.style.overflow = '';
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
