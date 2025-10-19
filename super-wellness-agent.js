// ═══════════════════════════════════════════════════════════════════════════
// SUPER WELLNESS AGENT - Multi-IA Fusionado
// Combina: OpenAI GPT-4 + Morpheus Local + Copilot Concepts
// Versión: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════

class SuperWellnessAgent {
    constructor() {
        this.config = window.AURUM_CONFIG || this.getDefaultConfig();
        this.morpheus = window.WellnessCore?.morpheus;
        this.conversationHistory = [];
        
        console.log('🤖 SuperWellnessAgent initialized');
        console.log('📡 OpenAI enabled:', this.config.openai.enabled);
        console.log('🔄 Fallback enabled:', this.config.morpheus.fallbackEnabled);
    }
    
    getDefaultConfig() {
        return {
            openai: { enabled: false },
            morpheus: { fallbackEnabled: true, systemPrompt: '' },
            system: { debugMode: false, logResponses: false }
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // MÉTODO PRINCIPAL: Procesar Query
    // ═══════════════════════════════════════════════════════════════════════
    
    async process(query) {
        if (this.config.system.debugMode) {
            console.log('🔍 Processing query:', query);
        }
        
        try {
            // Prioridad 1: OpenAI GPT-4 (si está habilitado)
            if (this.config.openai.enabled && this.config.openai.apiKey) {
                const openaiResponse = await this.tryOpenAI(query);
                if (openaiResponse) {
                    this.logResponse('OpenAI', query, openaiResponse);
                    return openaiResponse;
                }
            }
            
            // Prioridad 2: Morpheus Local (fallback)
            if (this.morpheus && this.config.morpheus.fallbackEnabled) {
                const morpheusResponse = await this.tryMorpheusLocal(query);
                if (morpheusResponse) {
                    this.logResponse('Morpheus Local', query, morpheusResponse);
                    return morpheusResponse;
                }
            }
            
            // Prioridad 3: Respuesta básica de emergencia
            const basicResponse = this.getBasicResponse(query);
            this.logResponse('Basic Fallback', query, basicResponse);
            return basicResponse;
            
        } catch (error) {
            console.error('❌ Error in SuperWellnessAgent:', error);
            return this.getErrorResponse();
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // OpenAI GPT-4 Integration
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryOpenAI(query) {
        try {
            const messages = [
                {
                    role: 'system',
                    content: this.config.morpheus.systemPrompt
                },
                ...this.conversationHistory.slice(-5), // Últimas 5 conversaciones
                {
                    role: 'user',
                    content: query
                }
            ];
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.openai.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.openai.model,
                    messages: messages,
                    max_tokens: this.config.openai.maxTokens,
                    temperature: this.config.openai.temperature
                })
            });
            
            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;
            
            // Guardar en historial
            this.conversationHistory.push(
                { role: 'user', content: query },
                { role: 'assistant', content: assistantMessage }
            );
            
            console.log('✅ OpenAI response received');
            return assistantMessage;
            
        } catch (error) {
            console.warn('⚠️ OpenAI failed, falling back:', error.message);
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // Morpheus Local Fallback
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryMorpheusLocal(query) {
        try {
            if (!this.morpheus || !this.morpheus.generateResponse) {
                throw new Error('Morpheus local not available');
            }
            
            const response = await this.morpheus.generateResponse(query);
            console.log('✅ Morpheus local response');
            return response;
            
        } catch (error) {
            console.warn('⚠️ Morpheus local failed:', error.message);
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // Respuestas Básicas de Emergencia
    // ═══════════════════════════════════════════════════════════════════════
    
    getBasicResponse(query) {
        const q = query.toLowerCase().trim();
        
        const basicResponses = {
            hola: "Saludos. Soy Morpheus, tu guía en Aurum Wellness. ¿En qué puedo ayudarte? 💎",
            ayuda: "Puedo ayudarte con: programas, nutrición, ciencia (cetosis, autofagia), motivación. ¿Qué te interesa?",
            gracias: "El placer es mío. Recuerda: la transformación comienza con una decisión. 🌟"
        };
        
        // Buscar coincidencias
        for (const [key, value] of Object.entries(basicResponses)) {
            if (q.includes(key)) return value;
        }
        
        return "Interesante pregunta. Intenta con: hola, ayuda, detox, cetosis, motivación. Estoy aquí para guiarte. 💎";
    }
    
    getErrorResponse() {
        return "Hubo un problema técnico. Por favor, intenta de nuevo o escribe 'ayuda'. 🔧";
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // Utilidades
    // ═══════════════════════════════════════════════════════════════════════
    
    logResponse(source, query, response) {
        if (!this.config.system.logResponses) return;
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📊 Response from: ${source}`);
        console.log(`❓ Query: ${query}`);
        console.log(`💬 Response: ${response.substring(0, 100)}...`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    clearHistory() {
        this.conversationHistory = [];
        console.log('🗑️ Conversation history cleared');
    }
    
    getStats() {
        return {
            openaiEnabled: this.config.openai.enabled,
            morpheusAvailable: !!this.morpheus,
            conversationLength: this.conversationHistory.length,
            debugMode: this.config.system.debugMode
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// Inicialización Global
// ═══════════════════════════════════════════════════════════════════════════

// Esperar a que WellnessCore esté listo
if (typeof window !== 'undefined') {
    const initSuperAgent = () => {
        if (window.WellnessCore) {
            window.SuperWellnessAgent = new SuperWellnessAgent();
            console.log('✅ SuperWellnessAgent ready');
        } else {
            console.log('⏳ Waiting for WellnessCore...');
            setTimeout(initSuperAgent, 100);
        }
    };
    
    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSuperAgent);
    } else {
        initSuperAgent();
    }
}
