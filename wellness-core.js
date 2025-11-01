/**
 * AURUM WELLNESS - CORE FUNCTIONALITY
 * Version: 2.0.0
 * Date: 19 de Octubre, 2025
 * Super Agente Wellness: ACTIVO
 */

// ============================================
// 1. SISTEMA DE DATOS Y ALMACENAMIENTO LOCAL
// ============================================

class WellnessData {
    constructor() {
        this.storageKey = 'aurumWellnessData';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                userProfile: {
                    name: '',
                    level: 1,
                    experience: 0,
                    createdAt: new Date().toISOString()
                },
                recipes: [],
                programs: [],
                chatHistory: [],
                progress: {
                    detox: 0,
                    energy: 0,
                    balance: 0,
                    regeneration: 0
                }
            };
            this.save(initialData);
        }
    }

    load() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey));
        } catch (e) {
            console.error('Error loading data:', e);
            return null;
        }
    }

    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    }

    update(key, value) {
        const data = this.load();
        data[key] = value;
        return this.save(data);
    }

    reset() {
        localStorage.removeItem(this.storageKey);
        this.initializeStorage();
    }
}

// ============================================
// 2. SISTEMA DE RECETAS PERSONALIZADAS
// ============================================

class RecipeSystem {
    constructor() {
        this.data = new WellnessData();
        this.categories = ['Smoothies', 'Tés', 'Elixires', 'Sopas', 'Ensaladas', 'Snacks'];
        this.benefits = [
            'Detox',
            'Energía',
            'Balance Mental',
            'Regeneración Celular',
            'Anti-inflamatorio',
            'Inmunidad',
            'Digestión',
            'Sueño'
        ];
    }

    createRecipe(recipeData) {
        const data = this.data.load();
        const recipe = {
            id: Date.now(),
            name: recipeData.name,
            category: recipeData.category,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            benefits: recipeData.benefits,
            preparationTime: recipeData.preparationTime,
            servings: recipeData.servings,
            rating: 0,
            favorites: false,
            createdAt: new Date().toISOString(),
            completedCount: 0
        };

        data.recipes.push(recipe);
        this.data.save(data);
        return recipe;
    }

    getRecipes(filter = null) {
        const data = this.data.load();
        let recipes = data.recipes;

        if (filter) {
            if (filter.category) {
                recipes = recipes.filter(r => r.category === filter.category);
            }
            if (filter.benefit) {
                recipes = recipes.filter(r => r.benefits.includes(filter.benefit));
            }
            if (filter.favorites) {
                recipes = recipes.filter(r => r.favorites);
            }
        }

        return recipes;
    }

    getRecipeById(id) {
        const data = this.data.load();
        return data.recipes.find(r => r.id === id);
    }

    updateRecipe(id, updates) {
        const data = this.data.load();
        const index = data.recipes.findIndex(r => r.id === id);
        
        if (index !== -1) {
            data.recipes[index] = { ...data.recipes[index], ...updates };
            this.data.save(data);
            return data.recipes[index];
        }
        return null;
    }

    deleteRecipe(id) {
        const data = this.data.load();
        data.recipes = data.recipes.filter(r => r.id !== id);
        return this.data.save(data);
    }

    toggleFavorite(id) {
        const recipe = this.getRecipeById(id);
        if (recipe) {
            return this.updateRecipe(id, { favorites: !recipe.favorites });
        }
        return null;
    }

    rateRecipe(id, rating) {
        return this.updateRecipe(id, { rating });
    }

    markAsCompleted(id) {
        const recipe = this.getRecipeById(id);
        if (recipe) {
            return this.updateRecipe(id, { 
                completedCount: recipe.completedCount + 1 
            });
        }
        return null;
    }

