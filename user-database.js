/**
 * AURUM WELLNESS - USER DATABASE SYSTEM v2.0
 * Sistema de base de datos persistente para tracking de usuarios
 * Almacena: perfiles, progreso, recetas, programas activos
 */

class UserDatabase {
    constructor() {
        this.storageKey = 'aurum_wellness_users';
        this.currentUser = null;
        this.initDatabase();
    }

    /**
     * Inicializa la base de datos desde localStorage
     */
    initDatabase() {
        const stored = localStorage.getItem(this.storageKey);
        if (!stored) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
        console.log('💾 User Database initialized');
    }

    /**
     * Obtiene todos los usuarios
     */
    getAllUsers() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    /**
     * Guarda todos los usuarios
     */
    saveAllUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    /**
     * Obtiene un usuario por username
     */
    getUser(username) {
        const users = this.getAllUsers();
        return users[username] || null;
    }

    /**
     * Crea un nuevo usuario
     */
    createUser(username, password) {
        const users = this.getAllUsers();
        
        if (users[username]) {
            return { success: false, message: 'Usuario ya existe' };
        }

        const newUser = {
            username,
            password, // En producción usar hash
            createdAt: new Date().toISOString(),
            profile: {
                nivel: 1,
                xp: 0,
                peso_inicial: null,
                peso_actual: null,
                altura: null,
                edad: null,
                objetivo: null
            },
            programas: {
                activos: [],
                completados: [],
                progreso: {}
            },
            recetas: {
                favoritas: [],
                creadas: [],
                historial: []
            },
            estadisticas: {
                dias_activo: 0,
                consultas_morpheus: 0,
                recetas_completadas: 0,
                programas_completados: 0,
                ultima_actividad: new Date().toISOString()
            },
            tracking: {
                peso: [],
                energia: [],
                animo: [],
                sueno: []
            }
        };

        users[username] = newUser;
        this.saveAllUsers(users);
        
        return { success: true, message: 'Usuario creado exitosamente', user: newUser };
    }

    /**
     * Autentica un usuario
     */
    authenticate(username, password) {
        const user = this.getUser(username);
        
        if (!user) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        this.currentUser = username;
        this.updateLastActivity();
        
        return { success: true, message: 'Login exitoso', user };
    }

    /**
     * Actualiza última actividad
     */
    updateLastActivity() {
        if (!this.currentUser) return;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            user.estadisticas.ultima_actividad = new Date().toISOString();
            user.estadisticas.dias_activo++;
            this.saveAllUsers(users);
        }
    }

    /**
     * Actualiza perfil del usuario
     */
    updateProfile(updates) {
        if (!this.currentUser) return false;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            Object.assign(user.profile, updates);
            this.saveAllUsers(users);
            return true;
        }
        
        return false;
    }

    /**
     * Agrega un programa activo
     */
    addProgram(programId, programData) {
        if (!this.currentUser) return false;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            const program = {
                id: programId,
                nombre: programData.nombre,
                inicio: new Date().toISOString(),
                duracion_dias: programData.duracion,
                progreso: 0,
                dias_completados: 0,
                estado: 'activo',
                tracking_diario: []
            };
            
            user.programas.activos.push(program);
            user.programas.progreso[programId] = program;
            this.saveAllUsers(users);
            return true;
        }
        
        return false;
    }

    /**
     * Actualiza progreso de programa
     */
    updateProgramProgress(programId, dia, datos) {
        if (!this.currentUser) return false;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user && user.programas.progreso[programId]) {
            const program = user.programas.progreso[programId];
            program.dias_completados = dia;
            program.progreso = (dia / program.duracion_dias) * 100;
            program.tracking_diario.push({
                dia,
                fecha: new Date().toISOString(),
                datos
            });
            
            this.saveAllUsers(users);
            return true;
        }
        
        return false;
    }

    /**
     * Agrega una receta
     */
    addReceta(receta) {
        if (!this.currentUser) return false;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            const nuevaReceta = {
                id: Date.now(),
                ...receta,
                creada: new Date().toISOString(),
                veces_preparada: 0
            };
            
            user.recetas.creadas.push(nuevaReceta);
            this.saveAllUsers(users);
            return nuevaReceta;
        }
        
        return false;
    }

    /**
     * Marca receta como preparada
     */
    markRecetaPreparada(recetaId) {
        if (!this.currentUser) return false;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            const receta = user.recetas.creadas.find(r => r.id === recetaId);
            if (receta) {
                receta.veces_preparada++;
                receta.ultima_preparacion = new Date().toISOString();
            }
            
            user.recetas.historial.push({
                receta_id: recetaId,
                fecha: new Date().toISOString()
            });
            
            user.estadisticas.recetas_completadas++;
            this.saveAllUsers(users);
            return true;
        }
        
        return false;
    }

    /**
     * Agrega tracking de peso
     */
    addPesoTracking(peso) {
        if (!this.currentUser) return false;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            user.tracking.peso.push({
                fecha: new Date().toISOString(),
                peso
            });
            
            user.profile.peso_actual = peso;
            this.saveAllUsers(users);
            return true;
        }
        
        return false;
    }

    /**
     * Incrementa contador de consultas a Morpheus
     */
    incrementMorpheusConsultas() {
        if (!this.currentUser) return;
        
        const users = this.getAllUsers();
        const user = users[this.currentUser];
        
        if (user) {
            user.estadisticas.consultas_morpheus++;
            this.saveAllUsers(users);
        }
    }

    /**
     * Obtiene estadísticas del usuario actual
     */
    getStats() {
        if (!this.currentUser) return null;
        
        const user = this.getUser(this.currentUser);
        return user ? user.estadisticas : null;
    }

    /**
     * Obtiene datos del usuario actual
     */
    getCurrentUserData() {
        if (!this.currentUser) return null;
        return this.getUser(this.currentUser);
    }

    /**
     * Cierra sesión
     */
    logout() {
        this.currentUser = null;
    }
}

// Instancia global
window.UserDB = new UserDatabase();
console.log('✅ UserDatabase ready');
