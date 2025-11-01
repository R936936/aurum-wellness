# 🔐 PLAN DE IMPLEMENTACIÓN - SISTEMA DE AUTENTICACIÓN

## 📅 Fecha: Sábado 1 de Noviembre 2024

---

## 🎯 OBJETIVO

Implementar un sistema completo de autenticación que permita a cada usuario:
- Crear cuenta personalizada
- Iniciar sesión
- Mantener historial de conversaciones
- Trackear progreso en programas
- Guardar recetas favoritas
- Ver dashboard personalizado

---

## 📋 ARQUITECTURA PROPUESTA

### Opción Recomendada: Vercel KV + Edge Functions

```
Frontend (index.html)
    ↓
Vercel Edge Functions (api/)
    ↓
Vercel KV (Redis)
    ↓
Datos del Usuario
```

### Ventajas:
✅ Integración nativa con Vercel  
✅ Ultra rápido (Edge Network)  
✅ Gratis hasta 256MB  
✅ 100,000 requests/día gratis  
✅ Setup en minutos  

---

## 🗂️ ESTRUCTURA DE ARCHIVOS A CREAR

```
aurum-wellness/
├── api/
│   ├── auth/
│   │   ├── login.js          # POST /api/auth/login
│   │   ├── register.js       # POST /api/auth/register
│   │   └── logout.js         # POST /api/auth/logout
│   ├── user/
│   │   ├── profile.js        # GET /api/user/profile
│   │   ├── update.js         # PUT /api/user/update
│   │   └── progress.js       # GET /api/user/progress
│   ├── programs/
│   │   ├── detox.js          # GET/POST /api/programs/detox
│   │   ├── energy.js         # GET/POST /api/programs/energy
│   │   ├── balance.js        # GET/POST /api/programs/balance
│   │   └── regeneration.js   # GET/POST /api/programs/regeneration
│   ├── recipes/
│   │   ├── create.js         # POST /api/recipes/create
│   │   ├── list.js           # GET /api/recipes/list
│   │   └── delete.js         # DELETE /api/recipes/:id
│   └── chat/
│       ├── history.js        # GET /api/chat/history
│       └── save.js           # POST /api/chat/save
├── js/
│   ├── auth.js               # Lógica de autenticación frontend
│   ├── user-manager.js       # Gestión de usuario
│   ├── programs-manager.js   # Gestión de programas
│   └── recipes-manager.js    # Gestión de recetas
└── screens/
    ├── login.html            # Pantalla de login
    ├── register.html         # Pantalla de registro
    └── dashboard.html        # Dashboard personalizado
```

---

## 💾 MODELO DE DATOS

### User Schema (Vercel KV)

```javascript
// Key: user:{userId}
{
  id: "uuid-v4",
  username: "rafael_wellness",
  email: "rafael@example.com",
  passwordHash: "bcrypt-hash",
  profile: {
    nombre: "Rafael",
    edad: 35,
    peso: 80,
    altura: 175,
    objetivo: "detox"
  },
  stats: {
    nivel: 1,
    xp: 0,
    conversaciones: 0,
    programasCompletados: 0
  },
  createdAt: "2024-11-01T00:00:00Z",
  lastLogin: "2024-11-01T12:00:00Z"
}
```

### Session Schema

```javascript
// Key: session:{sessionToken}
{
  userId: "uuid-v4",
  token: "jwt-token",
  expiresAt: "2024-11-08T12:00:00Z",
  createdAt: "2024-11-01T12:00:00Z"
}
```

### Program Schema

```javascript
// Key: program:{userId}:{programType}
{
  userId: "uuid-v4",
  tipo: "detox", // detox, energy, balance, regeneration
  estado: "activo", // activo, completado, pausado
  progreso: 30, // porcentaje
  iniciado: "2024-11-01",
  ultimaActualizacion: "2024-11-01",
  metas: {
    dias: 21,
    checkpoints: [...]
  },
  tracking: [
    {
      fecha: "2024-11-01",
      completado: true,
      notas: "Día 1 excelente"
    }
  ]
}
```