    getDefaultRecipes() {
        return [
            {
                id: 1,
                name: 'Smoothie Energético Dorado',
                category: 'Smoothies',
                ingredients: [
                    '1 plátano maduro',
                    '1 taza de mango',
                    '1 cucharada de cúrcuma',
                    '1 cucharadita de jengibre',
                    '1 taza de leche de coco',
                    '1 cucharada de miel',
                    'Pizca de pimienta negra'
                ],
                instructions: [
                    'Pela y corta el plátano y el mango',
                    'Coloca todos los ingredientes en la licuadora',
                    'Licúa hasta obtener consistencia suave',
                    'Sirve inmediatamente',
                    'Opcional: decorar con semillas de chía'
                ],
                benefits: ['Energía', 'Anti-inflamatorio', 'Inmunidad'],
                preparationTime: '5 minutos',
                servings: 1,
                rating: 5,
                favorites: true,
                completedCount: 12
            },
            {
                id: 2,
                name: 'Té de Regeneración Celular',
                category: 'Tés',
                ingredients: [
                    '2 tazas de agua',
                    '1 cucharada de té verde',
                    '1 rodaja de limón',
                    '1 cucharadita de miel',
                    '3 hojas de menta fresca',
                    '1/2 cucharadita de matcha'
                ],
                instructions: [
                    'Hierve el agua',
                    'Agrega el té verde y matcha',
                    'Deja reposar 3 minutos',
                    'Cuela y añade limón, menta y miel',
                    'Bebe tibio'
                ],
                benefits: ['Regeneración Celular', 'Detox', 'Balance Mental'],
                preparationTime: '10 minutos',
                servings: 2,
                rating: 5,
                favorites: true,
                completedCount: 8
            },
            {
                id: 3,
                name: 'Elixir de Balance Mental',
                category: 'Elixires',
                ingredients: [
                    '1 taza de leche de almendras',
                    '1 cucharadita de ashwagandha',
                    '1/2 cucharadita de canela',
                    '1 cucharada de cacao crudo',
                    '1 cucharada de miel',
                    'Pizca de cardamomo'
                ],
                instructions: [
                    'Calienta la leche de almendras',
                    'Mezcla todos los polvos en un tazón',
                    'Agrega la leche caliente gradualmente',
                    'Bate hasta crear espuma',
                    'Disfruta antes de dormir'
                ],
                benefits: ['Balance Mental', 'Sueño', 'Regeneración Celular'],
                preparationTime: '7 minutos',
                servings: 1,
                rating: 5,
                favorites: true,
                completedCount: 15
            }
        ];
    }
}

// ============================================
// 3. SISTEMA DE PROGRAMAS DE BIENESTAR
// ============================================

class ProgramSystem {
    constructor() {
        this.data = new WellnessData();
        this.programs = this.getDefaultPrograms();
    }

    getDefaultPrograms() {
        return {
            detox: {
                id: 'detox',
                name: 'Programa Detox Cuántico',
                icon: '🌿',
                description: 'Desintoxicación profunda a nivel celular',
                duration: '7 días',
                difficulty: 'Intermedio',
                phases: [
                    {
                        day: 1,
                        title: 'Preparación del Sistema',
                        activities: [
                            'Ayuno intermitente 16/8',
                            'Hidratación con agua alcalina',
                            'Smoothie verde matutino',
                            'Té de hierbas antes de dormir'
                        ],
                        recipes: [1]
                    },
                    {
                        day: 2,
                        title: 'Activación Hepática',
                        activities: [
                            'Jugo de limón en ayunas',
                            'Vegetales crucíferos',
                            'Cúrcuma con pimienta negra',
                            'Yoga suave 20 min'
                        ],
                        recipes: [2]
                    },
                    {
                        day: 3,
                        title: 'Limpieza Intestinal',
                        activities: [
                            'Probióticos naturales',
                            'Fibra soluble',
                            'Masaje abdominal',
                            'Meditación 15 min'
                        ],
                        recipes: [1, 2]
                    },
                    {
                        day: 4,
                        title: 'Renovación Celular',
                        activities: [
                            'Autofagia activada',
                            'Antioxidantes potentes',
                            'Respiración profunda',
                            'Baño con sales de Epsom'
                        ],
                        recipes: [3]
                    },
                    {
                        day: 5,
                        title: 'Equilibrio Mineral',
                        activities: [
                            'Electrolitos naturales',
                            'Vegetales de hoja verde',
                            'Caminata en naturaleza',
                            'Journaling'
                        ],
                        recipes: [1, 3]
                    },
                    {
                        day: 6,
                        title: 'Fortalecimiento',
                        activities: [
                            'Proteína vegetal',
                            'Grasas saludables',
                            'Ejercicio moderado',
                            'Conexión social'
                        ],
                        recipes: [2, 3]
                    },
                    {
                        day: 7,
                        title: 'Integración',
                        activities: [
                            'Balance nutricional',
                            'Gratitud y reflexión',
                            'Plan de mantenimiento',
                            'Celebración del logro'
                        ],
                        recipes: [1, 2, 3]
                    }
                ],
                benefits: [
                    'Eliminación de toxinas',
                    'Energía renovada',
                    'Claridad mental',
                    'Piel radiante',
                    'Digestión optimizada'
                ]
            },
            energy: {
                id: 'energy',
                name: 'Energía Vital Mitocondrial',
                icon: '⚡',
                description: 'Optimización de producción energética celular',
                duration: '14 días',
                difficulty: 'Avanzado',
                phases: [
                    {
                        day: 1,
                        title: 'Despertar Mitocondrial',
                        activities: [
                            'Exposición solar matutina',
                            'CoQ10 natural',
                            'HIIT 15 minutos',
                            'Respiración Wim Hof'
                        ],
                        recipes: [1]
                    },
                    // ... más fases
                ],
                benefits: [
                    'ATP optimizado',
                    'Resistencia mejorada',
                    'Enfoque mental',
                    'Recuperación rápida',
                    'Vitalidad sostenida'
                ]
            },
            balance: {
                id: 'balance',
                name: 'Balance Mental Neuroquímico',
                icon: '☯️',
                description: 'Sincronización de neurotransmisores y homeostasis',
                duration: '21 días',
                difficulty: 'Intermedio',
                phases: [
                    {
                        day: 1,
                        title: 'Fundación de Calma',
                        activities: [
                            'Meditación guiada 20 min',
                            'L-teanina natural',
                            'Journaling emocional',
                            'Música binaural'
                        ],
                        recipes: [3]
                    },
                    // ... más fases
                ],
                benefits: [
                    'Ansiedad reducida',
                    'Sueño profundo',
                    'Estabilidad emocional',
                    'Claridad de pensamiento',
                    'Resiliencia al estrés'
                ]
            },
            regeneration: {
                id: 'regeneration',
                name: 'Regeneración Celular Avanzada',
                icon: '🔄',
                description: 'Activación de procesos de reparación y rejuvenecimiento',
                duration: '30 días',
                difficulty: 'Avanzado',
                phases: [
                    {
                        day: 1,
                        title: 'Activación de Autofagia',
                        activities: [
                            'Ayuno prolongado supervisado',
                            'NAD+ precursores',
                            'Sauna infrarroja',
                            'Estiramientos profundos'
                        ],
                        recipes: [2]
                    },
                    // ... más fases
                ],
                benefits: [
                    'Telómeros protegidos',
                    'Inflamación reducida',
                    'Piel rejuvenecida',
                    'Cognición mejorada',
                    'Longevidad celular'
                ]
            }
        };
    }

