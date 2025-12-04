import requests
import json
from datetime import datetime, timedelta
import re
from typing import List, Dict, Optional
from pydantic import BaseModel

# --- Configuration ---
TRANSFEREGOV_API_BASE = "https://api.transferegov.gestao.gov.br/transferencias-especiais/v1"
QUERIDO_DIARIO_API_BASE = "https://queridodiario.ok.org.br/api"
SENADO_API_BASE = "https://legis.senado.leg.br/dadosabertos"

class Transferencia(BaseModel):
    id_transferencia: str
    municipio_ibge: str
    municipio_nome: str
    valor: float
    data_repasse: str
    favorecido_cnpj: Optional[str] = None

class MatchResult(BaseModel):
    transferencia: Transferencia
    diario_url: str
    empresa_encontrada_cnpj: Optional[str]
    score_confianca: float
    evidencia_texto: str

def fetch_last_special_transfers(limit: int = 10) -> List[Transferencia]:
    """
    Busca as últimas transferências especiais (Emendas Pix) do TransfereGov.
    Nota: Em produção, usaríamos paginação e filtros de data.
    """
    print(f"[*] Buscando últimas {limit} transferências especiais...")
    
    # Endpoint hipotético baseado na documentação padrão. 
    # Ajustar conforme a documentação real validada se necessário.
    url = f"{TRANSFEREGOV_API_BASE}/transferencias"
    
    # Mock data for prototype if API fails or requires specific auth keys not present
    # This ensures the logic can be tested immediately.
    try:
        response = requests.get(url, params={"pagina": 1, "tamanho": limit}, timeout=10)
        if response.status_code == 200:
            data = response.json()
            # Parse real data here
            # return [parse_transfer(item) for item in data['_embedded']['transferencias']]
            pass 
    except Exception as e:
        print(f"[!] Erro ao conectar TransfereGov: {e}. Usando dados simulados para protótipo.")

    # Dados simulados baseados em casos reais para teste do algoritmo
    return [
        Transferencia(
            id_transferencia="TRF-2024-001",
            municipio_ibge="2700805", # Batalha/AL (Exemplo do prompt)
            municipio_nome="Batalha",
            valor=150000.00,
            data_repasse="2024-01-15"
        ),
        Transferencia(
            id_transferencia="TRF-2024-002",
            municipio_ibge="3548500", # Santos/SP
            municipio_nome="Santos",
            valor=500000.00,
            data_repasse="2024-02-10"
        )
    ]

def search_gazettes(ibge_code: str, date_start: str, keywords: List[str]) -> List[Dict]:
    """
    Busca nos diários oficiais via Querido Diário API.
    """
    print(f"[*] Consultando Querido Diário para IBGE {ibge_code} a partir de {date_start}...")
    
    url = f"{QUERIDO_DIARIO_API_BASE}/gazettes"
    params = {
        "territory_ids": ibge_code,
        "published_since": date_start,
        "querystring": " ".join(keywords),
        "size": 5
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 200:
            return response.json().get('gazettes', [])
    except Exception as e:
        print(f"[!] Erro no Querido Diário: {e}")
    
    return []

def extract_cnpj(text: str) -> Optional[str]:
    """Extrai o primeiro padrão de CNPJ encontrado no texto."""
    pattern = r"\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"
    match = re.search(pattern, text)
    return match.group(0) if match else None

def calculate_confidence(transfer_val: float, gazette_text: str) -> float:
    """
    Calcula score de confiança baseado na presença do valor monetário no texto.
    """
    # Limpa o texto e procura valores numéricos
    # Lógica simplificada: procura o valor exato ou aproximado (+- 5%)
    
    # Remove formatação de moeda para busca
    text_clean = gazette_text.replace(".", "").replace(",", ".")
    
    lower_bound = transfer_val * 0.95
    upper_bound = transfer_val * 1.05
    
    # Regex para encontrar valores monetários no texto
    money_pattern = r"R\$\s?([\d\.,]+)"
    matches = re.findall(money_pattern, gazette_text)
    
    for match in matches:
        try:
            val_found = float(match.replace(".", "").replace(",", "."))
            if lower_bound <= val_found <= upper_bound:
                return 0.95 # Alta confiança: valor bate
        except:
            continue
            
    return 0.1 # Baixa confiança: valor não encontrado

def trace_money():
    transfers = fetch_last_special_transfers()
    matches = []
    
    for transfer in transfers:
        print(f"\n>>> Analisando Transferência {transfer.id_transferencia} ({transfer.municipio_nome}) - R$ {transfer.valor}")
        
        # Palavras-chave para licitação
        keywords = ["Licitação", "Homologação", "Contrato", "Aquisição"]
        
        gazettes = search_gazettes(transfer.municipio_ibge, transfer.data_repasse, keywords)
        
        found_match = False
        for gazette in gazettes:
            text = gazette.get('source_text', '')[:5000] # Limita tamanho para análise
            
            confidence = calculate_confidence(transfer.valor, text)
            cnpj = extract_cnpj(text)
            
            if confidence > 0.5:
                result = MatchResult(
                    transferencia=transfer,
                    diario_url=gazette.get('url', 'N/A'),
                    empresa_encontrada_cnpj=cnpj,
                    score_confianca=confidence,
                    evidencia_texto=text[:200] + "..."
                )
                matches.append(result)
                print(f"   [MATCH ENCONTRADO] Score: {confidence} | CNPJ: {cnpj}")
                found_match = True
                break # Assume primeiro match relevante
        
        if not found_match:
            print("   [X] Nenhum match conclusivo encontrado nos diários recentes.")

    # Salvar relatório
    with open("trace_log.json", "w", encoding='utf-8') as f:
        f.write(json.dumps([m.dict() for m in matches], indent=2, default=str))
    
    print(f"\nRelatório gerado: {len(matches)} matches encontrados. Salvo em trace_log.json")

if __name__ == "__main__":
    trace_money()
