# 🌅 GUÍA DE CONTINUACIÓN - 1 NOVIEMBRE 2025

## ⚡ QUICK START (5 minutos)

```bash
# 1. Navegar al proyecto
cd ~/Desktop/aurum-wellness

# 2. Iniciar servidor local
python3 -m http.server 3000

# 3. Abrir en navegador
open http://localhost:3000

# 4. Verificar que funciona
# → Escribir "HOLA" en la terminal
# → Debe responder Morpheus
```

---

## 🎯 OBJETIVOS DEL DÍA (Prioridad)

### 🔴 CRÍTICO (Hacer PRIMERO - 35 min)

#### 1. Rotar API Keys Expuestas (15 min)

**OpenAI:**
```
1. Ir a: https://platform.openai.com/api-keys
2. Eliminar key actual: sk-proj-rGen6T...
3. Crear nueva key
4. Copiar la nueva key
5. Editar: ~/Desktop/aurum-wellness/config.local.js
6. Línea 74: apiKey: "NUEVA_KEY_AQUI"
```

**Claude:**
```
1. Ir a: https://console.anthropic.com/
2. Settings → API Keys
3. Revocar: sk-ant-api03-crbh...
4. Crear nueva key
5. Editar config.local.js
6. Línea 18: apiKey: "NUEVA_KEY_AQUI"
```

**Gemini:**
```
1. Ir a: https://aistudio.google.com/
2. Get API Key
3. Eliminar: AIzaSyDLBN-hsR...
4. Crear nueva key
5. Editar config.local.js
6. Línea 122: apiKey: "NUEVA_KEY_AQUI"
```

#### 2. Implementar Backend Proxy (20 min)

**Crear archivo `/api/chat.js`:**
```javascript
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { provider, messages, maxTokens } = req.body;

  try {
    let response;

    if (provider === 'claude') {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          messages,
          max_tokens: maxTokens || 1024
        })
      });
    } else if (provider === 'openai') {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages,
          max_tokens: maxTokens || 1024
        })
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Backend proxy error:', error);
    return res.status(500).json({ 
      error: 'Backend error', 
      message: error.message 
    });
  }
}
```

**Modificar `super-wellness-agent-trinity.js`:**
```javascript
// Línea ~140 (método tryClaude)
async tryClaude(query, conversationHistory) {
  try {
    // NUEVO: Usar backend proxy
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'claude',
        messages: [
          { role: 'user', content: this.buildPrompt(query) }
        ],
        maxTokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
    
  } catch (error) {
    console.warn('⚠️ Claude failed:', error.message);
    throw error;
  }
}
```

---

### 🟡 ALTA PRIORIDAD (Después - 40 min)

#### 3. Configurar Variables de Entorno en Vercel (10 min)

```bash
# Instalar Vercel CLI si no está
npm install -g vercel

# Login
vercel login

# Configurar variables
vercel env add CLAUDE_API_KEY
# Pegar nueva key de Claude

vercel env add OPENAI_API_KEY
# Pegar nueva key de OpenAI

vercel env add GEMINI_API_KEY
# Pegar nueva key de Gemini
```

#### 4. Deploy a Producción (10 min)

```bash
cd ~/Desktop/aurum-wellness

# Commit cambios
git add -A
git commit -m "feat: Backend proxy + API keys rotadas"
git push origin main

# Deploy a Vercel
vercel --prod

# Vercel te dará una URL pública
# Ejemplo: https://aurum-wellness-xxx.vercel.app
```

#### 5. Agregar Método de Pago a Perplexity (10 min)

```
1. Ir a: https://www.perplexity.ai/settings/api
2. Click "Upgrade" o "Add Payment Method"
3. Agregar tarjeta de crédito
4. Plan recomendado: $20/mes (incluye 5M tokens)
5. Obtener API key
6. Agregar a config.local.js línea 70
7. Agregar a Vercel: vercel env add PERPLEXITY_API_KEY
```

#### 6. Testing Exhaustivo (10 min)

**Queries de prueba:**
```
1. "hola"
2. "qué es cetosis"
3. "dame un plan de 7 días"
4. "qué estudios respaldan la autofagia"
5. "estoy desanimado"
6. "receta keto rápida"
7. "cuánto cuesta el programa"
8. "qué es la mitocondria"
9. "cómo empiezo"
10. "necesito motivación"
```

**Verificar:**
- [ ] Respuestas coherentes
- [ ] Personalidad Morpheus consistente
- [ ] Sin errores en consola
- [ ] Efecto typewriter funciona
- [ ] Animación Matrix fluida
- [ ] UI responsive en móvil

---

## 🌐 LINK PÚBLICO DIRECTO (Sin Auth Vercel)

### Opción 1: URL de Vercel (Recomendada)
Después del deploy, Vercel te da una URL pública:
```
https://aurum-wellness-xxx.vercel.app
```
- ✅ Sin necesidad de cuenta Vercel para usuarios
- ✅ Acceso directo desde cualquier navegador
- ✅ SSL/HTTPS automático
- ✅ CDN global

