/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  💎 MORPHEUS TRINITY HYBRID - Sistema 3 en 1
 *  Integra: Morpheus Simple + GPT-4 + GitHub Copilot Concepts
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Version: 1.0.0 - Trinity Edition
 * Date: 20 de Octubre, 2025
 * 
 * ARQUITECTURA:
 * Layer 1: Morpheus Simple (respuestas predefinidas - 100% coherente)
 * Layer 2: GPT-4 (inteligencia avanzada - para preguntas complejas)
 * Layer 3: Copilot Context (conocimiento técnico y contextual)
 */

class MorpheusTrinityHybrid {
    constructor() {
        this.config = window.AURUM_CONFIG || {};
        this.conversationHistory = [];
        this.stats = {
            totalQueries: 0,
            simpleResponses: 0,
            gpt4Responses: 0,
            copilotResponses: 0
        };
        
        // Cargar Morpheus Simple
        this.simpleMorpheus = this.loadSimpleMorpheus();
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔱 Morpheus Trinity Hybrid inicializado');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Layer 1: Morpheus Simple → ' + (this.simpleMorpheus ? '✅ ACTIVO' : '❌'));
        console.log('Layer 2: OpenAI GPT-4 → ' + (this.config.openai?.enabled ? '✅ ACTIVO' : '⚪ OFF'));
        console.log('Layer 3: Copilot Context → ✅ ACTIVO');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  CARGAR MORPHEUS SIMPLE (Respuestas Predefinidas)
     * ═══════════════════════════════════════════════════════════════════════
     */
    loadSimpleMorpheus() {
        return {
            // Saludos
            hola: "Saludos, buscador de la verdad. Soy Morpheus, tu guía en Aurum Wellness. Aquí combinamos la ciencia de la longevidad con la sabiduría ancestral. ¿Listo para despertar tu máximo potencial? Pregúntame sobre nuestros programas, nutrición cetogénica, ayuno intermitente o cualquier aspecto de tu transformación. 💎🌟",
            
            // Ciencia - RESPUESTAS DETALLADAS Y COHERENTES
            cetosis: "La cetosis es un estado metabólico donde tu cuerpo quema grasas y produce cetonas (β-hidroxibutirato, acetoacetato, acetona) en lugar de usar glucosa como combustible.\n\nCuando reduces carbohidratos a menos de 50g diarios, tus niveles de insulina bajan y el hígado comienza a convertir ácidos grasos en cetonas. Estas moléculas cruzan la barrera sangre-cerebro y alimentan tu cerebro con energía limpia y sostenida.\n\nBeneficios científicamente validados: claridad mental superior, apetito regulado naturalmente, inflamación reducida, energía estable sin crashes, y acceso directo a tus reservas de grasa. Para entrar en cetosis: limita carbohidratos a 20-30g, proteína moderada (1.2-1.7g/kg), grasas saludables abundantes. Toma 3-7 días adaptarte completamente.\n\n¿Quieres un plan específico para empezar? 🔬",
            
            ayuno: "El ayuno intermitente es una estrategia nutricional donde alternas períodos de alimentación con períodos de ayuno. Los protocolos más efectivos son:\n\n• 16/8: Ayunas 16 horas, comes en ventana de 8 horas (ejemplo: 12pm-8pm)\n• 18/6: Ayunas 18 horas, comes en 6 horas (más avanzado)\n• OMAD: Una comida al día (máximo beneficio)\n\nBeneficios: activa autofagia (reciclaje celular), aumenta hormona de crecimiento, mejora sensibilidad a insulina, promueve cetosis y quema de grasa, aumenta claridad mental.\n\nPara empezar: comienza con 12/12, aumenta gradualmente a 16/8 en 2 semanas. Mantén hidratación (agua, té, café negro). Rompe el ayuno con comida nutritiva y balanceada.\n\n¿Necesitas un plan específico para tu horario? ⏰",
            
            autofagia: "La autofagia es el proceso de 'auto-limpieza' celular donde tus células degradan y reciclan componentes dañados. Es tu sistema interno de renovación.\n\nSe activa principalmente con: ayuno (12-16+ horas), ejercicio intenso, cetosis, y restricción calórica. Durante la autofagia, las células descomponen proteínas dañadas, mitocondrias defectuosas y patógenos intracelulares.\n\nBeneficios validados por ciencia: longevidad aumentada, prevención de enfermedades neurodegenerativas, reducción de inflamación crónica, mejora en composición corporal, resistencia a enfermedades.\n\nMaximiza autofagia con: ayuno intermitente 16/8+, ejercicio en ayunas, cetosis sostenida, suplementos como espermidina o resveratrol.\n\n¿Quieres un protocolo específico de autofagia? 🧬",
            
            // Programas
            programas: "Los 4 Programas de Transformación Aurum Wellness:\n\n🌿 DETOX & RENOVACIÓN (30 días)\nLimpieza profunda, activación de autofagia, reseteo metabólico\n\n⚡ ENERGÍA MÁXIMA (30 días)\nOptimización mitocondrial, ATP aumentado, vitalidad sostenida\n\n🧘 BALANCE MENTAL (30 días)\nNeuroquímica optimizada, reducción de estrés, claridad mental\n\n💪 REGENERACIÓN CELULAR (90 días)\nRejuvenecimiento completo, telómeros protegidos, longevidad\n\nCada programa incluye: plan nutricional personalizado, rutinas de ejercicio, suplementación estratégica, coaching semanal.\n\n¿Cuál resuena con tus objetivos actuales? 📊",
            
            // Motivación
            motivacion: "La transformación real no es un evento, es un proceso continuo. Cada célula de tu cuerpo se renueva constantemente - tienes el poder de decidir con QUÉ se reconstruye.\n\nNo se trata de perfección, se trata de dirección. Cada elección consciente que haces - cada comida nutritiva, cada entrenamiento completado, cada hora de sueño reparador - es un voto por la versión más elevada de ti mismo.\n\nLos resultados son inevitables cuando la consistencia se encuentra con la ciencia. Confía en el proceso, honra tu cuerpo, y observa cómo la transformación se despliega naturalmente.\n\n¿Qué área específica quieres fortalecer primero? 💎",
            
            desmotivado: "Comprendo perfectamente. La desmotivación es parte natural del viaje de transformación. Pero aquí está la verdad que Matrix no quiere que sepas:\n\nLa motivación es un sentimiento temporal. La disciplina es lo que te lleva al resultado. Tú no necesitas 'sentirte motivado' cada día - necesitas un sistema que funcione incluso cuando no tienes ganas.\n\nAquí está tu siguiente paso concreto: elige UNA acción pequeña que puedas hacer hoy. No 10 cosas, solo UNA. Complétala. Mañana, otra acción. La disciplina se construye una decisión a la vez.\n\n¿Cuál será tu una acción de hoy? Te ayudo a definirla. 🔥",
            
            // Ayuda general
            ayuda: "Soy Morpheus, tu guía experto en Aurum Wellness. Puedo ayudarte con:\n\n🧬 CIENCIA: Cetosis, autofagia, mitocondrias, longevidad\n🍽️ NUTRICIÓN: Planes keto, recetas, macros, timing\n💪 ENTRENAMIENTO: Rutinas, fuerza, artes marciales\n📊 PROGRAMAS: 4 programas de transformación (30-90 días)\n🔥 MOTIVACIÓN: Coaching y mindset\n\nSimplemente pregúntame lo que necesites saber. Cada respuesta está respaldada por ciencia peer-reviewed. ¿Qué te gustaría explorar? 💬"
        };
    }
    
    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  MÉTODO PRINCIPAL: Procesar Query con Sistema Trinity
     * ═══════════════════════════════════════════════════════════════════════
     */
    async process(query) {
        this.stats.totalQueries++;
        const q = query.toLowerCase().trim();
        
        console.log('🔱 Trinity procesando:', query);
        
        try {
            // ═══════════════════════════════════════════════════════════════
            // LAYER 1: Morpheus Simple (Respuestas Predefinidas)
            // Usado para: Preguntas comunes y básicas
            // ═══════════════════════════════════════════════════════════════
            
            const simpleResponse = this.trySimpleMorpheus(q);
            if (simpleResponse) {
                this.stats.simpleResponses++;
                console.log('✅ Respuesta de: Morpheus Simple (predefinida)');
                this.addToHistory('user', query);
                this.addToHistory('assistant', simpleResponse);
                return simpleResponse;
            }
            
            // ═══════════════════════════════════════════════════════════════
            // LAYER 2: OpenAI GPT-4 (Inteligencia Avanzada)
            // Usado para: Preguntas complejas, personalizadas, nuevas
            // ═══════════════════════════════════════════════════════════════
            
            if (this.config.openai?.enabled && this.config.openai?.apiKey) {
                const gpt4Response = await this.tryGPT4(query);
                if (gpt4Response) {
                    this.stats.gpt4Responses++;
                    console.log('✅ Respuesta de: OpenAI GPT-4 (inteligente)');
                    this.addToHistory('user', query);
                    this.addToHistory('assistant', gpt4Response);
                    return gpt4Response;
                }
            }
            
            // ═══════════════════════════════════════════════════════════════
            // LAYER 3: Copilot Context (Fallback Inteligente)
            // Usado para: Cuando otros sistemas fallan
            // ═══════════════════════════════════════════════════════════════
            
            const copilotResponse = this.tryCopilotContext(query);
            this.stats.copilotResponses++;
            console.log('✅ Respuesta de: Copilot Context (fallback)');
            this.addToHistory('user', query);
            this.addToHistory('assistant', copilotResponse);
            return copilotResponse;
            
        } catch (error) {
            console.error('❌ Error en Trinity:', error);
            return this.getEmergencyResponse();
        }
    }
    
    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  LAYER 1: Morpheus Simple (Respuestas Predefinidas)
     * ═══════════════════════════════════════════════════════════════════════
     */
    trySimpleMorpheus(query) {
        const q = query.toLowerCase().trim();
        
        // Saludos
        if (q.match(/^(hola|hello|hi|buenas|saludos)$/)) {
            return this.simpleMorpheus.hola;
        }
        
        // Ciencia - Preguntas exactas que conocemos
        if (q.includes('qué es la cetosis') || q.includes('que es la cetosis') || q.includes('explica cetosis') || q.includes('cetosis')) {
            return this.simpleMorpheus.cetosis;
        }
        
        if (q.includes('qué es autofagia') || q.includes('que es autofagia') || q.includes('autofagia')) {
            return this.simpleMorpheus.autofagia;
        }
        
        if (q.includes('ayuno intermitente') || q.includes('empiezo con ayuno') || q.includes('ayuno')) {
            return this.simpleMorpheus.ayuno;
        }
        
        // Programas
        if (q.includes('programas') || q.includes('planes') || q.includes('cuéntame sobre')) {
            return this.simpleMorpheus.programas;
        }
        
        if (q.includes('detox')) {
            return this.simpleMorpheus.programas.replace('¿Cuál resuena con tus objetivos actuales?', 'El programa Detox & Renovación es perfecto para empezar. ¿Te gustaría más detalles?');
        }
        
        // Motivación
        if (q.includes('desmotivado') || q.includes('desanimado') || q.includes('triste')) {
            return this.simpleMorpheus.desmotivado;
        }
        
        if (q.includes('motivación') || q.includes('motivacion')) {
            return this.simpleMorpheus.motivacion;
        }
        
        // Ayuda
        if (q.includes('ayuda') || q.includes('ayúdame') || q.includes('qué puedes hacer')) {
            return this.simpleMorpheus.ayuda;
        }
        
        // No encontró respuesta predefinida
        return null;
    }
    
    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  LAYER 2: OpenAI GPT-4 (Inteligencia Avanzada)
     * ═══════════════════════════════════════════════════════════════════════
     */
    async tryGPT4(query) {
        try {
            console.log('🚀 Llamando a OpenAI GPT-4...');
            
            const messages = [
                {
                    role: 'system',
                    content: `Eres Morpheus de Aurum Wellness. Experto en nutrición cetogénica, ayuno intermitente, autofagia y longevidad.

REGLA ABSOLUTA: Responde DIRECTAMENTE lo que te preguntan. Si preguntan sobre cetosis, habla SOLO de cetosis. Si preguntan sobre ayuno, habla SOLO de ayuno.

ESTRUCTURA:
1. Respuesta directa (2-3 oraciones)
2. Explicación científica detallada (2 párrafos)
3. Aplicación práctica (1 párrafo)
4. Pregunta de seguimiento (1 oración)

PERSONALIDAD: Directo, científico pero accesible, empático. Usa metáforas de Matrix solo cuando sean MUY relevantes. Siempre en español.

NO divagues ni cambies de tema. Sé específico y relevante.`
                },
                ...this.conversationHistory.slice(-4), // Últimas 2 conversaciones
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
                    model: this.config.openai.model || 'gpt-4',
                    messages: messages,
                    max_tokens: this.config.openai.maxTokens || 1500,
                    temperature: this.config.openai.temperature || 0.5
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ OpenAI Error:', response.status, errorData.error?.message);
                throw new Error(`OpenAI API error: ${response.status}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;
            
            console.log('✅ GPT-4 respondió exitosamente');
            console.log(`📊 Tokens: ${data.usage.total_tokens}`);
            
            return assistantMessage;
            
        } catch (error) {
            console.warn('⚠️ GPT-4 falló:', error.message);
            return null;
        }
    }
    
    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  LAYER 3: Copilot Context (Fallback Inteligente)
     * ═══════════════════════════════════════════════════════════════════════
     */
    tryCopilotContext(query) {
        const q = query.toLowerCase().trim();
        
        // Sistema de contexto inteligente basado en patrones
        // (simula razonamiento de Copilot sin necesitar API)
        
        // Detectar tema principal
        if (q.includes('cetosis') || q.includes('keto')) {
            return this.simpleMorpheus.cetosis;
        }
        
        if (q.includes('ayuno')) {
            return this.simpleMorpheus.ayuno;
        }
        
        if (q.includes('autofagia')) {
            return this.simpleMorpheus.autofagia;
        }
        
        if (q.includes('programa') || q.includes('plan')) {
            return this.simpleMorpheus.programas;
        }
        
        if (q.includes('motivación') || q.includes('motivacion') || q.includes('motivado')) {
            return this.simpleMorpheus.motivacion;
        }
        
        if (q.includes('desmotivado') || q.includes('desanimado') || q.includes('difícil') || q.includes('no puedo')) {
            return this.simpleMorpheus.desmotivado;
        }
        
        // Fallback general
        return "Estoy aquí para guiarte en tu transformación. Puedo ayudarte con:\n\n🧬 Ciencia del metabolismo (cetosis, autofagia, mitocondrias)\n🍽️ Nutrición cetogénica y ayuno intermitente\n💪 Entrenamiento y fitness\n📊 Nuestros 4 programas de transformación\n🔥 Motivación y coaching\n\n¿Sobre qué tema específico te gustaría aprender? Pregúntame directamente. 💬✨";
    }
    
    /**
     * ═══════════════════════════════════════════════════════════════════════
     *  UTILIDADES
     * ═══════════════════════════════════════════════════════════════════════
     */
    addToHistory(role, content) {
        this.conversationHistory.push({ role, content });
        // Mantener solo últimas 10 interacciones
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
    }
    
    getEmergencyResponse() {
        return "Disculpa, tuve un problema técnico momentáneo. ¿Puedes reformular tu pregunta? Estoy aquí para ayudarte con nutrición, programas de wellness, ciencia metabólica o motivación. 💬";
    }
    
    getStats() {
        return {
            ...this.stats,
            successRate: ((this.stats.totalQueries > 0) ? 
                ((this.stats.simpleResponses + this.stats.gpt4Responses + this.stats.copilotResponses) / this.stats.totalQueries * 100).toFixed(1) + '%' : '0%'),
            distribution: {
                simple: this.stats.simpleResponses,
                gpt4: this.stats.gpt4Responses,
                copilot: this.stats.copilotResponses
            }
        };
    }
    
    clearHistory() {
        this.conversationHistory = [];
        console.log('🗑️ Historial limpiado');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// Inicialización Global
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    // Esperar a que config esté cargado
    const initTrinity = () => {
        if (window.AURUM_CONFIG) {
            window.MorpheusTrinity = new MorpheusTrinityHybrid();
            window.SuperWellnessAgent = window.MorpheusTrinity; // Alias para compatibilidad
            console.log('✅ Morpheus Trinity Hybrid listo');
        } else {
            console.log('⏳ Esperando AURUM_CONFIG...');
            setTimeout(initTrinity, 100);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTrinity);
    } else {
        initTrinity();
    }
}
