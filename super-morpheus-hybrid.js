/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  💎 SUPER MORPHEUS HÍBRIDO - Multi-IA Agent System
 *  Combina: ChatGPT + GitHub Copilot + Super Agente Wellness
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Version: 3.0.0
 * Date: 19 de Octubre, 2025
 * Created by: Super Agente Wellness Fusionado
 */

class SuperMorpheusHybrid {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = null;
        this.requestCache = new Map();
        this.currentModel = 'hybrid'; // hybrid, gpt-only, copilot, wellness, fallback
        
        // Sistemas de IA disponibles
        this.aiSystems = {
            chatgpt: { available: false, priority: 1 },
            copilot: { available: false, priority: 2 },
            wellness: { available: true, priority: 3 }, // Siempre disponible
            fallback: { available: true, priority: 4 }  // Siempre disponible
        };
        
        this.initializeSystem();
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  INICIALIZACIÓN DEL SISTEMA HÍBRIDO
     * ═══════════════════════════════════════════════════════════════════════
     */
    async initializeSystem() {
        console.log('🤖 Inicializando Super Morpheus Híbrido...');
        
        // Verificar disponibilidad de sistemas
        this.aiSystems.chatgpt.available = WellnessConfig.isOpenAIEnabled();
        this.aiSystems.copilot.available = this.checkCopilotAvailability();
        
        // Determinar modo óptimo
        this.currentModel = this.determineOptimalMode();
        
        console.log('✅ Super Morpheus Híbrido ACTIVO');
        console.log(`📡 Modo: ${this.currentModel.toUpperCase()}`);
        console.log(`🎯 Sistemas disponibles:`, {
            'ChatGPT': this.aiSystems.chatgpt.available ? '✅' : '❌',
            'Copilot': this.aiSystems.copilot.available ? '✅' : '❌',
            'Wellness Agent': '✅',
            'Fallback': '✅'
        });
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  MÉTODO PRINCIPAL: RESPONDER
     * ═══════════════════════════════════════════════════════════════════════
     */
    async respond(userQuery, context = {}) {
        try {
            // 1. Analizar intención del usuario
            const intent = this.analyzeIntent(userQuery, context);
            
            // 2. Determinar mejor sistema para responder
            const bestSystem = this.selectBestSystem(intent);
            
            console.log(`🎯 Intención detectada: ${intent.type}`);
            console.log(`🤖 Sistema seleccionado: ${bestSystem}`);
            
            // 3. Generar respuesta con el sistema seleccionado
            const response = await this.generateResponse(userQuery, intent, bestSystem, context);
            
            // 4. Post-procesar y mejorar respuesta
            const enhancedResponse = await this.enhanceResponse(response, intent, context);
            
            // 5. Guardar en historial
            this.saveToHistory(userQuery, enhancedResponse, intent, bestSystem);
            
            return enhancedResponse;
            
        } catch (error) {
            console.error('❌ Error en Super Morpheus:', error);
            return this.getErrorResponse(error);
        }
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  ANÁLISIS DE INTENCIÓN (NLP Básico)
     * ═══════════════════════════════════════════════════════════════════════
     */
    analyzeIntent(query, context) {
        const lowerQuery = query.toLowerCase();
        
        // Clasificar por tipo de consulta
        const intentPatterns = {
            // Conversacional general
            conversational: ['hola', 'buenos días', 'qué tal', 'cómo estás', 'gracias'],
            
            // Programas y planes
            program: ['programa', 'plan', 'detox', 'energía', 'balance', 'regeneración', 'días'],
            
            // Recetas y nutrición
            nutrition: ['receta', 'comida', 'comer', 'desayuno', 'cena', 'smoothie', 'té'],
            
            // Entrenamiento
            training: ['ejercicio', 'entrenamiento', 'gym', 'rutina', 'workout', 'pesas'],
            
            // Salud y bioquímica
            health: ['síntoma', 'dolor', 'enfermedad', 'medicamento', 'doctor', 'salud'],
            
            // Técnico/Científico
            scientific: ['mitocondria', 'autofagia', 'cetosis', 'bhb', 'atp', 'científico'],
            
            // Motivacional
            motivational: ['motivación', 'desanimado', 'difícil', 'no puedo', 'ayuda'],
            
            // Personalización
            personal: ['mi', 'yo', 'tengo', 'soy', 'personalizado', 'para mí']
        };
        
        // Detectar tipo principal
        let type = 'general';
        let confidence = 0;
        
        for (const [intentType, keywords] of Object.entries(intentPatterns)) {
            const matches = keywords.filter(kw => lowerQuery.includes(kw)).length;
            if (matches > confidence) {
                confidence = matches;
                type = intentType;
            }
        }
        
        // Detectar complejidad
        const complexity = this.assessComplexity(query, type);
        
        return {
            type,
            confidence,
            complexity,
            requiresPersonalization: this.requiresPersonalization(lowerQuery),
            requiresCreativity: this.requiresCreativity(lowerQuery),
            requiresScience: this.requiresScience(lowerQuery)
        };
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  SELECCIÓN DEL MEJOR SISTEMA
     * ═══════════════════════════════════════════════════════════════════════
     */
    selectBestSystem(intent) {
        // Lógica de selección basada en intención y disponibilidad
        
        // 1. Consultas científicas complejas → ChatGPT (si disponible)
        if (intent.requiresScience && intent.complexity === 'high' && this.aiSystems.chatgpt.available) {
            return 'chatgpt';
        }
        
        // 2. Personalización extrema → ChatGPT (si disponible)
        if (intent.requiresPersonalization && this.aiSystems.chatgpt.available) {
            return 'chatgpt';
        }
        
        // 3. Creatividad (recetas, planes nuevos) → ChatGPT o Copilot
        if (intent.requiresCreativity) {
            if (this.aiSystems.chatgpt.available) return 'chatgpt';
            if (this.aiSystems.copilot.available) return 'copilot';
        }
        
        // 4. Programas específicos de Aurum → Wellness Agent
        if (intent.type === 'program' || intent.type === 'nutrition') {
            return 'wellness';
        }
        
        // 5. General conversacional → Cualquiera disponible
        if (intent.type === 'conversational') {
            if (this.aiSystems.chatgpt.available) return 'chatgpt';
            return 'fallback';
        }
        
        // 6. Default: Usar el de mayor prioridad disponible
        return this.getHighestPrioritySystem();
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  GENERACIÓN DE RESPUESTA (Multi-Sistema)
     * ═══════════════════════════════════════════════════════════════════════
     */
    async generateResponse(query, intent, system, context) {
        console.log(`🎨 Generando respuesta con: ${system}`);
        
        switch (system) {
            case 'chatgpt':
                return await this.generateChatGPTResponse(query, intent, context);
            
            case 'copilot':
                return await this.generateCopilotResponse(query, intent, context);
            
            case 'wellness':
                return await this.generateWellnessResponse(query, intent, context);
            
            case 'fallback':
            default:
                return await this.generateFallbackResponse(query, intent, context);
        }
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  CHATGPT - Respuestas con OpenAI
     * ═══════════════════════════════════════════════════════════════════════
     */
    async generateChatGPTResponse(query, intent, context) {
        try {
            // Construir prompt híbrido mejorado
            const enhancedPrompt = this.buildHybridPrompt(query, intent, context);
            
            // Construir mensajes con contexto
            const messages = [
                { role: 'system', content: enhancedPrompt },
                ...this.conversationHistory.slice(-5).map(conv => [
                    { role: 'user', content: conv.query },
                    { role: 'assistant', content: conv.response }
                ]).flat(),
                { role: 'user', content: query }
            ];
            
            // Llamar a OpenAI
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: WellnessConfig.getOpenAIHeaders(),
                body: JSON.stringify({
                    model: WellnessConfig.openai.model,
                    messages: messages,
                    max_tokens: WellnessConfig.openai.maxTokens,
                    temperature: WellnessConfig.openai.temperature,
                    presence_penalty: 0.6,
                    frequency_penalty: 0.5
                })
            });
            
            if (!response.ok) {
                throw new Error('OpenAI API error');
            }
            
            const data = await response.json();
            return {
                content: data.choices[0].message.content,
                source: 'chatgpt',
                model: WellnessConfig.openai.model,
                confidence: 0.95
            };
            
        } catch (error) {
            console.error('❌ ChatGPT error, fallback a Wellness:', error);
            return await this.generateWellnessResponse(query, intent, context);
        }
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  WELLNESS AGENT - Respuestas especializadas de Aurum
     * ═══════════════════════════════════════════════════════════════════════
     */
    async generateWellnessResponse(query, intent, context) {
        // Usar conocimiento especializado de Aurum Wellness
        const keywords = this.extractKeywords(query.toLowerCase());
        let content = '';
        
        // Respuestas específicas por intención
        switch (intent.type) {
            case 'program':
                content = this.getWellnessProgramResponse(keywords);
                break;
            case 'nutrition':
                content = this.getWellnessNutritionResponse(keywords);
                break;
            case 'training':
                content = this.getWellnessTrainingResponse(keywords);
                break;
            case 'scientific':
                content = this.getWellnessScientificResponse(keywords);
                break;
            case 'motivational':
                content = this.getWellnessMotivationalResponse(keywords);
                break;
            default:
                content = this.getWellnessGeneralResponse(keywords);
        }
        
        return {
            content,
            source: 'wellness-agent',
            model: 'aurum-knowledge-base',
            confidence: 0.85
        };
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  COPILOT SIMULATION - Respuestas estilo GitHub Copilot
     * ═══════════════════════════════════════════════════════════════════════
     */
    async generateCopilotResponse(query, intent, context) {
        // Simular estilo de respuesta de Copilot
        // (En producción, esto se conectaría a la API real de GitHub Copilot)
        
        return {
            content: `💡 Como asistente de programación adaptado a wellness:\n\n${this.generateCodeLikeResponse(query, intent)}`,
            source: 'copilot-simulation',
            model: 'copilot-style',
            confidence: 0.75
        };
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  FALLBACK - Respuestas predefinidas inteligentes
     * ═══════════════════════════════════════════════════════════════════════
     */
    async generateFallbackResponse(query, intent, context) {
        const keywords = this.extractKeywords(query.toLowerCase());
        let content = '';
        
        if (keywords.includes('detox')) {
            content = this.getDetoxResponse();
        } else if (keywords.includes('energía') || keywords.includes('energia')) {
            content = this.getEnergyResponse();
        } else if (keywords.includes('estrés') || keywords.includes('estres')) {
            content = this.getBalanceResponse();
        } else if (keywords.includes('receta')) {
            content = this.getRecipeResponse();
        } else if (keywords.includes('programa') || keywords.includes('plan')) {
            content = this.getProgramResponse();
        } else {
            content = this.getGeneralResponse();
        }
        
        return {
            content,
            source: 'fallback',
            model: 'predefined-responses',
            confidence: 0.70
        };
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  MEJORA DE RESPUESTA (Post-processing)
     * ═══════════════════════════════════════════════════════════════════════
     */
    async enhanceResponse(response, intent, context) {
        let enhanced = { ...response };
        
        // 1. Agregar prefijo de Morpheus
        enhanced.content = this.addMorpheusPrefix(enhanced.content, intent);
        
        // 2. Formatear para terminal Matrix
        enhanced.content = this.formatForMatrix(enhanced.content);
        
        // 3. Agregar llamados a la acción
        if (intent.type === 'program' || intent.type === 'nutrition') {
            enhanced.content += this.addCallToAction(intent.type);
        }
        
        // 4. Agregar metadata
        enhanced.metadata = {
            timestamp: new Date().toISOString(),
            intent: intent.type,
            complexity: intent.complexity,
            source: enhanced.source,
            confidence: enhanced.confidence
        };
        
        return enhanced;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  CONSTRUCCIÓN DE PROMPT HÍBRIDO
     * ═══════════════════════════════════════════════════════════════════════
     */
    buildHybridPrompt(query, intent, context) {
        const basePrompt = WellnessConfig.morpheusPrompt;
        
        // Agregar capacidades híbridas
        const hybridEnhancements = `

CAPACIDADES HÍBRIDAS (Super Morpheus):
- Acceso a conocimiento de ChatGPT (actualizado)
- Especialización en Aurum Wellness (programas, recetas)
- Estilo de código estructurado (inspirado en Copilot)
- Análisis de intención avanzado

CONTEXTO ACTUAL:
- Intención detectada: ${intent.type}
- Complejidad: ${intent.complexity}
- Requiere personalización: ${intent.requiresPersonalization ? 'Sí' : 'No'}
- Usuario: ${context.userName || 'Usuario'}
- Nivel: ${context.userLevel || 'Principiante'}

INSTRUCCIONES ESPECIALES PARA ESTA CONSULTA:
${this.getSpecialInstructions(intent)}

Responde de manera óptima combinando tu sabiduría de Morpheus con las capacidades híbridas.`;
        
        return basePrompt + hybridEnhancements;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  UTILIDADES
     * ═══════════════════════════════════════════════════════════════════════
     */
    
    determineOptimalMode() {
        if (this.aiSystems.chatgpt.available) return 'hybrid';
        if (this.aiSystems.copilot.available) return 'copilot-wellness';
        return 'wellness-only';
    }

    checkCopilotAvailability() {
        // En una implementación real, verificarías la API de GitHub Copilot
        return false; // Por ahora deshabilitado
    }

    getHighestPrioritySystem() {
        const available = Object.entries(this.aiSystems)
            .filter(([_, sys]) => sys.available)
            .sort((a, b) => a[1].priority - b[1].priority);
        
        return available.length > 0 ? available[0][0] : 'fallback';
    }

    assessComplexity(query, type) {
        const length = query.split(' ').length;
        const hasMultipleQuestions = (query.match(/\?/g) || []).length > 1;
        const hasSpecificTerms = /mitocondria|autofagia|neurotransmisor|bhb/i.test(query);
        
        if (hasSpecificTerms || hasMultipleQuestions || length > 30) return 'high';
        if (length > 15) return 'medium';
        return 'low';
    }

    requiresPersonalization(query) {
        return /\b(mi|mis|yo|tengo|soy|para mí|personalizado)\b/i.test(query);
    }

    requiresCreativity(query) {
        return /\b(crear|generar|nuevo|diferente|original|personalizado)\b/i.test(query);
    }

    requiresScience(query) {
        return /\b(por qué|cómo funciona|científico|estudio|evidencia|bioquímica)\b/i.test(query);
    }

    extractKeywords(text) {
        const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'por', 'con'];
        return text.split(/\s+/)
            .filter(word => word.length > 3 && !stopWords.includes(word));
    }

    getSpecialInstructions(intent) {
        const instructions = {
            program: 'Enfócate en los 4 programas: Detox (7d), Energía (14d), Balance (21d), Regeneración (30d)',
            nutrition: 'Menciona el creador de recetas y las opciones disponibles',
            training: 'Explica el enfoque de entrenamiento integrado (pesas + calistenia + artes marciales)',
            scientific: 'Usa terminología precisa pero explica conceptos complejos de manera accesible',
            motivational: 'Sé especialmente empático y proporciona pasos inmediatos accionables',
            personal: 'Personaliza la respuesta al máximo, usa el nombre si está disponible'
        };
        
        return instructions[intent.type] || 'Responde de manera clara y accionable';
    }

    addMorpheusPrefix(content, intent) {
        // No agregar prefijo - ya está incluido en las respuestas
        return content;
    }

    formatForMatrix(content) {
        // Agregar formato Matrix/terminal si es apropiado
        return content;
    }

    addCallToAction(type) {
        const ctas = {
            program: '\n\n✨ ¿Listo para comenzar? Encuentra los programas en el menú principal.',
            nutrition: '\n\n🍽️ Crea tu receta personalizada en el Creador de Recetas.'
        };
        
        return ctas[type] || '';
    }

    saveToHistory(query, response, intent, system) {
        this.conversationHistory.push({
            query,
            response: response.content,
            intent: intent.type,
            system,
            timestamp: new Date().toISOString()
        });
        
        // Mantener solo últimas 10 conversaciones
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }
    }

    getErrorResponse(error) {
        return {
            content: '❌ Disculpa, tuve un problema técnico. Por favor intenta de nuevo. Si el problema persiste, el sistema funcionará en modo básico.',
            source: 'error',
            model: 'error-handler',
            confidence: 0,
            metadata: { error: error.message }
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  RESPUESTAS WELLNESS AGENT (Especializadas)
    // ═══════════════════════════════════════════════════════════════════════

    getWellnessProgramResponse(keywords) {
        if (keywords.includes('detox')) {
            return 'El Detox Cuántico es un programa de 7 días diseñado para limpieza celular profunda. Activa la autofagia, elimina toxinas y resetea tu metabolismo. ¿Listo para comenzar tu transformación? 🌿';
        }
        if (keywords.includes('energía') || keywords.includes('energia')) {
            return 'El programa Energía Vital (14 días) optimiza tu producción de ATP mitocondrial. Aumenta tu energía natural, mejora tu enfoque mental y revitaliza cada célula de tu cuerpo. ⚡';
        }
        if (keywords.includes('balance') || keywords.includes('mental')) {
            return 'Balance Mental Neuroquímico (21 días) sincroniza tus neurotransmisores para paz interior. Reduce estrés, mejora tu sueño y optimiza tu claridad mental. ☯️';
        }
        if (keywords.includes('regeneración') || keywords.includes('regeneracion')) {
            return 'Regeneración Celular Avanzada (30 días) es nuestro programa más completo. Activa telomerasa, repara ADN y rejuvenece a nivel celular profundo. 🔄';
        }
        return 'Tenemos 4 programas principales: Detox (7d), Energía Vital (14d), Balance Mental (21d) y Regeneración (30d). Cada uno diseñado para una transformación específica. ¿Cuál te interesa?';
    }

    getWellnessNutritionResponse(keywords) {
        return 'Nuestra filosofía nutricional se basa en cetosis metabólica y alimentación funcional. Usa el Creador de Recetas para diseñar smoothies, tés curativos, elixires y más. Todo optimizado para máxima biodisponibilidad y activación mitocondrial. 🍎✨';
    }

    getWellnessTrainingResponse(keywords) {
        return 'El entrenamiento en Aurum combina: (1) Fuerza con pesas y calistenia, (2) Flexibilidad y movilidad, (3) Artes marciales (Kung Fu/Taekwondo). Todo diseñado para construir un cuerpo fuerte, ágil y funcional. 💪🥋';
    }

    getWellnessScientificResponse(keywords) {
        if (keywords.includes('cetosis')) {
            return 'La cetosis es un estado metabólico donde tu cuerpo quema grasas (produciendo cetonas) en lugar de glucosa. Activa la autofagia, aumenta claridad mental, optimiza inflamación y mejora composición corporal. Los cuerpos cetónicos (β-hidroxibutirato, acetoacetato) son combustible premium para tu cerebro. 🔬';
        }
        if (keywords.includes('autofagia')) {
            return 'La autofagia es el proceso de "reciclaje celular" donde las células degradan y reciclan componentes dañados. Se activa con ayuno, ejercicio y cetosis. Es clave para longevidad, prevención de enfermedades y regeneración celular. 🧬';
        }
        return 'A nivel bioquímico, el protocolo Aurum activa vías metabólicas clave: AMPK (energía), mTOR (crecimiento), SIRT1 (longevidad) y PGC-1α (mitocondrias). Todo orquestado para optimización celular completa. 🔬✨';
    }

    getWellnessMotivationalResponse(keywords) {
        return 'Cada paso que das en tu transformación es una victoria. Los resultados no son lineales - hay valles y picos. Lo que importa es la dirección, no la velocidad. Confía en el proceso, eres más fuerte de lo que crees. 💪✨';
    }

    getWellnessGeneralResponse(keywords) {
        return 'Estoy aquí para guiarte en tu transformación con Aurum Wellness. Puedo ayudarte con programas de detox, nutrición cetogénica, rutinas de entrenamiento, ciencia del metabolismo y motivación. ¿En qué te puedo apoyar hoy? 💎';
    }

    // Respuestas fallback específicas
    getDetoxResponse() { 
        return 'El Detox Cuántico limpia a nivel celular profundo. 7 días de ayuno intermitente, cetosis y protocolos específicos para activar autofagia y eliminar toxinas. Tu cuerpo se resetea completamente. 🌿✨';
    }
    
    getEnergyResponse() { 
        return 'La Energía Vital se optimiza desde las mitocondrias. 14 días enfocados en producción de ATP, nutrientes específicos y prácticas que multiplican tu energía natural. Adiós al cansancio crónico. ⚡🔋';
    }
    
    getBalanceResponse() { 
        return 'El Balance Mental sincroniza tus neurotransmisores. 21 días de prácticas para serotonina, dopamina, GABA y cortisol. Resultado: paz interior, enfoque mental y resiliencia emocional. ☯️🧘';
    }
    
    getRecipeResponse() { 
        return 'Las recetas en Aurum están optimizadas para cetosis y nutrición funcional. Usa el Creador de Recetas para diseñar smoothies, tés, elixires y más. Todas las recetas incluyen beneficios específicos y macronutrientes. 🍽️✨';
    }
    
    getProgramResponse() { 
        return 'Los programas de transformación incluyen: Detox Cuántico (7d), Energía Vital (14d), Balance Mental (21d) y Regeneración Celular (30d). Cada uno con fases específicas, tracking de progreso y sistema de experiencia. ¿Cuál te llama? 📋';
    }
    
    getGeneralResponse() { 
        return 'Bienvenido a Aurum Wellness. Soy Morpheus, tu guía en la transformación personal. Combino ciencia de vanguardia con sabiduría ancestral para optimizar tu cuerpo y mente. ¿En qué puedo ayudarte hoy? 💎🌟';
    }
    
    generateCodeLikeResponse(query, intent) { 
        return `// Análisis de consulta\nfunction processUserQuery() {\n  const intent = "${intent.type}";\n  const complexity = "${intent.complexity}";\n  \n  // Generar respuesta optimizada\n  return generateOptimalResponse();\n}\n\n// Tu consulta fue procesada con éxito ✓`;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  EXPORTAR E INICIALIZAR
// ═══════════════════════════════════════════════════════════════════════════

// Crear instancia global
window.SuperMorpheusHybrid = SuperMorpheusHybrid;
window.superMorpheus = new SuperMorpheusHybrid();

console.log('═══════════════════════════════════════════════════════════');
console.log('  💎 SUPER MORPHEUS HÍBRIDO - SISTEMA CARGADO');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('🤖 Capacidades:');
console.log('   • ChatGPT (si configurado)');
console.log('   • GitHub Copilot (simulación)');
console.log('   • Wellness Agent (siempre activo)');
console.log('   • Fallback inteligente (siempre activo)');
console.log('');
console.log('✨ Sistema listo para responder');
console.log('');
