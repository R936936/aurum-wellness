// ═══════════════════════════════════════════════════════════════════════
// 🔐 AURUM WELLNESS - SISTEMA DE USUARIOS Y TRACKING
// ═══════════════════════════════════════════════════════════════════════

class AurumUserSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        console.log('🔐 Sistema de Usuarios Inicializado');
    }

    // ═══════════════════════════════════════════════════════════════════
    // GESTIÓN DE USUARIOS
    // ═══════════════════════════════════════════════════════════════════

    loadUsers() {
        try {
            const users = localStorage.getItem('aurumUsers');
            return users ? JSON.parse(users) : {};
        } catch (error) {
            console.error('Error loading users:', error);
            return {};
        }
    }

    saveUsers() {
        try {
            localStorage.setItem('aurumUsers', JSON.stringify(this.users));
            return true;
        } catch (error) {
            console.error('Error saving users:', error);
            return false;
        }
    }

    createUser(username, password) {
        if (this.users[username]) {
            return { success: false, message: 'Usuario ya existe' };
        }

        this.users[username] = {
            username,
            password: btoa(password), // Simple encoding (NOT production-safe)
            createdAt: new Date().toISOString(),
            nivel: 1,
            xp: 0,
            programs: {
                detox: { active: false, day: 0, completedDays: [], lastUpdate: null },
                energia: { active: false, day: 0, completedDays: [], lastUpdate: null },
                balance: { active: false, day: 0, completedDays: [], lastUpdate: null },
                regeneracion: { active: false, day: 0, completedDays: [], lastUpdate: null }
            },
            recipes: [],
            metrics: {
                weight: null,
                bodyFat: null,
                energy: 5,
                mood: 5,
                sleep: 5,
                measurements: []
            },
            chatHistory: [],
            preferences: {
                theme: 'matrix',
                notifications: true
            }
        };

        this.saveUsers();
        console.log('✅ Usuario creado:', username);
        return { success: true, message: 'Usuario creado exitosamente' };
    }

    login(username, password) {
        const user = this.users[username];
        if (!user) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        if (atob(user.password) !== password) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        this.currentUser = user;
        sessionStorage.setItem('aurumCurrentUser', username);
        console.log('✅ Login exitoso:', username);
        return { success: true, message: 'Bienvenido de vuelta', user };
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('aurumCurrentUser');
        console.log('👋 Logout exitoso');
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const username = sessionStorage.getItem('aurumCurrentUser');
            if (username && this.users[username]) {
                this.currentUser = this.users[username];
            }
        }
        return this.currentUser;
    }

    // ═══════════════════════════════════════════════════════════════════
    // SISTEMA DE PROGRAMAS
    // ═══════════════════════════════════════════════════════════════════

    activateProgram(programName) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Usuario no autenticado' };

        const program = user.programs[programName];
        if (!program) return { success: false, message: 'Programa no encontrado' };

        program.active = true;
        program.day = 1;
        program.lastUpdate = new Date().toISOString();

        this.saveUsers();
        return { success: true, program: this.getProgramDetails(programName) };
    }

    deactivateProgram(programName) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Usuario no autenticado' };

        const program = user.programs[programName];
        if (!program) return { success: false, message: 'Programa no encontrado' };

        program.active = false;
        this.saveUsers();
        return { success: true };
    }

    updateProgramDay(programName) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Usuario no autenticado' };

        const program = user.programs[programName];
        if (!program || !program.active) {
            return { success: false, message: 'Programa no activo' };
        }

        program.day += 1;
        program.completedDays.push(new Date().toISOString());
        program.lastUpdate = new Date().toISOString();

        // Ganar XP por completar día
        this.addXP(50);

        this.saveUsers();
        return { success: true, day: program.day };
    }

    getProgramDetails(programName) {
        const programs = {
            detox: {
                name: 'Programa Detox',
                duration: 21,
                description: 'Limpieza profunda celular',
                benefits: ['Autofagia activada', 'Inflamación reducida', 'Energía aumentada'],
                icon: '🌿'
            },
            energia: {
                name: 'Energía Vital',
                duration: 30,
                description: 'Optimización mitocondrial',
                benefits: ['Mitocondrias optimizadas', 'ATP máximo', 'Vitalidad extrema'],
                icon: '⚡'
            },
            balance: {
                name: 'Balance Mental',
                duration: 40,
                description: 'Coherencia neuronal',
                benefits: ['Claridad mental', 'Enfoque laser', 'Paz interior'],
                icon: '☯️'
            },
            regeneracion: {
                name: 'Regeneración',
                duration: 90,
                description: 'Renovación celular completa',
                benefits: ['Células renovadas', 'Telómeros protegidos', 'Longevidad activada'],
                icon: '🔄'
            }
        };

        return programs[programName];
    }

    // ═══════════════════════════════════════════════════════════════════
    // SISTEMA DE RECETAS
    // ═══════════════════════════════════════════════════════════════════

    addRecipe(recipe) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Usuario no autenticado' };

        recipe.id = Date.now();
        recipe.createdAt = new Date().toISOString();
        user.recipes.push(recipe);

        this.addXP(20);
        this.saveUsers();
        return { success: true, recipe };
    }

    getRecipes() {
        const user = this.getCurrentUser();
        if (!user) return [];
        return user.recipes;
    }

    deleteRecipe(recipeId) {
        const user = this.getCurrentUser();
        if (!user) return { success: false };

        user.recipes = user.recipes.filter(r => r.id !== recipeId);
        this.saveUsers();
        return { success: true };
    }

    // ═══════════════════════════════════════════════════════════════════
    // SISTEMA DE XP Y NIVELES
    // ═══════════════════════════════════════════════════════════════════

    addXP(amount) {
        const user = this.getCurrentUser();
        if (!user) return;

        user.xp += amount;

        // Calcular nivel (cada 100 XP = 1 nivel)
        const newLevel = Math.floor(user.xp / 100) + 1;
        if (newLevel > user.nivel) {
            user.nivel = newLevel;
            console.log('🎉 ¡NIVEL UP! Nuevo nivel:', newLevel);
        }

        this.saveUsers();
    }

    getProgress() {
        const user = this.getCurrentUser();
        if (!user) return { nivel: 1, xp: 0, progress: 0 };

        const xpInLevel = user.xp % 100;
        const progress = xpInLevel;

        return {
            nivel: user.nivel,
            xp: user.xp,
            progress,
            xpToNextLevel: 100 - xpInLevel
        };
    }

    // ═══════════════════════════════════════════════════════════════════
    // MÉTRICAS Y TRACKING
    // ═══════════════════════════════════════════════════════════════════

    updateMetrics(metrics) {
        const user = this.getCurrentUser();
        if (!user) return { success: false };

        Object.assign(user.metrics, metrics);
        
        user.metrics.measurements.push({
            date: new Date().toISOString(),
            ...metrics
        });

        this.saveUsers();
        return { success: true };
    }

    getMetrics() {
        const user = this.getCurrentUser();
        if (!user) return null;
        return user.metrics;
    }

    // ═══════════════════════════════════════════════════════════════════
    // HISTORIAL DE CHAT
    // ═══════════════════════════════════════════════════════════════════

    addChatMessage(message, response) {
        const user = this.getCurrentUser();
        if (!user) return;

        user.chatHistory.push({
            timestamp: new Date().toISOString(),
            message,
            response
        });

        // Mantener solo últimos 100 mensajes
        if (user.chatHistory.length > 100) {
            user.chatHistory = user.chatHistory.slice(-100);
        }

        this.saveUsers();
    }

    getChatHistory() {
        const user = this.getCurrentUser();
        if (!user) return [];
        return user.chatHistory;
    }
}

