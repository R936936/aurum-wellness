# 🔱 INICIO RÁPIDO: SISTEMA TRINITY

**¡Estás a 3 pasos de activar el poder de 4 IAs!**

---

## ⚡ INICIO ULTRA RÁPIDO (5 minutos)

### Paso 1: Ejecutar el Setup Wizard

```bash
cd ~/Desktop/aurum-wellness
./setup-trinity.sh
```

El wizard te guiará automáticamente para:
- ✅ Elegir tu configuración (Trinity completo, Dual Power, o Quick Win)
- ✅ Obtener las API keys necesarias
- ✅ Configurar todo automáticamente
- ✅ Verificar que funcione

---

## 🎯 TRES OPCIONES DISPONIBLES

### 1️⃣ TRINITY COMPLETO (Recomendado) ⭐⭐⭐⭐⭐

**Qué necesitas:**
- Claude API key (https://console.anthropic.com/)
- Gemini API key (https://aistudio.google.com/) - GRATIS
- Perplexity API key (https://www.perplexity.ai/settings/api)
- OpenAI API key (opcional)

**Costo:** ~$1-3/mes para uso normal
**Setup time:** 15 minutos
**Poder:** Máximo 🚀

**Comando:**
```bash
./setup-trinity.sh
# Elige opción 1
```

---

### 2️⃣ DUAL POWER (Más Simple) ⭐⭐⭐⭐

**Qué necesitas:**
- Claude API key
- Gemini API key - GRATIS

**Costo:** ~$0.50-2/mes
**Setup time:** 10 minutos
**Poder:** Alto 💪

**Comando:**
```bash
./setup-trinity.sh
# Elige opción 2
```

---

### 3️⃣ QUICK WIN (Lo Más Rápido) ⭐⭐⭐

**Qué necesitas:**
- Gemini API key - GRATIS

**Costo:** $0 (completamente gratis)
**Setup time:** 5 minutos
**Poder:** Bueno ⚡

**Comando:**
```bash
./setup-trinity.sh
# Elige opción 3
```

---

## 📋 GUÍA PASO A PASO

### Si es tu primera vez:

1. **Obtener API Keys** (10-15 min)
   
   Abre el wizard y sigue las instrucciones:
   ```bash
   ./setup-trinity.sh
   ```
   
   O lee la guía completa:
   ```bash
   ./setup-trinity.sh
   # Elige opción 5 para ver guía
   ```

2. **Configurar Trinity** (Automático)
   
   El script hace todo por ti:
   - Respaldo de configuración actual
   - Genera nuevo config.local.js
   - Activa las IAs que elegiste

3. **Probar que funciona** (2 min)
   
   ```bash
   # Iniciar servidor
   python3 -m http.server 3000
   
   # Abrir http://localhost:3000 en navegador
   # Presionar F12 para ver consola
   # Deberías ver: ✅ ACTIVO para tus IAs
   ```

4. **Test real en el chat:**
   
   Prueba estas queries:
   - `"hola"` → Debería usar Gemini (rápido)
   - `"diseña un plan de 7 días para cetosis"` → Claude (profundo)
   - `"qué estudios científicos respaldan la autofagia"` → Perplexity (research)

---

## 🆘 SI ALGO FALLA

### Problema 1: No tengo API keys aún

**Solución:** Lee la guía completa con instrucciones detalladas:
```bash
./setup-trinity.sh
# Opción 5: Ver guía completa
```

O abre directamente:
```bash
open TRINITY_SETUP_GUIDE.md
```

---

### Problema 2: Script no se ejecuta

**Solución:** Dale permisos de ejecución:
```bash
chmod +x setup-trinity.sh
./setup-trinity.sh
```

---

### Problema 3: No sé qué opción elegir

**Recomendación según tu situación:**

- **Quiero el máximo poder:** Trinity Completo (opción 1)
- **Quiero algo simple y bueno:** Dual Power (opción 2)
- **Quiero probar gratis primero:** Quick Win (opción 3)
- **No estoy seguro:** Lee la guía completa (opción 5)

---

### Problema 4: API key no funciona

**Checklist:**
- ✅ Copiaste la key completa (sin espacios)
- ✅ La key no está expirada
- ✅ Tienes créditos disponibles en la plataforma
- ✅ El formato es correcto:
  - Claude: `sk-ant-...`
  - Perplexity: `pplx-...`
  - Gemini: `AIza...`
  - OpenAI: `sk-proj-...` o `sk-...`

---

## 💡 COMANDOS ÚTILES

### Iniciar servidor rápido:
```bash
cd ~/Desktop/aurum-wellness
./start-trinity.sh
```

### Reconfigurar Trinity:
```bash
./setup-trinity.sh
```

### Ver guía completa:
```bash
open TRINITY_SETUP_GUIDE.md
```

### Editar config manualmente:
```bash
nano config.local.js
```

### Ver estadísticas (en consola del navegador):
```javascript
SuperWellnessAgent.getStats()
```

### Reset estadísticas:
```javascript
SuperWellnessAgent.resetStats()
```

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DE INSTALAR

1. **Probar diferentes tipos de queries** para ver cómo Trinity rutea:
   - Queries simples → Gemini
   - Queries complejas → Claude
   - Queries de research → Perplexity

2. **Monitorear uso y costos:**
   ```javascript
   SuperWellnessAgent.getStats()
   ```

3. **Ajustar prioridades** si quieres (en config.local.js):
   ```javascript
   fallbackChain: ['gemini', 'claude', 'perplexity', 'openai']
   // Cambia el orden según prefieras
   ```

4. **Agregar más IAs** cuando quieras:
   ```bash
   ./setup-trinity.sh
   # Opción 4: Custom
   ```

---

## 📊 COMPARACIÓN RÁPIDA

| Opción | APIs | Costo/mes | Setup | Poder |
|--------|------|-----------|-------|-------|
| **Trinity Completo** | 4 | $1-3 | 15 min | ⭐⭐⭐⭐⭐ |
| **Dual Power** | 2 | $0.50-2 | 10 min | ⭐⭐⭐⭐ |
| **Quick Win** | 1 | $0 | 5 min | ⭐⭐⭐ |

---

## 🚀 ¡A EMPEZAR!

**El comando más importante:**

```bash
cd ~/Desktop/aurum-wellness && ./setup-trinity.sh
```

**¡Eso es todo! El wizard hace el resto.** ✨

---

## 📞 AYUDA ADICIONAL

- **Guía completa:** `TRINITY_SETUP_GUIDE.md`
- **Reconfigurar:** `./setup-trinity.sh`
- **Documentación técnica:** Lee los archivos `trinity-*.js`

---

## 💎 RECORDATORIO IMPORTANTE

**Ventajas de Trinity vs Solo GPT-4:**

- ✅ 88% más barato
- ✅ 2x más rápido (Gemini)
- ✅ Research en tiempo real (Perplexity)
- ✅ Razonamiento superior (Claude)
- ✅ Cada IA especializada en su función

**Trinity = 4 IAs trabajando juntas de forma inteligente**

---

**¿Listo para activar Trinity?** 🔱

```bash
./setup-trinity.sh
```

**¡Vamos!** 🚀✨
