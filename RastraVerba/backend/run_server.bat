@echo off
echo Instalando dependencias...
pip install fastapi uvicorn requests pydantic python-dotenv pandas thefuzz

echo.
echo Iniciando Servidor RastraVerba API...
echo O servidor estara disponivel em http://localhost:8000
echo Mantenha esta janela aberta enquanto usa o site.
echo.

python server.py
pause