### Opción 2: Custom Domain (Opcional)
```bash
# Si tienes dominio propio
vercel domains add aurumwellness.com
# Configurar DNS según instrucciones de Vercel
```

### Para Compartir con Familia/Clientes:
```
Simplemente envía el link:
https://aurum-wellness-xxx.vercel.app

No necesitan:
- Crear cuenta
- Instalar nada
- Configurar nada

Solo abrir y usar ✅
```

---

## 📊 CHECKLIST DE VERIFICACIÓN

### Antes de Compartir Públicamente
- [ ] API keys rotadas
- [ ] Backend proxy funcionando
- [ ] Variables de entorno en Vercel
- [ ] Deploy exitoso
- [ ] Link público accesible
- [ ] Testing de 10 queries
- [ ] Sin errores en consola
- [ ] UI se ve bien en móvil
- [ ] Claude funcionando (o fallback a Gemini)
- [ ] Gemini respondiendo correctamente
- [ ] Morpheus Local como safety net

---

## 🆘 TROUBLESHOOTING RÁPIDO

### Problema: "CORS error" persiste
```javascript
// Verificar que /api/chat.js tiene CORS headers:
res.setHeader('Access-Control-Allow-Origin', '*');
```

### Problema: "401 Unauthorized"
```bash
# Verificar que las variables de entorno están en Vercel:
vercel env ls
```

### Problema: Deploy falla
```bash
# Ver logs:
vercel logs

# Redesploy:
vercel --prod --force
```

### Problema: Respuestas muy largas
```javascript
// Ajustar maxTokens en config.local.js:
maxTokens: 512  // Era 1024
```

---

## 📈 MÉTRICAS A MONITOREAR

### En Vercel Dashboard
- **Invocations:** Número de requests
- **Duration:** Tiempo de respuesta
- **Errors:** Errores del backend
- **Bandwidth:** Uso de datos

### En Google Analytics (Opcional)
```html
<!-- Agregar al index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 🎯 OBJETIVOS DE LA SEMANA

### Lunes 1 Nov (HOY)
- [x] Rotar API keys
- [x] Backend proxy
- [x] Deploy producción
- [x] Link público

### Martes 2 Nov
- [ ] Sistema de registro de usuarios
- [ ] Historial de conversaciones
- [ ] Planes personalizados guardados

### Miércoles 3 Nov
- [ ] Base de conocimiento → 500 respuestas
- [ ] Más recetas detalladas
- [ ] Guías de programas completas

### Jueves 4 Nov
- [ ] Analytics implementado
- [ ] Tracking de métricas
- [ ] Dashboards de uso

### Viernes 5 Nov
- [ ] Testing con usuarios reales
- [ ] Feedback collection
- [ ] Iteración rápida

---

## 💡 TIPS PRO

### Performance
```javascript
// Implementar caché de respuestas comunes
const responseCache = new Map();

if (responseCache.has(query)) {
  return responseCache.get(query);
}
```

### User Experience
```javascript
// Agregar typing indicator
showTypingIndicator();
const response = await agent.process(query);
hideTypingIndicator();
```

### SEO
```html
<!-- Mejorar meta tags en index.html -->
<meta name="description" content="Transforma tu vida con Aurum Wellness. Coach AI personalizado para dieta cetogénica, ayuno intermitente y biohacking.">
```

---

## 📞 COMANDOS ÚTILES

```bash
# Ver estado del servidor
lsof -i :3000

# Matar servidor si está bloqueado
kill -9 $(lsof -t -i:3000)

# Ver logs de Git
git log --oneline -10

# Ver diferencias
git diff

# Revertir cambios (si algo sale mal)
git checkout .
git clean -fd
```

---

## 🎉 MENSAJE MOTIVACIONAL

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🌟 AURUM WELLNESS - DÍA 1 DE PRODUCCIÓN 🌟              ║
║                                                               ║
║  Hoy lanzamos al mundo una herramienta que puede cambiar     ║
║  vidas. Cada query es una oportunidad de transformación.     ║
║                                                               ║
║  "No pienses que puedes. Sábelo." - Morpheus                 ║
║                                                               ║
║                  ¡VAMOS A BRILLAR! ✨                         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📝 NOTAS FINALES

- **Tiempo estimado total:** ~1.5 horas
- **Complejidad:** Media
- **Riesgo:** Bajo (tenemos fallbacks)
- **Impacto:** Alto (link público funcional)

### Orden Recomendado:
1. ☕ Café/Té (5 min)
2. 🔑 Rotar keys (15 min)
3. 🔧 Backend proxy (20 min)
4. 🚀 Deploy (10 min)
5. 🧪 Testing (10 min)
6. 🎊 Celebrar (∞ min)

---

**¿Listo para empezar?**

```bash
cd ~/Desktop/aurum-wellness
python3 -m http.server 3000
```

**¡Adelante! 🚀**

---

*Última actualización: 31 Octubre 2025, 1:45 PM*  
*Próxima revisión: 1 Noviembre 2025, 9:00 AM*