// ═══════════════════════════════════════════════════════════════════════
// MENSAJES DE BIENVENIDA EDUCATIVOS
// ═══════════════════════════════════════════════════════════════════════

const MORPHEUS_WELCOME_MESSAGES = [
    {
        topic: 'cetosis',
        message: 'La cetosis no es solo una dieta, es un estado metabólico donde tu cuerpo quema grasa como combustible primario. Tus mitocondrias producen cetonas: beta-hidroxibutirato, acetoacetato y acetona. Estas moléculas cruzan la barrera hematoencefálica y alimentan tu cerebro con energía limpia. ¿Estás listo para cambiar de combustible?'
    },
    {
        topic: 'autofagia',
        message: 'La autofagia es tu sistema de reciclaje celular. Cuando ayunas 16+ horas, activas el proceso donde lisosomas digieren organelas dañadas, proteínas mal plegadas y patógenos intracelulares. Es como renovar tu maquinaria celular. El Premio Nobel 2016 fue otorgado por descubrir este mecanismo. Tu cuerpo sabe cómo sanarse.'
    },
    {
        topic: 'cuantica',
        message: 'La física cuántica revela que eres más vacío que materia. Los electrones en tus átomos existen en superposición hasta que los observas. Tu conciencia colapsa la función de onda. El entrelazamiento cuántico conecta partículas instantáneamente sin importar la distancia. Tu biología opera en el reino cuántico. ¿Puedes sentir la vibración?'
    },
    {
        topic: 'mitocondrias',
        message: 'Tienes trillones de mitocondrias, las centrales eléctricas de tus células. Cada una produce ATP a través de la cadena de transporte de electrones. Fueron bacterias independientes hace 2 mil millones de años. Ahora son parte de ti, con su propio ADN. Optimízalas y optimizas tu vida. El ayuno y las cetonas las hacen más eficientes.'
    },
    {
        topic: 'neuroplasticidad',
        message: 'Tu cerebro se reconfigura constantemente. Neuroplasticidad: la capacidad de formar nuevas conexiones neuronales. Ayuno + ejercicio + aprendizaje = BDNF (Factor Neurotrófico Derivado del Cerebro). Esta proteína es como fertilizante para tus neuronas. Puedes reescribir tu mente. La Matrix es más flexible de lo que crees.'
    },
    {
        topic: 'epigenetica',
        message: 'Tus genes no son tu destino. La epigenética muestra cómo el ambiente modifica la expresión genética sin cambiar el ADN. Metilación, acetilación de histonas... tu estilo de vida enciende o apaga genes. El ayuno, el ejercicio, la meditación modifican tu epigenoma. Eres el programador de tu biología.'
    },
    {
        topic: 'inflamacion',
        message: 'La inflamación crónica es la raíz de casi todas las enfermedades: Alzheimer, cáncer, diabetes, autoinmunidad. Citoquinas proinflamatorias (IL-6, TNF-α) mantienen tu cuerpo en estado de alerta constante. La cetosis reduce inflamación. El ayuno activa autofagia que limpia células dañadas. Apaga el fuego interno.'
    },
    {
        topic: 'circadian',
        message: 'Tu reloj circadiano regula más de 1000 genes. La luz azul nocturna suprime melatonina, desincroniza tu ritmo. El ayuno alineado con ciclos luz-oscuridad optimiza todo: metabolismo, hormones, reparación celular. Come con el sol. Ayuna con la luna. Tu ADN fue diseñado para seguir el ritmo cósmico.'
    }
];

function getRandomWelcomeMessage() {
    const msg = MORPHEUS_WELCOME_MESSAGES[Math.floor(Math.random() * MORPHEUS_WELCOME_MESSAGES.length)];
    return msg.message;
}

// ═══════════════════════════════════════════════════════════════════════
// Inicializar sistema global
// ═══════════════════════════════════════════════════════════════════════

window.AurumUserSystem = new AurumUserSystem();
window.getRandomWelcomeMessage = getRandomWelcomeMessage;

console.log('✅ Sistema de Usuarios y Tracking: ACTIVO');
