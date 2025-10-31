// ═══════════════════════════════════════════════════════════════════════════
// TRINITY ROUTER - Sistema Inteligente de Decisión de IA
// Versión: 4.0.0
// Decide qué IA usar según el tipo de consulta
// ═══════════════════════════════════════════════════════════════════════════

class TrinityRouter {
    constructor(config) {
        console.log('🔱 Trinity Router initialized');
        
        // Verificar que config existe y tiene las propiedades necesarias
        if (!config) {
            console.warn('⚠️ No config provided, using defaults');
            config = { trinity: { routingStrategy: 'intelligent', enabled: false } };
        }
        
        if (!config.trinity) {
            console.warn('⚠️ No trinity config, using defaults');
            config.trinity = { routingStrategy: 'intelligent', enabled: false };
        }
        
        this.config = config;
        this.stats = {
            claude: 0,
            perplexity: 0,
            gemini: 0,
            openai: 0,
            morpheus: 0
        };
        
        console.log('   Strategy:', this.config.trinity.routingStrategy || 'intelligent');
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // MÉTODO PRINCIPAL: Decidir qué IA usar
    // ═══════════════════════════════════════════════════════════════════════
    
    route(query) {
        const strategy = this.config.trinity.routingStrategy;
        
        switch (strategy) {
            case 'intelligent':
                return this.intelligentRouting(query);
            case 'priority':
                return this.priorityRouting();
            case 'fallback':
                return this.fallbackRouting();
            default:
                return this.intelligentRouting(query);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // RUTEO INTELIGENTE - Analiza la query y decide
    // ═══════════════════════════════════════════════════════════════════════
    
    intelligentRouting(query) {
        const queryLower = query.toLowerCase();
        
        // Definir rutas por defecto si no existen en config
        const routes = this.config.trinity.routes || {
            claude: ['plan', 'diseña', 'crea', 'analiza', 'profundo', 'detallado', '30 días', '90 días'],
            perplexity: ['estudios', 'investigación', 'evidencia', 'científico', 'papers', 'respalda'],
            gemini: ['receta', 'conversación', 'hola', 'que es', 'como', 'ayuda', 'general'],
            openai: ['balance', 'moderado', 'explicación', 'resumen']
        };
        
        // Analizar patrones en la query
        const scores = {
            claude: this.calculateScore(queryLower, routes.claude),
            perplexity: this.calculateScore(queryLower, routes.perplexity),
            gemini: this.calculateScore(queryLower, routes.gemini),
            openai: this.calculateScore(queryLower, routes.openai)
        };
        
        // Log de decisión (siempre en consola para debug)
        console.log('🔱 Trinity Router - Análisis de query:', query);
        console.log('   Scores:', scores);
        
        // Encontrar la mejor opción
        const bestMatch = Object.entries(scores).reduce((a, b) => 
            b[1] > a[1] ? b : a
        );
        
        const selectedAI = bestMatch[0];
        const confidence = bestMatch[1];
        
        // Si la confianza es baja, usar fallback
        if (confidence < 2) {
            return this.priorityRouting();
        }
        
        // Verificar que la IA seleccionada esté habilitada
        if (!this.isAIEnabled(selectedAI)) {
            console.log(`⚠️  ${selectedAI} seleccionada pero no está habilitada, usando fallback`);
            return this.priorityRouting();
        }
        
        this.stats[selectedAI]++;
        
        if (this.config.system.debugMode) {
            console.log(`✅ Trinity Router → ${selectedAI.toUpperCase()} (confidence: ${confidence})`);
        }
        
        return {
            ai: selectedAI,
            confidence: confidence,
            reason: this.getSelectionReason(selectedAI, queryLower)
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // CALCULAR SCORE - Evalúa qué tan bien match hace una IA
    // ═══════════════════════════════════════════════════════════════════════
    
    calculateScore(query, keywords) {
        let score = 0;
        
        // Si keywords es un array, buscar matches
        if (Array.isArray(keywords)) {
            keywords.forEach(keyword => {
                if (query.includes(keyword.toLowerCase())) {
                    score += 2; // Peso fuerte por keyword match
                }
            });
        }
        
        // Análisis adicional basado en características de la query
        const queryLength = query.split(' ').length;
        
        // Ajustar score por longitud de query
        if (queryLength > 15) {
            score += 1; // Queries largas
        } else if (queryLength < 5) {
            // Queries cortas tienen bonus para Gemini (verificado externamente)
        }
        
        // Bonus por palabras clave especiales
        if (query.includes('estudio') || query.includes('investigación') || 
            query.includes('evidencia') || query.includes('científico') || 
            query.includes('research')) {
            // Este score ayudará a Perplexity si sus keywords incluyen estos términos
            score += 1;
        }
        
        return score;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // RUTEO POR PRIORIDAD - Usa la primera IA disponible
    // ═══════════════════════════════════════════════════════════════════════
    
    priorityRouting() {
        // Soportar ambas estructuras de config
        const ais = this.config.trinity?.ais || this.config;
        
        const priority = [
            { name: 'claude', priority: ais.claude?.priority || 1 },
            { name: 'perplexity', priority: ais.perplexity?.priority || 3 },
            { name: 'gemini', priority: ais.gemini?.priority || 2 },
            { name: 'openai', priority: ais.openai?.priority || 4 }
        ].sort((a, b) => a.priority - b.priority);
        
        for (const ai of priority) {
            if (this.isAIEnabled(ai.name)) {
                this.stats[ai.name]++;
                return {
                    ai: ai.name,
                    confidence: 5,
                    reason: 'priority_routing'
                };
            }
        }
        
        // Si ninguna IA está disponible, usar Morpheus local
        this.stats.morpheus++;
        return {
            ai: 'morpheus',
            confidence: 5,
            reason: 'fallback_to_local'
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // RUTEO FALLBACK - Cascada completa
    // ═══════════════════════════════════════════════════════════════════════
    
    fallbackRouting() {
        const fallbackChain = this.config.trinity?.fallbackChain || ['gemini', 'openai', 'claude', 'perplexity', 'morpheus'];
        
        for (const aiName of fallbackChain) {
            if (this.isAIEnabled(aiName)) {
                this.stats[aiName]++;
                return {
                    ai: aiName,
                    confidence: 5,
                    reason: 'fallback_chain'
                };
            }
        }
        
        // Último recurso: Morpheus local
        this.stats.morpheus++;
        return {
            ai: 'morpheus',
            confidence: 5,
            reason: 'last_resort'
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // VERIFICAR SI IA ESTÁ HABILITADA
    // ═══════════════════════════════════════════════════════════════════════
    
    isAIEnabled(aiName) {
        // Soportar ambas estructuras: trinity.ais.X y X directamente
        const ais = this.config.trinity?.ais || this.config;
        
        switch (aiName) {
            case 'claude':
                return ais.claude?.enabled && ais.claude?.apiKey;
            case 'perplexity':
                return ais.perplexity?.enabled && ais.perplexity?.apiKey;
            case 'gemini':
                return ais.gemini?.enabled && ais.gemini?.apiKey;
            case 'openai':
                return ais.openai?.enabled && ais.openai?.apiKey;
            case 'morpheus':
            case 'morpheus_local':
                return this.config.morpheus?.enabled || true; // Morpheus siempre disponible
            default:
                return false;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // OBTENER RAZÓN DE SELECCIÓN
    // ═══════════════════════════════════════════════════════════════════════
    
    getSelectionReason(aiName, query) {
        const reasons = {
            claude: 'Razonamiento profundo y análisis complejo',
            perplexity: 'Research científico y validación',
            gemini: 'Respuesta rápida y eficiente',
            openai: 'Conversación general balanceada',
            morpheus: 'Fallback local inteligente'
        };
        
        return reasons[aiName] || 'Selección automática';
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // OBTENER ESTADÍSTICAS
    // ═══════════════════════════════════════════════════════════════════════
    
    getStats() {
        const total = Object.values(this.stats).reduce((a, b) => a + b, 0);
        const percentages = {};
        
        for (const [ai, count] of Object.entries(this.stats)) {
            percentages[ai] = total > 0 ? ((count / total) * 100).toFixed(1) + '%' : '0%';
        }
        
        return {
            raw: this.stats,
            percentages: percentages,
            total: total
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // RESET ESTADÍSTICAS
    // ═══════════════════════════════════════════════════════════════════════
    
    resetStats() {
        for (const key in this.stats) {
            this.stats[key] = 0;
        }
        console.log('📊 Trinity Router stats reset');
    }
}

// Exportar para uso en otros módulos
if (typeof window !== 'undefined') {
    window.TrinityRouter = TrinityRouter;
    console.log('✅ TrinityRouter class loaded');
}