### Recipe Schema

```javascript
// Key: recipe:{userId}:{recipeId}
{
  id: "uuid-v4",
  userId: "uuid-v4",
  nombre: "Ensalada Keto Verde",
  categoria: "almuerzo",
  ingredientes: [
    { nombre: "Aguacate", cantidad: "1 unidad" },
    { nombre: "Espinaca", cantidad: "2 tazas" }
  ],
  macros: {
    calorias: 350,
    proteina: 15,
    carbohidratos: 10,
    grasas: 28
  },
  instrucciones: "1. Picar aguacate...",
  createdAt: "2024-11-01T12:00:00Z",
  favorita: true
}
```

### Chat History Schema

```javascript
// Key: chat:{userId}:{timestamp}
{
  userId: "uuid-v4",
  conversacion: [
    {
      rol: "usuario",
      mensaje: "Hola, qué es cetosis?",
      timestamp: "2024-11-01T12:00:00Z"
    },
    {
      rol: "morpheus",
      mensaje: "Cetosis es...",
      timestamp: "2024-11-01T12:00:05Z",
      ia_usada: "gemini"
    }
  ],
  fecha: "2024-11-01",
  xp_ganado: 10
}
```

---

## 🔨 IMPLEMENTACIÓN PASO A PASO

### FASE 1: Setup Vercel KV (30 min)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login a Vercel
vercel login

# 3. Crear Vercel KV storage
vercel kv create aurum-wellness-db

# 4. Link al proyecto
vercel link

# 5. Agregar variables de entorno
vercel env add KV_URL
vercel env add KV_REST_API_URL
vercel env add KV_REST_API_TOKEN
```

### FASE 2: Crear API Endpoints (2 horas)

#### 1. API de Registro (`api/auth/register.js`)

```javascript
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  // Validar datos
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Verificar si usuario existe
  const existingUser = await kv.get(`user:email:${email}`);
  if (existingUser) {
    return res.status(409).json({ error: 'Email ya registrado' });
  }

  // Crear usuario
  const userId = uuidv4();
  const passwordHash = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: userId,
    username,
    email,
    passwordHash,
    profile: {
      nombre: username,
      objetivo: null
    },
    stats: {
      nivel: 1,
      xp: 0,
      conversaciones: 0,
      programasCompletados: 0
    },
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  // Guardar en KV
  await kv.set(`user:${userId}`, newUser);
  await kv.set(`user:email:${email}`, userId);

  // Crear sesión
  const sessionToken = uuidv4();
  await kv.set(`session:${sessionToken}`, {
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });

  return res.status(201).json({
    success: true,
    user: {
      id: userId,
      username,
      email
    },
    token: sessionToken
  });
}
```

#### 2. API de Login (`api/auth/login.js`)

```javascript
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Buscar usuario
  const userId = await kv.get(`user:email:${email}`);
  if (!userId) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const user = await kv.get(`user:${userId}`);
  
  // Verificar contraseña
  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Actualizar last login
  user.lastLogin = new Date().toISOString();
  await kv.set(`user:${userId}`, user);

  // Crear sesión
  const sessionToken = uuidv4();
  await kv.set(`session:${sessionToken}`, {
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      stats: user.stats
    },
    token: sessionToken
  });
}
```

### FASE 3: Frontend de Autenticación (1.5 horas)

#### Pantalla de Bienvenida/Login (inicio de index.html)

```html
<!-- Agregar al inicio del <body> -->
<div id="auth-screen" class="auth-container">
  <div class="auth-box">
    <h1 class="auth-title">AURUM WELLNESS</h1>
    <div class="matrix-subtitle">DESPIERTA TU POTENCIAL</div>
    
    <!-- Login Form -->
    <div id="login-form" class="auth-form">
      <h2>INICIAR SESIÓN</h2>
      <input 
        type="email" 
        id="login-email" 
        placeholder="Email"
        class="auth-input"
      />
      <input 
        type="password" 
        id="login-password" 
        placeholder="Contraseña"
        class="auth-input"
      />
      <button onclick="loginUser()" class="auth-btn">ENTRAR</button>
      <p class="auth-link">
        ¿No tienes cuenta? 
        <span onclick="showRegisterForm()">Regístrate aquí</span>
      </p>
    </div>

    <!-- Register Form (hidden initially) -->
    <div id="register-form" class="auth-form" style="display: none;">
      <h2>CREAR CUENTA</h2>
      <input 
        type="text" 
        id="register-username" 
        placeholder="Nombre de usuario"
        class="auth-input"
      />
      <input 
        type="email" 
        id="register-email" 
        placeholder="Email"
        class="auth-input"
      />
      <input 
        type="password" 
        id="register-password" 
        placeholder="Contraseña"
        class="auth-input"
      />
      <button onclick="registerUser()" class="auth-btn">CREAR CUENTA</button>
      <p class="auth-link">
        ¿Ya tienes cuenta? 
        <span onclick="showLoginForm()">Inicia sesión aquí</span>
      </p>
    </div>
  </div>
