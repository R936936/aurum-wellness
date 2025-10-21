# ✅ CHECKLIST - PRUEBA MORPHEUS AHORA

**Tiempo estimado:** 5 minutos  
**Dificultad:** Fácil  
**Estado servidor:** 🟢 ACTIVO en puerto 3000

---

## 📋 PASO A PASO

### ☑️ PASO 1: Recargar Navegador (30 segundos)

1. **Ir a la pestaña** con http://localhost:3000
2. **Presionar:** `Cmd+R` (Mac) o `Ctrl+R` (Windows)
3. **Esperar:** Que cargue completamente (2-3 segundos)

**Señal de éxito:** La página se recarga y ves la terminal Matrix

---

### ☑️ PASO 2: Abrir Consola del Navegador (10 segundos)

1. **Presionar:** `F12` o `Cmd+Option+I` (Mac)
2. **Ir al tab:** "Console"
3. **Buscar mensajes** en verde

**Señal de éxito:** Ves estos mensajes:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 SuperWellnessAgent initialized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ OpenAI GPT-4: ACTIVO
✅ SuperWellnessAgent ready
```

**Si NO los ves:**
- ❌ Hay errores rojos → Ir a PASO 5 (Diagnóstico)

---

### ☑️ PASO 3: Escribir en Terminal (20 segundos)

1. **Click** en el campo de texto de la terminal (centro)
2. **Escribir:** `hola`
3. **Presionar:** `Enter`
4. **Esperar:** 2-5 segundos

**Señal de éxito:** Morpheus responde con:
- ✅ Saludo personalizado
- ✅ 2-5 párrafos de texto
- ✅ Efecto typewriter (se escribe letra por letra)
- ✅ Mención de Aurum Wellness

**Si NO funciona:**
- ❌ No responde → Verificar consola
- ❌ Error "problema técnico" → Ir a PASO 5

---

### ☑️ PASO 4: Hacer Pregunta Real (1 minuto)

1. **Escribir:** `¿qué es la cetosis?`
2. **Presionar:** `Enter`
3. **Esperar:** 3-5 segundos (GPT-4 es más lento)

**Señal de éxito:**
- ✅ Respuesta de 3-5 párrafos
- ✅ Contenido científico (cetonas, metabolismo, BHB)
- ✅ Explicación detallada
- ✅ Consejo práctico al final

**Comparar con Fallback Local:**
- ❌ Si responde en < 1 segundo → Está usando fallback
- ❌ Si respuesta es muy corta → Está usando fallback
- ⚠️ Esto indica que OpenAI no está conectado

---

### ☑️ PASO 5: Diagnóstico Completo (2 minutos)

**Si algo no funciona, usar herramienta de diagnóstico:**

1. **Abrir nueva pestaña**
2. **Ir a:** http://localhost:3000/test-connection.html
3. **Hacer click en cada botón:**
   - 1️⃣ Test Config
   - 2️⃣ Test WellnessCore
   - 3️⃣ Test SuperWellnessAgent
   - 4️⃣ Test OpenAI Connection
   - 5️⃣ Test Query Completa

**Interpretar resultados:**

- ✅ **TODO VERDE:** Sistema funciona perfectamente
- ⚠️ **Test 4 ROJO (OpenAI):** Problema con API key
  - Error 401 → API key inválida o revocada
  - Error 429 → Rate limit excedido
  - Network error → Sin internet
- ❌ **Test 3 ROJO (SuperWellnessAgent):** No se cargó el script
  - Verificar que index.html tiene `super-wellness-agent.js`
  - Recargar navegador con caché limpio (Cmd+Shift+R)

---

## 🎯 RESULTADOS ESPERADOS

### ✅ ÉXITO TOTAL

Si todo funciona bien, deberías ver:

**En Consola:**
```
✅ OpenAI API configured and enabled
🤖 SuperWellnessAgent initialized
✅ OpenAI GPT-4: ACTIVO
   API Key: sk-proj-xxxxx...
   Model: gpt-4
   Temperature: 0.5
