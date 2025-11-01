/**
 * AURUM WELLNESS - AUTHENTICATION SYSTEM
 * Sistema de autenticación local con tracking personalizado
 * Version: 1.0.0
 * Date: 1 de Noviembre, 2025
 */

class AurumAuthSystem {
    constructor() {
        this.usersKey = 'aurum_users';
        this.currentUserKey = 'aurum_current_user';
        this.sessionsKey = 'aurum_sessions';
        this.initializeSystem();
    }

    initializeSystem() {
        // Inicializar almacenamiento de usuarios si no existe
        if (!localStorage.getItem(this.usersKey)) {
            localStorage.setItem(this.usersKey, JSON.stringify({}));
        }
        
        // Verificar sesión activa
        const currentUser = this.getCurrentUser();
        if (currentUser && !this.validateSession(currentUser.username)) {
            this.logout();
        }
    }

    // ==========================================
    // REGISTRO DE USUARIO
    // ==========================================
    
    register(username, password, email = '') {
        const users = this.getUsers();
        
        // Validaciones
        if (!username || username.length < 3) {
            return { 
                success: false, 
                message: 'El nombre de usuario debe tener al menos 3 caracteres' 
            };
        }
        
        if (!password || password.length < 6) {
            return { 
                success: false, 
                message: 'La contraseña debe tener al menos 6 caracteres' 
            };
        }
        
        if (users[username]) {
            return { 
                success: false, 
                message: 'Este usuario ya existe' 
            };
        }
        
        // Crear nuevo usuario
        const newUser = {
            username: username,
            password: this.hashPassword(password),
            email: email,
            createdAt: new Date().toISOString(),
            profile: {
                level: 1,
                experience: 0,
                totalConsultas: 0,
                streak: 0,
                lastLogin: null
            },
            programs: {
                detox: {
                    active: false,
                    progress: 0,
                    startDate: null,
                    completedDays: 0,
                    notes: []
                },
                energia: {
                    active: false,
                    progress: 0,
                    startDate: null,
                    completedDays: 0,
                    notes: []
                },
                balance: {
                    active: false,
                    progress: 0,
                    startDate: null,
                    completedDays: 0,
                    notes: []
                },
                regeneracion: {
                    active: false,
                    progress: 0,
                    startDate: null,
                    completedDays: 0,
                    notes: []
                }
            },
            recipes: [],
            chatHistory: [],
            metrics: {
                totalSessions: 0,
                totalTime: 0,
                favoriteTopics: [],
                achievements: []
            }
        };
        
        users[username] = newUser;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        return { 
            success: true, 
            message: 'Usuario registrado exitosamente',
            user: this.sanitizeUser(newUser)
        };
    }

    // ==========================================
    // LOGIN DE USUARIO
    // ==========================================
    
