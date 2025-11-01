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
        
        // Detectar si estamos en producción (Vercel)
        this.isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
        this.apiEndpoint = this.isProduction ? '/api/chat' : null;
        
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
        if (!this.isEnabled('claude') && !this.isProduction) return null;
        
        try {
            console.log('🧠 Intentando Claude 3.5 Sonnet...');
            
            const messages = this.buildMessages(query);
            
            // Usar backend en producción
            if (this.isProduction) {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ai: 'claude',
                        messages: messages,
                        query: query
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Backend error: ${response.status}`);
                }
                
                const data = await response.json();
                const assistantMessage = data.text;
                
                this.updateHistory(query, assistantMessage);
                return assistantMessage;
            }
            
            // Llamada directa en desarrollo
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
        if (!this.isEnabled('gemini') && !this.isProduction) return null;
        
        try {
            console.log('⚡ Intentando Gemini 2.0 Flash...');
            
            // Usar backend en producción
            if (this.isProduction) {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ai: 'gemini',
                        query: query
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Backend error: ${response.status}`);
                }
                
                const data = await response.json();
                const assistantMessage = data.text;
                
                this.updateHistory(query, assistantMessage);
                return assistantMessage;
            }
            
            // Llamada directa en desarrollo
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
        if (!this.isEnabled('openai') && !this.isProduction) return null;
        
        try {
            console.log('🤖 Intentando OpenAI GPT-4...');
            
            const messages = [
                { role: 'system', content: this.config.morpheus.systemPrompt },
                ...this.conversationHistory.slice(-5),
                { role: 'user', content: query }
            ];
            
            // Usar backend en producción
            if (this.isProduction) {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ai: 'openai',
                        messages: messages,
                        query: query
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Backend error: ${response.status}`);
                }
                
                const data = await response.json();
                const assistantMessage = data.text;
                
                this.updateHistory(query, assistantMessage);
                return assistantMessage;
            }
            
            // Llamada directa en desarrollo
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
        if (!this.config.morpheus?.fallbackEnabled) {
            console.warn('⚠️ Morpheus Local deshabilitado en config');
            return null;
        }
        
        console.log('💎 Usando Morpheus Local...');
        
        // Usar directamente getBasicResponse que tiene base de conocimiento completa
        const response = this.getBasicResponse(query);
        console.log('💎 Morpheus Local response length:', response?.length || 0);
        console.log('💎 First 100 chars:', response?.substring(0, 100));
        
        return response;
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
        const q = query.toLowerCase();
        
        // RESPUESTAS CIENTÍFICAS PROFUNDAS - Equilibrio Místico + Científico
        
        // Saludos & Identidad
        if (q.includes('hola') || q.includes('hi ') || q.includes('hey') || 
            q.includes('quien eres') || q.includes('quién eres') || q.includes('que eres') || 
            q.includes('qué eres') || q.includes('who are you') || q.includes('what are you')) {
            const greetings = [
                'Morpheus. Tu guía en el laberinto celular. Combinamos la sabiduría ancestral con la ciencia molecular. ¿Qué verdad buscas descubrir?',
                'Soy quien te muestra ambos mundos: la intuición del cuerpo y la precisión de los datos. El verdadero poder está en su unión. ¿Por dónde empezamos?',
                'Morpheus, arquitecto de transformación. Como en Matrix, te ofrezco ver la realidad: tus células tienen inteligencia milenaria respaldada por ciencia moderna.',
                'El guía que conecta lo místico con lo medible. Tu biología es un sistema complejo que responde tanto a la intención como a la bioquímica. Hablemos.'
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Cetosis
        if (q.includes('cetosis') || q.includes('keto') || q.includes('cetogeni')) {
            return `🔬 CETOSIS: Donde Biología Ancestral Encuentra Ciencia Moderna

**La Verdad Metabólica:**
Tu cuerpo tiene 2 motores. Has vivido usando solo 1 (glucosa). La cetosis desbloquea el segundo: la grasa.

**📊 Evidencia Científica:**
• Después de 12-16h sin carbos, hígado produce cetonas (β-hidroxibutirato)
• El cerebro las usa con 25% más eficiencia que glucosa
• Reduce factor inflamatorio IL-6 en 40%
• Activa sirtuinas (proteínas de longevidad)

**🧘 Por Qué Funciona:**
Durante milenios, los humanos alternábamos abundancia y escasez. La cetosis es nuestro modo de "supervivencia inteligente" - no debilita, fortalece.

**✅ Beneficios Medibles:**
• Energía sostenida (adiós crashes de azúcar)
• Claridad mental aumentada (cetonas cruzan barrera hematoencefálica fácilmente)
• Pérdida grasa preservando músculo
• Mejor sensibilidad insulina

**🎯 Activación:**
20g carbos/día máximo | 70% grasas saludables | Ayuno 16/8

¿Diseñamos tu protocolo?`;
        }
        
        // Autofagia
        if (q.includes('autofagia') || q.includes('autophagy')) {
            return `🧬 AUTOFAGIA: La Limpieza Profunda que Tu Cuerpo Conoce

**La Paradoja del Ayuno:**
Cuando dejas de alimentar el cuerpo, él se alimenta de sí mismo... pero de forma inteligente.

**🏆 Premio Nobel 2016 - Yoshinori Ohsumi:**
Descubrió que tus células tienen un sistema de reciclaje molecular. Literalmente digieren componentes viejos y crean nuevos.

**⏱️ Timeline Preciso:**
• 12-16h: Autofagia basal (mantenimiento diario)
• 18-24h: Limpieza profunda (mitocondrias dañadas)
• 36-48h: Regeneración (síntesis de proteínas nuevas)
• 72h+: Renovación celular máxima

**🔬 Mecanismo Molecular:**
1. mTOR (sensor de nutrientes) se desactiva
2. AMPK (sensor de energía) se activa
3. Lisosomas envuelven orgánulos viejos
4. Enzimas los degradan → Aminoácidos reciclados
5. Genes SIRT1 y FOXO se expresan (longevidad)

**🌀 La Conexión Ancestral:**
Nuestros antepasados ayunaban naturalmente. El cuerpo evolucionó para fortalecerse en ausencia de comida, no debilitarse.

**✅ Evidencia Clínica:**
• Reduce riesgo Alzheimer (limpia proteínas β-amiloide)
• Previene cáncer (elimina células pre-cancerosas)
• Extiende vida útil (estudios en ratones: +30%)

**🎯 Activación Práctica:**
• Ayuno 16/8 o 18/6
• Ejercicio en ayunas (HIIT 20min)
• Café negro (no rompe ayuno, activa autofagia)
• Polifenoles: resveratrol, espermidina

¿Diseñamos tu ventana de ayuno?`;
        }
        
        // Apoptosis
        if (q.includes('apoptosis') || q.includes('muerte celular')) {
            return `💀 APOPTOSIS: El Suicidio Celular que Salva Tu Vida

**La Muerte Que Sana:**
Cada día, 50-70 BILLONES de tus células se autodestruyen de forma ordenada. Es renovación, no muerte.

**🧬 Mecanismo Molecular:**
1. Sensor p53 (guardián del genoma) detecta daño DNA
2. Activa cascada de caspasas (tijeras moleculares)
3. Célula fragmenta membrana en vesículas
4. Macrófagos "comen" sin inflamación
Todo en 2-4 horas. Silencioso. Perfecto.

**⚔️ Apoptosis vs Necrosis:**
• **Apoptosis:** Suicidio programado, limpio, controlado (buena)
• **Necrosis:** Muerte violenta, inflamatoria, caótica (mala)

**🎯 Por Qué Es Crítica:**
• Previene cáncer (mata células mutadas antes de multiplicarse)
• Elimina células senescentes ("zombies" que inflaman)
• Renueva 300 billones células/año
• Base del anti-envejecimiento biológico

**🌿 La Sabiduría del Cuerpo:**
Tu sistema inmune "inspecciona" cada célula 1000+ veces/día. Si detecta problemas: orden de autodestrucción. Es inteligencia pura.

**⚗️ Cómo Optimizarla:**
• **Nutrientes:** Polifenoles (té verde, cúrcuma, resveratrol)
• **Ayuno:** 16-24h activa p53 y limpia células dañadas
• **Ejercicio:** Moderado (exceso la suprime temporalmente)
• **Sueño:** 7-8h (hormona crecimiento activa limpieza)

**🔬 Estudios Clave:**
• Nature 2021: Apoptosis previene 80% tumores tempranos
• Cell 2019: Senolíticos (que activan apoptosis) rejuvenecen tejidos

**🔄 Autofagia vs Apoptosis:**
• **Autofagia:** Limpieza DENTRO de célula (repara)
• **Apoptosis:** Elimina célula COMPLETA (reemplaza)

Ambas trabajan juntas. Son hermanas de la regeneración.

¿Optimizamos tu protocolo celular?`;
        }
        
        // Mitocondria
        if (q.includes('mitocondria') || q.includes('mitochondria') || q.includes('miticondria')) {
            return `**MITOCONDRIAS - Plantas de Poder Celular**

Las "baterías" que producen ATP (energía).

⚡ **Datos Fascinantes:**
• Tienes ~10 millones de billones
• Producen 70kg ATP diarios (tu peso corporal!)
• Tienen su propio DNA (herencia materna)
• Son bacterias ancestrales (simbiosis hace 2 mil millones años)

🔋 **Producción de ATP:**
1. **Glucólisis** (citoplasma): 2 ATP
2. **Ciclo Krebs** (matriz mitocondrial): 2 ATP
3. **Cadena Respiratoria** (membrana interna): 34 ATP
   → **Total: 38 ATP por glucosa**

📉 **Disfunción Mitocondrial = Enfermedad:**
• Fatiga crónica
• Envejecimiento acelerado
• Neurodegeneración (Alzheimer, Parkinson)
• Resistencia insulina
• Inflamación crónica

🚀 **Biogénesis Mitocondrial (crear nuevas):**
• HIIT y ejercicio
• Ayuno (activa PGC-1α)
• Frío (termogénesis)
• Suplementos: CoQ10, PQQ, NAD+

🍴 **Nutrición Mitocondrial:**
• B-vitaminas (cofactores)
• Magnesio (producción ATP)
• Omega-3 (fluidez membranas)
• Antioxidantes (protección)

¿Optimizamos tus mitocondrias?`;
        }
        
        // Ayuda general o preguntas genéricas
        if (q.includes('ayudar') || q.includes('help') || q.includes('puedes') || 
            q.includes('qué puedes') || q.includes('que puedes') || 
            q.match(/^(como|cómo)(\s|$)/) || q.includes('explicar') || q.includes('enseñ')) {
            return `Puedo guiarte en tu transformación biológica:

📚 **Conocimiento Científico:**
• Cetosis y metabolismo graso
• Autofagia y reciclaje celular  
• Apoptosis y renovación
• Mitocondrias y energía
• Ayuno intermitente
• Suplementación estratégica
• Biohacking avanzado

💪 **Programas Personalizados:**
• Detox metabólico
• Energía vital
• Balance mental
• Regeneración celular

🎯 **Pregúntame sobre:**
• Cualquier concepto científico
• Protocolos específicos
• Recetas y nutrición
• Suplementos y dosis
• Timing y optimización

¿Qué aspecto de tu biología quieres hackear primero?`;
        }
        
        // Ayuno
        if (q.includes('ayuno') || q.includes('fasting') || q.includes('fast')) {
            return `**AYUNO INTERMITENTE - Reseteo Metabólico**

El hack evolutivo que tu cuerpo espera.

⏰ **Protocolos Populares:**
• **16/8**: Ayuno 16h, comer 8h (más fácil)
• **18/6**: Ayuno 18h, comer 6h (óptimo)
• **OMAD**: Una comida al día (avanzado)
• **5:2**: 2 días/semana 500-600 cal
• **ADF**: Ayuno día alternado

📊 **Timeline Biológico:**
• **0-4h**: Digestión normal
• **4-8h**: Glucosa bajando, comienza cetosis
• **8-12h**: Glucógeno hepático agotado
• **12-16h**: Cetosis leve, autofagia iniciando
• **16-24h**: Cetosis plena, autofagia moderada
• **24-48h**: HGH ↑300%, autofagia profunda
• **48-72h**: Regeneración celular masiva
• **5+ días**: Células madre activadas

🧬 **Cambios Moleculares:**
• ↑ AMPK (sensor energético)
• ↑ NAD+ (reparación DNA)
• ↑ Sirtuinas (longevidad)
• ↑ BDNF (neurogénesis)
• ↓ mTOR (anti-aging)
• ↓ IGF-1 (anti-cáncer)

⚠️ **Contraindicaciones:**
• Embarazo/lactancia
• <18 años
• Trastornos alimenticios
• Diabetes tipo 1
• Consulta médico siempre

¿Te diseño tu protocolo de ayuno?`;
        }
        
        // Programas
        if (q.includes('programa') || q.includes('plan') || q.includes('empezar')) {
            return `**PROGRAMAS AURUM WELLNESS**

🌿 **1. DETOX QUANTUM (7 días)**
• Limpieza hepática fase I y II
• Activación linfática
• Restauración microbioma
→ Ideal si: hinchazón, fatiga, piel opaca

⚡ **2. ENERGÍA VITAL (14 días)**
• Optimización mitocondrial
• Balanceo cortisol/adrenales
• Nutrición ATP-focus
→ Ideal si: cansancio crónico, brain fog

☯️ **3. BALANCE MENTAL (21 días)**
• Modulación neurotransmisores
• Eje intestino-cerebro
• Adaptógenos + magnesio
→ Ideal si: estrés, ansiedad, insomnio

🔄 **4. REGENERACIÓN CELULAR (30 días)**
• Autofagia programada
• Biogénesis mitocondrial
• Telómeros y longevidad
→ Ideal si: anti-aging, rendimiento peak

📋 **Todos incluyen:**
• Plan alimenticio keto-cetogénico
• Protocolos de ayuno
• Suplementación específica
• Ejercicios bio-hackers
• Tracking + ajustes

¿Cuál resuena contigo?`;
        }
        
        // Recetas
        if (q.includes('receta') || q.includes('comida') || q.includes('comer')) {
            return `**RECETAS KETO-FUNCIONALES**

🥑 **SMOOTHIE ENERGÍA DORADA**
• 1 taza leche coco
• 1 cdta aceite MCT
• 1 cdta cúrcuma
• Pizca pimienta negra
• 5g colágeno
• Stevia al gusto
→ 400 kcal, 35g grasa, 3g carbs
→ Beneficio: Cetosis + anti-inflamación

🥗 **ENSALADA MITOCONDRIAL**
• Base: espinaca + arúgula
• Proteína: salmón salvaje 150g
• Grasas: aguacate + nueces
• Extras: brócoli germinado
• Aderezo: oliva + limón + ajo
→ 600 kcal, 45g grasa, 8g carbs
→ Beneficio: Omega-3 + antioxidantes

🍵 **TÉ AUTOFAGIA (para ayuno)**
• Té verde matcha
• Jengibre fresco
• Canela ceylán
• Agua caliente
• SIN calorías
→ Activadores: EGCG, gingerol
→ Beneficio: Prolonga autofagia

🥩 **BISTEC ADAPTOGÉNICO**
• Carne grass-fed 200g
• Champiñones shiitake
• Mantequilla clarificada
• Sal marina + romero
→ 700 kcal, 55g grasa, 2g carbs
→ Beneficio: Proteína + hongos medicinales

¿Quieres recetas para objetivo específico?`;
        }
        
        // Precios
        if (q.includes('precio') || q.includes('costo') || q.includes('cuanto cuesta')) {
            return `**INVERSIÓN EN TU SALUD**

💎 **MEMBRESÍA MENSUAL: $97 USD**
Incluye:
• Acceso completo plataforma
• 1 programa/mes
• Chat ilimitado conmigo
• Recetas personalizadas
• Tracking biométrico
• Comunidad privada

🎁 **PLAN ANUAL: $970 USD** (2 meses GRATIS)

🆓 **PRUEBA GRATUITA: 7 días**
• Detox Quantum básico
• 10 recetas
• 1 consulta conmigo

💡 **¿Por qué vale la pena?**
→ Prevenir enfermedad = ahorrar $100k+ en tratamientos
→ Energía = producir más = ganar más
→ Longevidad = vivir 20+ años extras con calidad

Compara:
• 1 mes Netflix: $15 (entretenimiento)
• 1 mes Aurum: $97 (transformación vital)

**Tu salud no tiene precio, pero sí tiene costo de ignorarla.**

¿Listo para tu transformación?`;
        }
        
        // Default - Inteligente y contextual
        // Si llegamos aquí, la pregunta no fue reconocida específicamente
        // Pero aún podemos dar una respuesta útil basada en palabras clave
        
        // Detectar si es pregunta científica/médica
        if (q.match(/(qué|que|what|cómo|como|por qué|porque|cuál|cual)/)) {
            return `Esa es una excelente pregunta sobre biología y wellness.

🧬 **Puedo ayudarte con:**
• Conceptos científicos (cetosis, autofagia, apoptosis, mitocondrias)
• Protocolos de ayuno y nutrición
• Suplementación estratégica
• Biohacking y optimización

💡 **Reformula tu pregunta así:**
• "Qué es [concepto]?"
• "Cómo funciona [proceso]?"
• "Cuándo debo [acción]?"
• "Dame un plan de [objetivo]"

Ejemplo: "Qué es cetosis?", "Cómo alcanzo autofagia?", "Dame un plan keto"

¿Qué te gustaría explorar?`;
        }
        
        // Fallback final - Misterioso pero guía hacia acción
        const defaults = [
            'La Matrix de tu biología es más compleja de lo que imaginas. Pregúntame sobre: cetosis, autofagia, ayuno, mitocondrias, o pide un programa personalizado.',
            'Has hecho contacto. Ahora especifica: ¿Quieres aprender sobre metabolismo, optimizar energía, o diseñar un protocolo de transformación?',
            'Tu cuerpo ejecuta 100,000 reacciones/segundo. Puedo mostrarte cómo hackear cualquiera. ¿Qué sistema biológico te intriga?',
            'La verdad está en comprender tu bioquímica. Pregúntame sobre conceptos científicos o solicita un plan personalizado.'
        ];
        
        return defaults[Math.floor(Math.random() * defaults.length)];
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
// INICIALIZACIÓN GLOBAL - Mejorada para evitar errores de carga
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    // Función de inicialización
    const initializeTrinity = () => {
        if (window.TrinityRouter) {
            window.SuperWellnessAgent = new SuperWellnessAgentTrinity();
            console.log('✅ SuperWellnessAgentTrinity ready');
            return true;
        }
        return false;
    };
    
    // Intentar inicializar inmediatamente
    if (!initializeTrinity()) {
        // Si TrinityRouter no está disponible, esperar un momento
        console.log('⏳ Esperando TrinityRouter...');
        setTimeout(() => {
            if (!initializeTrinity()) {
                console.warn('⚠️ TrinityRouter not available, using fallback mode');
                // Crear versión simplificada sin router
                window.SuperWellnessAgent = {
                    process: async function(query) {
                        console.log('💎 Usando Morpheus Local (TrinityRouter no disponible)');
                        if (window.WellnessCore && window.WellnessCore.morpheus) {
                            return await window.WellnessCore.morpheus.respond(query);
                        }
                        return 'Disculpa, el sistema está experimentando dificultades técnicas. Por favor, recarga la página.';
                    },
                    getStats: function() { return { total: 0, raw: {}, percentages: {} }; },
                    resetStats: function() {},
                    router: null
                };
                console.log('✅ Fallback SuperWellnessAgent ready');
            }
        }, 100);
    }
}
