#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# TRINITY SETUP WIZARD - Configuración Interactiva
# Versión: 1.0.0
# ═══════════════════════════════════════════════════════════════════════════

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Función para imprimir headers
print_header() {
    echo -e "${GREEN}${BOLD}"
    echo "╔═══════════════════════════════════════════════════════════════════════╗"
    echo "║                                                                       ║"
    echo "║              🔱 TRINITY SETUP WIZARD v1.0 🔱                         ║"
    echo "║                                                                       ║"
    echo "╚═══════════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Función para imprimir secciones
print_section() {
    echo ""
    echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}${BOLD}  $1${NC}"
    echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Función para preguntas
ask_question() {
    echo -e "${YELLOW}$1${NC}"
    echo -n -e "${MAGENTA}➜ ${NC}"
}

# Clear screen
clear

# Header
print_header

echo -e "${CYAN}Este wizard te guiará para configurar el Sistema Trinity:${NC}"
echo ""
echo -e "  🧠 ${BOLD}Claude 3.5 Sonnet${NC}    - Razonamiento profundo"
echo -e "  🔍 ${BOLD}Perplexity AI${NC}       - Research científico"
echo -e "  ⚡ ${BOLD}Gemini 2.0 Flash${NC}    - Velocidad ultra"
echo -e "  🤖 ${BOLD}OpenAI GPT-4${NC}        - Backup confiable"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# Paso 1: Seleccionar modo de configuración
# ═══════════════════════════════════════════════════════════════════════════

print_section "PASO 1: SELECCIONA TU CONFIGURACIÓN"

echo -e "${CYAN}Elige una opción:${NC}"
echo ""
echo -e "  ${GREEN}1)${NC} Trinity Completo      - Claude + Gemini + Perplexity + GPT-4 ${BOLD}(Recomendado)${NC}"
echo -e "  ${GREEN}2)${NC} Dual Power           - Claude + Gemini"
echo -e "  ${GREEN}3)${NC} Quick Win (Gratis)   - Solo Gemini"
echo -e "  ${GREEN}4)${NC} Custom               - Tú eliges qué activar"
echo -e "  ${GREEN}5)${NC} Ver guía completa    - Abrir documentación"
echo ""

ask_question "Tu elección [1-5]:"
read MODE

case $MODE in
    5)
        echo ""
        echo -e "${CYAN}📚 Abriendo guía completa...${NC}"
        
        # Verificar si existe el archivo
        if [ -f "TRINITY_SETUP_GUIDE.md" ]; then
            # Intentar abrir con VS Code primero
            if command -v code &> /dev/null; then
                code TRINITY_SETUP_GUIDE.md
            # Luego intentar con editor de texto por defecto
            elif [ "$(uname)" == "Darwin" ]; then
                open -a "TextEdit" TRINITY_SETUP_GUIDE.md
            else
                cat TRINITY_SETUP_GUIDE.md | less
            fi
            echo ""
            echo -e "${GREEN}✅ Guía abierta!${NC}"
            echo ""
            echo -e "${YELLOW}Cuando termines de leer, vuelve a ejecutar este script:${NC}"
            echo -e "${MAGENTA}  ./setup-trinity.sh${NC}"
        else
            echo -e "${RED}❌ Error: TRINITY_SETUP_GUIDE.md no encontrado${NC}"
        fi
        exit 0
        ;;
esac

# ═══════════════════════════════════════════════════════════════════════════
# Paso 2: Obtener API Keys
# ═══════════════════════════════════════════════════════════════════════════

print_section "PASO 2: CONFIGURAR API KEYS"

# Variables para las keys
CLAUDE_KEY=""
CLAUDE_ENABLED="false"
PERPLEXITY_KEY=""
PERPLEXITY_ENABLED="false"
GEMINI_KEY=""
GEMINI_ENABLED="false"
OPENAI_KEY=""
OPENAI_ENABLED="false"

