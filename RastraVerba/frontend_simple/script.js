// Configuração da API
const API_BASE = "http://localhost:8000";

// Estado Global
let deputadosCache = [];

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const searchForm = document.getElementById('searchForm');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    // Seções
    const tableSection = document.getElementById('tableSection');
    const graphSection = document.getElementById('graphSection');

    // Elementos da Tabela
    const resultsTableBody = document.getElementById('resultsTableBody');
    const recordCount = document.getElementById('recordCount');

    // Elementos do Grafo
    const trailWrapper = document.getElementById('trailWrapper');
    const evidenceText = document.getElementById('evidenceText');
    const backToTableBtn = document.getElementById('backToTableBtn');

    // Inputs
    const deputadoInput = document.getElementById('deputadoInput');
    const partidoSelect = document.getElementById('partidoSelect');
    const cidadeInput = document.getElementById('cidadeInput');
    const areaSelect = document.getElementById('areaSelect');
    const anoInicioInput = document.getElementById('anoInicioInput');
    const anoFimInput = document.getElementById('anoFimInput');

    // Inicialização
    populateFields();

    // Dispara busca inicial automaticamente (Padrão: Todos)
    setTimeout(() => {
        searchForm.dispatchEvent(new Event('submit'));
    }, 500);

    // Event Listeners
    searchForm.addEventListener('submit', handleSearch);
    clearButton.addEventListener('click', clearForm);
    backToTableBtn.addEventListener('click', showTable);

    // --- Funções de População (Via API) ---
    async function populateFields() {
        try {
            // Buscar Deputados
            const resDep = await fetch(`${API_BASE}/deputados`);
            if (!resDep.ok) throw new Error("API Offline");
            const deputados = await resDep.json();
            deputadosCache = deputados; // Salva para uso no fillSearch

            const deputadosList = document.getElementById('deputadosList');
            deputados.forEach(dep => {
                const option = document.createElement('option');
                option.value = dep.nome;
                deputadosList.appendChild(option);
            });

            // Buscar Cidades
            const resCid = await fetch(`${API_BASE}/cidades`);
            const cidades = await resCid.json();

            const cidadesList = document.getElementById('cidadesList');
            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade;
                cidadesList.appendChild(option);
            });

            // Partidos (Extraídos dos deputados ou fixos)
            const partidos = [...new Set(deputados.map(d => d.partido))].sort();
            partidos.forEach(partido => {
                const option = document.createElement('option');
                option.value = partido;
                option.textContent = partido;
                partidoSelect.appendChild(option);
            });

        } catch (error) {
            console.error("Erro ao conectar com API:", error);
            // Fallback silencioso ou alerta visual se necessário
        }
    }

    window.fillSearch = (term) => {
        const isDeputado = deputadosCache.some(d => d.nome.includes(term));

        if (isDeputado) {
            deputadoInput.value = term;
            const dep = deputadosCache.find(d => d.nome === term);
            if (dep) partidoSelect.value = dep.partido;
        } else {
            if (term.includes('/')) {
                const [cidade, estado] = term.split('/');
                cidadeInput.value = cidade;
                document.getElementById('estadoSelect').value = estado;
            } else {
                deputadoInput.value = term;
            }
        }
        searchForm.scrollIntoView({ behavior: 'smooth' });
    };

    function clearForm() {
        searchForm.reset();
        tableSection.style.display = 'none';
        graphSection.style.display = 'none';
    }

    // --- Lógica de Busca (Via API) ---
    async function handleSearch(e) {
        e.preventDefault();

        setLoading(true);
        tableSection.style.display = 'none';
        graphSection.style.display = 'none';

        // Monta Query Params
        const params = new URLSearchParams();
        if (deputadoInput.value) params.append('deputado', deputadoInput.value);
        if (partidoSelect.value) params.append('partido', partidoSelect.value);
        if (cidadeInput.value) params.append('cidade', cidadeInput.value);
        if (areaSelect.value) params.append('area', areaSelect.value);
        if (anoInicioInput.value) params.append('anoInicio', anoInicioInput.value);
        if (anoFimInput.value) params.append('anoFim', anoFimInput.value);

        try {
            const response = await fetch(`${API_BASE}/rastrear?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Falha na requisição");
            }

            const data = await response.json();

            // Simula delay visual curto
            setTimeout(() => {
                setLoading(false);
                renderTable(data);
            }, 500);

        } catch (error) {
            console.error(error);
            setLoading(false);
            resultsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding: 2rem; color: #ef4444;">
                        <strong>Erro de Conexão:</strong> Não foi possível conectar ao servidor.<br>
                        Certifique-se de rodar o backend: <code>python server.py</code>
                    </td>
                </tr>
            `;
            tableSection.style.display = 'block';
        }
    }

    function setLoading(isLoading) {
        searchButton.disabled = isLoading;
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        }
    }

    // --- Renderização ---
    function renderTable(data) {
        resultsTableBody.innerHTML = '';
        recordCount.textContent = `${data.length} registros encontrados`;

        if (data.length === 0) {
            resultsTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem;">Nenhum registro encontrado.</td></tr>';
        } else {
            data.forEach(item => {
                const row = document.createElement('tr');

                // Define classe de status
                let statusClass = '';
                if (item.status === 'Concluído') statusClass = 'success';
                else if (item.status === 'Em Execução') statusClass = 'warning';

                row.innerHTML = `
                    <td><strong>${item.deputado}</strong></td>
                    <td>${item.partido}</td>
                    <td>${item.cidade}</td>
                    <td>${item.valor}</td>
                    <td>${item.ano}</td>
                    <td><span class="status-badge ${statusClass}">${item.status}</span></td>
                    <td><button class="btn-secondary btn-sm">Ver Rastro</button></td>
                `;

                // Clique na linha abre o grafo
                row.addEventListener('click', () => showGraph(item));

                resultsTableBody.appendChild(row);
            });
        }

        tableSection.style.display = 'block';
        tableSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function showGraph(item) {
        // Esconde tabela, mostra grafo
        tableSection.style.display = 'none';

        const data = item.details;

        // Renderiza Grafo
        const html = `
            <!-- Origem -->
            <div class="node origin">
                <div class="node-label">Origem (Federal)</div>
                <div class="node-value">${data.origin.label}</div>
                <div class="node-sub">${data.origin.value}</div>
                <div class="node-sub">${data.origin.sub}</div>
            </div>

            <!-- Conector -->
            <div class="connector">
                <div class="connector-label">Repasse</div>
                <div class="connector-line"></div>
                <div class="connector-label">TransfereGov</div>
            </div>

            <!-- Meio -->
            <div class="node process">
                <div class="node-label">Execução (Local)</div>
                <div class="node-value">${data.middle.label}</div>
                <div class="node-sub">${data.middle.action}</div>
                <div class="node-sub">${data.middle.date}</div>
            </div>

            <!-- Conector -->
            <div class="connector">
                <div class="connector-label">Contrato</div>
                <div class="connector-line"></div>
                <div class="connector-label">Diário Oficial</div>
            </div>

            <!-- Destino -->
            <div class="node destination">
                <div class="node-label">Destino Final</div>
                <div class="node-value">${data.destination.label}</div>
                <div class="node-sub">${data.destination.cnpj}</div>
                <div class="node-sub status">${data.destination.status}</div>
            </div>
        `;

        trailWrapper.innerHTML = html;
        evidenceText.textContent = data.evidence;

        graphSection.style.display = 'block';
        graphSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function showTable() {
        graphSection.style.display = 'none';
        tableSection.style.display = 'block';
    }
});
