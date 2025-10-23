// ═══════════════════════════════════════════════════════════════════════════
// SUPER WELLNESS AGENT TRINITY - Multi-IA de Poder Máximo
// Versión: 4.0.0 - Trinity Edition
// Combina: Claude + Perplexity + Gemini + GPT-4 + Morpheus Local
// ═══════════════════════════════════════════════════════════════════════════

class SuperWellnessAgentTrinity {
    constructor() {
        this.config = window.AURUM_CONFIG || this.getDefaultConfig();
        this.router = new window.TrinityRouter(this.config);
        this.morpheus = window.WellnessCore?.morpheus;
        this.conversationHistory = [];
        
        this.logInitialization();
    }
    
    logInitialization() {
        console.log('%c🔱═══════════════════════════════════════════════════════════', 'color: #00ff00; font-weight: bold');
        console.log('%c   SUPER WELLNESS AGENT TRINITY v4.0 INITIALIZED', 'color: #FFD700; font-weight: bold; font-size: 14px');
        console.log('%c🔱═══════════════════════════════════════════════════════════', 'color: #00ff00; font-weight: bold');
        console.log('');
        console.log('🧠 Claude 3.5:', this.isEnabled('claude') ? '✅ ACTIVO' : '⚪ Inactivo');
        console.log('🔍 Perplexity:', this.isEnabled('perplexity') ? '✅ ACTIVO' : '⚪ Inactivo');
        console.log('⚡ Gemini 2.0:', this.isEnabled('gemini') ? '✅ ACTIVO' : '⚪ Inactivo');
        console.log('🤖 OpenAI GPT-4:', this.isEnabled('openai') ? '✅ ACTIVO' : '⚪ Inactivo');
        console.log('💎 Morpheus Local:', this.config.morpheus?.fallbackEnabled ? '✅ ACTIVO' : '⚪ Inactivo');
        console.log('');
        console.log('🔱 Trinity System: READY');
        console.log('');
    }
    
    isEnabled(aiName) {
        return this.config[aiName]?.enabled && this.config[aiName]?.apiKey;
    }
    