# Configurar según el modo elegido
case $MODE in
    1)
        # Trinity Completo
        echo -e "${CYAN}📋 Trinity Completo: Necesitas 4 API keys${NC}"
        echo ""
        
        # Claude
        echo -e "${BOLD}🧠 CLAUDE 3.5 SONNET${NC}"
        echo -e "${YELLOW}Obtener en: https://console.anthropic.com/${NC}"
        ask_question "Pega tu API key de Claude (sk-ant-...):"
        read CLAUDE_KEY
        if [ ! -z "$CLAUDE_KEY" ]; then
            CLAUDE_ENABLED="true"
            echo -e "${GREEN}✅ Claude configurado${NC}"
        fi
        echo ""
        
        # Perplexity
        echo -e "${BOLD}🔍 PERPLEXITY AI${NC}"
        echo -e "${YELLOW}Obtener en: https://www.perplexity.ai/settings/api${NC}"
        ask_question "Pega tu API key de Perplexity (pplx-...):"
        read PERPLEXITY_KEY
        if [ ! -z "$PERPLEXITY_KEY" ]; then
            PERPLEXITY_ENABLED="true"
            echo -e "${GREEN}✅ Perplexity configurado${NC}"
        fi
        echo ""
        
        # Gemini
        echo -e "${BOLD}⚡ GEMINI 2.0 FLASH${NC}"
        echo -e "${YELLOW}Obtener en: https://aistudio.google.com/${NC}"
        ask_question "Pega tu API key de Gemini (AIza...):"
        read GEMINI_KEY
        if [ ! -z "$GEMINI_KEY" ]; then
            GEMINI_ENABLED="true"
            echo -e "${GREEN}✅ Gemini configurado${NC}"
        fi
        echo ""
        
        # OpenAI
        echo -e "${BOLD}🤖 OPENAI GPT-4 (Opcional)${NC}"
        echo -e "${YELLOW}Obtener en: https://platform.openai.com/api-keys${NC}"
        ask_question "Pega tu API key de OpenAI (sk-proj-...) o deja vacío:"
        read OPENAI_KEY
        if [ ! -z "$OPENAI_KEY" ]; then
            OPENAI_ENABLED="true"
            echo -e "${GREEN}✅ OpenAI configurado${NC}"
        else
            echo -e "${YELLOW}⚠️  OpenAI omitido (puedes agregarlo después)${NC}"
        fi
        ;;
        
    2)
        # Dual Power
        echo -e "${CYAN}📋 Dual Power: Necesitas 2 API keys${NC}"
        echo ""
        
        # Claude
        echo -e "${BOLD}🧠 CLAUDE 3.5 SONNET${NC}"
        echo -e "${YELLOW}Obtener en: https://console.anthropic.com/${NC}"
        ask_question "Pega tu API key de Claude:"
        read CLAUDE_KEY
        if [ ! -z "$CLAUDE_KEY" ]; then
            CLAUDE_ENABLED="true"
            echo -e "${GREEN}✅ Claude configurado${NC}"
        fi
        echo ""
        
        # Gemini
        echo -e "${BOLD}⚡ GEMINI 2.0 FLASH${NC}"
        echo -e "${YELLOW}Obtener en: https://aistudio.google.com/${NC}"
        ask_question "Pega tu API key de Gemini:"
        read GEMINI_KEY
        if [ ! -z "$GEMINI_KEY" ]; then
            GEMINI_ENABLED="true"
            echo -e "${GREEN}✅ Gemini configurado${NC}"
        fi
        ;;
        
    3)
        # Quick Win - Solo Gemini
        echo -e "${CYAN}📋 Quick Win: Solo necesitas 1 API key (¡GRATIS!)${NC}"
        echo ""
        
        echo -e "${BOLD}⚡ GEMINI 2.0 FLASH${NC}"
        echo -e "${YELLOW}Obtener en: https://aistudio.google.com/${NC}"
        echo -e "${GREEN}💰 GRATIS: 15 requests/minuto${NC}"
        echo ""
        ask_question "Pega tu API key de Gemini:"
        read GEMINI_KEY
        if [ ! -z "$GEMINI_KEY" ]; then
            GEMINI_ENABLED="true"
            echo -e "${GREEN}✅ Gemini configurado${NC}"
        fi
        ;;
        
    4)
        # Custom
        echo -e "${CYAN}📋 Configuración Custom: Tú eliges${NC}"
        echo ""
        
        ask_question "¿Configurar Claude? [s/N]:"
        read SETUP_CLAUDE
        if [[ "$SETUP_CLAUDE" =~ ^[Ss]$ ]]; then
            echo -e "${YELLOW}Obtener en: https://console.anthropic.com/${NC}"
            ask_question "API key de Claude:"
            read CLAUDE_KEY
            if [ ! -z "$CLAUDE_KEY" ]; then
                CLAUDE_ENABLED="true"
                echo -e "${GREEN}✅ Claude configurado${NC}"
            fi
        fi
        echo ""
        
        ask_question "¿Configurar Perplexity? [s/N]:"
        read SETUP_PERPLEXITY
        if [[ "$SETUP_PERPLEXITY" =~ ^[Ss]$ ]]; then
            echo -e "${YELLOW}Obtener en: https://www.perplexity.ai/settings/api${NC}"
            ask_question "API key de Perplexity:"
            read PERPLEXITY_KEY
            if [ ! -z "$PERPLEXITY_KEY" ]; then
                PERPLEXITY_ENABLED="true"
                echo -e "${GREEN}✅ Perplexity configurado${NC}"
            fi
        fi
        echo ""
        
        ask_question "¿Configurar Gemini? [s/N]:"
        read SETUP_GEMINI
        if [[ "$SETUP_GEMINI" =~ ^[Ss]$ ]]; then
            echo -e "${YELLOW}Obtener en: https://aistudio.google.com/${NC}"
            ask_question "API key de Gemini:"
            read GEMINI_KEY
            if [ ! -z "$GEMINI_KEY" ]; then
                GEMINI_ENABLED="true"
                echo -e "${GREEN}✅ Gemini configurado${NC}"
            fi
        fi
        echo ""
        
        ask_question "¿Configurar OpenAI? [s/N]:"
        read SETUP_OPENAI
        if [[ "$SETUP_OPENAI" =~ ^[Ss]$ ]]; then
            echo -e "${YELLOW}Obtener en: https://platform.openai.com/api-keys${NC}"
            ask_question "API key de OpenAI:"
            read OPENAI_KEY
            if [ ! -z "$OPENAI_KEY" ]; then
                OPENAI_ENABLED="true"
                echo -e "${GREEN}✅ OpenAI configurado${NC}"
            fi
        fi
        ;;
        
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

