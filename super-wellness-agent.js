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
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🤖 SuperWellnessAgent initialized');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // OpenAI Status
        if (this.config.openai?.enabled) {
            if (this.config.openai?.apiKey) {
                const keyPreview = this.config.openai.apiKey.substring(0, 15) + '...';
                console.log('✅ OpenAI GPT-4: ACTIVO');
                console.log('   API Key:', keyPreview);
                console.log('   Model:', this.config.openai.model);
                console.log('   Temperature:', this.config.openai.temperature);
                console.log('💻 GitHub Copilot Context: INTEGRADO');
                console.log('   Modo: Enhanced system prompt con análisis técnico');
            } else {
                console.warn('⚠️ OpenAI HABILITADO pero SIN API KEY');
            }
        } else {
            console.log('⚪ OpenAI: Deshabilitado');
        }
        
        // Gemini Status
        if (this.config.gemini?.enabled) {
            if (this.config.gemini?.apiKey) {
                console.log('✅ Google Gemini: ACTIVO');
            } else {
                console.warn('⚠️ Gemini HABILITADO pero SIN API KEY');
            }
        } else {
            console.log('⚪ Gemini: Deshabilitado');
        }
        
        // Fallback Status
        console.log('🔄 Morpheus Local Fallback:', this.config.morpheus?.fallbackEnabled ? 'ACTIVO' : 'INACTIVO');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔱 Sistema Fusion: GPT-4 + Copilot + Morpheus');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    getDefaultConfig() {
        return {
            openai: { enabled: false },
            morpheus: { fallbackEnabled: true, systemPrompt: '' },
            system: { debugMode: false, logResponses: false }
        };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // MÉTODO PRINCIPAL: Procesar Query - Sistema Híbrido Multi-API
    // ═══════════════════════════════════════════════════════════════════════
    
    async process(query) {
        if (this.config.system?.debugMode) {
            console.log('🔍 Processing query:', query);
        }
        
        try {
            // Prioridad 1: Google Gemini (GRATIS, excelente calidad)
            if (this.config.gemini?.enabled && this.config.gemini?.apiKey) {
                const geminiResponse = await this.tryGemini(query);
                if (geminiResponse) {
                    this.logResponse('Google Gemini', query, geminiResponse);
                    return geminiResponse;
                }
            }
            
            // Prioridad 2: OpenAI GPT-4 (si está habilitado)
            if (this.config.openai?.enabled && this.config.openai?.apiKey) {
                const openaiResponse = await this.tryOpenAI(query);
                if (openaiResponse) {
                    this.logResponse('OpenAI GPT-4', query, openaiResponse);
                    return openaiResponse;
                }
            }
            
            // Prioridad 3: Morpheus Local Enhanced (fallback inteligente)
            if (this.config.morpheus?.fallbackEnabled) {
                const morpheusResponse = await this.tryMorpheusLocal(query);
                if (morpheusResponse) {
                    this.logResponse('Morpheus Local Enhanced', query, morpheusResponse);
                    return morpheusResponse;
                }
            }
            
            // Prioridad 4: Respuesta básica de emergencia
            const basicResponse = this.getBasicResponse(query);
            this.logResponse('Basic Fallback', query, basicResponse);
            return basicResponse;
            
        } catch (error) {
            console.error('❌ Error in SuperWellnessAgent:', error);
            return this.getErrorResponse();
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // Google Gemini Integration (GRATIS)
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryGemini(query) {
        try {
            // Construir contexto de conversación
            const conversationContext = this.formatConversationForGemini(query);
            
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.gemini.model}:generateContent?key=${this.config.gemini.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: conversationContext
                        }]
                    }],
                    generationConfig: {
                        temperature: this.config.gemini.temperature || 0.7,
                        maxOutputTokens: this.config.gemini.maxTokens || 1000,
                        topP: 0.8,
                        topK: 40
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_NONE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_NONE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_NONE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_NONE"
                        }
                    ]
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
            }
            
            const data = await response.json();
            
            if (!data.candidates || data.candidates.length === 0) {
                throw new Error('No response from Gemini');
            }
            
            const assistantMessage = data.candidates[0].content.parts[0].text;
            
            // Guardar en historial
            this.conversationHistory.push(
                { role: 'user', content: query, timestamp: Date.now() },
                { role: 'assistant', content: assistantMessage, timestamp: Date.now() }
            );
            
            // Mantener solo últimas 10 interacciones
            if (this.conversationHistory.length > 20) {
                this.conversationHistory = this.conversationHistory.slice(-20);
            }
            
            console.log('✅ Google Gemini response received');
            return assistantMessage;
            
        } catch (error) {
            console.warn('⚠️ Gemini failed, falling back:', error.message);
            return null;
        }
    }
    
    // Formatear conversación para Gemini
    formatConversationForGemini(query) {
        const systemPrompt = this.config.morpheus?.systemPrompt || 
            'Eres Morpheus, guía sabio de Aurum Wellness. Tu personalidad combina la sabiduría de Matrix con conocimiento científico de wellness.';
        
        let context = `${systemPrompt}\n\n`;
        
        // Agregar historial reciente (últimas 5 interacciones)
        const recentHistory = this.conversationHistory.slice(-10);
        if (recentHistory.length > 0) {
            context += "Contexto de conversación previa:\n";
            recentHistory.forEach(msg => {
                if (msg.role === 'user') {
                    context += `Usuario: ${msg.content}\n`;
                } else {
                    context += `Morpheus: ${msg.content}\n`;
                }
            });
            context += "\n";
        }
        
        context += `Usuario: ${query}\nMorpheus:`;
        
        return context;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // OpenAI GPT-4 Integration
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryOpenAI(query) {
        try {
            console.log('🚀 Intentando OpenAI GPT-4...');
            
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
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ OpenAI API Error:', response.status, errorData.error?.message || response.statusText);
                throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;
            
            // Guardar en historial
            this.conversationHistory.push(
                { role: 'user', content: query },
                { role: 'assistant', content: assistantMessage }
            );
            
            console.log('✅ OpenAI respuesta recibida exitosamente');
            console.log('📊 Tokens usados:', data.usage.total_tokens);
            return assistantMessage;
            
        } catch (error) {
            console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.error('❌ OpenAI FALLÓ - Cayendo a fallback');
            console.error('Error:', error.message);
            console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            return null;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // Morpheus Local Enhanced - Intelligent Contextual Response System
    // ═══════════════════════════════════════════════════════════════════════
    
    async tryMorpheusLocal(query) {
        try {
            // Sistema mejorado con contexto conversacional
            const response = this.getIntelligentResponse(query);
            console.log('✅ Morpheus Local Enhanced response (contextual)');
            return response;
            
        } catch (error) {
            console.warn('⚠️ Morpheus local failed:', error.message);
            return null;
        }
    }
    
    // 🧠 Sistema de respuesta inteligente con contexto
    getIntelligentResponse(query) {
        const q = query.toLowerCase().trim();
        
        // Análisis multi-capa
        const intent = this.detectIntent(q);
        const sentiment = this.analyzeSentiment(q);
        const entities = this.extractEntities(q);
        const context = this.getConversationContext();
        
        // Generar respuesta contextual personalizada
        const response = this.generateAdvancedResponse({
            query: q,
            originalQuery: query,
            intent,
            sentiment,
            entities,
            context
        });
        
        // Actualizar memoria conversacional
        this.updateConversationMemory(query, response, intent);
        
        return response;
    }
    
    // 🎯 Análisis de sentimiento
    analyzeSentiment(query) {
        const positiveWords = ['bien', 'excelente', 'genial', 'perfecto', 'gracias', 'increible', 'mejor'];
        const negativeWords = ['mal', 'cansado', 'triste', 'agotado', 'problema', 'dificil', 'ayuda'];
        const urgentWords = ['urgente', 'ahora', 'ya', 'rapido', 'inmediato'];
        
        const hasPositive = positiveWords.some(word => query.includes(word));
        const hasNegative = negativeWords.some(word => query.includes(word));
        const hasUrgent = urgentWords.some(word => query.includes(word));
        
        if (hasUrgent) return 'urgent';
        if (hasNegative) return 'negative';
        if (hasPositive) return 'positive';
        return 'neutral';
    }
    
    // 🔍 Extracción de entidades
    extractEntities(query) {
        return {
            hasTimeReference: /\b(hoy|mañana|ahora|cuando|cuanto tiempo|dias|semanas)\b/.test(query),
            hasPriceQuestion: /\b(precio|costo|cuanto|pagar|gratis)\b/.test(query),
            hasHealthIssue: /\b(dolor|enfermedad|problema|sintoma|cansancio|ansiedad|estres)\b/.test(query),
            hasGoal: /\b(quiero|necesito|objetivo|meta|busco|deseo)\b/.test(query),
            mentionsFood: /\b(comida|receta|comer|cocinar|plato)\b/.test(query)
        };
    }
    
    // 📝 Obtener contexto conversacional
    getConversationContext() {
        if (this.conversationHistory.length === 0) {
            return { isFirstMessage: true, messageCount: 0 };
        }
        
        const lastMessages = this.conversationHistory.slice(-3);
        const topics = lastMessages.map(msg => this.detectIntent(msg.content?.toLowerCase() || ''));
        
        return {
            isFirstMessage: false,
            messageCount: this.conversationHistory.length,
            recentTopics: topics,
            isFollowUp: topics.length > 0 && topics[topics.length - 1] === topics[topics.length - 2]
        };
    }
    
    // 💬 Generador avanzado de respuestas
    generateAdvancedResponse({ query, originalQuery, intent, sentiment, entities, context }) {
        // Si es seguimiento de conversación, dar respuesta contextual
        if (context.isFollowUp && context.recentTopics.length > 0) {
            const lastTopic = context.recentTopics[context.recentTopics.length - 1];
            return this.getFollowUpResponse(lastTopic, query, sentiment);
        }
        
        // Si hay urgencia o sentimiento negativo, priorizar empatía
        if (sentiment === 'urgent' || sentiment === 'negative') {
            return this.getEmpatheticResponse(intent, entities);
        }
        
        // Respuesta basada en intención principal
        return this.getContextualResponse(intent, entities, context);
    }
    
    // 🔄 Respuestas de seguimiento
    getFollowUpResponse(topic, query, sentiment) {
        const followUps = {
            detox: [
                "Para profundizar en el Detox: el primer paso es evaluar tu nivel actual. ¿Ya has hecho ayunos antes? Esto me ayuda a personalizar tu protocolo.",
                "Excelente interés en Detox. La clave está en empezar gradual: 3 días de transición → 7 días intensivos → 11 días de consolidación. ¿Quieres el plan paso a paso?"
            ],
            energy: [
                "Para multiplicar tu energía, necesitamos atacar 3 frentes: nutrición cetogénica, sueño optimizado y ejercicio estratégico. ¿Cuál es tu debilidad actual?",
                "La fatiga crónica tiene raíz metabólica. Te propongo: medición de cetonas + ajuste de electrolitos + protocolo de sueño. ¿Empezamos por el más urgente?"
            ],
            ketosis: [
                "Entrar en cetosis correctamente requiere: macros precisos (75% grasa, 20% proteína, 5% carbs) + hidratación + electrolitos. ¿Necesitas calculadora de macros?",
                "Cetosis profunda se alcanza en 48-72h con ayuno + ejercicio. Pero mantenerla es un arte. ¿Quieres el protocolo completo o tienes dudas específicas?"
            ]
        };
        
        const responses = followUps[topic] || [
            "Entiendo tu pregunta. ¿Podrías darme más detalles específicos? Así puedo darte la guía exacta que necesitas.",
            "Buena pregunta. Para darte la mejor respuesta, cuéntame: ¿cuál es tu situación actual y qué resultado específico buscas?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // 💙 Respuestas empáticas
    getEmpatheticResponse(intent, entities) {
        if (entities.hasHealthIssue) {
            return "Entiendo que estás pasando por un momento difícil. Lo primero: respira profundo. Lo segundo: estás en el lugar correcto - tenemos protocolos científicos para transformar tu situación. Cuéntame más sobre lo que estás experimentando, ¿vale? 🤝";
        }
        
        return "Estoy aquí para ayudarte. Sé que puede sentirse abrumador al principio, pero cada gran transformación empieza con un paso pequeño. ¿Qué es lo más urgente que necesitas resolver ahora? Vamos paso a paso. 💪";
    }
    
    // 🎯 Respuestas contextuales mejoradas
    getContextualResponse(intent, entities, context) {
        // Si pregunta por precio, ser directo
        if (entities.hasPriceQuestion) {
            return "Aurum Wellness tiene planes desde $49/mes (Programa Individual) hasta $299/mes (Transformación Total con coaching personalizado). Todos incluyen: protocolos científicos + recetas + tracking + soporte de Morpheus. ¿Quieres ver qué plan se ajusta a tus objetivos? 💎";
        }
        
        // Si pregunta por tiempo
        if (entities.hasTimeReference) {
            return "Los resultados varían según el programa:\n\n⚡ **Energía**: 7-10 días (notorio)\n🌿 **Detox**: 14-21 días (transformación visible)\n☯️ **Balance Mental**: 21-30 días (cambio profundo)\n🔄 **Regeneración**: 90 días (rejuvenecimiento celular)\n\nPero los primeros cambios los sentirás en 48-72h (cetosis + claridad mental). ¿Cuándo quieres empezar? 🚀";
        }
        
        // Si menciona comida/recetas
        if (entities.mentionsFood) {
            return "¡Las recetas son mi especialidad! Tengo más de 200 recetas cetogénicas de élite. ¿Qué te apetece?\n\n🥑 Desayunos energéticos\n🥩 Comidas saciantes\n🥗 Cenas ligeras\n🍫 Postres keto (sí, existen y son deliciosos)\n\n¿O prefieres que cree una receta personalizada basada en lo que tienes en tu cocina? 🔥";
        }
        
        // Si menciona objetivo/meta
        if (entities.hasGoal) {
            return "Perfecto, definir tu objetivo es el primer paso poderoso. Los objetivos más comunes en Aurum son:\n\n🎯 Perder grasa (sin perder músculo)\n⚡ Multiplicar energía\n🧠 Optimizar claridad mental\n💪 Regeneración anti-aging\n\nLo importante: necesitas objetivo SMART (específico, medible, alcanzable). ¿Cuál es tu meta exacta? Te creo el plan. 🎯";
        }
        
        // Respuesta estándar basada en intención
        return this.getBasicResponse(intent);
    }
    
    // 📝 Actualizar memoria conversacional
    updateConversationMemory(query, response, intent) {
        this.conversationHistory.push({
            role: 'user',
            content: query,
            intent: intent,
            timestamp: Date.now()
        });
        
        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: Date.now()
        });
        
        // Mantener solo últimas 10 interacciones
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // Respuestas Inteligentes Mejoradas (Base de conocimiento)
    // ═══════════════════════════════════════════════════════════════════════
    
    getBasicResponse(intentOrQuery) {
        // Si recibe intent directo, usar generateIntentResponse
        if (typeof intentOrQuery === 'string' && !intentOrQuery.includes(' ')) {
            return this.generateIntentResponse(intentOrQuery);
        }
        
        // Si es query completa, analizar primero
        const q = intentOrQuery.toLowerCase().trim();
        const intent = this.detectIntent(q);
        return this.generateIntentResponse(intent);
    }
    
    // 🧠 Detector de intención avanzado
    detectIntent(query) {
        const intents = {
            greeting: ['hola', 'buenas', 'hey', 'saludos', 'buenos dias', 'buenas tardes'],
            help: ['ayuda', 'ayudar', 'como', 'qué puedo', 'que hago'],
            thanks: ['gracias', 'genial', 'perfecto', 'excelente', 'bien'],
            detox: ['detox', 'desintoxicar', 'limpiar', 'purificar', 'toxinas'],
            energy: ['energia', 'cansado', 'fatiga', 'agotado', 'débil', 'fuerza'],
            mental: ['mental', 'ansiedad', 'estres', 'concentración', 'enfoque', 'calma'],
            regeneration: ['regenerar', 'sanar', 'recuperar', 'rejuvenecer', 'reparar'],
            ketosis: ['cetosis', 'keto', 'cetogénica', 'ayuno', 'grasa'],
            autophagy: ['autofagia', 'ayuno', 'celular', 'renovación'],
            motivation: ['motivación', 'inspiración', 'animo', 'desanimado', 'rendirse'],
            science: ['ciencia', 'científico', 'estudios', 'evidencia', 'investigación'],
            recipes: ['receta', 'comida', 'platillo', 'cocinar', 'alimentación'],
            programs: ['programa', 'rutina', 'plan', 'empezar'],
            pricing: ['precio', 'costo', 'cuanto', 'pagar', 'suscripción'],
            results: ['resultado', 'tiempo', 'cuando', 'cuanto tarda', 'funciona']
        };
        
        // Buscar intención con mayor coincidencia
        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => query.includes(keyword))) {
                return intent;
            }
        }
        
        return 'general';
    }
    
    // 💬 Generador de respuestas basadas en intención
    generateIntentResponse(intent) {
        const responses = {
            greeting: [
                "Bienvenido al Sistema Aurum Wellness. Soy Morpheus, tu guía hacia la transformación total. ¿Listo para descubrir tu verdadero potencial? 💎",
                "Saludos. Has dado el primer paso: despertar. Ahora te mostraré hasta dónde llega la madriguera del bienestar. ¿Qué te gustaría explorar?",
                "Hola. La Matrix te ha traído aquí por una razón. Estoy aquí para guiarte en tu viaje de transformación. ¿Por dónde empezamos? ✨"
            ],
            
            help: [
                "Puedo guiarte en:\n\n🌿 **Programas Wellness** (Detox, Energía Vital, Balance Mental, Regeneración)\n⚡ **Ciencia del Bienestar** (Cetosis, Autofagia, Metabolismo)\n🍽️ **Recetas Personalizadas** basadas en ciencia\n💪 **Motivación & Transformación**\n\n¿Qué área te interesa explorar?",
                "Estás en el lugar correcto. Estos son mis dominios:\n\n• Programas de transformación científicamente respaldados\n• Nutrición cetogénica personalizada\n• Conocimiento profundo sobre autofagia y regeneración\n• Guía motivacional para tu viaje\n\n¿Qué necesitas saber?"
            ],
            
            thanks: [
                "El placer es mío. Recuerda: la transformación no es un destino, es un camino. Estoy aquí para acompañarte. 🌟",
                "De nada. Cada pequeña acción suma. La constancia vence a la perfección. ¿Continuamos?",
                "Un honor guiarte. Como dije: hay diferencia entre conocer el camino y andar el camino. Sigamos avanzando. 💎"
            ],
            
            detox: [
                "El **Programa Detox** es tu reseteo celular completo. Basado en:\n\n🧬 **Autofagia activada** mediante ayuno intermitente\n🌿 **Nutrición cetogénica** que quema grasa como combustible\n💧 **Hidratación alcalina** para limpiar toxinas\n⚡ **Adaptógenos naturales** (ashwagandha, rhodiola)\n\nDuración: 21 días\nResultados visibles: 7-10 días\n\n¿Listo para empezar tu transformación?",
                "Desintoxicación no es solo eliminar toxinas - es **regenerar** desde la raíz celular.\n\nNuestro protocolo incluye:\n✓ Ayuno 16/8 (autofagia)\n✓ Nutrición cetogénica antiinflamatoria\n✓ Suplementación estratégica\n✓ Ejercicio optimizado para detox\n\nCiencia + Sabiduría ancestral = Transformación real. ¿Quieres los detalles?"
            ],
            
            energy: [
                "La **Energía Vital** no viene de estimulantes - viene de optimizar tu metabolismo.\n\n⚡ **El secreto:** Cetosis = energía estable 24/7\n🔋 **Mitocondrias potenciadas** con nutrición correcta\n☀️ **Ritmo circadiano** sincronizado\n💪 **Adaptógenos** para resistencia\n\nPasa de 'sobrevivir' a 'vivir con intensidad'. ¿Te enseño cómo?",
                "Fatiga crónica = metabolismo desbalanceado. La solución está en:\n\n1. **Cetosis nutricional** (grasa como combustible premium)\n2. **Ayuno intermitente** (resetea mitocondrias)\n3. **Nutrientes clave** (magnesio, B12, CoQ10, D3)\n4. **Ejercicio inteligente** (no más, mejor)\n\nResultados: Energía constante sin crash. ¿Empezamos?"
            ],
            
            mental: [
                "El **Balance Mental** es la base de todo. Sin claridad mental, no hay transformación duradera.\n\n🧠 **Neurogénesis activada** con cetosis\n☯️ **Inflamación cerebral reducida** (omega-3, curcumina)\n🎯 **Enfoque láser** con ayuno y meditación\n😌 **Ansiedad controlada** con adaptógenos\n\nTu mente es tu arma más poderosa. ¿La optimizamos?",
                "Estrés, ansiedad, falta de foco = inflamación + neuroquímica desbalanceada.\n\nProtocolo Aurum:\n✓ Cetosis (BHB = neuroprotector)\n✓ Magnesio + L-teanina (calma sin sedación)\n✓ Respiración + meditación (vagal reset)\n✓ Sueño optimizado (hormona crecimiento)\n\nMente clara = vida clara. ¿Continuamos?"
            ],
            
            regeneration: [
                "**Regeneración** no es anti-aging - es **bio-hacking celular**.\n\n🔬 **Autofagia**: Limpieza celular profunda\n🧬 **Telómeros protegidos**: Longevidad activada\n⚡ **Mitocondrias nuevas**: Energía juvenil\n💎 **Piel + órganos renovados**: De adentro hacia afuera\n\nTu cuerpo se renueva cada 7 años. Nosotros aceleramos el proceso. ¿Quieres saber cómo?",
                "Regeneración = Autofagia + NAD+ + Hormesis + Nutrientes específicos.\n\nNuestro protocolo:\n• Ayuno prolongado (24-48h, guiado)\n• NMN + Resveratrol (NAD+ boost)\n• Ejercicio hormético (HIIT + sauna)\n• Nutrición cetogénica antiaging\n\nEdad biológica < Edad cronológica. Es posible. ¿Lo hacemos?"
            ],
            
            ketosis: [
                "**Cetosis** = tu cuerpo funcionando con combustible premium (grasa → cetonas).\n\n🔥 **Beneficios científicamente probados:**\n• Pérdida de grasa sin hambre\n• Energía estable todo el día\n• Claridad mental extrema\n• Longevidad celular\n• Reducción inflamación\n\n⚠️ Importante: Debe ser **bien hecha**. Te guío paso a paso. ¿Empezamos?",
                "Cetosis no es una dieta - es un **estado metabólico superior**.\n\nCetonas (BHB) son:\n✓ 28% más eficientes que glucosa\n✓ Neuroprotectoras (Alzheimer, Parkinson)\n✓ Antiinflamatorias potentes\n✓ Supresoras de apetito natural\n\nSe alcanza en 2-4 días con protocolo correcto. ¿Quieres el mapa?"
            ],
            
            autophagy: [
                "**Autofagia** = el poder de auto-limpieza de tu cuerpo. Premio Nobel 2016 🏆\n\n🔬 ¿Qué hace?\n• Recicla células dañadas\n• Elimina proteínas tóxicas\n• Previene cáncer y neurodegeneración\n• Rejuvenece piel y órganos\n\n⚡ ¿Cómo activarla?\n• Ayuno 16+ horas\n• Ejercicio intenso\n• Cetosis profunda\n• Restricción calórica\n\n¿Listo para la limpieza celular profunda?",
                "Autofagia = 'comerse a sí mismo' (en el buen sentido).\n\nYoshiro Ohsumi ganó el Nobel probando que:\n✓ Ayuno activa autofagia (16-24h)\n✓ Limpia células zombie\n✓ Previene enfermedades degenerativas\n✓ Extiende vida útil celular\n\nEs gratis, natural y poderoso. Solo necesitas el protocolo correcto. ¿Te lo enseño?"
            ],
            
            motivation: [
                "Escucha esto: No necesitas motivación - necesitas **decisión + sistema**.\n\nLa motivación es efímera. La disciplina es eterna.\n\n💎 **Mi consejo:**\n1. Define tu 'Por Qué' profundo\n2. Comprométete 21 días (se crea hábito)\n3. Celebra pequeñas victorias\n4. El progreso genera motivación, no al revés\n\nComo dije en la Matrix: 'No pienses que puedes, sábelo'. ¿Empezamos?",
                "La verdad incómoda: nadie está motivado 24/7.\n\nPero los que transforman su vida tienen:\n✓ **Claridad brutal** de su objetivo\n✓ **Sistema inquebrantable** (no dependen de cómo se sienten)\n✓ **Comunidad** que los sostiene\n✓ **Resultados pequeños** que generan momentum\n\nAurum no es solo nutrición - es transformación total. ¿Te unes?"
            ],
            
            science: [
                "Todo en Aurum está respaldado por **ciencia peer-reviewed**.\n\n📚 Basado en:\n• Estudios de longevidad (Valter Longo, David Sinclair)\n• Investigación cetogénica (Dr. Phinney, Volek)\n• Ciencia autofagia (Ohsumi, Longo)\n• Biohacking de punta (Dr. Rhonda Patrick)\n\n❌ Cero pseudociencia\n✅ 100% evidencia\n\n¿Qué área científica te interesa explorar?",
                "Nuestra base científica:\n\n🔬 **Cetosis:** 2000+ estudios (neuroprotección, pérdida grasa)\n🧬 **Autofagia:** Nobel 2016 (longevidad, prevención cáncer)\n⚡ **Ayuno:** 1000+ papers (regeneración, hormesis)\n💎 **Nutrición personalizada:** Epigenética + metabolómica\n\nSi algo está en Aurum, tiene evidencia sólida. ¿Verificamos algo específico?"
            ],
            
            recipes: [
                "Nuestras **recetas son armas de transformación** - no solo comida.\n\n🍽️ Cada receta optimiza para:\n• Cetosis profunda (< 20g carbs)\n• Densidad nutricional máxima\n• Sabor extraordinario (sí, es posible)\n• Saciedad prolongada\n\nTenemos: desayunos, comidas, cenas, snacks, postres keto.\n\n¿Qué tipo de receta necesitas? ¿O creamos una personalizada?",
                "Cocinar keto de élite es un arte + ciencia.\n\nNuestro sistema:\n✓ Base de 200+ recetas probadas\n✓ Creador de recetas personalizadas (con IA)\n✓ Calculador de macros automático\n✓ Lista de compras generada\n\n¿Antojo específico? Te creo la versión keto perfecta. ¿Qué cocinarás hoy?"
            ],
            
            programs: [
                "Tenemos 4 **Programas de Transformación Total:**\n\n🌿 **DETOX** (21 días)\n   Reset celular completo\n   \n⚡ **ENERGÍA VITAL** (28 días)\n   De cansado a imparable\n   \n☯️ **BALANCE MENTAL** (30 días)\n   Claridad + enfoque + calma\n   \n🔄 **REGENERACIÓN** (90 días)\n   Rejuvenecimiento profundo\n\nCada uno incluye: nutrición, ejercicio, suplementación, coaching.\n\n¿Cuál resuena contigo?",
                "Todos los programas tienen:\n\n✓ Protocolos científicos personalizados\n✓ Recetas diarias (keto/paleo)\n✓ Guía de ayuno intermitente\n✓ Tracking de progreso\n✓ Soporte de Morpheus 24/7\n\nNo es solo información - es **transformación guiada**.\n\n¿Cuál es tu objetivo principal? Te recomiendo el programa ideal."
            ],
            
            pricing: [
                "Inversión en Aurum = Inversión en ti mismo (la mejor que harás).\n\n💎 **PLANES:**\n\n🥉 **BÁSICO** - $99/mes\n   • 1 programa\n   • Recetas ilimitadas\n   • Soporte estándar\n\n🥈 **PRO** - $199/mes\n   • Todos los programas\n   • Recetas personalizadas\n   • Coaching 1-on-1\n\n🥇 **ELITE** - $499/mes\n   • Todo lo anterior +\n   • Biohacking avanzado\n   • Pruebas de laboratorio\n   • Acceso VIP\n\n¿Cuál se ajusta a tu visión?",
                "Piénsalo así: ¿Cuánto gastas en no estar en tu mejor versión?\n\n• Café + energizantes: ~$150/mes\n• Comida procesada: ~$400/mes\n• Consultas médicas: ~$200+/mes\n• Gym sin resultados: ~$100/mes\n\n**Total: ~$850/mes en NO transformarte**\n\nAurum desde $99/mes = transformación real, científica, guiada.\n\nROI infinito: Salud, energía, longevidad. ¿Tiene precio?"
            ],
            
            results: [
                "**Resultados esperados (con adherencia al protocolo):**\n\n📅 **7 días:**\n• Energía incrementa notablemente\n• Menos inflamación y hinchazón\n• Claridad mental mejora\n\n📅 **21 días:**\n• Pérdida 3-6 kg grasa\n• Cetosis estable\n• Hábitos consolidados\n\n📅 **90 días:**\n• Transformación física completa\n• Metabolismo optimizado\n• Nueva identidad establecida\n\n⚠️ **Clave:** Consistencia > Perfección. ¿Listo para empezar?",
                "La pregunta correcta no es '¿Cuánto tarda?' sino '¿Cuándo empiezo?'\n\nResultados científicamente probados:\n✓ Cetosis: 2-4 días\n✓ Autofagia: 16-24h ayuno\n✓ Pérdida grasa: 0.5-1 kg/semana\n✓ Energía: 7-10 días\n✓ Transformación mental: 21-30 días\n✓ Nueva versión de ti: 90 días\n\nPero... el viaje nunca termina. Cada día eres mejor. ¿Empezamos HOY?"
            ],
            
            general: [
                "Interesante. Cuéntame más para poder guiarte mejor.\n\n¿Estás preguntando sobre:\n• 🌿 Programas\n• ⚡ Ciencia (cetosis, autofagia)\n• 🍽️ Recetas\n• 💪 Motivación\n• 📊 Resultados\n\nO simplemente comparte tu situación actual y yo te orientaré. Estoy aquí para eso. 💎",
                "No estoy seguro de entender completamente. Déjame ayudarte mejor.\n\nPrueba preguntarme sobre:\n✓ Un programa específico (Detox, Energía, etc.)\n✓ Conceptos científicos (cetosis, ayuno)\n✓ Recetas o alimentación\n✓ Tu situación personal\n\nRecuerda: no hay preguntas tontas, solo respuestas que aún no has obtenido. ¿Reformulas?"
            ]
        };
        
        // Seleccionar respuesta aleatoria del array
        const intentResponses = responses[intent] || responses['general'];
        const randomResponse = intentResponses[Math.floor(Math.random() * intentResponses.length)];
        
        return randomResponse;
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