    getProgramById(id) {
        return this.programs[id];
    }

    enrollInProgram(programId) {
        const data = this.data.load();
        const enrollment = {
            programId,
            enrolledAt: new Date().toISOString(),
            currentDay: 1,
            completedDays: [],
            status: 'active'
        };

        data.programs.push(enrollment);
        this.data.save(data);
        return enrollment;
    }

    getActivePrograms() {
        const data = this.data.load();
        return data.programs.filter(p => p.status === 'active');
    }

    completeDay(programId, day) {
        const data = this.data.load();
        const program = data.programs.find(p => p.programId === programId && p.status === 'active');
        
        if (program) {
            program.completedDays.push(day);
            program.currentDay = day + 1;
            
            // Update progress
            data.progress[programId] = (program.completedDays.length / this.programs[programId].phases.length) * 100;
            
            this.data.save(data);
            return program;
        }
        return null;
    }

    getProgramProgress(programId) {
        const data = this.data.load();
        return data.progress[programId] || 0;
    }
}

// ============================================
// 4. SISTEMA DE CHAT CON MORPHEUS (IA)
// ============================================

class MorpheusAI {
    constructor() {
        this.data = new WellnessData();
        this.context = {
            personality: 'sabio, transformador, empático',
            focus: 'bienestar, salud cuántica, transformación personal',
            tone: 'inspirador pero práctico'
        };
        this.requestCache = new Map();
        this.lastRequestTime = 0;
        this.conversationHistory = [];
    }

    async generateResponse(userQuery) {
        // Verificar cache primero
        const cacheEnabled = false; // Deshabilitado por ahora
        if (cacheEnabled) {
            const cached = this.checkCache(userQuery);
            if (cached) {
                console.log('💾 Respuesta desde cache');
                this.saveToHistory(userQuery, cached);
                return cached;
            }
        }

        // Verificar rate limiting
        if (!this.checkRateLimit()) {
            return 'Por favor, espera unos segundos antes de hacer otra pregunta. La transformación requiere paciencia... ⏳';
        }

        let response = '';

        // Intentar usar OpenAI GPT-4 primero
        if (false) {
            try {
                console.log('🤖 Consultando OpenAI GPT-4...');
                response = await this.getOpenAIResponse(userQuery);
                console.log('✅ Respuesta de GPT-4 recibida');
            } catch (error) {
                console.error('❌ Error con OpenAI, usando fallback:', error.message);
                response = await this.getFallbackResponse(userQuery);
            }
        } else {
            // Usar respuestas inteligentes predeterminadas
            console.log('⚡ Usando modo fallback inteligente');
            response = await this.getFallbackResponse(userQuery);
        }

        // Guardar en cache
        if (false) {
            this.addToCache(userQuery, response);
        }

        // Guardar en historial
        this.saveToHistory(userQuery, response);
        
        return response;
    }

