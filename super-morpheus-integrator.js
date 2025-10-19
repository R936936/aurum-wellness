/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  💎 INTEGRADOR SUPER MORPHEUS HÍBRIDO
 *  Conecta el sistema híbrido con el chat UI existente
 * ═══════════════════════════════════════════════════════════════════════════
 */

class SuperMorpheusIntegrator {
    constructor() {
        this.hybrid = window.superMorpheus;
        this.isInitialized = false;
    }

    /**
     * Inicializar el integrador
     */
    async initialize() {
        if (this.isInitialized) return;
        
        console.log('🔌 Iniciando integración Super Morpheus Híbrido...');
        
        // Reemplazar el método de chat original
        this.patchOriginalChatSystem();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        this.isInitialized = true;
        console.log('✅ Super Morpheus Híbrido integrado correctamente');
    }

    /**
     * Reemplazar sistema de chat original con el híbrido
     */
    patchOriginalChatSystem() {
        // Guardar referencia al sistema original
        const originalChatAgent = window.chatAgent || window.wellnessAgent;
        
        if (originalChatAgent) {
            // Reemplazar método principal
            const originalRespond = originalChatAgent.respond || originalChatAgent.getResponse;
            
            originalChatAgent.respondOriginal = originalRespond;
            originalChatAgent.respond = async function(query, context = {}) {
                try {
                    // Usar Super Morpheus Híbrido
                    const response = await window.superMorpheus.respond(query, context);
                    
                    // Agregar indicador visual de qué sistema se usó
                    console.log(`✨ Respuesta generada por: ${response.source} (confianza: ${(response.confidence * 100).toFixed(0)}%)`);
                    
                    return response.content;
                } catch (error) {
                    console.error('Error en Super Morpheus, usando fallback:', error);
                    return originalRespond.call(this, query, context);
                }
            };
            
            console.log('✅ Sistema de chat parcheado con Super Morpheus');
        }
    }

    /**
     * Configurar event listeners para UI
     */
    setupEventListeners() {
        // Event listener para el botón de envío de chat
        document.addEventListener('chatMessageSent', (event) => {
            const { message, context } = event.detail;
            this.handleChatMessage(message, context);
        });
        
        // Event listener para cambios de configuración
        document.addEventListener('configurationChanged', (event) => {
            this.handleConfigurationChange(event.detail);
        });
    }

    /**
     * Manejar mensaje de chat
     */
    async handleChatMessage(message, context = {}) {
        // Enriquecer contexto con información del usuario
        const enrichedContext = {
            ...context,
            userName: this.getUserName(),
            userLevel: this.getUserLevel(),
            userProgress: this.getUserProgress()
        };
        
        // Responder con el sistema híbrido
        return await this.hybrid.respond(message, enrichedContext);
    }

    /**
     * Manejar cambios de configuración
     */
    handleConfigurationChange(config) {
        // Reinicializar el sistema híbrido si es necesario
        if (config.openaiEnabled !== undefined) {
            this.hybrid.aiSystems.chatgpt.available = config.openaiEnabled;
            this.hybrid.currentModel = this.hybrid.determineOptimalMode();
            console.log(`🔄 Modo actualizado a: ${this.hybrid.currentModel}`);
        }
    }

    /**
     * Obtener información del usuario desde localStorage
     */
    getUserName() {
        try {
            const userData = localStorage.getItem('aurumUserData');
            if (userData) {
                const data = JSON.parse(userData);
                return data.name || data.username || 'Usuario';
            }
        } catch (e) {
            console.error('Error leyendo nombre de usuario:', e);
        }
        return 'Usuario';
    }

    getUserLevel() {
        try {
            const progressData = localStorage.getItem('aurumProgress');
            if (progressData) {
                const data = JSON.parse(progressData);
                return data.level || 1;
            }
        } catch (e) {
            console.error('Error leyendo nivel de usuario:', e);
        }
        return 1;
    }

    getUserProgress() {
        try {
            const progressData = localStorage.getItem('aurumProgress');
            if (progressData) {
                return JSON.parse(progressData);
            }
        } catch (e) {
            console.error('Error leyendo progreso de usuario:', e);
        }
        return {};
    }

    /**
     * Método público para cambiar modo manualmente
     */
    setMode(mode) {
        const validModes = ['hybrid', 'chatgpt-only', 'wellness-only', 'fallback'];
        if (validModes.includes(mode)) {
            this.hybrid.currentModel = mode;
            console.log(`✅ Modo cambiado a: ${mode}`);
            return true;
        }
        console.error(`❌ Modo inválido: ${mode}`);
        return false;
    }

    /**
     * Obtener estado del sistema
     */
    getSystemStatus() {
        return {
            mode: this.hybrid.currentModel,
            systems: this.hybrid.aiSystems,
            conversationHistory: this.hybrid.conversationHistory.length,
            initialized: this.isInitialized
        };
    }

    /**
     * Limpiar historial de conversación
     */
    clearHistory() {
        this.hybrid.conversationHistory = [];
        console.log('🗑️ Historial de conversación limpiado');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  AUTO-INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════════════════

// Crear instancia global del integrador
window.morpheusIntegrator = new SuperMorpheusIntegrator();

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.morpheusIntegrator.initialize();
    });
} else {
    window.morpheusIntegrator.initialize();
}

// Exponer utilidades globales
window.SuperMorpheus = {
    setMode: (mode) => window.morpheusIntegrator.setMode(mode),
    getStatus: () => window.morpheusIntegrator.getSystemStatus(),
    clearHistory: () => window.morpheusIntegrator.clearHistory(),
    respond: (message, context) => window.superMorpheus.respond(message, context)
};

console.log('═══════════════════════════════════════════════════════════');
console.log('  🔌 SUPER MORPHEUS - INTEGRADO Y LISTO');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('💡 Comandos disponibles en consola:');
console.log('   SuperMorpheus.setMode("hybrid")  - Cambiar modo');
console.log('   SuperMorpheus.getStatus()        - Ver estado');
console.log('   SuperMorpheus.clearHistory()     - Limpiar historial');
console.log('   SuperMorpheus.respond("...")     - Probar respuesta');
console.log('');
