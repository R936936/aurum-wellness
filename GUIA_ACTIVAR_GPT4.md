# 🤖 ACTIVAR MORPHEUS CON GPT-4 - GUÍA COMPLETA

## 🎯 OBJETIVO

Activar el chat de Morpheus con **GPT-4 REAL** para conversaciones inteligentes y contextuales.

---

## ⚡ INICIO RÁPIDO (3 MINUTOS)

### Opción 1: Script Automatizado (RECOMENDADO)

```bash
cd ~/Desktop/aurum-wellness
./ACTIVAR_MORPHEUS.sh
```

El script te guiará paso a paso:
1. Configurar API key
2. Seleccionar modelo (gpt-4o-mini recomendado)
3. Desplegar automáticamente

---

## 📋 PASO A PASO MANUAL

### 1. Obtener API Key de OpenAI

```bash
# Abrir página de API keys
open https://platform.openai.com/api-keys

# Pasos:
# 1. Inicia sesión o crea cuenta
# 2. Clic en "Create new secret key"
# 3. Copia la key (sk-proj-...)
```

**Crédito gratis:** $5 USD en cuentas nuevas = ~12,500 mensajes

### 2. Configurar en config.js

```bash
cd ~/Desktop/aurum-wellness

# Editar config.js
nano config.js

# Cambiar estas líneas:
# Línea 10: apiKey: 'sk-tu-key-aqui'
# Línea 11: model: 'gpt-4o-mini'  # o 'gpt-4', 'gpt-3.5-turbo'
# Línea 15: enabled: true

# Guardar: Ctrl+O, Enter, Ctrl+X
```

### 3. Desplegar a Producción

```bash
vercel --prod
```

Espera ~30 segundos y ¡listo! 🎉

---

## 🤖 MODELOS DISPONIBLES

| Modelo | Costo/Mensaje | Velocidad | Calidad | Recomendado |
|--------|---------------|-----------|---------|-------------|
| **gpt-4o-mini** | $0.0004 | Rápida | Excelente | ✅ SÍ |
| gpt-3.5-turbo | $0.0002 | Muy rápida | Buena | Para bajo presupuesto |
| gpt-4 | $0.003 | Media | Premium | Solo si necesitas lo mejor |

### Recomendación: gpt-4o-mini

**Por qué:**
- Excelente balance calidad/precio
- Suficientemente inteligente para Morpheus
- Velocidad rápida
- Costos ultra bajos

**Costos estimados:**
- 10 conversaciones/día = $0.04/día = $1.20/mes
- 50 conversaciones/día = $0.20/día = $6/mes
- 100 conversaciones/día = $0.40/día = $12/mes

---

## 💬 DIFERENCIA: CON vs SIN GPT-4

### Sin GPT-4 (Actual - Modo Fallback):

```
👤 Usuario: "¿Qué es el detox cuántico?"

🤖 Morpheus: [Respuesta predefinida]
"El Detox Cuántico es una limpieza celular profunda
que activa la autofagia. 7 días de transformación. 🌟"

👤 Usuario: "¿Cómo empiezo?"

🤖 Morpheus: [Otra respuesta predefinida]
"Elige el programa Detox en el menú principal..."
```

**Características:**
- ✅ Respuestas instantáneas
- ✅ Sin costos
- ✅ Funciona offline
- ⚠️ No recuerda contexto
- ⚠️ Respuestas limitadas a temas predefinidos

### Con GPT-4 Activado:

```
👤 Usuario: "¿Qué es el detox cuántico?"

🤖 GPT-4: "El Detox Cuántico trabaja a nivel mitocondrial,
activando la autofagia para eliminar células dañadas
y toxinas acumuladas. Es como resetear tu sistema 
operativo celular. ¿Tienes alguna condición especial
que deba considerar?"

👤 Usuario: "Sí, tengo diabetes tipo 2"

🤖 GPT-4: "Excelente que lo menciones. Para diabetes tipo 2,
el Detox debe adaptarse: ayuno más gradual, monitoreo
de glucosa más frecuente, y ajustar macros específicamente
para tu sensibilidad a insulina. ¿Ya llevas seguimiento
con endocrinólogo?"
```

**Características:**
- ✅ Conversación natural con contexto
- ✅ Respuestas personalizadas a TU situación
- ✅ Genera planes dinámicos en el momento
- ✅ Hace preguntas relevantes
- ✅ Adapta respuestas según tu perfil
- ⚠️ Requiere API key ($)
- ⚠️ Latencia 1-3 segundos