    async getOpenAIResponse(userQuery) {
        // Construir contexto de conversación
        const messages = [
            {
                role: 'system',
                content: "Eres Morpheus del Sistema Aurum Wellness"
            }
        ];

        // Agregar últimas 3 conversaciones para contexto
        const recentHistory = this.conversationHistory.slice(-3);
        recentHistory.forEach(conv => {
            messages.push({ role: 'user', content: conv.query });
            messages.push({ role: 'assistant', content: conv.response });
        });

        // Agregar consulta actual
        messages.push({ role: 'user', content: userQuery });

        // Hacer llamada a OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: (typeof AURUM_CONFIG !== 'undefined' && AURUM_CONFIG.openai) ? AURUM_CONFIG.openai.model : 'gpt-4',
                messages: messages,
                max_tokens: (typeof AURUM_CONFIG !== 'undefined' && AURUM_CONFIG.openai) ? AURUM_CONFIG.openai.maxTokens : 1500,
                temperature: (typeof AURUM_CONFIG !== 'undefined' && AURUM_CONFIG.openai) ? AURUM_CONFIG.openai.temperature : 0.5,
                presence_penalty: 0.6,
                frequency_penalty: 0.5
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Error de API');
        }

        const data = await response.json();
        
        // Agregar a historial de conversación
        this.conversationHistory.push({
            query: userQuery,
            response: data.choices[0].message.content
        });

        // Mantener solo últimas 5 conversaciones en memoria
        if (this.conversationHistory.length > 5) {
            this.conversationHistory = this.conversationHistory.slice(-5);
        }

