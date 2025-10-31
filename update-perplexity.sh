#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# Script para actualizar solo la API key de Perplexity
# ═══════════════════════════════════════════════════════════════════════════

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

clear

echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                       ║${NC}"
echo -e "${GREEN}║           🔍 ACTUALIZAR PERPLEXITY API KEY 🔍                        ║${NC}"
echo -e "${GREEN}║                                                                       ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}Elige una opción:${NC}"
echo ""
echo -e "  ${GREEN}1)${NC} Tengo mi API key de Perplexity - Actualizar ahora"
echo -e "  ${GREEN}2)${NC} Desactivar Perplexity temporalmente"
echo -e "  ${GREEN}3)${NC} Ver instrucciones para obtener la key"
echo -e "  ${GREEN}4)${NC} Cancelar"
echo ""
echo -n -e "${YELLOW}Tu elección [1-4]:${NC} "
read CHOICE

case $CHOICE in
    1)
        echo ""
        echo -e "${CYAN}📋 Obtener API key:${NC}"
        echo -e "${YELLOW}   https://www.perplexity.ai/settings/api${NC}"
        echo ""
        echo -n -e "${YELLOW}Pega tu API key de Perplexity (pplx-...):${NC} "
        read PERPLEXITY_KEY
        
        if [ -z "$PERPLEXITY_KEY" ]; then
            echo -e "${RED}❌ No ingresaste ninguna key${NC}"
            exit 1
        fi
        
        # Backup
        BACKUP_FILE="config.local.js.backup-$(date +%Y%m%d-%H%M%S)"
        cp config.local.js "$BACKUP_FILE"
        echo -e "${GREEN}✅ Backup creado: $BACKUP_FILE${NC}"
        
        # Actualizar la key en el archivo
        sed -i '' "s|apiKey: 'sk-ant-[^']*'|apiKey: '$PERPLEXITY_KEY'|" config.local.js
        
        # Asegurar que enabled sea true
        sed -i '' '/perplexity:/,/enabled:/ s/enabled: false/enabled: true/' config.local.js
        
        echo -e "${GREEN}✅ Perplexity API key actualizada${NC}"
        echo ""
        echo -e "${CYAN}Para aplicar cambios:${NC}"
        echo -e "  1. Detén el servidor (Ctrl+C)"
        echo -e "  2. Reinicia: ${YELLOW}python3 -m http.server 3000${NC}"
        echo -e "  3. Recarga la página en el navegador"
        ;;
        
    2)
        echo ""
        echo -e "${YELLOW}Desactivando Perplexity...${NC}"
        
        # Backup
        BACKUP_FILE="config.local.js.backup-$(date +%Y%m%d-%H%M%S)"
        cp config.local.js "$BACKUP_FILE"
        echo -e "${GREEN}✅ Backup creado: $BACKUP_FILE${NC}"
        
        # Desactivar Perplexity
        sed -i '' '/perplexity:/,/enabled:/ s/enabled: true/enabled: false/' config.local.js
        
        echo -e "${GREEN}✅ Perplexity desactivado${NC}"
        echo ""
        echo -e "${CYAN}Trinity seguirá funcionando con:${NC}"
        echo -e "  🧠 Claude 3.5 Sonnet"
        echo -e "  ⚡ Gemini 2.0 Flash"
        echo -e "  🤖 OpenAI GPT-4"
        echo ""
        echo -e "${CYAN}Para aplicar cambios:${NC}"
        echo -e "  1. Detén el servidor (Ctrl+C)"
        echo -e "  2. Reinicia: ${YELLOW}python3 -m http.server 3000${NC}"
        echo -e "  3. Recarga la página en el navegador"
        ;;
        
    3)
        echo ""
        echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
        echo -e "${CYAN}  📋 CÓMO OBTENER API KEY DE PERPLEXITY${NC}"
        echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${YELLOW}1. Ve a:${NC} https://www.perplexity.ai/settings/api"
        echo ""
        echo -e "${YELLOW}2. Crea una cuenta si no tienes${NC}"
        echo ""
        echo -e "${YELLOW}3. Compra créditos de API:${NC}"
        echo "   • Mínimo: \$10 USD"
        echo "   • Esto te da ~10M tokens"
        echo "   • Costo: \$1 por 1M tokens"
        echo ""
        echo -e "${YELLOW}4. Genera API key${NC}"
        echo "   • Click en 'Generate API Key'"
        echo "   • Copia la key (empieza con pplx-...)"
        echo ""
        echo -e "${YELLOW}5. Ejecuta este script de nuevo:${NC}"
        echo "   ./update-perplexity.sh"
        echo "   Opción 1"
        echo ""
        ;;
        
    4)
        echo ""
        echo -e "${YELLOW}Cancelado${NC}"
        exit 0
        ;;
        
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✨ Listo!${NC}"
echo ""
