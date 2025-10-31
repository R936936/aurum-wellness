# 🚀 CONFIGURAR VARIABLES DE ENTORNO EN VERCEL

## ⚠️ IMPORTANTE: CLAUDE DA ERROR 500 PORQUE FALTAN VARIABLES DE ENTORNO

El backend está funcionando perfectamente, pero Vercel necesita las API keys configuradas como variables de entorno para que funcionen en producción.

---

## 📋 PASO A PASO - 5 MINUTOS

### 1️⃣ Ir a Dashboard de Vercel

```
https://vercel.com/dashboard
```

### 2️⃣ Seleccionar tu proyecto "aurum-wellness"

Click en el proyecto en la lista de proyectos.

### 3️⃣ Ir a Settings → Environment Variables

```
Settings (botón arriba derecha) → Environment Variables (menú lateral izquierdo)
```

### 4️⃣ Agregar estas 3 variables de entorno

Para cada una, click en "Add New" y llena:

#### Variable 1: CLAUDE_API_KEY
```
Name: CLAUDE_API_KEY
Value: [Tu API key de Claude que empieza con sk-ant-...]
Environment: ✓ Production ✓ Preview ✓ Development (marca las 3)
```
Obtener en: https://console.anthropic.com/

#### Variable 2: GEMINI_API_KEY  
```
Name: GEMINI_API_KEY
Value: [Tu API key de Gemini que empieza con AIza...]
Environment: ✓ Production ✓ Preview ✓ Development (marca las 3)
```
Obtener en: https://aistudio.google.com/

#### Variable 3: OPENAI_API_KEY
```
Name: OPENAI_API_KEY
Value: [Tu API key de OpenAI que empieza con sk-proj-...]
Environment: ✓ Production ✓ Preview ✓ Development (marca las 3)
```
Obtener en: https://platform.openai.com/api-keys

### 5️⃣ Redesplegar después de agregar variables

1. Ve a "Deployments" (pestaña arriba)
2. Click en los 3 puntos (...) del deployment más reciente
3. Click "Redeploy"
4. Selecciona "Use existing Build Cache"
5. Click "Redeploy" para confirmar
6. Espera 30-60 segundos

---

## ✅ VERIFICAR QUE FUNCIONÓ

1. Abre tu sitio desplegado en Vercel
2. Presiona `Cmd + Option + J` (Mac) o `F12` (Windows) para abrir consola
3. Escribe algo a Morpheus en el chat
4. En la consola verifica:
   - ✅ Debe decir: `✅ Response from: claude` o `gemini`
   - ❌ Ya NO debe decir: `⚠️ Claude failed: Backend error: 500`

---

## 🔐 SEGURIDAD

Las API keys en Vercel están 100% SEGURAS porque:

1. ✅ Solo existen en el servidor (backend `/api/chat.js`)
2. ✅ Nunca se envían al navegador del usuario
3. ✅ No aparecen en el código fuente público
4. ✅ Están encriptadas en Vercel
5. ✅ Cada request pasa por tu backend, no directo desde el cliente

---

## 📱 LINK PÚBLICO DIRECTO

Una vez configurado Vercel, tu link público será:

```
https://aurum-wellness.vercel.app
```

O el dominio personalizado que Vercel te asigne.

### Los usuarios pueden:

✅ **Acceder directamente** sin cuenta de Vercel
✅ **Registrarse** solo en Aurum Wellness
✅ **Usar el sistema completo** con Trinity AI
✅ **Mantener su historial** vitalicio personalizado
✅ **Chatear con Morpheus** usando las 3 IAs

---

## 🆘 TROUBLESHOOTING

### Si Claude sigue dando error 500:

1. ✅ Verifica que las 3 variables estén agregadas
2. ✅ Verifica que tengan los nombres EXACTOS (sin espacios)
3. ✅ Verifica que estén marcadas: Production + Preview + Development
4. ✅ Redesplega el proyecto después de agregar
5. ✅ Espera 1-2 minutos para propagación
6. ✅ Recarga página con `Cmd + Shift + R` (hard reload sin cache)

### Si Gemini funciona pero Claude no:

- Significa que la API key de Claude está mal o expiró
- Verifica en: https://console.anthropic.com/
- Genera una nueva key y actualiza en Vercel

---

## 💡 ALTERNATIVA: Vercel CLI

Si prefieres usar la terminal (más rápido):

```bash
cd ~/Desktop/aurum-wellness

# Instalar Vercel CLI (solo una vez)
npm i -g vercel

# Login (solo una vez)
vercel login

# Agregar variables (copia-pega tus keys cuando te pregunte)
vercel env add CLAUDE_API_KEY production
vercel env add GEMINI_API_KEY production
vercel env add OPENAI_API_KEY production

# Redesplegar
vercel --prod
```

---

## 🎯 RESULTADO FINAL

Después de configurar correctamente:

✅ **Claude 3.5 Sonnet**: Razonamiento profundo funcional
✅ **Gemini 2.0 Flash**: Velocidad extrema como backup
✅ **OpenAI GPT-4**: Disponible para queries complejos
✅ **Trinity Router**: Selecciona la mejor IA automáticamente
✅ **Link público**: Funcional para cualquier usuario
✅ **Sin fricción**: Los usuarios solo necesitan registrarse en Aurum
✅ **Historial vitalicio**: Cada usuario mantiene su progreso
✅ **Respuestas breves**: Estilo Morpheus auténtico de Matrix

---

## 📊 ESTADO ACTUAL

### ✅ Local (http://localhost:3000)
- Gemini: ✅ Funciona perfecto
- Claude: ⚠️ CORS (normal, necesita backend)
- OpenAI: ⚠️ 401 (key expuesta, rotarla)

### 🌐 Producción (Vercel)
- Backend: ✅ Funcional (`/api/chat.js`)
- Claude: ⏳ Necesita env vars configuradas
- Gemini: ✅ Funcionará cuando configures
- OpenAI: ✅ Listo para usar

---

**Tiempo estimado**: 5-10 minutos
**Dificultad**: Fácil (interfaz visual)
**Resultado**: Sistema Trinity completo en producción 🚀

**Última actualización**: 31 Octubre 2025
**Versión**: Trinity v4.1