🔄 Morpheus Local Fallback: ACTIVO
✅ SuperWellnessAgent ready
```

**En Terminal:**
- Morpheus responde a "hola" con saludo personalizado
- Morpheus responde a "¿qué es la cetosis?" con explicación científica
- Efectos visuales funcionan (typewriter)
- Sin mensajes de error

**En test-connection.html:**
- Todos los tests en verde ✅
- "Test Query Completa" devuelve respuesta coherente

---

## ❌ PROBLEMAS COMUNES

### Problema 1: "SuperWellnessAgent is not defined"

**Causa:** El script no se cargó

**Solución:**
1. Verificar que existe `super-wellness-agent.js` en el directorio
2. Abrir Network tab (F12 → Network)
3. Recargar página (Cmd+R)
4. Buscar `super-wellness-agent.js` en la lista
5. Verificar que tiene status 200 (no 404)

---

### Problema 2: "tuve un problema técnico"

**Causa:** Error en API de OpenAI

**Solución:**
1. Abrir test-connection.html
2. Click "Test OpenAI Connection"
3. Leer el error específico:
   - **401 Unauthorized:** API key incorrecta
     → Verificar config.local.js línea 12
   - **429 Rate Limit:** Demasiadas requests
     → Esperar 1 minuto
   - **Network Error:** Sin internet
     → Verificar conexión

---

### Problema 3: Respuestas muy cortas

**Causa:** Está usando Morpheus Local (fallback)

**Verificar:**
1. Consola debe decir "✅ OpenAI GPT-4: ACTIVO"
2. Si dice "⚪ OpenAI: Deshabilitado"
   → Editar config.local.js línea 16: `enabled: true`
3. Si dice "⚠️ OpenAI HABILITADO pero SIN API KEY"
   → Editar config.local.js línea 12: pegar API key

---

### Problema 4: No responde nada

**Causa:** JavaScript error

**Solución:**
1. Abrir consola (F12)
2. Buscar mensajes en ROJO
3. Leer el error
4. Opciones:
   - **TypeError:** Falta un objeto → Recargar página
   - **Network error:** Revisar servidor → `ps aux | grep python`
   - **Syntax error:** Archivo corrupto → Verificar index.html

---

## 🔄 PRÓXIMOS PASOS

### Después de Verificar que Funciona:

**CRÍTICO - Hacer HOY:**
- [ ] ✅ Verificar que Morpheus responde
- [ ] 🚨 **ROTAR API KEY** de OpenAI (expuesta)
  - https://platform.openai.com/api-keys
  - Eliminar key actual
  - Crear nueva
  - Actualizar config.local.js línea 12

**TESTING - Hacer HOY:**
- [ ] Probar 10 preguntas variadas
- [ ] Documentar calidad de respuestas
- [ ] Verificar historial conversacional
- [ ] Probar diferentes tipos de consultas

**MEJORAS - Considerar MAÑANA:**
- [ ] Optimizar prompts del sistema
- [ ] Agregar más IAs (Claude, Gemini)
- [ ] Configurar rate limiting
- [ ] Deploy a producción (Vercel)

---

## 📞 RECURSOS

**URLs:**
- App Principal: http://localhost:3000
- Test Diagnóstico: http://localhost:3000/test-connection.html
- OpenAI Platform: https://platform.openai.com/api-keys

**Documentación:**
- CONEXION_SUPER_AGENT_COMPLETADA.md (detalles técnicos)
- ESTADO_ACTUAL_Y_PROXIMOS_PASOS.md (roadmap)

**Comandos Útiles:**
```bash
# Verificar servidor
ps aux | grep python

# Reiniciar servidor
cd ~/Desktop/aurum-wellness
python3 -m http.server 3000

# Editar config
nano config.local.js
```

---

## ✨ SEÑALES DE ÉXITO ABSOLUTO

Sabrás que TODO funciona perfectamente cuando:

✅ **Consola:**
- "✅ OpenAI GPT-4: ACTIVO"
- "✅ SuperWellnessAgent ready"
- Sin errores rojos

✅ **Terminal:**
- Morpheus responde en 2-5 segundos
- Respuestas de 3-5 párrafos
- Contenido científico y contextual
- Efectos typewriter funcionan

✅ **Test:**
- Todos los tests en verde
- "Test OpenAI Connection" devuelve "Conexión exitosa"
- "Test Query Completa" responde coherentemente

✅ **Experiencia:**
- Conversación fluida
- Morpheus mantiene contexto
- Respuestas útiles y motivadoras
- Sin lags ni errores

---

> "Recuerda, todo lo que ofrezco es la verdad. Nada más." - Morpheus 💎

**Estado:** ✅ LISTO PARA PRUEBA  
**Servidor:** 🟢 ACTIVO (puerto 3000)  
**Siguiente:** RECARGAR NAVEGADOR (Cmd+R)

---

**Última actualización:** 21 Oct 2025 - Copilot Session
