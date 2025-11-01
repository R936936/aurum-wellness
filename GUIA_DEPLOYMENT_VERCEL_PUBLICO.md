# 🚀 GUÍA DE DEPLOYMENT A VERCEL - AURUM WELLNESS
## URL Pública Directa (Sin cuenta para usuarios)

---

## ✅ REQUISITOS PREVIOS

- [x] Sistema funcional en local (✅ COMPLETADO)
- [x] Backend serverless en `/api/` (✅ COMPLETADO)
- [x] `vercel.json` configurado (✅ COMPLETADO)
- [x] API keys de Claude, Gemini, OpenAI disponibles

---

## 🎯 OBJETIVO

Desplegar Aurum Wellness Trinity a Vercel de forma que:
- ✅ Usuarios accedan con URL directa (sin registrarse en Vercel)
- ✅ Sistema funcione igual que en local
- ✅ API keys estén seguras (en variables de entorno)
- ✅ Morpheus Local funcione como fallback

---

## 📋 PASO A PASO - DEPLOYMENT

### 1️⃣ **Instalar Vercel CLI** (Si no lo tienes)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Verificar instalación
vercel --version
```

---

### 2️⃣ **Login a Vercel**

```bash
# Login (abrirá navegador)
vercel login

# Confirmar que estás logueado
vercel whoami
```

---

### 3️⃣ **Primer Deploy (Sin Variables de Entorno)**

```bash
# Navegar al proyecto
cd ~/Desktop/aurum-wellness

# Deploy inicial
vercel

# Responder las preguntas:
# ? Set up and deploy "~/Desktop/aurum-wellness"? [Y/n] y
# ? Which scope do you want to deploy to? [tu-cuenta]
# ? Link to existing project? [y/N] n
# ? What's your project's name? aurum-wellness
# ? In which directory is your code located? ./
# ? Want to modify these settings? [y/N] n
```

**Resultado:** Recibirás una URL como:
```
https://aurum-wellness-xxx.vercel.app
```

---

### 4️⃣ **Configurar Variables de Entorno**

#### Opción A: Desde CLI (Recomendado)

```bash
# Claude API Key
vercel env add CLAUDE_API_KEY
# Cuando pregunte:
# ? What's the value of CLAUDE_API_KEY?
# Pega tu API key: sk-ant-api03-xxx
# ? Add CLAUDE_API_KEY to which Environments? (Production, Preview, Development)
# Selecciona: Production, Preview, Development

# Gemini API Key
vercel env add GEMINI_API_KEY
# Pega tu API key: AIzaSyDxxx

# OpenAI API Key (opcional)
vercel env add OPENAI_API_KEY
# Pega tu API key: sk-proj-xxx

# Perplexity API Key (opcional)
vercel env add PERPLEXITY_API_KEY
# Pega tu API key: pplx-xxx
```

#### Opción B: Desde Dashboard de Vercel

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto "aurum-wellness"
3. Settings → Environment Variables
4. Agregar cada variable:
   - `CLAUDE_API_KEY`: tu-key-de-claude
   - `GEMINI_API_KEY`: tu-key-de-gemini
   - `OPENAI_API_KEY`: tu-key-de-openai
   - `PERPLEXITY_API_KEY`: tu-key-de-perplexity (opcional)

---

### 5️⃣ **Redeploy con Variables Configuradas**

```bash
# Deploy a producción con variables
vercel --prod

# Confirmar
# ? Want to override the Production deployment? [y/N] y
```

**Resultado:** Nueva URL de producción:
```
https://aurum-wellness.vercel.app
```

---

### 6️⃣ **Verificar que Funciona**

```bash
# Abrir en navegador
open https://aurum-wellness.vercel.app

# O la URL específica que recibiste
```

**Checklist de Verificación:**

- [ ] La página carga correctamente
- [ ] Terminal de Matrix se ve bien
- [ ] Puedes escribir mensajes
- [ ] Morpheus responde (aunque sea con Morpheus Local)
- [ ] No hay errores en la consola del navegador (F12)

---

## 🧪 TESTING DE PRODUCCIÓN

### Prueba 1: Morpheus Local (Siempre Debe Funcionar)
```
> HOLA
```
**Esperado:** Respuesta de Morpheus en 3-4 líneas

### Prueba 2: Consulta Científica (Debe Usar Claude/Gemini)
```
> QUE ES AUTOFAGIA Y COMO OCURRE?
```
**Esperado:** Respuesta detallada con contexto científico

### Prueba 3: Consulta Simple (Puede Usar Cualquier IA)
```
> NECESITO ENERGIA
```
**Esperado:** Respuesta motivacional corta

### Prueba 4: Consulta Compleja (Debe Usar Claude)
```
> DAME UN PLAN DE 7 DIAS PARA ENTRAR EN CETOSIS
```
**Esperado:** Plan estructurado detallado

---

## 🔍 DEBUG EN PRODUCCIÓN

### Ver Logs en Tiempo Real
```bash
# Ver últimos logs
vercel logs https://aurum-wellness.vercel.app

# Ver logs en tiempo real
vercel logs https://aurum-wellness.vercel.app --follow
```

### Errores Comunes y Soluciones

#### Error 1: "Failed to fetch"
**Causa:** Variables de entorno no configuradas
**Solución:**
```bash
vercel env pull
vercel --prod
```

#### Error 2: "API error: 401"
**Causa:** API key inválida o expirada
**Solución:**
```bash
vercel env rm CLAUDE_API_KEY
vercel env add CLAUDE_API_KEY
vercel --prod
```

#### Error 3: "CORS Error"
**Causa:** Headers CORS mal configurados
**Solución:** Ya está resuelto en `api/chat.js`

#### Error 4: "429 Too Many Requests"
**Causa:** Rate limit de Gemini excedido
**Solución:** Sistema automáticamente usa fallback (OpenAI o Morpheus)

---

## 🌐 COMPARTIR CON USUARIOS

### URL Final
```
https://aurum-wellness.vercel.app
```
*(O la URL personalizada que Vercel te asigne)*

### Mensaje para Compartir

```
🔱 AURUM WELLNESS - MORPHEUS IA 🔱

