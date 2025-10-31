# 🔱 GUÍA DE IMPLEMENTACIÓN: SISTEMA TRINITY
## Versión 4.0.0 - Multi-IA de Poder Máximo

---

## 📋 TABLA DE CONTENIDOS
1. [Obtener API Keys](#obtener-api-keys)
2. [Configurar Trinity](#configurar-trinity)
3. [Verificar Instalación](#verificar-instalación)
4. [Pruebas y Testing](#pruebas-y-testing)
5. [Costos y Optimización](#costos-y-optimización)

---

## 🔑 PASO 1: OBTENER API KEYS

### 1️⃣ CLAUDE 3.5 SONNET (Anthropic) 🧠

**Por qué:** Razonamiento profundo, planes complejos de wellness

**Cómo obtener:**
1. Ve a: https://console.anthropic.com/
2. Crea cuenta o inicia sesión
3. Ve a "API Keys" en el menú
4. Click "Create Key"
5. Copia la key (empieza con `sk-ant-...`)

**Costo inicial:**
- $5 de créditos gratis al registrarte
- Luego: $3 por 1M tokens input, $15 por 1M tokens output

**Uso recomendado:**
- Planes de wellness personalizados
- Análisis profundos de progreso
- Explicaciones científicas complejas
- Diseño de estrategias nutricionales

---

### 2️⃣ PERPLEXITY AI 🔍

**Por qué:** Research científico en tiempo real con citations

**Cómo obtener:**
1. Ve a: https://www.perplexity.ai/
2. Click "Get API" o ve a https://www.perplexity.ai/settings/api
3. Crea cuenta
4. Compra créditos de API (mínimo $10)
5. Genera API key

**Costo:**
- Sin créditos gratis (mínimo $10)
- $1 por 1M tokens (muy económico)
- Modelo recomendado: `llama-3.1-sonar-large-128k-online`

**Uso recomendado:**
- "¿Qué estudios respaldan la autofagia?"
- "Últimas investigaciones sobre cetosis 2024"
- Validación de información científica
- Búsqueda de papers y evidencia

---

### 3️⃣ GEMINI 2.0 FLASH (Google) ⚡

**Por qué:** Velocidad ultra + multimodal + 75% más barato

**Cómo obtener:**
1. Ve a: https://aistudio.google.com/
2. Crea cuenta con tu Google Account
3. Click "Get API Key"
4. Copia la key (empieza con `AIza...`)

**Costo:**
- **GRATIS:** 15 requests/minuto, 1 millón requests/día
- Luego: $0.075 por 1M tokens input, $0.30 por 1M output
- **El más barato de todos**

**Uso recomendado:**
- Respuestas rápidas ("Hola", "Qué es...")
- Queries simples y frecuentes
- Conversación general
- Cache de respuestas comunes

---

### 4️⃣ OPENAI GPT-4 (Opcional - Backup) 🤖

**Nota:** Ya tienes una key pero fue expuesta, necesitas rotarla.

**Cómo rotar:**
1. Ve a: https://platform.openai.com/api-keys
2. REVOCA la key actual (`sk-proj-rGen6T...`)
3. Click "Create new secret key"
4. Dale un nombre descriptivo ("Aurum Wellness Trinity")
5. Copia la nueva key

**Costo:**
- $10 por 1M tokens input, $30 por 1M output
- Más caro que las otras opciones

**Uso recomendado:**
- Fallback cuando otras IAs fallen
- Conversación balanceada general
- **NO como primera opción (muy caro)**

---

## ⚙️ PASO 2: CONFIGURAR TRINITY

### Opción A: Configuración Rápida (Recomendada)

Voy a crear un script que configure automáticamente las keys:

```bash
cd ~/Desktop/aurum-wellness
./setup-trinity.sh
```

### Opción B: Configuración Manual

Edita el archivo `config.local.js`:

```bash
nano ~/Desktop/aurum-wellness/config.local.js
```

O abrirlo en VS Code:

```bash
code ~/Desktop/aurum-wellness/config.local.js
```

**Modifica estas líneas:**

```javascript
// CLAUDE 3.5 SONNET
claude: {
    apiKey: 'sk-ant-XXXXXXX', // ← Pega tu key aquí
    enabled: true,             // ← Cambia a true
    // ... resto igual
},

// PERPLEXITY AI
perplexity: {
    apiKey: 'pplx-XXXXXXX',   // ← Pega tu key aquí
    enabled: true,             // ← Cambia a true
    // ... resto igual
},

// GEMINI 2.0 FLASH
gemini: {
    apiKey: 'AIzaXXXXXXX',     // ← Pega tu key aquí
    enabled: true,             // ← Cambia a true
    // ... resto igual
},

// OPENAI GPT-4 (Opcional)
openai: {
    apiKey: 'sk-NUEVA-KEY',    // ← Key rotada
    enabled: true,             // ← Cambia a true si quieres usarlo
    // ... resto igual
}
```

---

## 🧪 PASO 3: VERIFICAR INSTALACIÓN

### Método 1: Consola del Navegador

1. Abre el proyecto:
```bash
cd ~/Desktop/aurum-wellness
python3 -m http.server 3000
```

2. Ve a: http://localhost:3000

3. Abre consola (Cmd+Option+J en Mac)

4. Verifica que veas:
```
🔱═══════════════════════════════════════════════════════════
   AURUM WELLNESS - TRINITY SYSTEM v4.0 LOADED
🔱═══════════════════════════════════════════════════════════

🧠 Claude 3.5 Sonnet: ✅ ACTIVO
🔍 Perplexity AI: ✅ ACTIVO
⚡ Gemini 2.0 Flash: ✅ ACTIVO
🤖 OpenAI GPT-4: ✅ ACTIVO
💎 Morpheus Local: ✅ ACTIVO

🔱 Trinity Router: ✅ ACTIVADO
   Estrategia: intelligent
```

### Método 2: Test de Diagnóstico

En la consola del navegador, ejecuta:

```javascript
// Verificar config
console.log(AURUM_CONFIG);

// Verificar que SuperWellnessAgent existe
console.log(window.SuperWellnessAgent);

// Ver estadísticas
SuperWellnessAgent.getStats();

// Test rápido
SuperWellnessAgent.process("hola").then(r => console.log(r));
```

### Método 3: Test Visual

Usa el chat en la interfaz y escribe:

```
hola
```

Deberías ver una respuesta inteligente. En la consola verás qué IA respondió:

```
🔱 Query: hola
   Routing: { ai: 'gemini', confidence: 3, reason: '...' }
⚡ Intentando Gemini 2.0 Flash...
✅ Response from: gemini
```

---

## 🎮 PASO 4: PRUEBAS Y TESTING

### Test 1: Claude (Razonamiento Profundo)

Pregunta en el chat:
```
Diseña un plan de 7 días para entrar en cetosis
```

Debería usar **Claude** y generar un plan detallado con:
- Timeline día por día
- Macros específicos
- Lista de alimentos
- Advertencias importantes

Verifica en consola: `🧠 Intentando Claude 3.5 Sonnet...`

---

### Test 2: Perplexity (Research Científico)

Pregunta:
```
Qué estudios científicos respaldan los beneficios de la autofagia
```

Debería usar **Perplexity** y mostrar:
- Respuesta con datos científicos
- Citations con links a estudios
- Información actualizada 2024-2025

Verifica en consola: `🔍 Intentando Perplexity AI...`

---

### Test 3: Gemini (Respuesta Rápida)

Pregunta:
```
Qué es la cetosis
```

Debería usar **Gemini** (ultra rápido) y dar definición concisa.

Verifica en consola: `⚡ Intentando Gemini 2.0 Flash...`

---

### Test 4: Fallback en Cascada

1. Desactiva temporalmente Claude en `config.local.js`:
```javascript
claude: {
    enabled: false,  // ← Desactivado temporalmente
```

2. Recarga la página

3. Pregunta algo complejo (debería ir a la siguiente IA disponible):
```
Explica el proceso bioquímico de la cetosis
```

4. Verifica en consola el fallback:
```
⚠️ claude seleccionada pero no está habilitada, usando fallback
✅ Fallback success: gemini
```

---

## 💰 PASO 5: COSTOS Y OPTIMIZACIÓN

### Comparación de Costos

| Servicio | Input | Output | Tier Gratis |
|----------|-------|--------|-------------|
| **Gemini Flash** | $0.075/1M | $0.30/1M | ✅ 15 RPM gratis |
| **Perplexity** | $1/1M | $1/1M | ❌ Mínimo $10 |
| **Claude 3.5** | $3/1M | $15/1M | ✅ $5 inicial |
| **GPT-4 Turbo** | $10/1M | $30/1M | ❌ Pay as you go |

### Estrategia de Ahorro Recomendada

**Configuración Óptima:**
```javascript
trinity: {
    fallbackChain: [
        'gemini',      // 1st: Más barato (casi gratis)
        'claude',      // 2nd: Razonamiento cuando necesario
        'perplexity',  // 3rd: Research cuando necesario
        'openai',      // 4th: Backup confiable
        'morpheus_local' // 5th: Fallback offline
    ]
}
```

**Resultado:**
- 70% de queries → Gemini (casi $0)
- 20% de queries → Claude ($3-15/1M)
- 5% de queries → Perplexity ($1/1M)
- 5% de queries → GPT-4 ($10-30/1M)

**Ahorro estimado:** ~75-80% vs usar solo GPT-4

### Estimación de Uso Mensual

**Escenario: 1,000 conversaciones/mes**
- Promedio: 200 tokens/query, 500 tokens/response
- Total: 700k tokens/mes

**Costos por Servicio:**

Con Trinity optimizado:
- Gemini (70%): 490k tokens × $0.075/1M = **$0.04**
- Claude (20%): 140k tokens × $3/1M = **$0.42**
- Perplexity (5%): 35k tokens × $1/1M = **$0.04**
- GPT-4 (5%): 35k tokens × $10/1M = **$0.35**

**Total: ~$0.85/mes** para 1,000 conversaciones 🎉

Solo GPT-4:
- 700k tokens × $10/1M = **$7.00/mes**

**Ahorro: 88%** 💰

---

## 🎯 DECISIÓN: ¿QUÉ IAs ACTIVAR?

### Opción 1: Trinity Completo (Recomendado) ⭐⭐⭐⭐⭐

**Activar:** Claude + Gemini + Perplexity

**Pros:**
- Máximo poder de IA
- Costos ultra optimizados
- Cada IA hace lo que mejor sabe

**Cons:**
- Necesitas 3 API keys
- Un poco más complejo de configurar

**Costo mensual:** ~$1-3 para uso normal

---

### Opción 2: Dual Power (Más Simple) ⭐⭐⭐⭐

**Activar:** Claude + Gemini

**Pros:**
- Solo 2 API keys necesarias
- Gemini gratis para queries rápidos
- Claude para análisis profundos
- Configuración simple

**Cons:**
- Sin research en tiempo real
- Sin validación científica automática

**Costo mensual:** ~$0.50-2 para uso normal

---

### Opción 3: Quick Win (Lo Más Rápido) ⭐⭐⭐

**Activar:** Solo Gemini

**Pros:**
- 1 sola API key
- **Completamente GRATIS** (tier gratis generoso)
- Setup en 2 minutos
- Ya es 2x más rápido que GPT-4

**Cons:**
- No hay razonamiento profundo de Claude
- No hay research de Perplexity

**Costo mensual:** $0 🎉

---

## 🚀 IMPLEMENTACIÓN PASO A PASO

### Para Trinity Completo (Opción 1)

```bash
# 1. Obtener las 3 API keys (ver arriba)
# 2. Ir al directorio
cd ~/Desktop/aurum-wellness

# 3. Editar config
nano config.local.js

# 4. Pegar las 3 keys y activar (enabled: true)

# 5. Verificar
python3 -m http.server 3000

# 6. Abrir http://localhost:3000

# 7. Verificar consola (Cmd+Opt+J)

# 8. Probar con "hola"
```

---

## 🆘 TROUBLESHOOTING

### Problema 1: "TrinityRouter no disponible"

**Solución:**
```bash
# Verificar que los archivos existan
ls -la ~/Desktop/aurum-wellness/trinity-router.js
ls -la ~/Desktop/aurum-wellness/super-wellness-agent-trinity.js

# Si no existen, te los genero
```

### Problema 2: "API Key inválida"

**Solución:**
- Verifica que copiaste la key completa (sin espacios)
- Verifica que la key no haya expirado
- Verifica que tengas créditos disponibles

### Problema 3: "CORS error"

**Solución:**
- Usa un servidor local (no abrir HTML directamente)
```bash
cd ~/Desktop/aurum-wellness
python3 -m http.server 3000
```

### Problema 4: "Respuestas muy lentas"

**Solución:**
- Verifica tu conexión a internet
- Usa Gemini para queries simples (mucho más rápido)
- Ajusta `timeout` en config.local.js

---

## 📊 MONITOREO Y ESTADÍSTICAS

### Ver Uso de Cada IA

En consola del navegador:

```javascript
// Ver estadísticas actuales
SuperWellnessAgent.getStats()

// Output ejemplo:
{
  raw: { claude: 5, perplexity: 2, gemini: 15, openai: 1, morpheus: 0 },
  percentages: { 
    claude: '21.7%', 
    perplexity: '8.7%', 
    gemini: '65.2%',
    openai: '4.3%',
    morpheus: '0%'
  },
  total: 23
}

// Reset stats
SuperWellnessAgent.resetStats()
```

---

## 🎓 MEJORES PRÁCTICAS

### 1. Priorizar Gemini para queries simples
✅ "Hola", "Gracias", "Qué es X"
❌ No usar Claude/Perplexity para estos

### 2. Usar Claude para planes complejos
✅ "Diseña plan de 30 días"
✅ "Analiza mi progreso"
❌ No usar para "Hola"

### 3. Usar Perplexity para research
✅ "Qué estudios recientes..."
✅ "Evidencia científica sobre..."
❌ No usar para conversación casual

### 4. Mantener historial corto
- Trinity mantiene últimas 20 entradas
- Suficiente para contexto
- No consume tokens innecesarios

### 5. Monitorear costos
```javascript
// Cada semana, revisar uso
SuperWellnessAgent.getStats()
```

---

## 📝 SIGUIENTE PASO

**¿Qué quieres hacer ahora?**

1. **Obtener API Keys** - Te guío paso a paso
2. **Configurar Trinity Completo** - Las 3 IAs
3. **Quick Win con Gemini** - Solo 1 API key, gratis
4. **Testing Completo** - Verificar que todo funciona

**Dime qué prefieres y continúo con la implementación.** 🚀

---

## 💎 RESUMEN EJECUTIVO

### Trinity vs Solo GPT-4

| Aspecto | Trinity | Solo GPT-4 |
|---------|---------|------------|
| **Costo** | ~$1/mes | ~$7/mes |
| **Velocidad** | 2x más rápido | Base |
| **Capacidades** | 4 IAs especializadas | 1 IA general |
| **Research** | ✅ Perplexity | ❌ No |
| **Contexto** | 200k (Claude) | 128k |
| **Ahorro** | 88% | 0% |

### Recomendación Final

**Para ti, recomiendo: Trinity Completo (Opción 1)**

**Por qué:**
1. ✅ Máximo poder de IA para Aurum Wellness
2. ✅ Costos ultra optimizados (~$1-3/mes)
3. ✅ Cada IA especializada en su función
4. ✅ Research científico en tiempo real
5. ✅ Gemini casi gratis para queries rápidas
6. ✅ Claude para planes complejos

**Setup time:** 15-20 minutos
**ROI:** Inmediato (88% ahorro vs GPT-4)

---

**¿Empezamos?** 🔱✨