---

## 🎯 CONFIGURACIÓN RECOMENDADA

### Para Empezar:

```javascript
// config.js
openai: {
    apiKey: 'sk-tu-key-aqui',
    model: 'gpt-4o-mini',      // ⭐ RECOMENDADO
    maxTokens: 500,             // Respuestas concisas
    temperature: 0.8,           // Creativo pero coherente
    enabled: true
}
```

### Para Presupuesto Limitado:

```javascript
openai: {
    apiKey: 'sk-tu-key-aqui',
    model: 'gpt-3.5-turbo',    // Más económico
    maxTokens: 400,             // Respuestas más cortas
    temperature: 0.7,
    enabled: true
}
```

### Para Máxima Calidad:

```javascript
openai: {
    apiKey: 'sk-tu-key-aqui',
    model: 'gpt-4',            // Premium
    maxTokens: 700,            // Respuestas más largas
    temperature: 0.9,          // Más creativo
    enabled: true
}
```

---

## 🔐 SEGURIDAD Y MEJORES PRÁCTICAS

### ⚠️ IMPORTANTE:

La API key en `config.js` es **visible en el frontend** (navegador).

**Para desarrollo local:** OK
**Para producción:** Deberías usar un backend o variables de entorno

### Opciones más seguras:

#### Opción 1: Variables de Entorno (Vercel)

```bash
# En Vercel Dashboard:
Settings → Environment Variables
OPENAI_API_KEY = sk-tu-key

# Modificar código para leer de variables
```

#### Opción 2: Backend Proxy

Crear un endpoint que llame a OpenAI desde el servidor:
```javascript
// Tu app llama a: /api/chat
// Backend hace: fetch openai.com con API key segura
```

#### Opción 3: Rate Limiting

Ya configurado en `config.js`:
```javascript
rateLimiting: {
    enabled: true,
    maxRequestsPerMinute: 10,
    cooldownSeconds: 6
}
```

Esto limita el uso a 10 requests/minuto por usuario.

---

## 📊 MONITOREO DE COSTOS

### Dashboard de OpenAI:

```bash
# Abrir dashboard
open https://platform.openai.com/usage

# Configurar límites:
Settings → Billing → Usage limits
Ej: $10/mes máximo
```

### Alertas por Email:

1. Settings → Billing
2. Email notifications
3. Configura alertas a $5, $10, $20

### Cache de Respuestas:

Ya implementado en el código:
```javascript
cacheResponses: true,
cacheDuration: 300000 // 5 minutos
```

Esto reduce costos al no repetir la misma pregunta.

---

## 🧪 PROBAR LOCALMENTE ANTES DE DESPLEGAR

```bash
# 1. Configurar API key en config.js
nano config.js

# 2. Iniciar servidor local
python3 -m http.server 8000

# 3. Abrir en navegador
open http://localhost:8000

# 4. Probar el chat
# Si funciona, entonces:
vercel --prod
```

---

## 🎨 PERSONALIZAR LA PERSONALIDAD DE MORPHEUS

### Editar el System Prompt:

```javascript
// config.js - línea 18
morpheusPrompt: `Eres Morpheus, un guía sabio...

PERSONALIDAD:
- [Edita aquí el tono, estilo, conocimientos]

RESTRICCIONES:
- [Define límites y advertencias]
`
```

### Ejemplos de Personalización:

**Más técnico:**
```javascript
morpheusPrompt: `Eres Morpheus, un científico experto...
Enfócate en explicaciones bioquímicas detalladas...`
```

**Más motivacional:**
```javascript
morpheusPrompt: `Eres Morpheus, un coach inspirador...
Usa metáforas poderosas y lenguaje motivacional...`
```

**Más casual:**
```javascript
morpheusPrompt: `Eres Morpheus, un amigo sabio...
Habla de manera cercana y accesible...`
```

---

## 🚀 DESPLIEGUE A PRODUCCIÓN

### Método 1: Con el Script

```bash
cd ~/Desktop/aurum-wellness
./ACTIVAR_MORPHEUS.sh
# Selecciona opción 1 y luego despliega
```

### Método 2: Manual

```bash
# 1. Configurar
nano config.js

# 2. Commit (opcional si usas Git)
git add config.js
git commit -m "Activar GPT-4 en Morpheus"

# 3. Desplegar
vercel --prod

# 4. Verificar
open https://aurum-wellness-35hwrwosw-rafas-projects-50df4315.vercel.app
```

