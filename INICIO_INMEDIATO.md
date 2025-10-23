# 🚀 INICIO INMEDIATO - AURUM WELLNESS

## ✅ SISTEMA DESPLEGADO

El servidor está corriendo en: **http://localhost:3000**

---

## 🎯 PROBAR AHORA - 3 PASOS

### PASO 1: Abrir Consola del Navegador
- Presiona **F12** (Windows) o **Cmd+Opt+I** (Mac)
- Ve a la pestaña **"Console"**

### PASO 2: Buscar Estos Mensajes
```
✅ "🤖 SuperWellnessAgent initialized"
✅ "✅ OpenAI GPT-4: ACTIVO"
✅ "🔄 Morpheus Local Fallback: ACTIVO"
```

### PASO 3: Escribir en el Terminal
En el cuadro de texto negro (terminal de Aurum):
```
hola
```

Presiona **ENTER** y espera la respuesta de Morpheus.

---

## ❓ ¿QUÉ DEBERÍAS VER?

### ✅ RESPUESTA CORRECTA (GPT-4 funcionando):
- **Longitud:** 3-5 párrafos
- **Contenido:** Personalizado, cálido, menciona Aurum Wellness
- **Estilo:** Inspirador tipo Matrix pero científico
- **Ejemplo:**
  > "Bienvenido, buscador de la verdad. Has encontrado Aurum Wellness, 
  > donde la ciencia de la longevidad se encuentra con la sabiduría 
  > ancestral. Aquí no ofrecemos píldoras azules de falsas promesas, 
  > sino el conocimiento que transforma..."

### ⚠️ RESPUESTA INCORRECTA (Morpheus Local - corta):
- **Longitud:** 1-2 líneas
- **Contenido:** Genérico
- **Ejemplo:**
  > "Hola, soy Morpheus, tu guía en Aurum Wellness. ¿En qué puedo ayudarte?"

---

## 🔍 SI NO FUNCIONA BIEN

### Debug Paso a Paso:

1. **Abrir consola (F12) y buscar errores rojos**
   - Si ves errores, cópialos

2. **Verificar configuración en consola:**
   ```javascript
   window.AURUM_CONFIG
   ```
   Deberías ver:
   - `openai.enabled: true`
   - `openai.apiKey: "sk-proj-..."`

3. **Verificar SuperWellnessAgent:**
   ```javascript
   window.SuperWellnessAgent
   ```
   Debe existir y tener método `process`

4. **Prueba manual:**
   ```javascript
   window.SuperWellnessAgent.process("hola").then(r => console.log(r))
   ```

---

## 🛠️ HERRAMIENTAS DE DIAGNÓSTICO

| URL | Propósito |
|-----|-----------|
| http://localhost:3000 | Aplicación principal |
| http://localhost:3000/test-debug.html | Debug automático |
| http://localhost:3000/test-openai-api.html | Test de OpenAI directo |

---

## 📊 PREGUNTAS DE PRUEBA

Prueba estas preguntas en orden:

1. **`hola`** - Debe responder cálidamente
2. **`qué es la cetosis`** - Explicación científica detallada
3. **`cómo empiezo con ayuno`** - Plan práctico
4. **`estoy desmotivado`** - Mensaje inspirador
5. **`cuéntame sobre los programas`** - Info de los 4 programas

---

## ⚠️ PROBLEMAS COMUNES

### Problema 1: Respuestas muy cortas
**Causa:** Está usando Morpheus Local en vez de GPT-4
**Solución:** 
1. Verificar API key en config.local.js
2. Verificar que enabled: true
3. Verificar errores en consola

### Problema 2: "Error calling OpenAI API"
**Causa:** API key inválida o expirada
**Solución:**
1. Ir a: https://platform.openai.com/api-keys
2. Crear nueva key
3. Editar config.local.js línea 16
4. Recargar navegador

### Problema 3: No responde nada
**Causa:** JavaScript error o carga fallida
**Solución:**
1. Abrir consola (F12)
2. Buscar errores rojos
3. Verificar que todos los scripts se cargaron
4. Recargar página (Cmd+R / F5)

---

## 🎯 CHECKLIST DE ÉXITO

- [ ] Servidor corriendo en puerto 3000
- [ ] Navegador abierto en http://localhost:3000
- [ ] Consola muestra "OpenAI GPT-4: ACTIVO"
- [ ] Respuesta a "hola" es larga (3+ párrafos)
- [ ] Respuestas son únicas y contextuales
- [ ] Sin errores rojos en consola

Si todos los checks ✅: **¡FUNCIONA PERFECTAMENTE!**

---

## 💡 COMANDOS RÁPIDOS

```bash
# Ver si el servidor está corriendo
ps aux | grep "python.*3000"

# Reiniciar servidor
lsof -ti:3000 | xargs kill -9
cd ~/Desktop/aurum-wellness && python3 -m http.server 3000

# Abrir en navegador
open http://localhost:3000
```

---

> 💎 "No pienses que funciona. Pruébalo y sábelo." - Morpheus 💎

**PRUEBA AHORA:** http://localhost:3000

---