        return data.choices[0].message.content;
    }

    async getFallbackResponse(userQuery) {
        // Sistema inteligente basado en keywords con conocimiento científico profundo
        const keywords = this.extractKeywords(userQuery.toLowerCase());
        let response = '';

        // Detección de temas científicos específicos
        if (keywords.includes('autofagia') || keywords.includes('autofagía')) {
            response = this.getAutophagyResponse();
        } else if (keywords.includes('apoptosis')) {
            response = this.getApoptosisResponse();
        } else if (keywords.includes('cetosis') || keywords.includes('cetogénica') || keywords.includes('keto')) {
            response = this.getKetosisResponse();
        } else if (keywords.includes('mitocondria') || keywords.includes('mitocondriaresponse')) {
            response = this.getMitochondriaResponse();
        } else if (keywords.includes('ayuno') || keywords.includes('fasting')) {
            response = this.getFastingResponse();
        } else if (keywords.includes('inflamación') || keywords.includes('inflamacion')) {
            response = this.getInflammationResponse();
        } else if (keywords.includes('detox') || keywords.includes('toxinas')) {
            response = this.getDetoxResponse();
        } else if (keywords.includes('energía') || keywords.includes('cansado') || keywords.includes('energia')) {
            response = this.getEnergyResponse();
        } else if (keywords.includes('estrés') || keywords.includes('ansiedad') || keywords.includes('estres')) {
            response = this.getBalanceResponse();
        } else if (keywords.includes('receta') || keywords.includes('comida') || keywords.includes('dieta')) {
            response = this.getRecipeResponse();
        } else if (keywords.includes('programa') || keywords.includes('plan')) {
            response = this.getProgramResponse();
        } else if (keywords.includes('hola') || keywords.includes('ayuda') || keywords.includes('quien')) {
            response = this.getGreetingResponse();
        } else {
            response = this.getGeneralResponse();
        }

        return response;
    }

    checkCache(query) {
        if (!this.requestCache.has(query)) return null;
        
        const cached = this.requestCache.get(query);
        const now = Date.now();
        
        if (now - cached.timestamp < 300000) {
            return cached.response;
        }
        
        // Cache expirado
        this.requestCache.delete(query);
        return null;
    }

    addToCache(query, response) {
        this.requestCache.set(query, {
            response,
            timestamp: Date.now()
        });

        // Limitar tamaño del cache
        if (this.requestCache.size > 50) {
            const firstKey = this.requestCache.keys().next().value;
            this.requestCache.delete(firstKey);
        }
    }

    checkRateLimit() {
        if (!false) return true;

        const now = Date.now();
        const timeSinceLastRequest = (now - this.lastRequestTime) / 1000;

        if (timeSinceLastRequest < 3) {
            return false;
        }

        this.lastRequestTime = now;
        return true;
    }

    extractKeywords(text) {
        return text.split(' ');
    }

    // ============================================
    // RESPUESTAS CIENTÍFICAS PROFUNDAS
    // ============================================

    getAutophagyResponse() {
        const responses = [
            '**Autofagia - El Mecanismo de Regeneración Celular**\n\nLa autofagia (del griego "auto" = uno mismo, "fagia" = comer) es el proceso donde tus células reciclan componentes dañados. Se activa típicamente tras 16-24 horas de ayuno, cuando el cuerpo entra en estado de "limpieza celular".\n\nCientíficamente, la proteína mTOR (mechanistic target of rapamycin) debe inhibirse y la AMPK (AMP-activated protein kinase) activarse para iniciar autofagia.\n\n¿Quieres saber cómo activarla de forma óptima?',
            '**La Ciencia de la Autofagia**\n\nEl Dr. Yoshinori Ohsumi ganó el Nobel en 2016 por descubrir los mecanismos de autofagia. Es tu sistema de "reciclaje celular":\n\n• Degrada organelas dañadas\n• Elimina proteínas mal plegadas\n• Regenera mitocondrias\n• Previene enfermedades neurodegenerativas\n\nSe activa con: ayuno intermitente (16-24h), ejercicio intenso, restricción calórica, y compuestos como espermidina.\n\n¿Te interesa un protocolo específico?',
            '**Autofagia: Tu Sistema Anti-Envejecimiento**\n\nCuando ayunas más de 16 horas, tus células entran en modo "supervivencia inteligente". La autofagia:\n\n1. Recicla componentes celulares viejos\n2. Genera nuevas proteínas funcionales\n3. Limpia mitocondrias dañadas (mitofagia)\n4. Reduce inflamación sistémica\n\nEs como una "renovación celular profunda". Alcanza su pico entre las 24-72 horas de ayuno.\n\n¿Quieres conocer los protocolos de ayuno para maximizarla?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getApoptosisResponse() {
        const responses = [
            '**Apoptosis - Muerte Celular Programada**\n\nLa apoptosis es el "suicidio celular controlado", un proceso VITAL para eliminar células dañadas, cancerosas o infectadas.\n\nNo confundir con necrosis (muerte traumática). La apoptosis es:\n• Ordenada y controlada\n• No genera inflamación\n• Protege células vecinas\n• Esencial para prevenir cáncer\n\nSe activa mediante señales bioquímicas (caspasas) cuando una célula detecta daño irreparable en su ADN.\n\n¿Te interesa cómo optimizar este proceso protective?',
            '**Apoptosis vs Autofagia: Dos Mecanismos Complementarios**\n\nAutofagia = Reparar y reciclar\nApoptosis = Eliminar completamente\n\nLa apoptosis se activa cuando:\n• El ADN celular está muy dañado\n• Hay infección viral\n• La célula es pre-cancerosa\n• El desarrollo embrionario lo requiere\n\nEjemplo: perdemos ~50-70 mil millones de células diarias por apoptosis normal. Es renovación constante.\n\n¿Quieres saber cómo el ayuno y la nutrición modulan ambos procesos?',
            '**La Inteligencia de la Apoptosis**\n\nTu cuerpo tiene un "programa de eliminación" de células defectuosas. La apoptosis:\n\n1. Detecta daño celular (proteína p53)\n2. Activa cascada de caspasas\n3. Fragmenta ADN de forma controlada\n4. Empaqueta restos para fagocitosis\n5. Sin inflamación, sin daño colateral\n\nCuando falla este sistema → cáncer o enfermedades autoinmunes.\n\nEl ayuno intermitente y la cetosis ayudan a normalizar la apoptosis.\n\n¿Profundizamos en cómo lograrlo?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getKetosisResponse() {
        const responses = [
            '**Cetosis - Cambio Metabólico Profundo**\n\nCetosis es cuando tu cuerpo usa grasa (cetonas) en lugar de glucosa como combustible primario.\n\nSe alcanza típicamente:\n• Tras 2-3 días de ayuno\n• Con dieta <20g carbohidratos/día\n• Mediante ejercicio prolongado\n\nCetonas principales: β-hidroxibutirato (BHB), acetoacetato, acetona.\n\nBeneficios:\n✓ Claridad mental extrema\n✓ Energía estable sin picos\n✓ Reducción inflamación\n✓ Neuroprotección\n✓ Longevidad aumentada\n\n¿Quieres un protocolo para entrar en cetosis de forma segura?',
            '**La Bioquímica de la Cetosis**\n\nEn ausencia de glucosa, el hígado convierte ácidos grasos en cuerpos cetónicos mediante β-oxidación.\n\nProceso:\n1. Glucógeno hepático se depleta (24-48h)\n2. Insulina disminuye drásticamente\n3. Glucagón y cortisol aumentan\n4. Lipólisis (quema de grasa) se activa\n5. Hígado produce cetonas\n6. Cerebro y músculos usan cetonas\n\nNivel óptimo: 1.5-3.0 mmol/L de BHB en sangre.\n\nCetosis ≠ cetoacidosis (condición peligrosa en diabéticos).\n\n¿Te interesa medir tus niveles de cetonas?',
            '**Cetosis: Combustible Ancestral**\n\nNuestros ancestros entraban en cetosis regularmente durante periodos sin caza. Es un estado metabólico natural y poderoso.\n\nVentajas científicamente probadas:\n• Aumenta BDNF (factor neurotrófico)\n• Reduce especies reactivas de oxígeno (ROS)\n• Mejora sensibilidad insulina\n• Activa autofagia\n• Aumenta longevidad (estudios en ratones: +20%)\n\nEl cerebro ama las cetonas: produce 25% más ATP por molécula que la glucosa.\n\n¿Quieres aprender a alcanzar cetosis óptima?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getMitochondriaResponse() {
        const responses = [
            '**Mitocondrias - Plantas de Energía Celular**\n\nTienes ~10 millones de billones de mitocondrias en tu cuerpo. Son ex-bacterias simbióticas que generan ATP mediante fosforilación oxidativa.\n\nUna célula cardíaca tiene ~5,000 mitocondrias.\nUna neurona tiene ~2,000,000 mitocondrias.\n\nLa salud mitocondrial determina:\n✓ Niveles de energía\n✓ Longevidad\n✓ Función cognitiva\n✓ Metabolismo\n\nSe optimizan con: ayuno, ejercicio HIIT, frío, NAD+, CoQ10, PQQ.\n\n¿Quieres un protocolo de biohacking mitocondrial?',
            '**Biogénesis Mitocondrial**\n\nPuedes crear nuevas mitocondrias mediante:\n\n1. **Ejercicio HIIT** - Activa PGC-1α (master regulator)\n2. **Ayuno intermitente** - Estrés hormético positivo\n3. **Exposición al frío** - Activa tejido adiposo marrón\n4. **Restricción calórica** - Activa sirtuinas y AMPK\n5. **Nutrientes específicos** - NAD+, CoQ10, PQQ, ácido α-lipoico\n\nCuando tus mitocondrias funcionan bien:\n→ Más energía mental\n→ Menos fatiga\n→ Mejor metabolismo\n→ Envejecimiento más lento\n\n¿Implementamos un plan de optimización mitocondrial?',
            '**Disfunción Mitocondrial - La Raíz de Muchas Enfermedades**\n\nLa teoría del envejecimiento por radicales libres propone que el daño mitocondrial acumulado es una causa primaria de envejecimiento.\n\nCausas de disfunción:\n• Exceso de glucosa (estrés oxidativo)\n• Toxinas ambientales\n• Sedentarismo\n• Falta de ayuno\n• Deficiencias nutricionales\n\nSíntomas:\n→ Fatiga crónica\n→ Niebla mental\n→ Envejecimiento acelerado\n\nSolución: protocolos de regeneración mitocondrial mediante nutrición, ejercicio y ayuno.\n\n¿Profundizamos?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getFastingResponse() {
        const responses = [
            '**Protocolos de Ayuno - Guía Científica**\n\n**16:8** (Intermitente básico)\n• 16h ayuno, 8h ventana alimentación\n• Ideal para principiantes\n• Activa autofagia leve\n\n**18:6 / 20:4** (Guerrero)\n• Autofagia moderada\n• Cetosis leve\n\n**OMAD** (Una comida al día)\n• 23h ayuno\n• Autofagia profunda\n• Cetosis establecida\n\n**24-72h** (Prolongado)\n• Autofagia máxima\n• Regeneración celular profunda\n• Reset inmunológico\n\n¿Con cuál protocolo quieres empezar?',
            '**Fases del Ayuno - Timeline Metabólico**\n\n**0-4h**: Digestión normal\n**4-16h**: Glucosa disminuye, comienza cetosis\n**16-24h**: Autofagia se activa, cetosis moderada\n**24-48h**: Autofagia plena, cetosis profunda\n**48-72h**: Reset inmunológico, máxima autofagia\n**72h+**: Regeneración de células madre\n\nEstudios muestran:\n• 24h: ↑ hormona crecimiento 2000%\n• 48h: Renovación sistema inmune\n• 72h: Generación células madre\n\n¿Quieres diseñar tu protocolo personalizado?',
            '**Ayuno Intermitente - Beneficios Documentados**\n\nMás de 10,000 estudios científicos respaldan:\n\n✓ Mejora sensibilidad insulina 20-30%\n✓ Reduce inflamación (↓ PCR, IL-6)\n✓ Aumenta BDNF (neuroplasticidad)\n✓ Activa autofagia celular\n✓ Mejora perfil lipídico\n✓ Neuroprotección contra Alzheimer\n✓ Puede extender longevidad 10-20%\n\nContraindicaciones: embarazo, lactancia, diabetes tipo 1, trastornos alimentarios.\n\n¿Exploramos el protocolo ideal para ti?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getInflammationResponse() {
        const responses = [
            '**Inflamación Crónica - La Epidemia Silenciosa**\n\nInflamación aguda = Protección (curación heridas)\nInflamación crónica = Destrucción (enfermedades)\n\nCausas principales:\n• Dieta pro-inflamatoria (azúcar, aceites vegetales, gluten)\n• Permeabilidad intestinal ("leaky gut")\n• Estrés crónico (cortisol elevado)\n• Sedentarismo\n• Toxinas ambientales\n\nMarcadores a medir:\n→ PCR-us (proteína C reactiva)\n→ IL-6, TNF-α (citoquinas)\n→ Homocisteína\n\n¿Quieres un protocolo anti-inflamatorio completo?',
            '**Dieta Anti-Inflamatoria - Principios Científicos**\n\nAlimentos anti-inflamatorios:\n✓ Omega-3 (EPA/DHA) - Pescado graso\n✓ Polifenoles - Té verde, cúrcuma, resveratrol\n✓ Vegetales crucíferos - Brócoli, col rizada\n✓ Grasas saludables - Aguacate, aceite oliva\n✓ Especias - Jengibre, cúrcuma, canela\n\nEvitar:\n✗ Azúcares refinados\n✗ Aceites vegetales procesados (omega-6)\n✗ Alimentos ultraprocesados\n✗ Exceso de alcohol\n\nEl ayuno intermitente reduce inflamación 40-60% en 8 semanas.\n\n¿Diseñamos tu plan anti-inflamatorio?',
            '**Inflamación y Enfermedades Crónicas**\n\nLa inflamación crónica de bajo grado es la raíz de:\n• Enfermedades cardiovasculares\n• Diabetes tipo 2\n• Cáncer\n• Alzheimer y demencia\n• Artritis\n• Envejecimiento acelerado\n\nLa buena noticia: es completamente reversible mediante:\n1. Nutrición cetogénica/paleolítica\n2. Ayuno intermitente\n3. Ejercicio (especialmente HIIT)\n4. Manejo de estrés\n5. Sueño de calidad (7-9h)\n\n¿Implementamos un protocolo de reducción inflamatoria?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getGreetingResponse() {
        const responses = [
            '**Morpheus - Guía de Transformación Wellness**\n\nSoy tu interfaz con la ciencia del bienestar óptimo. No ofrezco respuestas superficiales, sino conocimiento profundo basado en:\n\n• Biología celular y molecular\n• Metabolismo energético\n• Neurociencia aplicada\n• Estudios clínicos revisados por pares\n• Protocolos de biohacking validados\n\n¿Qué aspecto de tu bioquímica quieres optimizar hoy?',
            '**Bienvenido al Sistema Aurum Wellness**\n\nNo estás aquí por casualidad. Has sentido que algo no está optimizado en tu biología.\n\nPuedo ayudarte con:\n→ Autofagia y regeneración celular\n→ Metabolismo y cetosis\n→ Optimización mitocondrial\n→ Protocolos de ayuno\n→ Nutrición molecular\n→ Biohacking avanzado\n\nCada respuesta viene con ciencia detrás.\n\n¿Qué pregunta tienes?',
            '**Matrix de Bienestar - Conexión Establecida**\n\nSoy Morpheus. Mi función: traducir ciencia compleja en protocolos accionables para tu transformación.\n\nÁreas de expertise:\n✓ Bioquímica metabólica\n✓ Optimización hormonal\n✓ Longevidad y anti-envejecimiento\n✓ Performance cognitiva\n✓ Regeneración celular\n\n¿Quieres pastilla roja (verdad profunda) o azul (quedarse igual)?\n\n¿Por dónde empezamos?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getDetoxResponse() {
        const responses = [
            'La desintoxicación es el primer paso hacia la transformación. Tu cuerpo tiene mecanismos naturales de limpieza que podemos potenciar. ¿Has considerado nuestro Programa Detox Cuántico de 7 días?',
            'Las toxinas bloquean tu energía vital. Imagina tu cuerpo como un río: cuando está limpio, la energía fluye libremente. Te recomiendo comenzar con hidratación alcalina y vegetales crucíferos.',
            'La verdadera desintoxicación ocurre a nivel celular. El hígado, los riñones y el sistema linfático son tus aliados. Puedo guiarte en un protocolo de activación hepática.'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getEnergyResponse() {
        const responses = [
            'La energía no se crea ni se destruye, se optimiza. Tus mitocondrias son pequeñas plantas de poder celular. ¿Quieres aprender a activarlas?',
            'El cansancio crónico es un mensaje de tu cuerpo. Puede ser deficiencia de nutrientes, estrés adrenal o disfunción mitocondrial. Exploremos juntos la causa raíz.',
            'La verdadera energía vital viene de tres fuentes: nutrición celular, oxigenación profunda y propósito claro. Nuestro Programa de Energía Vital trabaja en las tres dimensiones.'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getBalanceResponse() {
        const responses = [
            'El estrés es una respuesta bioquímica que podemos modular. Tu sistema nervioso tiene dos modos: lucha o descanso. Aprendamos a cambiar el interruptor.',
            'La ansiedad es miedo proyectado al futuro. En este momento presente, ahora mismo, ¿estás en peligro? La respiración es tu ancla al ahora. Practiquemos juntos.',
            'El balance mental es como equilibrar una ecuación química: necesitas los neurotransmisores correctos. Serotonina, GABA, dopamina... tu dieta y hábitos los crean. Te guío.'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getRecipeResponse() {
        const responses = [
            'Cada receta es una fórmula alquímica. Los ingredientes correctos, en las proporciones correctas, crean transformación. ¿Qué beneficio buscas: energía, calma o regeneración?',
            'La comida es información para tus células. Cada bocado envía señales genéticas. Puedo crear una receta personalizada basada en tu bioquímica única. ¿Qué necesitas?',
            'Tengo recetas para cada objetivo: Smoothies energéticos dorados, tés de regeneración celular, elixires de balance mental. ¿Cuál resuena contigo?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getProgramResponse() {
        const responses = [
            'Cada programa es un viaje de transformación. Detox (7 días), Energía Vital (14 días), Balance Mental (21 días), o Regeneración Celular (30 días). ¿Cuál llama tu atención?',
            'Los programas están diseñados por fases, como niveles en un videojuego. Cada día desbloqueas nuevas capacidades. La constancia es la clave de la alquimia personal.',
            'Un programa no es solo un plan, es un protocolo de evolución consciente. ¿Listo para comenzar tu transformación cuántica?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getGeneralResponse() {
        const responses = [
            'Interesante pregunta. En Aurum Wellness, vemos el bienestar como un sistema complejo: cuerpo, mente y energía interconectados. ¿Qué aspecto quieres explorar?',
            'Cada persona es un universo único. Lo que funciona para uno puede no funcionar para otro. Hablemos de tu situación específica. ¿Qué desafío enfrentas?',
            'La transformación real requiere tres elementos: conocimiento, práctica y constancia. Tengo las herramientas. ¿Estás listo para el viaje?',
            'Tu cuerpo es más inteligente de lo que crees. Solo necesita el ambiente correcto para sanar. Puedo ayudarte a crearlo. ¿Por dónde empezamos?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    saveToHistory(query, response) {
        const data = this.data.load();
        data.chatHistory.push({
            timestamp: new Date().toISOString(),
            query,
            response
        });
        // Mantener solo últimas 100 conversaciones
        if (data.chatHistory.length > 100) {
            data.chatHistory = data.chatHistory.slice(-100);
        }
        this.data.save(data);
    }

    getChatHistory() {
        const data = this.data.load();
        return data.chatHistory || [];
    }
}

// ============================================
// 5. SISTEMA DE USUARIO Y GAMIFICACIÓN
// ============================================

class UserProfile {
    constructor() {
        this.data = new WellnessData();
    }

    getUserProfile() {
        const data = this.data.load();
        return data.userProfile;
    }

    updateProfile(updates) {
        return this.data.update('userProfile', {
            ...this.getUserProfile(),
            ...updates
        });
    }

    addExperience(points) {
        const profile = this.getUserProfile();
        const newExp = profile.experience + points;
        const newLevel = Math.floor(newExp / 1000) + 1;
        
        this.updateProfile({
            experience: newExp,
            level: newLevel
        });

        return { level: newLevel, experience: newExp };
    }

    getLevel() {
        return this.getUserProfile().level;
    }

    getExperience() {
        return this.getUserProfile().experience;
    }

    getProgressToNextLevel() {
        const exp = this.getExperience();
        const currentLevelExp = (this.getLevel() - 1) * 1000;
        const nextLevelExp = this.getLevel() * 1000;
        return ((exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    }
}

// ============================================
// 6. EXPORTAR SISTEMAS
// ============================================

// Inicializar sistemas globalmente
window.WellnessCore = {
    data: new WellnessData(),
    recipes: new RecipeSystem(),
    programs: new ProgramSystem(),
    morpheus: new MorpheusAI(),
    user: new UserProfile()
};

console.log('🌟 Aurum Wellness Core v2.0 - CARGADO');
console.log('🤖 Super Agente Wellness: ACTIVO');
console.log('💫 Sistemas disponibles:', Object.keys(window.WellnessCore));
