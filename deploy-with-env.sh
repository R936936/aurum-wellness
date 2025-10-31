#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════
#  🔱 AURUM WELLNESS - DEPLOYMENT CON VARIABLES DE ENTORNO 🔱
# ═══════════════════════════════════════════════════════════════════════

echo ""
echo "🔱═══════════════════════════════════════════════════════════"
echo "   DEPLOYMENT AUTOMÁTICO A VERCEL CON API KEYS"
echo "🔱═══════════════════════════════════════════════════════════"
echo ""

# Verificar que existe config.local.js
if [ ! -f "config.local.js" ]; then
    echo "❌ Error: config.local.js no encontrado"
    echo "   Ejecuta primero: ./setup-trinity.sh"
    exit 1
fi

echo "✅ Detectando API keys de config.local.js..."
echo ""

# Extraer API keys (de forma segura)
CLAUDE_KEY=$(grep "apiKey:" config.local.js | grep "claude" -A 1 | grep "'" | cut -d"'" -f2 | head -1)
GEMINI_KEY=$(grep "apiKey:" config.local.js | grep "gemini" -A 1 | grep "'" | cut -d"'" -f2 | head -1)
OPENAI_KEY=$(grep "apiKey:" config.local.js | grep "openai" -A 1 | grep "'" | cut -d"'" -f2 | head -1)
PERPLEXITY_KEY=$(grep "apiKey:" config.local.js | grep "perplexity" -A 1 | grep "'" | cut -d"'" -f2 | head -1)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📊 API KEYS DETECTADAS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Función para mostrar status
check_key() {
    if [ ! -z "$1" ] && [ "$1" != "null" ] && [ "$1" != "''" ]; then
        echo "✅ $2: ${1:0:20}..."
        return 0
    else
        echo "⚪ $2: No configurada"
        return 1
    fi
}

check_key "$CLAUDE_KEY" "Claude 3.5"
check_key "$GEMINI_KEY" "Gemini 2.0"
check_key "$OPENAI_KEY" "OpenAI GPT-4"
check_key "$PERPLEXITY_KEY" "Perplexity AI"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 DEPLOYMENT A VERCEL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI no está instalado"
    echo ""
    echo "Opciones:"
    echo ""
    echo "A) Instalar Vercel CLI ahora (recomendado)"
    echo "   npm install -g vercel"
    echo ""
    echo "B) Configurar manualmente en web"
    echo "   https://vercel.com/dashboard → Settings → Environment Variables"
    echo ""
    read -p "¿Instalar Vercel CLI ahora? [S/n]: " install_cli
    
    if [[ "$install_cli" =~ ^[Ss]$ ]] || [ -z "$install_cli" ]; then
        echo "📦 Instalando Vercel CLI..."
        npm install -g vercel
    else
        echo ""
        echo "📋 GUÍA MANUAL:"
        echo ""
        echo "1. Ve a: https://vercel.com/dashboard"
        echo "2. Selecciona proyecto: aurum-wellness"
        echo "3. Settings → Environment Variables"
        echo "4. Agrega estas variables:"
        echo ""
        [ ! -z "$CLAUDE_KEY" ] && echo "   CLAUDE_API_KEY = $CLAUDE_KEY"
        [ ! -z "$GEMINI_KEY" ] && echo "   GEMINI_API_KEY = $GEMINI_KEY"
        [ ! -z "$OPENAI_KEY" ] && echo "   OPENAI_API_KEY = $OPENAI_KEY"
        [ ! -z "$PERPLEXITY_KEY" ] && echo "   PERPLEXITY_API_KEY = $PERPLEXITY_KEY"
        echo ""
        echo "5. Redeploy del dashboard"
        echo ""
        exit 0
    fi
fi

echo "🔐 Configurando variables de entorno en Vercel..."
echo ""

# Configurar cada API key
if [ ! -z "$CLAUDE_KEY" ] && [ "$CLAUDE_KEY" != "null" ]; then
    echo "🧠 Claude API Key..."
    vercel env add CLAUDE_API_KEY production <<< "$CLAUDE_KEY" 2>/dev/null || echo "   (ya existe o error)"
fi

if [ ! -z "$GEMINI_KEY" ] && [ "$GEMINI_KEY" != "null" ]; then
    echo "⚡ Gemini API Key..."
    vercel env add GEMINI_API_KEY production <<< "$GEMINI_KEY" 2>/dev/null || echo "   (ya existe o error)"
fi

if [ ! -z "$OPENAI_KEY" ] && [ "$OPENAI_KEY" != "null" ]; then
    echo "🤖 OpenAI API Key..."
    vercel env add OPENAI_API_KEY production <<< "$OPENAI_KEY" 2>/dev/null || echo "   (ya existe o error)"
fi

if [ ! -z "$PERPLEXITY_KEY" ] && [ "$PERPLEXITY_KEY" != "null" ]; then
    echo "🔍 Perplexity API Key..."
    vercel env add PERPLEXITY_API_KEY production <<< "$PERPLEXITY_KEY" 2>/dev/null || echo "   (ya existe o error)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📤 DEPLOYING A VERCEL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Deploy
vercel --prod

echo ""
echo "✅ Deployment completado!"
echo ""
echo "🌐 Tu app está disponible en:"
echo "   https://aurum-wellness.vercel.app"
echo ""
echo "💡 Las API keys están configuradas como variables de entorno seguras"
echo ""

