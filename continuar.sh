#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# AURUM WELLNESS MATRIX - Script de Continuación Rápida
# ═══════════════════════════════════════════════════════════════════════════

clear

cat << 'BANNER'
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║          🎯 AURUM WELLNESS - PLATAFORMA MATRIX WEB 🎯                    ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
BANNER

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 MENÚ DE OPCIONES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  1️⃣  Iniciar servidor (http://localhost:3000)"
echo "  2️⃣  Abrir en navegador"
echo "  3️⃣  Ver configuración API keys"
echo "  4️⃣  Test diagnóstico OpenAI"
echo "  5️⃣  Ver guía de desarrollo"
echo "  0️⃣  Salir"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Opción: " opt

case $opt in
    1)
        echo ""
        echo "🚀 Iniciando servidor..."
        echo "URL: http://localhost:3000"
        echo ""
        python3 -m http.server 3000
        ;;
    2)
        open http://localhost:3000 2>/dev/null || echo "Abre: http://localhost:3000"
        ;;
    3)
        echo ""
        grep -A 6 "openai:" config.local.js 2>/dev/null || echo "No encontrado"
        echo ""
        ;;
    4)
        open test-openai-api.html 2>/dev/null || echo "Abre: test-openai-api.html"
        ;;
    5)
        cat CONTINUAR_DESARROLLO_MATRIX.md | less
        ;;
    0)
        echo "👋 Adiós!"
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        ;;
esac
