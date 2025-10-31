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
        if (!this.config.morpheus?.fallbackEnabled) return null;
        
        console.log('💎 Usando Morpheus Local...');
        
        // Usar directamente getBasicResponse que tiene base de conocimiento completa
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
        const q = query.toLowerCase();
        
        // RESPUESTAS CIENTÍFICAS PROFUNDAS
        
        // Saludos
        if (q.includes('hola') || q.includes('hi ') || q.includes('hey')) {
            const greetings = [
                'Bienvenido a la realidad bajo la Matrix de tu biología. Has encontrado la píldora roja del wellness.',
                'El momento de tu despertar comienza ahora. ¿Estás listo para ver qué tan profundo llega el agujero del conejo?',
                'Has estado buscando respuestas toda tu vida. La verdad sobre tu cuerpo está aquí.'
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Cetosis
        if (q.includes('cetosis') || q.includes('keto')) {
            return `**CETOSIS - El Hack Metabólico**

Estado donde tu cuerpo quema grasa (cetonas) en vez de glucosa.

📊 **Ciencia:**
• Ocurre tras 12-16h de ayuno
• Hígado convierte grasa → cetonas (BHB, acetoacetato)
• Cerebro usa cetonas con 25% más eficiencia
• Reduce inflamación sistémica

⚡ **Beneficios Medibles:**
• Energía estable (sin picos de azúcar)
• Claridad mental aumentada
• Pérdida de grasa preservando músculo
• Mejora sensibilidad insulina

🎯 **Cómo Alcanzarla:**
• <20g carbohidratos/día
• 70% calorías de grasas saludables
• Ayuno intermitente 16/8

¿Quieres un plan keto personalizado?`;
        }
        
        // Autofagia
        if (q.includes('autofagia') || q.includes('autophagy')) {
            return `**AUTOFAGIA - Reciclaje Celular**

Tu cuerpo literalmente se come sus componentes dañados.

🔬 **Ciencia (Premio Nobel 2016):**
• Células descomponen orgánulos viejos
• Reciclan proteínas defectuosas
• Eliminan mitocondrias disfuncionales
• Activan genes de longevidad (FOXO, SIRT1)

⏱️ **Timeline del Ayuno:**
• 12-16h: Autofagia leve (mantenimiento)
• 18-24h: Autofagia moderada (limpieza)
• 48-72h: Autofagia profunda (regeneración)
• 5 días: Regeneración de células madre

✨ **Activadores:**
• Ayuno intermitente
• Ejercicio intenso (HIIT)
• Restricción calórica
• Suplementos: Resveratrol, Espermidina

📈 **Beneficios:**
• Prevención cáncer
• Neuroprotección
• Anti-envejecimiento
• Longevidad aumentada

¿Listo para tu protocolo de ayuno?`;
        }
        
        // Apoptosis
        if (q.includes('apoptosis') || q.includes('muerte celular')) {
            return `**APOPTOSIS - Muerte Celular Programada**

El suicidio controlado de células dañadas.

🧬 **Mecanismo Molecular:**
• Proteínas p53 detectan daño DNA
• Caspasas (enzimas) desmantelan célula
• Membranas se fragmentan
• Macrófagos eliminan residuos sin inflamación

⚔️ **Vs. Necrosis (muerte caótica):**
• Apoptosis: Limpia, silenciosa, controlada
• Necrosis: Inflamatoria, caótica, dañina

🎯 **Por Qué Importa:**
• Previene cáncer (mata células mutadas)
• Elimina células senescentes (zombie)
• Renueva tejidos constantemente
• Base del anti-envejecimiento

⚗️ **Cómo Potenciarla:**
• Polifenoles (té verde, cúrcuma)
• Ayuno activando p53
• Ejercicio moderado
• Sueño profundo (GH activa apoptosis)

🔄 **Diferencia con Autofagia:**
• Autofagia: Limpia DENTRO de célula viva
• Apoptosis: ELIMINA célula completa

¿Quieres optimizar tu renovación celular?`;
        }
        
        // Mitocondria
        if (q.includes('mitocondria') || q.includes('mitochondria')) {
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
        
        // Default - Misterioso pero científico
        const defaults = [
            'La Matrix de tu biología es más compleja de lo que imaginas. Cada célula es un universo. ¿Qué aspecto quieres explorar?',
            'Has hecho una pregunta interesante. En el nivel molecular, todo es química, física y información. ¿Qué sistema biológico te intriga?',
            'Tu cuerpo ejecuta 100,000 reacciones químicas/segundo. Cada una es una oportunidad de optimización. ¿Por dónde empezamos?',
            'La verdad sobre el wellness no está en píldoras mágicas, sino en comprender tu bioquímica. ¿Qué quieres hackear: energía, mente o longevidad?'
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
