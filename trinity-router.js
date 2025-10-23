// ═══════════════════════════════════════════════════════════════════════════
// TRINITY ROUTER - Sistema Inteligente de Decisión de IA
// Versión: 4.0.0
// Decide qué IA usar según el tipo de consulta
// ═══════════════════════════════════════════════════════════════════════════

class TrinityRouter {
    constructor(config) {
        this.config = config;
        this.stats = {
            claude: 0,
            perplexity: 0,
            gemini: 0,
            openai: 0,
            morpheus: 0
        };
        
        console.log('🔱 Trinity Router initialized');
        console.log('   Strategy:', this.config.trinity.routingStrategy);
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
        const routes = this.config.trinity.routes;
        
        // Analizar patrones en la query
        const scores = {
            claude: this.calculateScore(queryLower, routes.claude),
            perplexity: this.calculateScore(queryLower, routes.perplexity),
            gemini: this.calculateScore(queryLower, routes.gemini),
            openai: this.calculateScore(queryLower, routes.openai)
        };
        
        // Log de decisión (si debug está activo)
        if (this.config.system.debugMode && this.config.trinity.monitoring.logDecisions) {
            console.log('🔱 Trinity Router - Análisis de query:', query);
            console.log('   Scores:', scores);
        }
        
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
    
    calculateScore(query, aiRoute) {
        let score = 0;
        
        // Chequear keywords
        if (aiRoute.keywords) {
            aiRoute.keywords.forEach(keyword => {
                if (query.includes(keyword)) {
                    score += 2; // Peso fuerte por keyword match
                }
            });
        }
        
        // Análisis adicional basado en características de la query
        const queryLength = query.split(' ').length;
        
        // Queries largas y complejas → Claude
        if (aiRoute === this.config.trinity.routes.claude && queryLength > 15) {
            score += 1;
        }
        
        // Queries sobre estudios/evidencia → Perplexity
        if (aiRoute === this.config.trinity.routes.perplexity) {
            if (query.includes('estudio') || query.includes('investigación') || 
                query.includes('evidencia') || query.includes('científico')) {
                score += 3; // Peso muy fuerte
            }
        }
        
        // Queries cortas y simples → Gemini
        if (aiRoute === this.config.trinity.routes.gemini && queryLength < 8) {
            score += 1;
        }
        
        return score;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // RUTEO POR PRIORIDAD - Usa la primera IA disponible
    // ═══════════════════════════════════════════════════════════════════════
    
    priorityRouting() {
        const priority = [
            { name: 'claude', priority: this.config.claude.priority },
            { name: 'perplexity', priority: this.config.perplexity.priority },
            { name: 'gemini', priority: this.config.gemini.priority },
            { name: 'openai', priority: this.config.openai.priority }
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
        const fallbackChain = this.config.trinity.fallbackChain;
        
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
        switch (aiName) {
            case 'claude':
                return this.config.claude?.enabled && this.config.claude?.apiKey;
            case 'perplexity':
                return this.config.perplexity?.enabled && this.config.perplexity?.apiKey;
            case 'gemini':
                return this.config.gemini?.enabled && this.config.gemini?.apiKey;
            case 'openai':
                return this.config.openai?.enabled && this.config.openai?.apiKey;
            case 'morpheus':
            case 'morpheus_local':
                return this.config.morpheus?.fallbackEnabled;
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
