#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                           ║"
echo "║                🚀 INICIANDO AURUM WELLNESS SERVER 🚀                      ║"
echo "║                                                                           ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Detener cualquier servidor en puerto 3000
echo "🔧 Liberando puerto 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Verificar archivos críticos
echo "📋 Verificando archivos críticos..."
if [ ! -f "config.local.js" ]; then
    echo "❌ ERROR: config.local.js no encontrado"
    exit 1
fi

if [ ! -f "super-wellness-agent.js" ]; then
    echo "❌ ERROR: super-wellness-agent.js no encontrado"
    exit 1
fi

if [ ! -f "index.html" ]; then
    echo "❌ ERROR: index.html no encontrado"
    exit 1
fi

echo "✅ Todos los archivos presentes"
echo ""

# Iniciar servidor
echo "🌐 Iniciando servidor HTTP en puerto 3000..."
python3 -m http.server 3000 &
SERVER_PID=$!

sleep 2

# Verificar que el servidor esté corriendo
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Servidor iniciado correctamente (PID: $SERVER_PID)"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  �� ACCESO"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  URL Principal:  http://localhost:3000"
    echo "  URL Debug:      http://localhost:3000/test-debug.html"
    echo "  URL Test API:   http://localhost:3000/test-openai-api.html"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🔍 Abriendo navegador..."
    sleep 1
    open http://localhost:3000
    
    echo ""
    echo "✅ Sistema desplegado y listo"
    echo ""
    echo "Presiona Ctrl+C para detener el servidor"
    
    # Mantener el script corriendo
    wait $SERVER_PID
else
    echo "❌ ERROR: El servidor no pudo iniciarse"
    exit 1
fi
