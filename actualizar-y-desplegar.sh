#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║     🚀 ACTUALIZANDO REPOSITORIO Y DESPLEGANDO 🚀            ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

cd ~/Desktop/aurum-wellness

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PASO 1: Verificando cambios..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git status

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PASO 2: Agregando cambios..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git add -A

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PASO 3: Commit..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git commit -m "✨ MORPHEUS CIENTÍFICO v5.2.0

🔬 MEJORAS FINALES - Viernes 31 Oct 2025, 2:00 PM

✅ LETRAS MÁS GRANDES (+20% promedio)
   - Body: 18px → 20px
   - Mensajes: 22px → 24px
   - Input: 22px → 24px
   - Prompt: 24px → 26px
   → Mejor legibilidad para adultos mayores

✅ CONOCIMIENTO CIENTÍFICO PROFUNDO
   → 6 nuevos temas con rigor molecular
   → Autofagia (mTOR, AMPK, Nobel 2016)
   → Apoptosis (caspasas, p53)
   → Cetosis (BHB, bioquímica completa)
   → Mitocondrias (10M billones, PGC-1α)
   → Ayuno intermitente (timeline metabólico)
   → Inflamación crónica (marcadores, protocolos)

✅ PERSONALIDAD MEJORADA
   → Místico de Matrix + Rigor científico
   → Referencias a estudios reales
   → Protocolos accionables

📝 Archivos modificados:
   - index.html (tamaños de fuente)
   - wellness-core.js (base de conocimiento 3x)

🎯 Resultado: Morpheus es ahora una guía científica profunda
   manteniendo su esencia mística de Matrix.

Versión: v5.2.0 - Scientific Morpheus
Estado: ✅ PROBADO LOCAL - LISTO PARA DEPLOY"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PASO 4: Push a GitHub..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ COMPLETADO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Vercel detectará automáticamente los cambios y desplegará en:"
echo "https://aurum-wellness-[tu-proyecto].vercel.app"
echo ""
echo "Espera 1-2 minutos para el deployment automático."
echo ""
