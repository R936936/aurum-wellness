# AURUM WELLNESS - Sistema de Transformación Cuántica

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-gold)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-web-blue)

**Experiencia inmersiva de bienestar inspirada en The Matrix**

[🌐 Demo en Vivo](https://aurum-wellness-oe2rg33e2-rafas-projects-50df4315.vercel.app) | [Documentación](#características) | [Contribuir](#contribuciones)

</div>

---

## 🌟 Descripción

**AURUM WELLNESS** es una plataforma web inmersiva que combina la estética cyberpunk hacker de The Matrix con un sistema avanzado de generación de programas de bienestar personalizados. La experiencia está diseñada para crear una sensación de transformación futurista y paz, guiando al usuario a través de su viaje de wellness como si estuviera conversando con Morpheus.

### 🎯 Filosofía del Proyecto

> "Creamos experiencias que transforman. Cada interacción es un paso hacia el equilibrio perfecto entre tecnología y bienestar humano."

---

## ✨ Características

### 🖥️ Interfaz Matrix Terminal
- **Fondo de código lluvia**: Efecto Matrix clásico en 4 cuadrantes (izquierda, derecha, arriba-centro, abajo-centro)
- **Terminal negra central**: Espacio dedicado para interacción, libre del efecto Matrix
- **Letras doradas**: Todo el texto principal en color dorado (#FFD700)
- **Títulos con efecto Glitch**: Títulos blancos neón con animaciones cyberpunk futuristas
- **Escritura lenta tipo typewriter**: Efecto de paz y contemplación
- **Sistema de gamificación**: Niveles, XP y progreso visual

### 🎨 Estética Visual
- ✅ Fondo negro puro (#000)
- ✅ Código Matrix verde (#00ff00) en todo el fondo
- ✅ Terminal central negra con borde verde neón
- ✅ Texto dorado para contenido general
- ✅ Títulos blancos con efecto glitch/neón
- ✅ Panel de usuario con nivel y barra de XP
- ✅ Sin colores amarillo, rosa, café (solo verde, dorado, blanco)

### 🧘 Programas de Wellness (NUEVO v2.0)
- **Programa Detox Cuántico**: Desintoxicación celular de 7 días
- **Energía Vital Mitocondrial**: Optimización de ATP de 14 días
- **Balance Mental Neuroquímico**: Sincronización de 21 días
- **Regeneración Celular Avanzada**: Reparación de 30 días
- **Tracking de progreso**: Completa días y gana XP
- **Fases detalladas**: Cada programa tiene actividades día a día

### 🍽️ Sistema de Recetas (NUEVO v2.0)
- **Creador de recetas personalizado**: Crea tus propias recetas
- **Biblioteca de recetas**: 3 recetas predeterminadas premium
- **Categorías**: Smoothies, Tés, Elixires, Sopas, Ensaladas, Snacks
- **Sistema de favoritos**: Marca tus recetas preferidas
- **Calificaciones**: Valora de 1 a 5 estrellas
- **Tracking de preparación**: Cuenta cuántas veces has hecho cada receta
- **Filtros avanzados**: Por categoría, beneficios, favoritas

### 🤖 Experiencia Morpheus (MEJORADO v2.0)
- **Chat inteligente contextual**: Respuestas basadas en keywords
- **Historial de conversaciones**: Guarda tus últimas 100 conversaciones
- **Respuestas personalizadas**: Sobre detox, energía, balance, recetas, programas
- **Sistema de XP**: Gana puntos por cada interacción
- **Guía paso a paso**: En tu transformación personal

### 📊 Dashboard de Transformación (NUEVO v2.0)
- **Estadísticas en tiempo real**: Nivel, XP, progreso
- **Resumen de recetas**: Total, favoritas, completadas
- **Programas activos**: Tracking de tu avance
- **Progreso por área**: Detox, energía, balance, regeneración
- **Exportación de datos**: Descarga tu progreso en JSON

### 💾 Almacenamiento Local (NUEVO v2.0)
- **LocalStorage**: Todos tus datos persisten en el navegador
- **Sin backend**: Funciona 100% offline
- **Exportación de datos**: Backup manual en cualquier momento

---

## 🚀 Instalación y Uso

### Opción 1: Despliegue Rápido (Vercel)

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/aurum-wellness.git
cd aurum-wellness

# Desplegar con Vercel
vercel --prod
```

### Opción 2: Servidor Local

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/aurum-wellness.git
cd aurum-wellness

# Abrir index.html en tu navegador
open index.html

# O usar servidor local
python3 -m http.server 8000
# Visita: http://localhost:8000
```

### Opción 3: GitHub Pages

1. Fork este repositorio
2. Ve a Settings > Pages
3. Selecciona la rama `main` como fuente
4. Tu sitio estará disponible en `https://TU_USUARIO.github.io/aurum-wellness`

---

## 📂 Estructura del Proyecto

```
aurum-wellness/
├── index.html              # Archivo principal con UI
├── wellness-core.js        # Sistema de funcionalidad (v2.0)
├── wellness-ui.js          # Componentes UI avanzados (v2.0)
├── TECHNICAL_REPORT.md     # Documentación técnica completa
├── DEPLOYMENT_INFO.txt     # URLs de deployment
├── package.json            # Configuración npm
├── vercel.json             # Configuración Vercel (opcional)
├── README.md               # Este archivo
└── .gitignore              # Archivos ignorados por git
```

---

## 🎨 Personalización

### Colores Principales

```css
--matrix-green: #00ff00;
--terminal-black: #000000;
--text-gold: #FFD700;
--title-white: #ffffff;
--neon-glow: rgba(0, 255, 0, 0.5);
```

### Velocidad de Escritura

Modifica en el JavaScript:

```javascript
setTimeout(typeWriter, 30); // Cambiar valor (ms) para ajustar velocidad
```

### Caracteres de Matrix Rain

```javascript
this.characters = 'AURUMWELLNESSΦΨΩΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ01234567890';
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones avanzadas, efectos glitch
- **Vanilla JavaScript**: Sin dependencias, máximo rendimiento
- **Canvas API**: Efecto Matrix rain
- **CSS Animations**: Glitch effects, typewriter, neón

---

## 🌐 Demo en Vivo

**URL de Producción**: [https://aurum-wellness-oe2rg33e2-rafas-projects-50df4315.vercel.app](https://aurum-wellness-oe2rg33e2-rafas-projects-50df4315.vercel.app)

**GitHub Repository**: [https://github.com/R936936/aurum-wellness](https://github.com/R936936/aurum-wellness)

---

## 📱 Responsive Design

La interfaz está optimizada para:
- 💻 Desktop (1920x1080+)
- 💻 Laptop (1366x768+)
- 📱 Tablet (768x1024+)
- 📱 Mobile (responsive)

---

## 🔮 Roadmap

### ✅ v1.0 (Completado)
- [x] Diseño visual Matrix cyberpunk
- [x] Terminal interactiva
- [x] Efectos glitch y typewriter
- [x] 4 programas de wellness básicos
- [x] Chat con Morpheus básico
- [x] Deployment en Vercel

### ✅ v2.0 (Actual - 19 Oct 2025)
- [x] Sistema completo de recetas con CRUD
- [x] Programas detallados con fases día a día
- [x] Sistema de gamificación (niveles y XP)
- [x] Dashboard de estadísticas
- [x] Almacenamiento local persistente
- [x] IA contextual mejorada
- [x] Modales y componentes UI avanzados
- [x] Tracking de progreso en tiempo real
- [x] Exportación de datos

### v2.1 (Próximamente)
- [ ] Sistema de login/register
- [ ] Base de datos Firebase
- [ ] Sincronización entre dispositivos
- [ ] Notificaciones push
- [ ] Modo oscuro/claro toggle

### v2.2
- [ ] Integración con API de IA real (OpenAI GPT)
- [ ] Análisis de sentimientos
- [ ] Recomendaciones personalizadas avanzadas
- [ ] Generación de imágenes de recetas

### v3.0
- [ ] App móvil nativa (React Native)
- [ ] Integración con wearables (Apple Watch, Fitbit)
- [ ] Comunidad de usuarios
- [ ] Sistema de chat entre usuarios
- [ ] Marketplace de recetas
- [ ] Certificaciones digitales

### v4.0
- [ ] Realidad aumentada para recetas
- [ ] Asistente de voz
- [ ] Análisis biométrico en tiempo real
- [ ] Planes de suscripción premium

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar AURUM WELLNESS:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Super Agente Wellness Team**

- 🌐 Website: [aurumlab.com](#)
- 📧 Email: contact@aurumlab.com
- 🐦 Twitter: [@AurumLab](#)

---

## 🙏 Agradecimientos

- Inspiración visual de **The Matrix** (1999)
- Comunidad de desarrolladores web
- Todos los que buscan transformación y bienestar

---

<div align="center">

**Hecho con 💛 y código verde**

`AURUM WELLNESS © 2025`

</div>
