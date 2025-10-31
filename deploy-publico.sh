#!/bin/bash

# ═══════════════════════════════════════════════════════════════
#  AURUM WELLNESS - DEPLOYMENT PÚBLICO A VERCEL
# ═══════════════════════════════════════════════════════════════

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║     🚀 AURUM WELLNESS - DEPLOYMENT PÚBLICO 🚀                ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "index.html" ] || [ ! -f "vercel.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde el directorio aurum-wellness"
    exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📋 PASO 1: Verificar cambios"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
git status --short
echo ""

read -p "¿Continuar con el deployment? (S/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]] && [[ ! -z $REPLY ]]; then
    echo "❌ Deployment cancelado"
    exit 0
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📦 PASO 2: Commit de cambios"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git add .
git commit -m "feat: aumentar tamaños fuente para legibilidad adultos + preparar deployment público"

if [ $? -ne 0 ]; then
    echo "⚠️  No hay cambios para commitear o commit falló"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 PASO 3: Push a GitHub (Auto-deploy en Vercel)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  ✅ DEPLOYMENT INICIADO EN VERCEL"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🎉 Tu código fue enviado a GitHub"
    echo "⚡ Vercel detectará el cambio automáticamente"
    echo "⏱️  Tiempo estimado de deployment: 2-3 minutos"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  🔗 VERIFICAR DEPLOYMENT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Opción 1: Dashboard de Vercel"
    echo "  → https://vercel.com/dashboard"
    echo ""
    echo "Opción 2: Usando Vercel CLI"
    echo "  → vercel --prod"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  📱 COMPARTIR CON USUARIOS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Tu URL pública será algo como:"
    echo ""
    echo "  🔗 https://aurum-wellness.vercel.app"
    echo ""
    echo "✅ Acceso directo - SIN necesidad de cuenta Vercel"
    echo "✅ Funciona en desktop, mobile, tablet"
    echo "✅ Trinity System con Claude + Gemini + OpenAI"
    echo "✅ UI optimizada para adultos (fuentes grandes)"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  💡 PRÓXIMO PASO"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Espera 2-3 minutos y luego:"
    echo ""
    echo "1. Verifica que el deployment fue exitoso en Vercel dashboard"
    echo "2. Abre la URL pública en tu navegador"
    echo "3. Prueba con algunos usuarios"
    echo "4. Cuando estés listo para historial vitalicio:"
    echo "   → Di: 'ACTIVAR FIREBASE AUTH Y HISTORIAL'"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "✨ ¡Deployment público iniciado exitosamente! ✨"
    echo ""
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  ❌ ERROR EN DEPLOYMENT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "El push a GitHub falló. Posibles causas:"
    echo ""
    echo "1. No estás autenticado con GitHub"
    echo "   → Ejecuta: gh auth login"
    echo ""
    echo "2. No tienes permisos en el repositorio"
    echo "   → Verifica en: https://github.com/R936936/aurum-wellness"
    echo ""
    echo "3. Problemas de red"
    echo "   → Verifica tu conexión a internet"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    exit 1
fi
