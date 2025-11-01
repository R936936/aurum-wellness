#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════
# DEPLOY FIX - Terminal Display After Login
# Sábado 2 Noviembre 2025 - 12:35 PM
# ═══════════════════════════════════════════════════════════════════════

echo "🚀 Iniciando deploy del fix..."
echo ""

cd /Users/wu/Desktop/aurum-wellness

echo "📦 Agregando archivos..."
git add index.html FIX_TERMINAL_DISPLAY_02NOV_1230PM.md

echo "💾 Commit..."
git commit -m "FIX: Terminal display after login - Forced show with debugging logs v5.0.7"

echo "📤 Push a GitHub..."
git push origin main

echo ""
echo "✅ Deploy completado!"
echo ""
echo "🌐 Vercel auto-desplegará en ~30 segundos"
echo "URL: https://aurum-wellness.vercel.app"
echo ""
echo "🧪 Para probar local:"
echo "   python3 -m http.server 3000"
echo "   open http://localhost:3000"
echo ""
