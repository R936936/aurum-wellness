# 🚀 GUÍA DE PRUEBA RÁPIDA - AURUM WELLNESS

## ✅ SISTEMA DEPLOYADO Y LISTO

**URL Activa:** http://localhost:3000

---

## 🧪 PRUEBAS PASO A PASO

### 1️⃣ VERIFICAR CONSOLA DEL NAVEGADOR

**Acción:**
- Presiona `F12` (Windows) o `Cmd+Opt+I` (Mac)
- Ve a la pestaña "Console"

**Debes Ver:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 SuperWellnessAgent initialized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ OpenAI GPT-4: ACTIVO
   API Key: sk-proj-rGen6T...
   Model: gpt-4
   Temperature: 0.8
⚪ Gemini: Deshabilitado
🔄 Morpheus Local Fallback: ACTIVO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

✅ **PASS** si ves estos mensajes
❌ **FAIL** si hay errores rojos

---

### 2️⃣ PRUEBA BÁSICA - SALUDO

**En el terminal de Aurum, escribe:**
```
hola
```

**Respuesta Esperada:**
- Morpheus responde con mensaje cálido
- 2-3 párrafos de bienvenida
- Menciona programas Aurum Wellness
- Personalidad inspiradora tipo Matrix

**Ejemplo de respuesta correcta:**
> "Bienvenido, buscador de la verdad. Has encontrado Aurum Wellness, 
> donde la ciencia de la longevidad encuentra la sabiduría ancestral..."

✅ **PASS** si la respuesta es elaborada y personalizada
❌ **FAIL** si responde con 1 línea genérica

---

### 3️⃣ PRUEBA TÉCNICA - CONOCIMIENTO CIENTÍFICO

**Escribe:**
```
qué es la cetosis
```

**Respuesta Esperada:**
- Explicación científica detallada (3-5 párrafos)
- Menciona: cetonas, glucosa, metabolismo
- Información precisa sobre beneficios
- Tono profesional pero accesible

**Señales de éxito:**
- ✅ Más de 200 palabras
- ✅ Información técnica precisa
- ✅ Ejemplos prácticos
- ✅ Sin errores en consola

✅ **PASS** si respuesta es científica y completa
❌ **FAIL** si respuesta es corta o genérica

---

### 4️⃣ PRUEBA DE CONTEXTO - CONVERSACIÓN

**Escribe:**
```
cómo empiezo con ayuno intermitente
```

**Respuesta Esperada:**
- Plan práctico paso a paso
- Menciona diferentes protocolos (16/8, etc.)
- Consejos de implementación
- Mantiene personalidad Morpheus

✅ **PASS** si da plan accionable
❌ **FAIL** si es vago o genérico

---

### 5️⃣ PRUEBA DE MOTIVACIÓN

**Escribe:**
```
estoy desmotivado
```

**Respuesta Esperada:**
- Mensaje inspirador profundo
- Posible metáfora de Matrix
- Enfoque práctico y realista
- Empatía + acción

✅ **PASS** si la respuesta es profunda e inspiradora
❌ **FAIL** si es superficial

---

### 6️⃣ PRUEBA DE PROGRAMAS AURUM

**Escribe:**
```
cuéntame sobre los programas
```

**Respuesta Esperada:**
- Menciona los 4 programas principales:
  * 🌿 Detox & Renovación
  * ⚡ Energía Máxima
  * 🧘 Balance Mental
  * 💪 Regeneración Celular
- Breve descripción de cada uno
- Duración (30-90 días)

✅ **PASS** si menciona programas específicos
❌ **FAIL** si respuesta es genérica

---

### 7️⃣ PRUEBA DE ERROR HANDLING

**Escribe algo sin sentido:**
```
asdfghjkl
```

**Respuesta Esperada:**
- No debe crashear
- Respuesta cortés indicando que no entendió
- Ofrece ayuda o sugerencias
- Mantiene personalidad

✅ **PASS** si maneja el error elegantemente
❌ **FAIL** si muestra error técnico o crashea

---

## 🔧 HERRAMIENTA DE DIAGNÓSTICO

**URL:** http://localhost:3000/test-openai-api.html

**Qué hace:**
- Prueba directa de OpenAI API
- Muestra logs detallados
- Revela cualquier error de configuración

**Usar si:**
- Las respuestas no son inteligentes
- Hay errores en consola
- Sospechas problema con API key

---

## 📊 CHECKLIST DE ÉXITO

Marca cada prueba mientras la haces:

- [ ] Consola muestra "OpenAI GPT-4: ACTIVO"
- [ ] Prueba de saludo exitosa (respuesta elaborada)
- [ ] Prueba técnica exitosa (explicación científica)
- [ ] Prueba de contexto exitosa (plan práctico)
- [ ] Prueba de motivación exitosa (respuesta inspiradora)
- [ ] Prueba de programas exitosa (menciona los 4)
- [ ] Prueba de error handling exitosa (no crashea)

**Si 7/7 = ✅ SISTEMA PERFECTO**
**Si 5-6/7 = ⚠️ SISTEMA FUNCIONAL (ajustes menores)**
**Si <5/7 = ❌ REQUIERE DEBUG**

---

## 🚨 SI ALGO FALLA

### Problema: "No response from OpenAI"

**Solución:**
1. Verifica API key en `config.local.js` línea 16
2. Verifica que `enabled: true` en línea 20
3. Recarga navegador (Cmd+R / F5)

### Problema: Respuestas muy cortas (1-2 líneas)

**Causa:** Está usando Morpheus Local en vez de GPT-4

**Solución:**
1. Abre consola (F12)
2. Busca errores rojos
3. Usa herramienta de diagnóstico
4. Verifica API key válida

### Problema: Página no carga

**Solución:**
```bash
cd ~/Desktop/aurum-wellness
python3 -m http.server 3000
```

---

## 💡 COMANDOS ÚTILES

```bash
# Ver logs del servidor
ps aux | grep "python.*3000"

# Reiniciar servidor
lsof -ti:3000 | xargs kill -9
cd ~/Desktop/aurum-wellness && python3 -m http.server 3000

# Abrir en navegador
open http://localhost:3000
```

---

## 📞 SOPORTE RÁPIDO

**Consola JavaScript (F12):**
```javascript
// Ver configuración actual
window.AURUM_CONFIG

// Ver estadísticas del agente
window.SuperWellnessAgent.getStats()

// Probar manualmente
window.SuperWellnessAgent.process("hola")
```

---

## ✅ RESULTADO ESPERADO

Si todo funciona correctamente:

✅ Morpheus responde con inteligencia GPT-4
✅ Respuestas de 3-5 párrafos (no 1-2 líneas)
✅ Contenido científico preciso
✅ Personalidad auténtica de Matrix
✅ Sin errores en consola
✅ Historial conversacional funciona

---

> **"No pienses que funciona. Pruébalo y sábelo."** - Morpheus 💎

🎉 ¡DISFRUTA CONVERSANDO CON MORPHEUS! 🎉