---

## ✅ VERIFICACIÓN DE FUNCIONAMIENTO

### Checklist:

- [ ] API key configurada en config.js
- [ ] `enabled: true` en config.js
- [ ] Modelo seleccionado (gpt-4o-mini recomendado)
- [ ] Desplegado a Vercel
- [ ] Chat funciona (probar en producción)
- [ ] Respuestas son de GPT (no predefinidas)
- [ ] Contexto se mantiene entre mensajes

### Indicadores visuales:

**Con GPT-4 activo:**
```
[En consola del navegador verás:]
⚙️ Aurum Wellness Config - CARGADO
🤖 OpenAI Status: ✅ HABILITADO
```

**Sin GPT-4 (fallback):**
```
🤖 OpenAI Status: ⚠️ Modo Fallback
```

### Test de Conversación:

```
Pregunta 1: "Hola Morpheus"
Respuesta: [Saludo personalizado]

Pregunta 2: "Mi nombre es [TuNombre]"
Respuesta: [Debe recordar tu nombre]

Pregunta 3: "¿Cómo me llamaba?"
Respuesta: [Debe responder con tu nombre]
```

Si recuerda tu nombre = ✅ GPT-4 funciona con contexto

---

## 🐛 TROUBLESHOOTING

### Error: "API key inválida"

```bash
# Verificar formato
grep apiKey config.js
# Debe ser: apiKey: 'sk-proj-...'

# Obtener nueva key
open https://platform.openai.com/api-keys
```

### Error: "Rate limit exceeded"

```bash
# Esperar 1 minuto
# O ajustar en config.js:
maxRequestsPerMinute: 5  # Reducir límite
```

### Chat no responde

```bash
# 1. Verificar en consola del navegador (F12)
# 2. Buscar errores de red
# 3. Verificar que enabled: true
# 4. Redesplegar: vercel --prod
```

### Respuestas muy lentas

```bash
# Cambiar a modelo más rápido:
model: 'gpt-3.5-turbo'

# O reducir maxTokens:
maxTokens: 300  # Respuestas más cortas = más rápido
```

---

## 💰 ESTIMACIÓN DE COSTOS REAL

### Escenario Bajo Uso:
- 5 usuarios
- 3 conversaciones/día cada uno
- 5 mensajes por conversación
- Total: 75 mensajes/día

**Con gpt-4o-mini:**
```
75 mensajes/día × $0.0004 = $0.03/día = $0.90/mes
```

### Escenario Medio Uso:
- 20 usuarios
- 5 conversaciones/día cada uno
- 7 mensajes por conversación
- Total: 700 mensajes/día

**Con gpt-4o-mini:**
```
700 mensajes/día × $0.0004 = $0.28/día = $8.40/mes
```

### Escenario Alto Uso:
- 100 usuarios
- 10 conversaciones/día cada uno
- 10 mensajes por conversación
- Total: 10,000 mensajes/día

**Con gpt-4o-mini:**
```
10,000 mensajes/día × $0.0004 = $4/día = $120/mes
```

**Conclusión:** Para uso personal/familiar: **<$10/mes**

---

## 🎯 RECOMENDACIÓN FINAL

### Para Empezar:

1. **Usa modo fallback** (actual) por unos días
2. Si necesitas conversaciones más naturales, **activa gpt-4o-mini**
3. Monitorea costos el primer mes
4. Ajusta según necesidad

### Setup Óptimo:

```javascript
openai: {
    apiKey: 'sk-tu-key',
    model: 'gpt-4o-mini',    // Balance perfecto
    maxTokens: 500,
    temperature: 0.8,
    enabled: true
}
```

---

## 📞 SOPORTE

Si tienes problemas:

1. **Revisa consola del navegador** (F12 → Console)
2. **Verifica config.js** está bien configurado
3. **Prueba localmente** antes de desplegar
4. **Revisa dashboard OpenAI** para errores de API

---

## 🚀 ¡LISTO PARA ACTIVAR!

Ejecuta:
```bash
cd ~/Desktop/aurum-wellness
./ACTIVAR_MORPHEUS.sh
```

O sigue los pasos manuales en este documento.

---

**Creado por:** Super Agente Wellness Fusionado  
**Fecha:** 19 de Octubre 2025  
**Versión:** 1.0  

💎 **¡QUE MORPHEUS DESPIERTE CON TODO EL PODER DE GPT-4!** 🤖✨