</div>
```

#### JavaScript de Autenticación (`js/auth.js`)

```javascript
// auth.js

// Verificar si usuario ya está logueado
function checkAuth() {
  const token = localStorage.getItem('aurumToken');
  if (token) {
    loadUserProfile();
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
  } else {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
  }
}

// Login
async function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar token y usuario
      localStorage.setItem('aurumToken', data.token);
      localStorage.setItem('aurumUser', JSON.stringify(data.user));
      
      // Mostrar app principal
      checkAuth();
      showWelcomeMessage(data.user.username);
    } else {
      alert(data.error || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

// Registro
async function registerUser() {
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (password.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres');
    return;
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar token y usuario
      localStorage.setItem('aurumToken', data.token);
      localStorage.setItem('aurumUser', JSON.stringify(data.user));
      
      // Mostrar app principal
      checkAuth();
      showWelcomeMessage(data.user.username);
    } else {
      alert(data.error || 'Error al crear cuenta');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem('aurumToken');
  localStorage.removeItem('aurumUser');
  location.reload();
}

// Cargar perfil de usuario
async function loadUserProfile() {
  const token = localStorage.getItem('aurumToken');
  const user = JSON.parse(localStorage.getItem('aurumUser'));
  
  // Actualizar UI con datos del usuario
  document.getElementById('username-display').textContent = user.username;
  document.getElementById('user-level').textContent = user.stats.nivel;
  document.getElementById('user-xp').textContent = user.stats.xp;
}

// Mensaje de bienvenida
function showWelcomeMessage(username) {
  addMessageToTerminal(
    `morpheus`,
    `Bienvenido de vuelta, ${username}. La Matrix te esperaba.`
  );
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', checkAuth);
```

### FASE 4: Activar Funcionalidades (3 horas)

#### Programa Detox

```javascript
// api/programs/detox.js
export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const session = await kv.get(`session:${token}`);
  
  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (req.method === 'GET') {
    // Obtener programa actual
    const program = await kv.get(`program:${session.userId}:detox`);
    return res.json(program || { estado: 'inactivo' });
  }

  if (req.method === 'POST') {
    // Iniciar o actualizar programa
    const { accion, datos } = req.body;
    
    if (accion === 'iniciar') {
      const newProgram = {
        userId: session.userId,
        tipo: 'detox',
        estado: 'activo',
        progreso: 0,
        iniciado: new Date().toISOString(),
        metas: {
          dias: datos.duracion || 21,
          objetivo: datos.objetivo
        },
        tracking: []
      };
      
      await kv.set(`program:${session.userId}:detox`, newProgram);
      return res.json({ success: true, program: newProgram });
    }

    if (accion === 'actualizar') {
      const program = await kv.get(`program:${session.userId}:detox`);
      program.tracking.push({
        fecha: new Date().toISOString(),
        completado: datos.completado,
        notas: datos.notas
      });
      program.progreso = (program.tracking.length / program.metas.dias) * 100;
      
      await kv.set(`program:${session.userId}:detox`, program);
      return res.json({ success: true, program });
    }
  }
}
```

---

## 🎨 CSS PARA AUTENTICACIÓN

```css
/* Agregar a wellness-ui.css */

.auth-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.auth-box {
  background: rgba(0, 20, 20, 0.9);
  border: 2px solid #00ff88;
  border-radius: 10px;
  padding: 40px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
}

.auth-title {
  color: #fff;
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff88, 0 0 30px #00ff88;
}

.matrix-subtitle {
  color: #00ff88;
  text-align: center;
  font-size: 14px;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.auth-form h2 {
  color: #00ff88;
  text-align: center;
  margin-bottom: 20px;
}

.auth-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff88;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
}

.auth-input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.auth-btn {
  width: 100%;
  padding: 15px;
  background: #00ff88;
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.auth-btn:hover {
  background: #00cc6a;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  transform: translateY(-2px);
}

.auth-link {
  color: #888;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.auth-link span {
  color: #00ff88;
  cursor: pointer;
  text-decoration: underline;
}

.auth-link span:hover {
  color: #00cc6a;
}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Setup Inicial:
- [ ] Instalar Vercel CLI
- [ ] Crear Vercel KV database
- [ ] Configurar variables de entorno
- [ ] Instalar dependencias (bcryptjs, uuid)

### Backend APIs:
- [ ] `/api/auth/register.js`
- [ ] `/api/auth/login.js`
- [ ] `/api/auth/logout.js`
- [ ] `/api/user/profile.js`
- [ ] `/api/programs/detox.js`
- [ ] `/api/programs/energy.js`
- [ ] `/api/programs/balance.js`
- [ ] `/api/programs/regeneration.js`
- [ ] `/api/recipes/create.js`
- [ ] `/api/recipes/list.js`
- [ ] `/api/chat/save.js`
- [ ] `/api/chat/history.js`

### Frontend:
- [ ] Pantalla de login HTML
- [ ] Pantalla de registro HTML
- [ ] JavaScript auth.js
- [ ] CSS de autenticación
- [ ] Integración con app principal

### Testing:
- [ ] Registro de nuevo usuario
- [ ] Login con credenciales correctas
- [ ] Login con credenciales incorrectas
- [ ] Persistencia de sesión
- [ ] Logout
- [ ] Protección de rutas

### Deployment:
- [ ] Push a GitHub
- [ ] Deploy a Vercel
- [ ] Verificar variables de entorno
- [ ] Testing en producción

---

## 🚀 COMANDOS ÚTILES

```bash
# Desarrollo local
vercel dev

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Ver variables de entorno
vercel env ls

# Agregar nueva variable
vercel env add VARIABLE_NAME
```

---

## 📊 ESTIMACIÓN DE TIEMPO

| Fase | Tiempo estimado |
|------|----------------|
| Setup Vercel KV | 30 min |
| APIs de autenticación | 2 horas |
| Frontend auth | 1.5 horas |
| APIs de programas | 2 horas |
| APIs de recetas | 1 hora |
| Testing completo | 1 hora |
| **TOTAL** | **8 horas** |

---

## 💡 TIPS IMPORTANTES

1. **Seguridad:**
   - Usar bcrypt para passwords
   - Validar todos los inputs
   - Implementar rate limiting
   - Usar HTTPS siempre

2. **Performance:**
   - Cachear datos de usuario en localStorage
   - Usar Redis para sesiones
   - Implementar lazy loading

3. **UX:**
   - Mensajes de error claros
   - Loading states
   - Validación en tiempo real
   - Auto-save de progreso

---

## 🎯 META PARA MAÑANA

**Al final del día, un usuario debe poder:**

1. ✅ Crear cuenta
2. ✅ Iniciar sesión
3. ✅ Ver su dashboard personalizado
4. ✅ Iniciar programa Detox
5. ✅ Crear una receta
6. ✅ Ver su progreso
7. ✅ Chatear con Morpheus y guardar historial

---

**¡A codear! 💪 El futuro wellness está en nuestras manos.** 🚀✨
