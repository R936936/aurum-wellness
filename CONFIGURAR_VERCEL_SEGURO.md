# 🔐 CONFIGURAR VARIABLES DE ENTORNO EN VERCEL (SEGURO)

## ✅ SOLUCIÓN IMPLEMENTADA

Hemos creado un **API endpoint seguro** que carga las API keys desde variables de entorno de Vercel.

---

## 📋 PASOS PARA CONFIGURAR

### 1. Ve a tu Dashboard de Vercel

```
https://vercel.com/rafas-projects-50df4315/aurum-wellness
```

### 2. Navega a Settings → Environment Variables

### 3. Agrega estas 3 variables:

| Variable | Descripción | Environments |
|----------|-------------|--------------|
| `GEMINI_API_KEY` | Tu API key de Google Gemini | Production, Preview, Development |
| `CLAUDE_API_KEY` | Tu API key de Claude/Anthropic | Production, Preview, Development |
| `OPENAI_API_KEY` | Tu API key de OpenAI GPT-4 | Production, Preview, Development |

**IMPORTANTE:** 
- Selecciona los 3 environments (Production, Preview, Development)
- Las keys deben empezar con sus prefijos correctos:
  - Gemini: `AIza...`
  - Claude: `sk-ant-...`
  - OpenAI: `sk-proj-...`

### 4. Re-deploy automático

Vercel automáticamente re-desplegará tu proyecto con las nuevas variables.

---

## 🔍 VERIFICAR QUE FUNCIONÓ

1. Espera 30-60 segundos después de guardar las variables
2. Abre tu URL pública: `https://aurum-wellness-rafas-projects-50df4315.vercel.app`
3. Abre la consola del navegador (Cmd+Opt+J)
4. Deberías ver:

```
🔱 AURUM WELLNESS - TRINITY SYSTEM v5.0 LOADED
🧠 Claude 3.5 Sonnet: ✅ ACTIVO
⚡ Gemini 2.0 Flash: ✅ ACTIVO
🤖 OpenAI GPT-4: ✅ ACTIVO
💎 Morpheus Local: ✅ ACTIVO
```

---

## 🆘 SI NO FUNCIONA

### Opción 1: Verificar logs de Vercel

1. Ve a tu proyecto en Vercel
2. Click en el deployment más reciente
3. Ve a "Functions" → "api/config"
4. Revisa los logs

### Opción 2: Probar el endpoint directamente

Abre en tu navegador:
```
https://aurum-wellness-rafas-projects-50df4315.vercel.app/api/config
```

Deberías ver:
```json
{
  "openai": {
    "enabled": true,
    "apiKey": "sk-proj-...",
    ...
  },
  "claude": {
    "enabled": true,
    "apiKey": "sk-ant-...",
    ...
  },
  ...
}
```

**NOTA:** Las API keys estarán parcialmente ocultas por seguridad.

---

## 🔐 SOBRE SEGURIDAD

✅ **Bueno:**
- Las API keys NO están en el código
- Se cargan desde variables de entorno
- El endpoint `/api/config` es serverless (backend)
- Las keys se transmiten de forma segura

⚠️ **Advertencia:**
- Las API keys actuales YA FUERON EXPUESTAS en chats anteriores
- **DEBES rotarlas** después de configurar Vercel
- Links para rotar:
  - Gemini: https://aistudio.google.com/apikey
  - Claude: https://console.anthropic.com/
  - OpenAI: https://platform.openai.com/api-keys

---

## 💡 PRÓXIMO PASO

Después de configurar las variables en Vercel:

1. Espera el re-deploy automático (1-2 minutos)
2. Abre la URL pública
3. Prueba hablando con Morpheus
4. Si funciona, **rota todas las API keys**

---

¿Necesitas ayuda? Pídele a Copilot:
```
AYUDA CON VERCEL ENV VARS
```
