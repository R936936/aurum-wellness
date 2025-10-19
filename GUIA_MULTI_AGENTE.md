# 🤖 GUÍA: SUPER WELLNESS AGENT - MULTI-IA FUSIONADO

## 📋 ÍNDICE
1. [Arquitectura](#arquitectura)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Prueba Local](#prueba-local)
5. [Despliegue](#despliegue)
6. [Testing](#testing)

---

## 🏗️ ARQUITECTURA

### Sistema de 3 Capas con Fallback

```
┌─────────────────────────────────────────────────────┐
│              USUARIO (Query)                        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│         SuperWellnessAgent.process(query)           │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │   Prioridad 1:      │
        │   OpenAI GPT-4      │◄─── Si API key disponible
        └──────────┬──────────┘
                   │ (si falla o no disponible)
                   ▼
        ┌──────────┴──────────┐
        │   Prioridad 2:      │
        │   Morpheus Local    │◄─── Sistema local robusto
        └──────────┬──────────┘
                   │ (si falla)
                   ▼
        ┌──────────┴──────────┐
        │   Prioridad 3:      │
        │   Respuestas Básicas│◄─── Siempre disponible
        └──────────┬──────────┘
                   │
                   ▼
          ┌────────────────┐
          │   RESPUESTA    │
          └────────────────┘
```

### Archivos del Sistema

```
aurum-wellness/
├── index.html                  # Interfaz principal
├── config.js                   # Configuración (NO commitear)
├── config.example.js           # Ejemplo de configuración
├── wellness-core.js            # Morpheus base
├── super-wellness-agent.js     # ⭐ NUEVO: Multi-agente
└── wellness-ui.js              # UI components
```

---

## 🚀 INSTALACIÓN

### 1. Archivos Creados

✅ `config.example.js` - Template de configuración
✅ `config.js` - Tu configuración local (NO se commitea)
✅ `super-wellness-agent.js` - Cerebro del multi-agente

### 2. Modificación Necesaria en index.html

Necesitamos cambiar UNA línea en `index.html`:

**ANTES:**
```javascript
async function processQuery(query) {
    const response = await window.WellnessCore.morpheus.generateResponse(query);
    appendToTerminal(response, false, 500);
}
```

**DESPUÉS:**
```javascript
async function processQuery(query) {
    const response = await window.SuperWellnessAgent.process(query);
    appendToTerminal(response, false, 500);
}
```

### 3. Cargar Scripts en Orden

En `index.html`, agregar ANTES de wellness-ui.js:

```html
<!-- Configuración -->
<script src="config.js"></script>

<!-- Core Systems -->
<script src="wellness-core.js"></script>

<!-- ⭐ NUEVO: Super Wellness Agent -->
<script src="super-wellness-agent.js"></script>

<!-- UI -->
<script src="wellness-ui.js"></script>
```

---

## ⚙️ CONFIGURACIÓN

### Opción A: Sin OpenAI (Solo Local)

En `config.js`:
```javascript
const AURUM_CONFIG = {
    openai: {
        apiKey: '',
        enabled: false  // ◄── Mantener en false
    },
    morpheus: {
        fallbackEnabled: true  // ◄── Siempre true
    }
};
```

### Opción B: Con OpenAI GPT-4

1. Obtén tu API key de: https://platform.openai.com/api-keys

2. En `config.js`:
```javascript
const AURUM_CONFIG = {
    openai: {
        apiKey: 'sk-proj-...TU_API_KEY_AQUI...',  // ◄── Tu key aquí
        model: 'gpt-4',
        maxTokens: 500,
        temperature: 0.7,
        enabled: true  // ◄── Cambiar a true
    },
    morpheus: {
        systemPrompt: `Eres Morpheus...`,
        fallbackEnabled: true
    },
    system: {
        debugMode: true,  // ◄── true para ver logs
        logResponses: true
    }
};
```

---

## 🧪 PRUEBA LOCAL (ANTES DE DESPLEGAR)

### 1. Iniciar Servidor Local

```bash
cd /Users/wu/Desktop/aurum-wellness
python3 -m http.server 8000
```

### 2. Abrir en Navegador

```
http://localhost:8000
```

### 3. Abrir Consola del Navegador

Presiona: `Cmd + Opt + J` (Mac) o `Ctrl + Shift + J` (Windows)

### 4. Verificar Inicialización

Deberías ver en la consola:

```
✅ WellnessCore initialized
🤖 SuperWellnessAgent initialized
📡 OpenAI enabled: false (o true)
🔄 Fallback enabled: true
✅ SuperWellnessAgent ready
```

### 5. Probar Morpheus

En el terminal de Aurum, escribe:

```
> hola
```

**Verifica en la consola:**
- Si OpenAI enabled = true: Verás "✅ OpenAI response received"
- Si OpenAI enabled = false: Verás "✅ Morpheus local response"

### 6. Test de Fallback

Si OpenAI está habilitado, puedes forzar el fallback:
- Pon API key incorrecta
- Morpheus local debería responder automáticamente

---

## 🎯 TESTING COMPLETO

### Test 1: Sin OpenAI (Solo Local)
```javascript
// En config.js
openai.enabled = false
```
**Resultado esperado:** Morpheus local responde instantáneamente

### Test 2: Con OpenAI
```javascript
// En config.js
openai.enabled = true
openai.apiKey = 'tu-key-real'
```
**Resultado esperado:** GPT-4 responde con personalidad Morpheus

### Test 3: Fallback Robusto
```javascript
// En config.js
openai.enabled = true
openai.apiKey = 'key-incorrecta'
```
**Resultado esperado:** Falla OpenAI → Morpheus local responde

### Test 4: Conversación Contextual
```
> hola
> cuéntame sobre cetosis
> ¿y cómo empiezo?
```
**Resultado esperado:** OpenAI mantiene contexto de conversación

---

## 📊 VERIFICACIÓN DE STATS

En la consola del navegador:

```javascript
// Ver estadísticas
window.SuperWellnessAgent.getStats()

// Output esperado:
{
    openaiEnabled: true/false,
    morpheusAvailable: true,
    conversationLength: 4,
    debugMode: true
}
```

---

## 🚀 DESPLIEGUE (SOLO DESPUÉS DE CONFIRMAR LOCAL)

### IMPORTANTE: ⚠️
**NO COMMITEAR `config.js` con tu API key al repo**

### Pasos de Despliegue:

1. **Commitear solo archivos necesarios:**
```bash
git add index.html super-wellness-agent.js config.example.js
git commit -m "✨ Add: SuperWellnessAgent multi-IA integration"
git push origin main
```

2. **Configurar Variable de Entorno en Vercel:**
   - Ve a: https://vercel.com/tu-proyecto/settings/environment-variables
   - Agrega: `OPENAI_API_KEY` = tu-api-key
   - Scope: Production

3. **Desplegar:**
```bash
vercel --prod
```

---

## 🔍 DEBUGGING

### Problema: SuperWellnessAgent no se inicializa

**Solución:**
```javascript
// Verificar en consola
console.log(window.WellnessCore);  // Debe existir
console.log(window.SuperWellnessAgent);  // Debe existir
```

### Problema: OpenAI no responde

**Solución:**
```javascript
// Verificar configuración
console.log(window.AURUM_CONFIG.openai.enabled);  // true
console.log(window.AURUM_CONFIG.openai.apiKey);  // 'sk-...'
```

### Problema: Morpheus local no funciona

**Solución:**
```javascript
// Verificar Morpheus
console.log(window.WellnessCore.morpheus);  // Debe existir
window.WellnessCore.morpheus.generateResponse('hola');  // Test directo
```

---

## ✅ CHECKLIST PRE-DESPLIEGUE

- [ ] Super-wellness-agent.js creado
- [ ] config.js configurado (sin commitear)
- [ ] index.html modificado (usar SuperWellnessAgent)
- [ ] Scripts cargados en orden correcto
- [ ] Probado localmente sin OpenAI (funciona)
- [ ] Probado localmente con OpenAI (si aplica)
- [ ] Fallback verificado (funciona)
- [ ] Logs en consola correctos
- [ ] .gitignore incluye config.js
- [ ] README actualizado

---

## 🎬 PRÓXIMOS PASOS

1. **TÚ revisas** este documento
2. **YO modifico** index.html según aprobación
3. **TÚ pruebas** localmente
4. **YO despliego** solo con tu OK

---

**¿Listo para modificar index.html y probar localmente?**