# ═══════════════════════════════════════════════════════════════════════════
# Paso 3: Crear backup del config actual
# ═══════════════════════════════════════════════════════════════════════════

print_section "PASO 3: RESPALDO DE CONFIGURACIÓN ACTUAL"

if [ -f "config.local.js" ]; then
    BACKUP_FILE="config.local.js.backup-$(date +%Y%m%d-%H%M%S)"
    cp config.local.js "$BACKUP_FILE"
    echo -e "${GREEN}✅ Backup creado: $BACKUP_FILE${NC}"
else
    echo -e "${YELLOW}⚠️  No hay config.local.js previo (primera vez)${NC}"
fi

# ═══════════════════════════════════════════════════════════════════════════
# Paso 4: Actualizar config.local.js
# ═══════════════════════════════════════════════════════════════════════════

print_section "PASO 4: ACTUALIZANDO CONFIGURACIÓN"

echo -e "${CYAN}Generando nuevo config.local.js...${NC}"

# Crear el nuevo archivo de configuración
cat > config.local.js << EOF
// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN TRINITY - Sistema Multi-IA de Poder Máximo
// Versión: 4.0.0 - Trinity Edition
// Generado por: setup-trinity.sh
// Fecha: $(date)
// ═══════════════════════════════════════════════════════════════════════════
const AURUM_CONFIG = {
    // ───────────────────────────────────────────────────────────────────────
    // CLAUDE 3.5 SONNET - Razonamiento Profundo 🧠
    // ───────────────────────────────────────────────────────────────────────
    claude: {
        apiKey: '$CLAUDE_KEY',
        model: 'claude-3-5-sonnet-20241022',
        maxTokens: 4096,
        temperature: 0.7,
        enabled: $CLAUDE_ENABLED,
        endpoint: 'https://api.anthropic.com/v1/messages',
        version: '2023-06-01',
        priority: 1
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // PERPLEXITY AI - Research en Tiempo Real 🔍
    // ───────────────────────────────────────────────────────────────────────
    perplexity: {
        apiKey: '$PERPLEXITY_KEY',
        model: 'llama-3.1-sonar-large-128k-online',
        maxTokens: 2000,
        temperature: 0.5,
        enabled: $PERPLEXITY_ENABLED,
        endpoint: 'https://api.perplexity.ai/chat/completions',
        searchDomainFilter: ['pubmed.gov', 'scholar.google.com', 'nature.com'],
        priority: 2
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // GEMINI 2.0 FLASH - Velocidad Ultra + Multimodal ⚡
    // ───────────────────────────────────────────────────────────────────────
    gemini: {
        apiKey: '$GEMINI_KEY',
        model: 'gemini-2.0-flash-exp',
        maxTokens: 2048,
        temperature: 0.7,
        enabled: $GEMINI_ENABLED,
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
        priority: 3
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // OPENAI GPT-4 - Balanceado y Confiable 🤖
    // ───────────────────────────────────────────────────────────────────────
    openai: {
        apiKey: '$OPENAI_KEY',
        model: 'gpt-4',
        maxTokens: 1500,
        temperature: 0.5,
        enabled: $OPENAI_ENABLED,
        endpoint: 'https://api.openai.com/v1/chat/completions',
        priority: 4
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // TRINITY ROUTER - Sistema Inteligente de Decisión 🔱
    // ───────────────────────────────────────────────────────────────────────
    trinity: {
        enabled: true,
        routingStrategy: 'intelligent',
        
        routes: {
            claude: {
                keywords: ['plan', 'diseña', 'crea', 'analiza', 'explica detalladamente', 'estrategia', 'programa'],
                queryTypes: ['plan_creation', 'deep_analysis', 'complex_reasoning']
            },
            perplexity: {
                keywords: ['estudio', 'investigación', 'científico', 'evidencia', 'research', 'últimos', 'reciente'],
                queryTypes: ['scientific_research', 'validation', 'current_info']
            },
            gemini: {
                keywords: ['qué es', 'define', 'rápido', 'simple', 'básico'],
                queryTypes: ['quick_response', 'definition', 'simple_query']
            },
            openai: {
                keywords: ['hola', 'ayuda', 'gracias', 'general'],
                queryTypes: ['conversation', 'general', 'fallback']
            }
        },
        
        fallbackChain: ['gemini', 'claude', 'perplexity', 'openai', 'morpheus_local'],
        
        monitoring: {
            logDecisions: true,
            trackPerformance: true,
            compareResponses: false
        }
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // MORPHEUS LOCAL - Fallback Inteligente 💎
    // ───────────────────────────────────────────────────────────────────────
    morpheus: {
        systemPrompt: \`Eres Morpheus, un agente de wellness potenciado por el SISTEMA TRINITY.

╔══════════════════════════════════════════════════════════════╗
║  MORPHEUS TRINITY SYSTEM v4.0                                ║
║  Claude + Perplexity + Gemini + GPT-4 + Morpheus Local      ║
╚══════════════════════════════════════════════════════════════╝

INSTRUCCIÓN ABSOLUTA: Responde SOLO lo que te preguntan.

ESTRUCTURA DE RESPUESTA:
1. Respuesta directa (2-3 oraciones)
2. Análisis científico profundo (datos específicos)
3. Aplicación práctica (paso a paso)
4. Siguiente paso sugerido

Mantén personalidad Morpheus: Directo, científico, empático, confianza tranquila.\`,
        fallbackEnabled: true,
        enhancedKnowledge: true
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // SISTEMA - Configuración General ⚙️
    // ───────────────────────────────────────────────────────────────────────
    system: {
        debugMode: true,
        logResponses: true,
        showAISource: true,
        compareMode: false,
        cacheResponses: true,
        maxRetries: 3,
        timeout: 30000,
        version: '4.0.0-trinity'
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN Y LOGGING
// ═══════════════════════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
    console.log('%c🔱═══════════════════════════════════════════════════════════', 'color: #00ff00; font-weight: bold');
    console.log('%c   AURUM WELLNESS - TRINITY SYSTEM v4.0 LOADED', 'color: #FFD700; font-weight: bold; font-size: 14px');
    console.log('%c🔱═══════════════════════════════════════════════════════════', 'color: #00ff00; font-weight: bold');
    console.log('');
    console.log('🧠 Claude 3.5 Sonnet:', AURUM_CONFIG.claude.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('🔍 Perplexity AI:', AURUM_CONFIG.perplexity.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('⚡ Gemini 2.0 Flash:', AURUM_CONFIG.gemini.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('🤖 OpenAI GPT-4:', AURUM_CONFIG.openai.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('💎 Morpheus Local:', AURUM_CONFIG.morpheus.fallbackEnabled ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('');
    console.log('🔱 Trinity Router:', AURUM_CONFIG.trinity.enabled ? '✅ ACTIVADO' : '⚪ Desactivado');
    console.log('   Estrategia:', AURUM_CONFIG.trinity.routingStrategy);
    console.log('');
    console.log('%c💡 Para ver estadísticas: SuperWellnessAgent.getStats()', 'color: #FFD700');
    console.log('');
    
    window.AURUM_CONFIG = AURUM_CONFIG;
}
EOF

echo -e "${GREEN}✅ config.local.js actualizado${NC}"

# ═══════════════════════════════════════════════════════════════════════════
# Paso 5: Resumen y siguiente paso
# ═══════════════════════════════════════════════════════════════════════════

print_section "✅ CONFIGURACIÓN COMPLETADA"

echo -e "${GREEN}${BOLD}Trinity configurado exitosamente!${NC}"
echo ""
echo -e "${CYAN}📊 Resumen de configuración:${NC}"
echo ""

# Mostrar qué se configuró
if [ "$CLAUDE_ENABLED" == "true" ]; then
    echo -e "  ${GREEN}✅ Claude 3.5 Sonnet${NC}    - Razonamiento profundo"
fi
if [ "$PERPLEXITY_ENABLED" == "true" ]; then
    echo -e "  ${GREEN}✅ Perplexity AI${NC}       - Research científico"
fi
if [ "$GEMINI_ENABLED" == "true" ]; then
    echo -e "  ${GREEN}✅ Gemini 2.0 Flash${NC}    - Velocidad ultra"
fi
if [ "$OPENAI_ENABLED" == "true" ]; then
    echo -e "  ${GREEN}✅ OpenAI GPT-4${NC}        - Backup confiable"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}${BOLD}🚀 SIGUIENTE PASO: PROBAR TRINITY${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}1. Iniciar servidor:${NC}"
echo -e "   ${MAGENTA}python3 -m http.server 3000${NC}"
echo ""
echo -e "${CYAN}2. Abrir en navegador:${NC}"
echo -e "   ${MAGENTA}http://localhost:3000${NC}"
echo ""
echo -e "${CYAN}3. Verificar en consola (Cmd+Opt+J):${NC}"
echo -e "   Deberías ver: ${GREEN}✅ ACTIVO${NC} para las IAs configuradas"
echo ""
echo -e "${CYAN}4. Probar en el chat:${NC}"
echo -e "   • ${YELLOW}\"hola\"${NC} - Debería usar Gemini"
echo -e "   • ${YELLOW}\"diseña un plan de 7 días\"${NC} - Debería usar Claude"
echo -e "   • ${YELLOW}\"qué estudios respaldan...\"${NC} - Debería usar Perplexity"
echo ""
echo -e "${CYAN}5. Ver estadísticas en consola:${NC}"
echo -e "   ${MAGENTA}SuperWellnessAgent.getStats()${NC}"
echo ""

# Crear script de inicio rápido
cat > start-trinity.sh << 'EOFSTART'
#!/bin/bash
echo "🔱 Iniciando AURUM WELLNESS - Trinity System..."
echo ""
python3 -m http.server 3000
EOFSTART

chmod +x start-trinity.sh

echo -e "${GREEN}💡 TIP: Creé un script de inicio rápido:${NC}"
echo -e "   ${MAGENTA}./start-trinity.sh${NC}"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

ask_question "¿Iniciar servidor ahora? [S/n]:"
read START_NOW

if [[ ! "$START_NOW" =~ ^[Nn]$ ]]; then
    echo ""
    echo -e "${GREEN}🚀 Iniciando servidor en http://localhost:3000...${NC}"
    echo -e "${YELLOW}Presiona Ctrl+C para detener${NC}"
    echo ""
    python3 -m http.server 3000
fi

echo ""
echo -e "${GREEN}${BOLD}✨ ¡Disfruta de Trinity! ✨${NC}"
echo ""
