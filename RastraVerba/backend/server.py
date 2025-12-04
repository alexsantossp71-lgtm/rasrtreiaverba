from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
import random

app = FastAPI(title="RastraVerba API", version="1.0")

# Configuração CORS (Permite acesso do frontend local)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique a origem exata
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modelos de Dados ---

class NodeDetail(BaseModel):
    label: str
    value: Optional[str] = None
    sub: Optional[str] = None
    action: Optional[str] = None
    date: Optional[str] = None
    cnpj: Optional[str] = None
    status: Optional[str] = None

class EmendaDetails(BaseModel):
    origin: NodeDetail
    middle: NodeDetail
    destination: NodeDetail
    evidence: str

class Emenda(BaseModel):
    id: int
    deputado: str
    partido: str
    cidade: str
    valor: str
    ano: int
    status: str
    area: str
    details: EmendaDetails

# --- Dados Mockados (Simulando Banco de Dados/APIs Externas) ---
# Em um cenário real, estes dados viriam de consultas ao TransfereGov e Câmara dos Deputados

MOCK_DB = [
    {
        "id": 1,
        "deputado": "Paulo Alexandre Barbosa",
        "partido": "PSDB",
        "cidade": "Santos/SP",
        "valor": "R$ 500.000,00",
        "ano": 2023,
        "status": "Concluído",
        "area": "Saúde",
        "details": {
            "origin": {"label": "Dep. Paulo Alexandre (PSDB/SP)", "value": "R$ 500.000,00", "sub": "Emenda Pix 2023"},
            "middle": {"label": "Município de Santos/SP", "action": "Pregão Eletrônico 089/2023", "date": "10/05/2023"},
            "destination": {"label": "Tech Saúde Equipamentos", "cnpj": "CNPJ: 98.765.432/0001-10", "status": "Fornecedor"},
            "evidence": "HOMOLOGAÇÃO - PREGÃO ELETRÔNICO Nº 089/2023\nObjeto: Aquisição de equipamentos hospitalares.\nVencedora: TECH SAÚDE EQUIPAMENTOS MÉDICOS LTDA.\nValor: R$ 495.000,00.\nData: 12/05/2023."
        }
    },
    {
        "id": 2,
        "deputado": "Arthur Lira",
        "partido": "PP",
        "cidade": "Batalha/AL",
        "valor": "R$ 150.000,00",
        "ano": 2024,
        "status": "Em Execução",
        "area": "Infraestrutura",
        "details": {
            "origin": {"label": "Dep. Arthur Lira (PP/AL)", "value": "R$ 150.000,00", "sub": "Transferência Especial 2024"},
            "middle": {"label": "Município de Batalha/AL", "action": "Licitação 004/2024", "date": "15/01/2024"},
            "destination": {"label": "Construtora Exemplo LTDA", "cnpj": "CNPJ: 12.345.678/0001-90", "status": "Contratada"},
            "evidence": "EXTRATO DE CONTRATO Nº 015/2024\nContratante: Município de Batalha/AL.\nContratada: CONSTRUTORA EXEMPLO LTDA.\nObjeto: Pavimentação asfáltica.\nValor: R$ 148.500,00."
        }
    },
    {
        "id": 3,
        "deputado": "Rosana Valle",
        "partido": "PL",
        "cidade": "Santos/SP",
        "valor": "R$ 1.200.000,00",
        "ano": 2024,
        "status": "Planejamento",
        "area": "Assistência Social",
        "details": {
            "origin": {"label": "Dep. Rosana Valle (PL/SP)", "value": "R$ 1.200.000,00", "sub": "Emenda de Bancada 2024"},
            "middle": {"label": "Município de Santos/SP", "action": "Chamamento Público 012/2024", "date": "20/02/2024"},
            "destination": {"label": "Instituto Mulher e Vida", "cnpj": "CNPJ: 45.678.901/0001-23", "status": "OSC Parceira"},
            "evidence": "TERMO DE FOMENTO Nº 05/2024\nParceria entre Secretaria de Assistência Social e Instituto Mulher e Vida.\nObjeto: Capacitação profissional para mulheres.\nValor: R$ 1.200.000,00."
        }
    },
    {
        "id": 4,
        "deputado": "Delegado da Cunha",
        "partido": "PODE",
        "cidade": "São Vicente/SP",
        "valor": "R$ 300.000,00",
        "ano": 2024,
        "status": "Em Execução",
        "area": "Segurança",
        "details": {
            "origin": {"label": "Dep. Delegado da Cunha (PODE/SP)", "value": "R$ 300.000,00", "sub": "Emenda Individual 2024"},
            "middle": {"label": "Município de São Vicente/SP", "action": "Pregão 022/2024", "date": "10/03/2024"},
            "destination": {"label": "Segurança Total LTDA", "cnpj": "CNPJ: 11.222.333/0001-44", "status": "Contratada"},
            "evidence": "EXTRATO DE CONTRATO - Aquisição de câmeras de monitoramento.\nContratada: SEGURANÇA TOTAL LTDA.\nValor: R$ 298.000,00."
        }
    },
    {
        "id": 5,
        "deputado": "Tabata Amaral",
        "partido": "PSB",
        "cidade": "São Paulo/SP",
        "valor": "R$ 200.000,00",
        "ano": 2023,
        "status": "Concluído",
        "area": "Educação",
        "details": {
            "origin": {"label": "Dep. Tabata Amaral (PSB/SP)", "value": "R$ 200.000,00", "sub": "Emenda Individual 2023"},
            "middle": {"label": "Município de São Paulo/SP", "action": "Compra Direta 101/2023", "date": "15/06/2023"},
            "destination": {"label": "Editora Saber Mais", "cnpj": "CNPJ: 22.333.444/0001-55", "status": "Fornecedor"},
            "evidence": "NOTA DE EMPENHO - Aquisição de livros didáticos.\nFavorecido: EDITORA SABER MAIS LTDA.\nValor: R$ 200.000,00."
        }
    }
]

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "RastraVerba API is running"}

@app.get("/deputados")
def get_deputados():
    # Extrai deputados únicos da base
    seen = set()
    deputados = []
    for item in MOCK_DB:
        if item['deputado'] not in seen:
            deputados.append({"nome": item['deputado'], "partido": item['partido'], "estado": item['cidade'].split('/')[-1]})
            seen.add(item['deputado'])
    return deputados

@app.get("/cidades")
def get_cidades():
    # Extrai cidades únicas
    cidades = list(set(item['cidade'].split('/')[0] for item in MOCK_DB))
    return sorted(cidades)

@app.get("/rastrear", response_model=List[Emenda])
def rastrear_verba(
    deputado: Optional[str] = None,
    partido: Optional[str] = None,
    cidade: Optional[str] = None,
    area: Optional[str] = None,
    ano_inicio: Optional[int] = Query(None, alias="anoInicio"),
    ano_fim: Optional[int] = Query(None, alias="anoFim")
):
    """
    Endpoint principal de busca. Filtra a base de dados (ou faria as queries externas).
    """
    results = []
    
    for item in MOCK_DB:
        # Filtros de Texto (Case Insensitive)
        if deputado and deputado.lower() not in item['deputado'].lower():
            continue
        if partido and partido.lower() != item['partido'].lower():
            continue
        if cidade and cidade.lower() not in item['cidade'].lower():
            continue
        if area and area.lower() != item['area'].lower():
            continue
            
        # Filtros de Ano
        if ano_inicio and item['ano'] < ano_inicio:
            continue
        if ano_fim and item['ano'] > ano_fim:
            continue
            
        results.append(item)
        
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