    getDefaultConfig() {
        return {
            claude: { enabled: false },
            perplexity: { enabled: false },
            gemini: { enabled: false },
            openai: { enabled: false },
            morpheus: { fallbackEnabled: true },
            trinity: { enabled: true },
            system: { debugMode: false }
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // MÉTODO PRINCIPAL: Procesar Query con Trinity Router
    // ═══════════════════════════════════════════════════════════════════════
    
    async process(query) {
        try {
            // 1. Usar Trinity Router para decidir qué IA usar
            const routingDecision = this.router.route(query);
            const selectedAI = routingDecision.ai;
            
            if (this.config.system?.debugMode) {
                console.log('🔱 Query:', query);
                console.log('   Routing:', routingDecision);
            }
            
            // 2. Intentar con la IA seleccionada
            let response = await this.tryAI(selectedAI, query);
            
            // 3. Si falla, usar fallback chain
            if (!response) {
                response = await this.fallbackChain(query, selectedAI);
            }
            
            // 4. Si todo falla, usar Morpheus local
            if (!response) {
                response = await this.tryMorpheusLocal(query);
            }
            
            // 5. Último recurso: respuesta básica
            if (!response) {
                response = this.getBasicResponse(query);
            }
            
            return response;
            
        } catch (error) {
            console.error('❌ Error in SuperWellnessAgentTrinity:', error);
            return this.getErrorResponse();
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // INTENTAR IA ESPECÍFICA
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryAI(aiName, query) {
        const methods = {
            'claude': () => this.tryClaude(query),
            'perplexity': () => this.tryPerplexity(query),
            'gemini': () => this.tryGemini(query),
            'openai': () => this.tryOpenAI(query),
            'morpheus': () => this.tryMorpheusLocal(query)
        };
        
        const method = methods[aiName];
        if (!method) {
            console.warn(`⚠️ AI method not found: ${aiName}`);
            return null;
        }
        
        try {
            const response = await method();
            if (response) {
                this.logSuccess(aiName, query, response);
                return response;
            }
        } catch (error) {
            console.warn(`⚠️ ${aiName} failed:`, error.message);
        }
        
        return null;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // CLAUDE 3.5 SONNET - Razonamiento Profundo
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryClaude(query) {
        if (!this.isEnabled('claude')) return null;
        
        try {
            console.log('🧠 Intentando Claude 3.5 Sonnet...');
            
            const messages = this.buildMessages(query);
            
            const response = await fetch(this.config.claude.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.config.claude.apiKey,
                    'anthropic-version': this.config.claude.version
                },
                body: JSON.stringify({
                    model: this.config.claude.model,
                    max_tokens: this.config.claude.maxTokens,
                    temperature: this.config.claude.temperature,
                    system: this.config.morpheus.systemPrompt,
                    messages: messages
                })
            });
            
            if (!response.ok) {
                throw new Error(`Claude API error: ${response.status}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.content[0].text;
            
            this.updateHistory(query, assistantMessage);
            return assistantMessage;
            
        } catch (error) {
            console.warn('⚠️ Claude failed:', error.message);
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // PERPLEXITY AI - Research en Tiempo Real
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryPerplexity(query) {
        if (!this.isEnabled('perplexity')) return null;
        
        try {
            console.log('🔍 Intentando Perplexity AI...');
            
            const messages = [
                {
                    role: 'system',
                    content: this.config.morpheus.systemPrompt
                },
                ...this.conversationHistory.slice(-5),
                {
                    role: 'user',
                    content: query
                }
            ];
            
            const response = await fetch(this.config.perplexity.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.perplexity.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.perplexity.model,
                    messages: messages,
                    max_tokens: this.config.perplexity.maxTokens,
                    temperature: this.config.perplexity.temperature,
                    search_domain_filter: this.config.perplexity.searchDomainFilter
                })
            });
            
            if (!response.ok) {
                throw new Error(`Perplexity API error: ${response.status}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;
            
            // Agregar citations si están disponibles
            let fullResponse = assistantMessage;
            if (data.citations && data.citations.length > 0) {
                fullResponse += '\n\n📚 Fuentes:\n';
                data.citations.forEach((citation, i) => {
                    fullResponse += `${i + 1}. ${citation}\n`;
                });
            }
            
            this.updateHistory(query, fullResponse);
            return fullResponse;
            
        } catch (error) {
            console.warn('⚠️ Perplexity failed:', error.message);
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // GEMINI 2.0 FLASH - Velocidad Ultra
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryGemini(query) {
        if (!this.isEnabled('gemini')) return null;
        
        try {
            console.log('⚡ Intentando Gemini 2.0 Flash...');
            
            const context = this.formatConversationForGemini(query);
            const url = `${this.config.gemini.endpoint}/${this.config.gemini.model}:generateContent?key=${this.config.gemini.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: context }] }],
                    generationConfig: {
                        temperature: this.config.gemini.temperature,
                        maxOutputTokens: this.config.gemini.maxTokens
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.candidates[0].content.parts[0].text;
            
            this.updateHistory(query, assistantMessage);
            return assistantMessage;
            
        } catch (error) {
            console.warn('⚠️ Gemini failed:', error.message);
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // OPENAI GPT-4 - Balanceado y Confiable
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryOpenAI(query) {
        if (!this.isEnabled('openai')) return null;
        
        try {
            console.log('🤖 Intentando OpenAI GPT-4...');
            
            const messages = [
                { role: 'system', content: this.config.morpheus.systemPrompt },
                ...this.conversationHistory.slice(-5),
                { role: 'user', content: query }
            ];
            
            const response = await fetch(this.config.openai.endpoint, {
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
            
            this.updateHistory(query, assistantMessage);
            return assistantMessage;
            
        } catch (error) {
            console.warn('⚠️ OpenAI failed:', error.message);
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // MORPHEUS LOCAL - Fallback Inteligente
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryMorpheusLocal(query) {
        if (!this.config.morpheus?.fallbackEnabled) return null;
        
        console.log('💎 Usando Morpheus Local...');
        
        if (this.morpheus && typeof this.morpheus.respond === 'function') {
            try {
                const response = await this.morpheus.respond(query);
                return response;
            } catch (error) {
                console.warn('⚠️ Morpheus Local error:', error);
            }
        }
        
        return this.getBasicResponse(query);
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // FALLBACK CHAIN - Intentar IAs en cascada
    // ═══════════════════════════════════════════════════════════════════════
    
    async fallbackChain(query, excludeAI) {
        const chain = this.config.trinity.fallbackChain.filter(ai => ai !== excludeAI);
        
        for (const aiName of chain) {
            if (this.isEnabled(aiName) || aiName === 'morpheus_local') {
                const response = await this.tryAI(aiName === 'morpheus_local' ? 'morpheus' : aiName, query);
                if (response) {
                    console.log(`✅ Fallback success: ${aiName}`);
                    return response;
                }
            }
        }
        
        return null;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // UTILIDADES
    // ═══════════════════════════════════════════════════════════════════════
    
    buildMessages(query) {
        return [
            ...this.conversationHistory.slice(-5),
            { role: 'user', content: query }
        ];
    }
    
    formatConversationForGemini(query) {
        let context = `${this.config.morpheus.systemPrompt}\n\n`;
        
        const recent = this.conversationHistory.slice(-10);
        if (recent.length > 0) {
            context += "Conversación previa:\n";
            recent.forEach(msg => {
                context += `${msg.role === 'user' ? 'Usuario' : 'Morpheus'}: ${msg.content}\n`;
            });
            context += "\n";
        }
        
        context += `Usuario: ${query}\nMorpheus:`;
        return context;
    }
    
    updateHistory(query, response) {
        this.conversationHistory.push(
            { role: 'user', content: query, timestamp: Date.now() },
            { role: 'assistant', content: response, timestamp: Date.now() }
        );
        
        // Mantener últimas 20 entradas
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
    }
    
    logSuccess(aiName, query, response) {
        if (this.config.system?.logResponses) {
            console.log('✅ Response from:', aiName);
            if (this.config.system?.showAISource) {
                console.log('   Query:', query.substring(0, 100) + '...');
                console.log('   Length:', response.length, 'chars');
            }
        }
    }
    
    getBasicResponse(query) {
        const responses = {
            'hola': 'Hola, soy Morpheus, tu guía de wellness. ¿En qué puedo ayudarte hoy?',
            'default': 'Estoy aquí para ayudarte con tu transformación wellness. ¿Qué te gustaría saber?'
        };
        
        const key = query.toLowerCase().includes('hola') ? 'hola' : 'default';
        return responses[key];
    }
    
    getErrorResponse() {
        return 'Tuve un problema técnico momentáneo. Por favor, intenta de nuevo.';
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // API PÚBLICA
    // ═══════════════════════════════════════════════════════════════════════
    
    getStats() {
        return this.router.getStats();
    }
    
    resetStats() {
        this.router.resetStats();
    }
    
    getVersion() {
        return '4.0.0-trinity';
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN GLOBAL
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    // Esperar a que TrinityRouter esté cargado
    if (window.TrinityRouter) {
        window.SuperWellnessAgent = new SuperWellnessAgentTrinity();
        console.log('✅ SuperWellnessAgentTrinity ready');
    } else {
        console.error('❌ TrinityRouter not loaded! Load trinity-router.js first');
    }
}