    login(username, password) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) {
            return { 
                success: false, 
                message: 'Usuario no encontrado' 
            };
        }
        
        if (!this.verifyPassword(password, user.password)) {
            return { 
                success: false, 
                message: 'Contraseña incorrecta' 
            };
        }
        
        // Actualizar último login y streak
        const today = new Date().toDateString();
        const lastLogin = user.profile.lastLogin 
            ? new Date(user.profile.lastLogin).toDateString() 
            : null;
        
        if (lastLogin) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastLogin === yesterday.toDateString()) {
                user.profile.streak++;
            } else if (lastLogin !== today) {
                user.profile.streak = 1;
            }
        } else {
            user.profile.streak = 1;
        }
        
        user.profile.lastLogin = new Date().toISOString();
        user.metrics.totalSessions++;
        
        // Guardar cambios
        users[username] = user;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        // Crear sesión
        this.createSession(username);
        
        return { 
            success: true, 
            message: 'Login exitoso',
            user: this.sanitizeUser(user)
        };
    }

    // ==========================================
    // LOGOUT
    // ==========================================
    
    logout() {
        localStorage.removeItem(this.currentUserKey);
        localStorage.removeItem(this.sessionsKey);
        return { success: true, message: 'Sesión cerrada' };
    }

    // ==========================================
    // GESTIÓN DE SESIONES
    // ==========================================
    
    createSession(username) {
        const session = {
            username: username,
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            sessionId: this.generateSessionId()
        };
        
        localStorage.setItem(this.currentUserKey, JSON.stringify(session));
        localStorage.setItem(this.sessionsKey, JSON.stringify(session));
    }
    
    validateSession(username) {
        const session = localStorage.getItem(this.currentUserKey);
        if (!session) return false;
        
        try {
            const sessionData = JSON.parse(session);
            
            // Verificar que la sesión pertenece al usuario
            if (sessionData.username !== username) return false;
            
            // Verificar que la sesión no haya expirado (24 horas)
            const lastActivity = new Date(sessionData.lastActivity);
            const now = new Date();
            const hoursDiff = (now - lastActivity) / (1000 * 60 * 60);
            
            if (hoursDiff > 24) {
                this.logout();
                return false;
            }
            
            // Actualizar última actividad
            sessionData.lastActivity = now.toISOString();
            localStorage.setItem(this.currentUserKey, JSON.stringify(sessionData));
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    getCurrentUser() {
        const session = localStorage.getItem(this.currentUserKey);
        if (!session) return null;
        
        try {
            const sessionData = JSON.parse(session);
            const users = this.getUsers();
            const user = users[sessionData.username];
            
            return user ? this.sanitizeUser(user) : null;
        } catch (e) {
            return null;
        }
    }
    
    isAuthenticated() {
        const session = localStorage.getItem(this.currentUserKey);
        if (!session) return false;
        
        try {
            const sessionData = JSON.parse(session);
            return this.validateSession(sessionData.username);
        } catch (e) {
            return false;
        }
    }

    // ==========================================
    // ACTUALIZACIÓN DE DATOS DE USUARIO
    // ==========================================
    
    updateUserData(username, updates) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) {
            return { success: false, message: 'Usuario no encontrado' };
        }
        
        // Merge de actualizaciones (deep merge)
        this.deepMerge(user, updates);
        
        users[username] = user;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        return { 
            success: true, 
            message: 'Datos actualizados',
            user: this.sanitizeUser(user)
        };
    }
    
    addExperience(username, amount) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) return { success: false };
        
        user.profile.experience += amount;
        
        // Sistema de niveles (cada 100 XP = 1 nivel)
        const newLevel = Math.floor(user.profile.experience / 100) + 1;
        if (newLevel > user.profile.level) {
            user.profile.level = newLevel;
            // Logro de subida de nivel
            user.metrics.achievements.push({
                type: 'level_up',
                level: newLevel,
                date: new Date().toISOString()
            });
        }
        
        users[username] = user;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        return { 
            success: true, 
            level: user.profile.level,
            experience: user.profile.experience 
        };
    }
    
    saveChat(username, message, response, aiUsed) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) return { success: false };
        
        const chatEntry = {
            timestamp: new Date().toISOString(),
            message: message,
            response: response,
            aiUsed: aiUsed
        };
        
        user.chatHistory.push(chatEntry);
        user.profile.totalConsultas++;
        
        // Limitar historial a últimas 100 conversaciones
        if (user.chatHistory.length > 100) {
            user.chatHistory = user.chatHistory.slice(-100);
        }
        
        users[username] = user;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        return { success: true };
    }
    
    addRecipe(username, recipe) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) return { success: false };
        
        recipe.id = this.generateId();
        recipe.createdAt = new Date().toISOString();
        
        user.recipes.push(recipe);
        
        users[username] = user;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        return { success: true, recipe: recipe };
    }
    
    updateProgram(username, programName, updates) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user || !user.programs[programName]) {
            return { success: false, message: 'Programa no encontrado' };
        }
        
        Object.assign(user.programs[programName], updates);
        
        users[username] = user;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        return { success: true, program: user.programs[programName] };
    }

    // ==========================================
    // UTILIDADES
    // ==========================================
    
    getUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.usersKey)) || {};
        } catch (e) {
            return {};
        }
    }
    
    sanitizeUser(user) {
        // Retornar copia del usuario sin la contraseña
        const sanitized = { ...user };
        delete sanitized.password;
        return sanitized;
    }
    
    hashPassword(password) {
        // Simple hash (en producción usar bcrypt o similar)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
    
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    deepMerge(target, source) {
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                this.deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    // ==========================================
    // ESTADÍSTICAS Y MÉTRICAS
    // ==========================================
    
    getUserStats(username) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) return null;
        
        const activePrograms = Object.keys(user.programs)
            .filter(key => user.programs[key].active);
        
        const totalProgress = Object.values(user.programs)
            .reduce((sum, prog) => sum + prog.progress, 0) / 4;
        
        return {
            level: user.profile.level,
            experience: user.profile.experience,
            streak: user.profile.streak,
            totalConsultas: user.profile.totalConsultas,
            totalSessions: user.metrics.totalSessions,
            recipesCount: user.recipes.length,
            activePrograms: activePrograms.length,
            totalProgress: Math.round(totalProgress),
            achievements: user.metrics.achievements.length,
            memberSince: new Date(user.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    }
}

// Exportar instancia global
window.AurumAuth = new AurumAuthSystem();

console.log('🔐 Sistema de Autenticación Aurum: ACTIVO');