¡Bienvenido a tu transformación metabólica!

🌐 Accede aquí:
https://aurum-wellness.vercel.app

✨ Características:
• Chat en tiempo real con Morpheus IA
• Respuestas científicas personalizadas
• Planes de cetosis y wellness
• Guía de ayuno intermitente
• 100% gratis, sin registro

💬 Simplemente abre el link y empieza a chatear!

Pregúntale a Morpheus:
• "¿Qué es cetosis?"
• "Necesito energía"
• "¿Cómo empiezo ayuno intermitente?"
• "Dame un plan de 7 días"

🔱 "No pienses que puedes. Sábelo." - Morpheus
```

---

## 📊 MONITOREO POST-DEPLOYMENT

### Dashboard de Vercel
- **Analytics:** https://vercel.com/[tu-proyecto]/analytics
- **Logs:** https://vercel.com/[tu-proyecto]/logs
- **Settings:** https://vercel.com/[tu-proyecto]/settings

### Métricas Importantes
```
✅ Uptime:           99.9% esperado
✅ Response Time:    <2s promedio
✅ Error Rate:       <1% esperado
✅ API Usage:        Monitorear rate limits
```

---

## 🔄 ACTUALIZACIONES FUTURAS

### Para Actualizar el Código

```bash
# 1. Hacer cambios en local
cd ~/Desktop/aurum-wellness
# [editar archivos]

# 2. Probar localmente
python3 -m http.server 3000

# 3. Deploy actualización
vercel --prod

# 4. Confirmar
# ? Want to override the Production deployment? [y/N] y
```

### Para Actualizar Variables de Entorno

```bash
# Eliminar variable
vercel env rm CLAUDE_API_KEY

# Agregar nueva
vercel env add CLAUDE_API_KEY

# Redeploy
vercel --prod
```

---

## 🎯 CONFIGURACIÓN AVANZADA (Opcional)

### Custom Domain

```bash
# Agregar dominio personalizado
vercel domains add tudominio.com

# El sistema te guiará para configurar DNS
```

### Analytics de Google

Agregar en `index.html` antes de `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ⚠️ IMPORTANTE: SEGURIDAD

### ✅ DO's (Hacer)
- ✅ Usar variables de entorno para API keys
- ✅ Mantener backend serverless en `/api/`
- ✅ Regenerar API keys si se exponen
- ✅ Monitorear uso de APIs
- ✅ Configurar rate limiting

### ❌ DON'Ts (No Hacer)
- ❌ Nunca poner API keys en código frontend
- ❌ No compartir API keys públicamente
- ❌ No commitear `config.local.js` con keys reales
- ❌ No ignorar errores 429 (rate limit)

---

## 📞 COMANDOS RÁPIDOS DE REFERENCIA

```bash
# Deploy a producción
vercel --prod

# Ver logs
vercel logs --follow

# Listar deployments
vercel ls

# Rollback a deployment anterior
vercel rollback [deployment-url]

# Ver variables de entorno
vercel env ls

# Descargar variables localmente
vercel env pull

# Eliminar proyecto (¡cuidado!)
vercel remove aurum-wellness
```

---

## 🎉 CHECKLIST FINAL

### Pre-Deployment
- [x] Código funcional en local
- [x] Backend serverless configurado
- [x] `vercel.json` correcto
- [x] API keys disponibles
- [x] Testing local completado

### Durante Deployment
- [ ] Login a Vercel exitoso
- [ ] Deploy inicial completado
- [ ] Variables de entorno configuradas
- [ ] Redeploy con variables exitoso
- [ ] URL de producción recibida

### Post-Deployment
- [ ] Página carga correctamente
- [ ] Terminal Matrix funciona
- [ ] Morpheus responde
- [ ] Sin errores en consola
- [ ] Testing de producción completado
- [ ] URL compartida con usuarios

---

## 🆘 SOPORTE

### Si Algo Sale Mal

1. **Verificar logs:**
   ```bash
   vercel logs --follow
   ```

2. **Verificar variables:**
   ```bash
   vercel env ls
   ```

3. **Rollback si es necesario:**
   ```bash
   vercel rollback
   ```

4. **Re-deployar:**
   ```bash
   vercel --prod --force
   ```

---

## 💡 TIPS PRO

### Tip 1: Alias Permanente
```bash
vercel alias set aurum-wellness-xxx.vercel.app aurum-wellness.vercel.app
```

### Tip 2: Pre-deploy Hook
Agregar en `package.json`:
```json
{
  "scripts": {
    "deploy": "vercel --prod"
  }
}
```

### Tip 3: Environment Previews
```bash
# Deploy a preview (no producción)
vercel

# Cada commit puede tener su preview URL
```

---

## 📚 RECURSOS

- **Vercel Docs:** https://vercel.com/docs
- **Vercel CLI Docs:** https://vercel.com/docs/cli
- **Serverless Functions:** https://vercel.com/docs/functions
- **Environment Variables:** https://vercel.com/docs/environment-variables

---

**Fecha:** Viernes 31 Octubre 2025
**Versión:** Trinity System v5.1.0
**Preparado por:** GitHub Copilot AI Agent

---

🔱 **¡Listo para desplegar y transformar vidas!** 💎
