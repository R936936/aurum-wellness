#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════
#  AURUM WELLNESS - START FRESH (Sin Caché)
# ═══════════════════════════════════════════════════════════════════════

clear
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║          🔱 AURUM WELLNESS - TRINITY v5.0.1 🔱               ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Detener servidor anterior
echo "🛑 Deteniendo servidores previos..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Iniciar servidor
echo "🚀 Iniciando servidor en puerto 3000..."
cd ~/Desktop/aurum-wellness
python3 -m http.server 3000 > /dev/null 2>&1 &
sleep 2

# Generar URL con cache-buster
TIMESTAMP=$(date +%s)
URL="http://localhost:3000/index.html?v=5.0.1&nocache=$TIMESTAMP"

echo ""
echo "✅ Servidor activo: http://localhost:3000"
echo ""
echo "🌐 Abriendo navegador con caché limpio..."
open -a "Google Chrome" "$URL"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📋 INSTRUCCIONES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  1. Presiona Cmd+Opt+J para abrir consola"
echo "  2. Deberías ver: ✅ TRINITY SYSTEM v4.0 LOADED"
echo "  3. Prueba escribiendo: 'hola'"
echo ""
echo "  🔄 Para recargar sin caché: Cmd+Shift+R"
echo "  🛑 Para detener servidor: Ctrl+C"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Servidor corriendo en background..."
echo "   PID: $(lsof -ti:3000)"
echo ""
