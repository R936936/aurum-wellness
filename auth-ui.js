/**
 * AURUM WELLNESS - AUTHENTICATION UI
 * Interfaz de usuario para login/registro
 * Version: 1.0.0
 */

class AurumAuthUI {
    constructor() {
        this.isLoginMode = true;
        this.onAuthSuccess = null;
    }

    // ==========================================
    // RENDERIZAR PANTALLA DE AUTENTICACIÓN
    // ==========================================
    
    render(onSuccess) {
        this.onAuthSuccess = onSuccess;
        
        const authHTML = `
            <div class="auth-overlay" id="authOverlay">
                <div class="auth-container">
                    <!-- Header -->
                    <div class="auth-header">
                        <div class="auth-logo">
                            <span class="glow-text">AURUM</span>
                            <span class="wellness-text">WELLNESS</span>
                        </div>
                        <div class="auth-subtitle">
                            Sistema de Transformación Personal
                        </div>
                    </div>

                    <!-- Morpheus Welcome Message -->
                    <div class="morpheus-welcome">
                        <div class="morpheus-avatar">💎</div>
                        <div class="morpheus-text">
                            <p class="typing-text">Hola. Soy Morpheus.</p>
                            <p class="typing-text typing-delay-1">Te estaba esperando.</p>
                            <p class="typing-text typing-delay-2">
                                Esta es tu última oportunidad. Después, no hay vuelta atrás.
                            </p>
                        </div>
                    </div>

                    <!-- Form Container -->
                    <div class="auth-form-container">
                        <div class="auth-tabs">
                            <button class="auth-tab active" id="loginTab" onclick="window.AuthUI.switchToLogin()">
                                INICIAR SESIÓN
                            </button>
                            <button class="auth-tab" id="registerTab" onclick="window.AuthUI.switchToRegister()">
                                CREAR CUENTA
                            </button>
                        </div>

                        <!-- Login Form -->
                        <form id="loginForm" class="auth-form">
                            <div class="form-group">
                                <label for="loginUsername">
                                    <span class="label-icon">👤</span> Usuario
                                </label>
                                <input 
                                    type="text" 
                                    id="loginUsername" 
                                    placeholder="Ingresa tu usuario"
                                    autocomplete="username"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label for="loginPassword">
                                    <span class="label-icon">🔒</span> Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    id="loginPassword" 
                                    placeholder="Ingresa tu contraseña"
                                    autocomplete="current-password"
                                    required
                                />
                            </div>

                            <div class="form-message" id="loginMessage"></div>

                            <button type="submit" class="auth-submit-btn">
                                <span class="btn-icon">🚪</span>
                                ENTRAR A LA MATRIX
                            </button>
                        </form>

                        <!-- Register Form -->
                        <form id="registerForm" class="auth-form" style="display: none;">
                            <div class="form-group">
                                <label for="registerUsername">
                                    <span class="label-icon">👤</span> Usuario
                                </label>
                                <input 
                                    type="text" 
                                    id="registerUsername" 
                                    placeholder="Elige un nombre de usuario"
                                    autocomplete="username"
                                    minlength="3"
                                    required
                                />
                                <small>Mínimo 3 caracteres</small>
                            </div>

                            <div class="form-group">
                                <label for="registerEmail">
                                    <span class="label-icon">📧</span> Email (opcional)
                                </label>
                                <input 
                                    type="email" 
                                    id="registerEmail" 
                                    placeholder="tu@email.com"
                                    autocomplete="email"
                                />
                            </div>

                            <div class="form-group">
                                <label for="registerPassword">
                                    <span class="label-icon">🔒</span> Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    id="registerPassword" 
                                    placeholder="Crea una contraseña segura"
                                    autocomplete="new-password"
                                    minlength="6"
                                    required
                                />
                                <small>Mínimo 6 caracteres</small>
                            </div>

                            <div class="form-group">
                                <label for="registerPasswordConfirm">
                                    <span class="label-icon">🔒</span> Confirmar Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    id="registerPasswordConfirm" 
                                    placeholder="Repite tu contraseña"
                                    autocomplete="new-password"
                                    minlength="6"
                                    required
                                />
                            </div>

                            <div class="form-message" id="registerMessage"></div>

                            <button type="submit" class="auth-submit-btn">
                                <span class="btn-icon">💊</span>
                                TOMAR LA PÍLDORA ROJA
                            </button>
                        </form>
                    </div>

                    <!-- Footer -->
                    <div class="auth-footer">
                        <p class="morpheus-quote">
                            "Todo lo que te ofrezco es la verdad. Nada más."
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', authHTML);
        this.attachEventListeners();
        this.startTypingAnimation();
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    
    attachEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    // ==========================================
    // HANDLE LOGIN
    // ==========================================
    
    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const messageEl = document.getElementById('loginMessage');
        
        if (!username || !password) {
            this.showMessage(messageEl, 'Por favor completa todos los campos', 'error');
            return;
        }
        
        // Mostrar loading
        this.showMessage(messageEl, 'Verificando credenciales...', 'loading');
        
        // Simular delay de red (para efecto visual)
        await this.delay(500);
        
        const result = window.AurumAuth.login(username, password);
        
        if (result.success) {
            this.showMessage(messageEl, '✅ ' + result.message, 'success');
            await this.delay(1000);
            this.closeAuthScreen(result.user);
        } else {
            this.showMessage(messageEl, '❌ ' + result.message, 'error');
        }
    }

    // ==========================================
    // HANDLE REGISTER
    // ==========================================
    
    async handleRegister(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        const messageEl = document.getElementById('registerMessage');
        
        // Validaciones
        if (!username || !password || !passwordConfirm) {
            this.showMessage(messageEl, 'Por favor completa todos los campos requeridos', 'error');
            return;
        }
        
        if (password !== passwordConfirm) {
            this.showMessage(messageEl, 'Las contraseñas no coinciden', 'error');
            return;
        }
        
        // Mostrar loading
        this.showMessage(messageEl, 'Creando tu cuenta...', 'loading');
        
        // Simular delay de red
        await this.delay(500);
        
        const result = window.AurumAuth.register(username, password, email);
        
        if (result.success) {
            this.showMessage(messageEl, '✅ ' + result.message, 'success');
            await this.delay(1000);
            
            // Auto-login después de registro
            const loginResult = window.AurumAuth.login(username, password);
            if (loginResult.success) {
                this.closeAuthScreen(loginResult.user);
            }
        } else {
            this.showMessage(messageEl, '❌ ' + result.message, 'error');
        }
    }

    // ==========================================
    // UI HELPERS
    // ==========================================
    
    switchToLogin() {
        this.isLoginMode = true;
        
        document.getElementById('loginTab').classList.add('active');
        document.getElementById('registerTab').classList.remove('active');
        
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        
        // Limpiar mensajes
        document.getElementById('loginMessage').textContent = '';
        document.getElementById('registerMessage').textContent = '';
    }
    
    switchToRegister() {
        this.isLoginMode = false;
        
        document.getElementById('loginTab').classList.remove('active');
        document.getElementById('registerTab').classList.add('active');
        
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        
        // Limpiar mensajes
        document.getElementById('loginMessage').textContent = '';
        document.getElementById('registerMessage').textContent = '';
    }
    
    showMessage(element, message, type = 'info') {
        element.textContent = message;
        element.className = 'form-message ' + type;
        element.style.display = 'block';
    }
    
    async closeAuthScreen(user) {
        const overlay = document.getElementById('authOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            await this.delay(500);
            overlay.remove();
        }
        
        if (this.onAuthSuccess) {
            this.onAuthSuccess(user);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    startTypingAnimation() {
        // Animación de typing para mensajes de Morpheus
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'typing 2s steps(40, end), blink 0.75s step-end infinite';
                el.style.opacity = '1';
            }, index * 2000);
        });
    }
}

// Instancia global
window.AuthUI = new AurumAuthUI();

console.log('🎨 Sistema de Autenticación UI: ACTIVO');
