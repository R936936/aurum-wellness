# 🔱 GUÍA: Configurar API Keys en Vercel

## ✅ LO QUE YA ESTÁ HECHO

- ✅ Código actualizado y pusheado a GitHub
- ✅ Terminal mejorado (más grande y legible)
- ✅ Morpheus con respuestas concisas
- ✅ Vercel auto-deployará desde GitHub

## 🎯 LO QUE FALTA (5 MINUTOS)

Necesitas configurar las API keys como **Environment Variables** en Vercel para que las IAs funcionen en producción.

---

## 📋 PASO A PASO

### 1️⃣ Abrir Dashboard de Vercel

Ve a: **https://vercel.com/dashboard**

### 2️⃣ Seleccionar Proyecto

Click en: **aurum-wellness**

### 3️⃣ Ir a Settings

- Click en pestaña: **Settings**
- En el menú lateral: **Environment Variables**

### 4️⃣ Agregar Cada API Key

Click en **"Add New"** y copia estos valores:

#### 🧠 Claude API Key

```
Variable Name:  CLAUDE_API_KEY
Value:          [Copia desde config.local.js línea 13]
Environments:   ☑ Production  ☑ Preview  ☑ Development
```

#### ⚡ Gemini API Key

```
Variable Name:  GEMINI_API_KEY
Value:          [Copia desde config.local.js línea 53]
Environments:   ☑ Production  ☑ Preview  ☑ Development
```

#### 🤖 OpenAI API Key

```
Variable Name:  OPENAI_API_KEY
Value:          [Copia desde config.local.js línea 73]
Environments:   ☑ Production  ☑ Preview  ☑ Development
```

### 5️⃣ Redeploy

Después de agregar las 3 variables:

1. Ve a **Deployments** (pestaña superior)
2. Click en el deployment más reciente
3. Click en **"⋮"** (tres puntos)
4. Click en **"Redeploy"**

---

## 🎉 RESULTADO FINAL

Una vez completado, tu app pública tendrá:

- ✅ Terminal grande y legible
- ✅ Morpheus respondiendo con IA real (Claude/Gemini)
- ✅ Respuestas concisas y místicas
- ✅ Sin mostrar proveedor de IA
- ✅ Acceso público directo (sin registro Vercel)

---

## 🌐 URL PÚBLICA

Tu app estará disponible en:

**https://aurum-wellness.vercel.app**

o

**https://aurum-wellness-[tu-usuario].vercel.app**

---

## 💡 VERIFICAR QUE FUNCIONA

1. Abre la URL pública
2. Presiona **F12** → Consola
3. Busca:
   ```
   ✅ Claude 3.5: ✅ ACTIVO
   ✅ Gemini 2.0: ✅ ACTIVO
   ```

4. Prueba en el chat:
   ```
   > quien eres
   ```

Deberías ver respuesta inteligente de Morpheus.

---

## 🆘 SI ALGO FALLA

### Síntoma: "Error: No pude procesar tu consulta"

**Solución:**
1. Verifica que agregaste las 3 env vars
2. Hiciste el redeploy
3. Espera 1-2 minutos (caché de Vercel)
4. Hard refresh: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows)

### Síntoma: Terminal pequeña o letras chicas

**Solución:**
- Vercel está mostrando versión en caché
- Hard refresh: `Cmd+Shift+R`
- O espera 2-3 minutos

---

## ⏱️ TIEMPO ESTIMADO

- Configurar env vars: **3 minutos**
- Redeploy + propagación: **2 minutos**
- **Total: 5 minutos**

---

¡Todo listo para producción! 🚀
