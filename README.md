# 🌟 AURUM WELLNESS - Sistema de Transformación Personal

<div align="center">

![Aurum Wellness](https://img.shields.io/badge/Aurum-Wellness-gold?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

**Plataforma de bienestar integral con IA avanzada y gamificación**

[🚀 Demo en Vivo](https://aurum-wellness-gjg2bekwe-rafas-projects-50df4315.vercel.app) | [📖 Documentación](#documentación) | [🤝 Contribuir](#contribuir)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Multi-Agente IA](#-multi-agente-ia)
- [Roadmap](#-roadmap)

---

## ✨ Características

### 🤖 Morpheus AI - Asistente Inteligente
- Sistema multi-agente fusionando OpenAI + Copilot + IA Local
- Personalidad Matrix/Morpheus mantenida
- Respuestas contextuales y personalizadas
- Fallback robusto (OpenAI → Local → Básico)

### 🎯 4 Programas de Transformación
1. **🌿 Detox Cuántico** (7 días) - Limpieza celular profunda
2. **⚡ Energía Vital** (14 días) - Optimización mitocondrial
3. **☯️ Balance Mental** (21 días) - Sincronización neuroquímica
4. **🔄 Regeneración Celular** (30 días) - Rejuvenecimiento completo

### 🍽️ Sistema de Recetas Personalizadas
- Recetas adaptadas a tu programa
- Calculadora nutricional
- Ingredientes optimizados para cetosis/autofagia

### 🎮 Gamificación
- Sistema de niveles y experiencia (XP)
- Logros desbloqueables
- Tracking de progreso
- Persistencia con LocalStorage

### 🎨 Interfaz Matrix
- Diseño futurista estilo terminal
- Animaciones suaves
- Responsive design
- Tema oscuro/dorado

---

## 🏗️ Arquitectura

```
aurum-wellness/
├── index.html              # Interfaz principal
├── wellness-core.js        # Sistema principal y Morpheus base
├── wellness-ui.js          # Componentes UI
├── super-wellness-agent.js # Multi-agente IA (próximamente)
├── config.js              # Configuración (no commiteado)
└── vercel.json            # Configuración de despliegue
```

### Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **IA**: OpenAI GPT-4, Sistema local de respuestas
- **Deployment**: Vercel
- **Storage**: LocalStorage (client-side)

---

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ (opcional, para desarrollo)
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- API Key de OpenAI (opcional)

### Setup Local

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/aurum-wellness.git
cd aurum-wellness

# Crear archivo de configuración
cp config.example.js config.js

# Editar config.js con tu API key de OpenAI
# OPENAI_API_KEY: 'tu-api-key-aqui'

# Abrir en navegador
open index.html
# O iniciar servidor local
python3 -m http.server 8000
# Luego abrir: http://localhost:8000
```

### Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 💻 Uso

### Interacción con Morpheus

```javascript
// En la consola del navegador
> hola
≫ MORPHEUS: Saludos, buscador del bienestar...

> detox
≫ MORPHEUS: El Detox Cuántico es un programa de 7 días...

> cetosis
≫ MORPHEUS: La cetosis es un estado metabólico...
```

### Comandos Disponibles
- `hola` - Bienvenida
- `ayuda` - Lista de comandos
- `detox/energia/balance/regeneracion` - Info de programas
- `programa` - Lista todos los programas
- `cetosis/autofagia` - Explicaciones científicas
- `motivacion` - Mensajes motivacionales
- Y mucho más...

---

## 🤖 Multi-Agente IA

### Arquitectura del Sistema

```
Usuario Query
     ↓
SuperWellnessAgent
     ↓
  ┌──────┴──────┐
  ↓             ↓
OpenAI API   Morpheus Local
  ↓             ↓
  └──────┬──────┘
         ↓
    Respuesta
```

### Prioridad de Fallback
1. **OpenAI GPT-4** (si API key disponible)
   - Respuestas avanzadas y contextuales
   - Análisis profundo
   - Planes personalizados

2. **Morpheus Local** (fallback automático)
   - Respuestas predefinidas
   - Sin latencia
   - Sin costos

3. **Respuestas Básicas** (último fallback)
   - Siempre disponible
   - Respuesta genérica

---

## 🗺️ Roadmap

### ✅ Completado (v2.0.0)
- [x] Sistema base Morpheus
- [x] 4 Programas de Wellness
- [x] Sistema de Recetas
- [x] Gamificación completa
- [x] Interfaz Matrix

### 🚧 En Progreso (v2.1.0)
- [ ] Integración Multi-Agente IA
- [ ] OpenAI GPT-4 integration
- [ ] Sistema de fallback robusto
- [ ] Análisis de progreso con IA

### 🔮 Futuro (v3.0.0)
- [ ] Base de datos backend
- [ ] Autenticación de usuarios
- [ ] App móvil (React Native)
- [ ] Integración con wearables
- [ ] Dashboard analytics avanzado

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

---

## 👤 Autor

**Rafael Álvarez Castro**

- GitHub: [@rafaalvarez](https://github.com/rafaalvarez)
- Proyecto: Aurum Wellness

---

## �� Agradecimientos

- Inspiración Matrix/Morpheus
- Comunidad de wellness y biohacking
- OpenAI por GPT-4
- GitHub Copilot

---

<div align="center">

**⚡ Construido con pasión para transformar vidas ⚡**

[⬆ Volver arriba](#-aurum-wellness---sistema-de-transformación-personal)

</div>
