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
        } else if (keywords.includes('nad') || keywords.includes('nmn') || keywords.includes('sirtuinas')) {
            response = this.getNADResponse();
        } else if (keywords.includes('ampk') || keywords.includes('mtor')) {
            response = this.getAMPKmTORResponse();
        } else if (keywords.includes('radicales') || keywords.includes('oxidativo') || keywords.includes('antioxidantes')) {
            response = this.getOxidativeStressResponse();
        } else if (keywords.includes('insulina') || keywords.includes('glucosa') || keywords.includes('diabetes')) {
            response = this.getInsulinResponse();
        } else if (keywords.includes('colesterol') || keywords.includes('ldl') || keywords.includes('hdl')) {
            response = this.getCholesterolResponse();
        } else if (keywords.includes('proteína') || keywords.includes('aminoácidos') || keywords.includes('leucina')) {
            response = this.getProteinResponse();
        } else if (keywords.includes('sueño') || keywords.includes('dormir') || keywords.includes('insomnio')) {
            response = this.getSleepResponse();
        } else if (keywords.includes('hormona') || keywords.includes('testosterona') || keywords.includes('cortisol')) {
            response = this.getHormoneResponse();
        } else if (keywords.includes('microbioma') || keywords.includes('intestino') || keywords.includes('probióticos')) {
            response = this.getMicrobiomeResponse();
        } else if (keywords.includes('ejercicio') || keywords.includes('hiit') || keywords.includes('entrenamiento')) {
            response = this.getExerciseResponse();
        } else if (keywords.includes('telómeros') || keywords.includes('envejecimiento') || keywords.includes('longevidad')) {
            response = this.getTelomeresResponse();
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

    // ============================================
    // RESPUESTAS CIENTÍFICAS AVANZADAS - NUEVAS
    // ============================================

    getNADResponse() {
        const responses = [
            '**NAD+ - La Molécula de la Longevidad**\n\nNAD+ (Nicotinamida Adenina Dinucleótido) es crucial para:\n• Producción de ATP (energía)\n• Reparación del ADN\n• Activación de sirtuinas (genes de longevidad)\n• Función mitocondrial\n\nProblema: disminuye 50% entre los 40-60 años.\n\nPrecursores de NAD+:\n✓ NMN (250-500mg/día)\n✓ NR (Nicotinamida Riboside)\n✓ Niacina (B3)\n✓ Ayuno (aumenta NAD+ naturalmente)\n\nEstudios en ratones: NMN revierte envejecimiento vascular y mejora resistencia 50%.\n\n¿Quieres un protocolo de optimización de NAD+?',
            '**Sirtuinas - Proteínas de Longevidad Activadas por NAD+**\n\n7 sirtuinas en humanos (SIRT1-7):\n\n**SIRT1**: Desacetila p53, FoxO, PGC-1α\n→ Resistencia al estrés, metabolismo\n\n**SIRT3**: Mitocondria\n→ Producción de ATP, reducción ROS\n\n**SIRT6**: Reparación ADN\n→ Longevidad, estabilidad genómica\n\nActivadores naturales:\n• Ayuno intermitente\n• Restricción calórica\n• Resveratrol (20-200mg)\n• Ejercicio\n• NAD+ optimization\n\nDr. David Sinclair (Harvard): "Las sirtuinas son el sistema de longevidad del cuerpo."\n\n¿Implementamos un protocolo de activación de sirtuinas?',
            '**Vías de Longevidad: NAD+, Sirtuinas, mTOR**\n\nInterdependencia:\n\n1. NAD+ ↑ → Sirtuinas ↑ → Longevidad ↑\n2. Ayuno → AMPK ↑ → mTOR ↓ → Autofagia ↑\n3. Ejercicio → PGC-1α ↑ → Mitocondrias ↑\n\nSuplementación estratégica:\n• NMN 250mg (mañana)\n• Resveratrol 200mg (con grasa)\n• Berberina 500mg (activa AMPK)\n• Espermidina 1-3mg (autofagia)\n\nResultado: sistema anti-envejecimiento completo.\n\n¿Quieres el protocolo detallado con horarios?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getAMPKmTORResponse() {
        const responses = [
            '**AMPK vs mTOR - El Interruptor Metabólico**\n\n**AMPK** (sensor de escasez):\n• Se activa: ayuno, ejercicio, metformina\n• Efectos: ↑ autofagia, ↑ mitocondrias, ↑ sensibilidad insulina\n• "Modo supervivencia inteligente"\n\n**mTOR** (sensor de abundancia):\n• Se activa: proteína, insulina, azúcar\n• Efectos: ↑ síntesis proteica, ↑ crecimiento, ↓ autofagia\n• "Modo construcción"\n\nEquilibrio óptimo:\n• Ciclar entre estados\n• Ayuno (AMPK) + Alimentación estratégica (mTOR)\n• Juventud = balance; Envejecimiento = mTOR crónico\n\n¿Diseñamos tu estrategia de ciclado AMPK/mTOR?',
            '**Inhibición de mTOR - Clave de Longevidad**\n\nRapamicina (inhibidor mTOR) extiende vida 10-15% en todos los organismos testados.\n\nFormas naturales de inhibir mTOR:\n✓ Ayuno intermitente/prolongado\n✓ Restricción de proteína (< 1g/kg)\n✓ Restricción de leucina\n✓ Polifenoles: EGCG (té verde), curcumina\n✓ Resveratrol, metformina, berberina\n\nBeneficios:\n→ Autofagia máxima\n→ Reducción cáncer\n→ Neuroprotección\n→ Longevidad extendida\n\nEstudio: Monks con restricción calórica viven 30% más.\n\n¿Implementamos restricción estratégica de mTOR?',
            '**Activación de AMPK - Mimetismo de Ejercicio**\n\nAMPK = "master metabolic switch"\n\nActivadores:\n\n1. **Ejercicio** (más potente)\n   • HIIT: 4x4min @ 90% FC máx\n   • Fuerza: pesos compuestos\n   \n2. **Metformina** (500-2000mg)\n   • Droga anti-envejecimiento #1\n   • Reduce mortalidad 30%\n   \n3. **Berberina** (500mg 3x/día)\n   • "Metformina natural"\n   • Igual de efectiva\n   \n4. **Ayuno** (16-24h)\n   • Activación natural\n   • Sinergía con suplementos\n\nResultado: metabolismo optimizado sin ejercicio extremo.\n\n¿Quieres el protocolo de activación AMPK?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getOxidativeStressResponse() {
        const responses = [
            '**Estrés Oxidativo - Balance Redox**\n\nRADICALES LIBRES (ROS):\n• Superóxido (O2•−)\n• Peróxido de hidrógeno (H2O2)\n• Radical hidroxilo (OH•)\n\nFuentes:\n→ Metabolismo mitocondrial (2% O2 → ROS)\n→ Inflamación\n→ Radiación UV\n→ Toxinas ambientales\n\nDEFENSAS ANTIOXIDANTES:\n✓ Enzimas: SOD, catalasa, GPX\n✓ Moléculas: glutatión, CoQ10, vitamina E\n✓ Sistema Nrf2 (master regulator)\n\nBalance = salud. Exceso ROS = envejecimiento acelerado.\n\n¿Optimizamos tu sistema antioxidante?',
            '**Activación de Nrf2 - Protección Celular Máxima**\n\nNrf2 = factor de transcripción que activa 200+ genes antioxidantes.\n\nActivadores naturales:\n\n**Sulforafano** (brócoli):\n• Dosis: 30-60mg/día\n• Mejor: brotes de brócoli\n• Aumenta glutatión 30%\n\n**Curcumina** (cúrcuma):\n• Dosis: 500-1000mg\n• Con pimienta negra (95% absorción)\n\n**Resveratrol**:\n• Activa Nrf2 + sirtuinas\n\n**Ejercicio intenso**:\n• Hormesis = estrés positivo\n\nResultado: tus células producen sus propios antioxidantes poderosos.\n\n¿Implementamos protocolo Nrf2?',
            '**Glutatión - Master Antioxidante**\n\nGlutatión = tripéptido (glutamato-cisteína-glicina)\n\nFunciones críticas:\n• Neutraliza radicales libres\n• Desintoxica hígado\n• Regenera vitaminas C y E\n• Modula sistema inmune\n• Protege ADN\n\nDeficiencia común en:\n→ Envejecimiento\n→ Enfermedades crónicas\n→ Exposición a toxinas\n\nOptimización:\n✓ NAC (N-acetil cisteína) 600mg\n✓ Glicina 3g + Glutamina 5g\n✓ Azufre: ajo, cebolla, huevos\n✓ Selenio (cofactor GPX)\n✓ Sauna (aumenta 30%)\n\n¿Elevamos tus niveles de glutatión?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getInsulinResponse() {
        const responses = [
            '**Resistencia a la Insulina - La Epidemia Oculta**\n\nINSULINA: hormona que regula glucosa → células.\n\nRESISTENCIA = células ignoran señal de insulina.\n\nCausas:\n• Exceso de carbohidratos refinados\n• Alimentación constante (sin ayunos)\n• Sedentarismo\n• Estrés crónico\n• Sueño insuficiente\n\nConsecuencias:\n→ Diabetes tipo 2\n→ Obesidad (especialmente visceral)\n→ Síndrome metabólico\n→ Enfermedades cardiovasculares\n→ Alzheimer ("diabetes tipo 3")\n\nMarcadores:\n• HOMA-IR > 2.0\n• Glucosa ayuno > 100 mg/dL\n• HbA1c > 5.7%\n\n¿Revertimos tu resistencia a insulina?',
            '**Reversión de Resistencia a Insulina - Protocolo**\n\n**FASE 1: Restricción de Carbohidratos** (2-4 semanas)\n• < 50g carbos/día\n• Entrar en cetosis\n• Reset sensibilidad insulina\n\n**FASE 2: Ayuno Intermitente** (continuo)\n• Mínimo 16:8\n• Progresión a 18:6 o 20:4\n• 1 día/semana 24h\n\n**FASE 3: Ejercicio Estratégico**\n• HIIT 3x/semana (vacía glucógeno)\n• Caminatas post-comida (reduce pico glucosa 30%)\n• Fuerza (músculo = almacén glucosa)\n\n**SUPLEMENTOS**:\n• Berberina 500mg 3x/día\n• Cromo 200mcg\n• Ácido α-lipoico 600mg\n• Magnesio 400mg\n\nResultado: reversión en 8-12 semanas.\n\n¿Empezamos?',
            '**Glucosa y Envejecimiento - La Conexión AGEs**\n\nGLUCOSILACIÓN: glucosa + proteína → AGEs (productos finales de glicación avanzada)\n\nAGEs causan:\n• Rigidez arterial\n• Piel envejecida (cross-linking colágeno)\n• Cataratas\n• Disfunción renal\n• Inflamación crónica\n\nPrevención:\n✓ Mantener glucosa < 100 mg/dL\n✓ Evitar picos postprandiales\n✓ Benfotiamina (B1) 300mg\n✓ Carnosina 1000mg\n✓ Cocción baja temperatura\n\nMonitoreo continuo de glucosa (CGM) = game changer.\n\n¿Optimizamos tu metabolismo de glucosa?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getCholesterolResponse() {
        const responses = [
            '**Colesterol - Más Allá del Mito**\n\nCOLESTEROL ≠ ENEMIGO\n\nFunciones esenciales:\n• Precursor hormonas (testosterona, estrógeno, cortisol)\n• Componente membranas celulares\n• Producción vitamina D\n• Síntesis sales biliares\n• Mielinización nervios\n\n85% producido por tu hígado, solo 15% viene de dieta.\n\n**Lo que importa:**\nNo colesterol total, sino:\n→ Partículas LDL (LDL-P)\n→ Tamaño LDL (Patrón A vs B)\n→ Triglicéridos/HDL ratio < 2\n→ ApoB / ApoA-1 ratio\n→ LpPla2 (inflamación)\n\n¿Quieres entender tu perfil lipídico real?',
            '**LDL: Tipo A vs Tipo B - La Verdad Sobre Colesterol**\n\n**LDL Patrón A** (grande, esponjoso):\n• Benign

o\n• No aterogénico\n• Transporta nutrientes\n\n**LDL Patrón B** (pequeño, denso):\n• Problemático\n• Penetra arterias fácilmente\n• Oxidación → placa\n\nCausa de Patrón B:\n→ Dieta alta carbohidratos\n→ Triglicéridos elevados\n→ Inflamación crónica\n→ Resistencia insulina\n\n**Cambio A → B:**\nDieta cetogénica:\n• ↑ tamaño LDL\n• ↓ partículas pequeñas\n• ↓ inflamación\n\nEstudio: Patrón A = 0 riesgo cardiovascular.\n\n¿Optimizamos tu perfil lipídico?',
            '**Triglicéridos - Marcador Metabólico Crítico**\n\nTriglicéridos elevados (>150 mg/dL) indican:\n• Exceso de carbohidratos\n• Resistencia a insulina\n• Hígado graso\n• Riesgo cardiovascular\n\nÓptimo: < 70 mg/dL\n\n**Reducción rápida:**\n1. Eliminar azúcar y refinados\n2. Ayuno intermitente 16:8\n3. Omega-3: 2-4g EPA+DHA/día\n4. Berberina 500mg 3x/día\n5. Ejercicio (vacía glucógeno hepático)\n\nResultado típico:\n→ -50% triglicéridos en 4 semanas\n→ Mejor ratio TG/HDL\n→ Reducción riesgo cardíaco\n\nEstudios: TG < 70 = longevidad máxima.\n\n¿Bajamos tus triglicéridos?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getProteinResponse() {
        const responses = [
            '**Proteína - Cantidad, Timing, Fuente**\n\nREQUERIMIENTOS:\n• Sedentario: 0.8-1.0 g/kg\n• Activo: 1.2-1.6 g/kg\n• Atleta: 1.6-2.2 g/kg\n• Adulto mayor: 1.2-1.5 g/kg (prevenir sarcopenia)\n\n**TIMING CRÍTICO:**\nVentana post-ejercicio (30-60 min):\n• 20-40g proteína\n• Leucina >3g (activación mTOR)\n• Máxima síntesis muscular\n\n**FUENTES ÓPTIMAS:**\n✓ Carne: biodisponibilidad 95%\n✓ Huevos: proteína perfecta (valor 100)\n✓ Pescado: + omega-3\n✓ Colágeno: tejidos conectivos\n\n**CICLADO:**\nAyuno (↑autofagia) + Proteína estratégica (↑síntesis muscular)\n\n¿Optimizamos tu ingesta proteica?',
            '**Aminoácidos Esenciales - Los 9 Críticos**\n\nEAAs que tu cuerpo NO puede producir:\n\n1. **Leucina** - Activador mTOR #1\n   • Dosis: 3-5g por comida\n   • Fuente: carne, huevos\n   \n2. **Lisina** - Síntesis colágeno\n3. **Metionina** - Antioxidante, donador metilo\n4. **Treonina** - Sistema inmune\n5. **Triptófano** - Precursor serotonina\n6. **Fenilalanina** - Precursor dopamina\n7. **Valina & Isoleucina** - BCAAs\n8. **Histidina** - Histamina, anemia\n\nSuplementación EAAs:\n• 10-15g/día (entre comidas)\n• No activa mTOR excesivamente\n• Mantiene masa muscular en ayuno\n\n¿Implementamos protocolo EAA?',
            '**Colágeno - Proteína de Juventud**\n\nColágeno = 30% proteína corporal total\n\nTipos principales:\n• **Tipo I**: Piel, huesos, tendones (90%)\n• **Tipo II**: Cartílago articular\n• **Tipo III**: Vasos sanguíneos, órganos\n\nPérdida: 1% anual después de los 25.\n\nSuplementación:\n✓ Colágeno hidrolizado 10-20g/día\n✓ Con vitamina C (síntesis)\n✓ Glicina + Prolina (precursores)\n\nBeneficios documentados:\n→ Reducción arrugas 20%\n→ Elasticidad piel +15%\n→ Dolor articular -43%\n→ Densidad ósea mejorada\n\nFuentes: caldo de huesos, piel de pescado.\n\n¿Restauramos tu colágeno?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getSleepResponse() {
        const responses = [
            '**Sueño - El Pilar Fundamental**\n\nFASES DEL SUEÑO:\n\n**REM** (Rapid Eye Movement):\n• 20-25% sueño total\n• Consolidación memorias\n• Procesamiento emocional\n• Creatividad\n\n**Sueño Profundo** (N3):\n• 15-20% sueño total\n• Reparación física\n• Secreción hormona crecimiento\n• Limpieza cerebral (glinfático)\n• Consolidación memoria declarativa\n\nÓptimo: 7-9 horas, 4-6 ciclos completos.\n\nPrivación de sueño causa:\n→ ↑ resistencia insulina 30%\n→ ↓ testosterona 15%\n→ ↑ cortisol\n→ ↓ leptina, ↑ grelina (hambre)\n\n¿Optimizamos tu arquitectura del sueño?',
            '**Protocolo de Optimización del Sueño**\n\n**CIRCADIANO:**\n• Sol matutino (activa cortisol)\n• Oscuridad nocturna (melatonina)\n• Horario consistente ±30 min\n• Cenar 3h antes de dormir\n\n**AMBIENTAL:**\n• Temperatura: 18-20°C\n• Oscuridad completa (blackout)\n• Ruido: < 30 dB o ruido blanco\n• Sin pantallas 2h pre-sueño (luz azul)\n\n**SUPLEMENTOS:**\n• Magnesio glicinato 400mg\n• Glicina 3g\n• Teanina 200mg\n• Melatonina 0.5-1mg (dosis baja)\n• Apigenina 50mg (chamomile)\n\n**EJERCICIO:**\n→ Matutino: energiza\n→ Nocturno: perturba sueño\n\n¿Implementamos?',
            '**Sistema Glinfático - Limpieza Cerebral Nocturna**\n\nDurante sueño profundo:\n• Espacios inter-neuronales ↑ 60%\n• Flujo líquido cefalorraquídeo ↑\n• Eliminación β-amiloide (Alzheimer)\n• Limpieza tau (demencia)\n• Remoción metabolitos tóxicos\n\nSueño insuficiente:\n→ Acumulación β-amiloide\n→ Riesgo Alzheimer x3\n→ Deterioro cognitivo\n→ Neuroinflamación\n\nOptimización glinfática:\n✓ Dormir de lado (mejor flujo)\n✓ 7-9h de sueño\n✓ Sueño profundo >90 min\n✓ Evitar alcohol (bloquea N3)\n\nEstudio: 1 noche mala → ↑ β-amiloide 5%.\n\n¿Protegemos tu cerebro con sueño?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getHormoneResponse() {
        const responses = [
            '**Optimización Hormonal - Sistema Endocrino**\n\nHORMONAS CLAVE:\n\n**Testosterona** (hombres):\n• Óptimo: 600-900 ng/dL\n• Aumentar: fuerza, HIIT, grasas, Zn, Mg, vitamina D\n\n**Estrógeno** (mujeres):\n• Balance crítico\n• DIM, I3C (crucíferas) modulan metabolismo\n\n**Hormona Crecimiento** (GH):\n• Pico en sueño profundo\n• Ayuno ↑ GH 2000%\n• Arginina + Glicina pre-sueño\n\n**Tiroides** (T3/T4):\n• Metabolismo basal\n• Yodo, selenio, zinc\n\n**Cortisol**:\n• Ritmo circadiano (alto AM, bajo PM)\n• Ashwagandha, Rhodiola modulan\n\n¿Balanceamos tu sistema hormonal?',
            '**Testosterona - Optimización Natural**\n\nFACTORES QUE DISMINUYEN:\n→ Edad (1% anual post-30)\n→ Estrés crónico (↑ cortisol)\n→ Obesidad (aromatización → estrógeno)\n→ Sueño < 7h (↓ 15%)\n→ Alcohol\n→ Disruptores endocrinos (plásticos)\n\n**PROTOCOLO DE AUMENTO:**\n\n1. **Ejercicio:**\n   • Fuerza (squats, deadlifts)\n   • HIIT 2-3x/semana\n   \n2. **Nutrición:**\n   • Grasas saturadas 30% (colesterol = precursor)\n   • Zinc 30mg\n   • Magnesio 400mg\n   • Vitamina D 5000 IU\n   \n3. **Suplementos:**\n   • Ashwagandha 600mg (↑ 15%)\n   • Tongkat Ali 200mg\n   • Boro 10mg\n   \n4. **Estilo Vida:**\n   • Sueño 8h\n   • Manejo estrés\n   • Exposición sol\n\nAumento típico: 20-40% en 12 semanas.\n\n¿Restauramos tu testosterona?',
            '**Cortisol - La Hormona del Estrés**\n\nRITMO SALUDABLE:\n• AM (8am): Alto (despertar)\n• PM (8pm): Bajo (preparar sueño)\n\nDISRUPCIÓN (cortisol alto crónico):\n→ Resistencia insulina\n→ Acumulación grasa abdominal\n→ Catabolismo muscular\n→ Supresión inmune\n→ Insomnio\n→ Envejecimiento acelerado\n\n**MODULACIÓN:**\n\n*Reducir cortisol:*\n• Ashwagandha 600mg (↓ 30%)\n• Rhodiola 200mg\n• Fosfatidilserina 300mg\n• Meditación 20 min/día\n• Sueño profundo\n\n*Ritmo circadiano:*\n• Sol matutino\n• Ejercicio AM\n• Oscuridad nocturna\n• Comida temprana\n\nResultado: cortisol balanceado, estrés manejado.\n\n¿Normalizamos tu eje HPA?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getMicrobiomeResponse() {
        const responses = [
            '**Microbioma Intestinal - Tu Segundo Cerebro**\n\n100 TRILLONES de bacterias, 1000+ especies.\n\nFunciones críticas:\n• Digestión y absorción nutrientes\n• Síntesis vitaminas (K2, B12)\n• Modulación sistema inmune (70%)\n• Producción neurotransmisores (90% serotonina)\n• Barrera intestinal\n• Comunicación eje intestino-cerebro\n\nDISBIOSIS (desequilibrio) causa:\n→ Inflamación sistémica\n→ Permeabilidad intestinal\n→ Enfermedades autoinmunes\n→ Depresión/ansiedad\n→ Obesidad\n\n**OPTIMIZACIÓN:**\n✓ Prebióticos: fibra, inulina\n✓ Probióticos: fermentados, suplementos\n✓ Polifenoles: té, cacao, bayas\n✓ Evitar: antibióticos innecesarios, azúcar\n\n¿Restauramos tu microbioma?',
            '**Eje Intestino-Cerebro - Conexión Bidireccional**\n\nNERVIO VAGO = autopista de comunicación.\n\nINTESTINO → CEREBRO:\n• Bacterias producen GABA, serotonina, dopamina\n• Ácidos grasos de cadena corta (butirato)\n• Señales inflamatorias (LPS)\n\nCEREBRO → INTESTINO:\n• Estrés altera motilidad\n• Cortisol afecta microbiota\n• Ansiedad → SII (síndrome intestino irritable)\n\n**CEPAS CLAVE:**\n\n*Lactobacillus*:\n• L. rhamnosus: ↓ ansiedad\n• L. plantarum: barrera intestinal\n\n*Bifidobacterium*:\n• B. longum: ↓ depresión\n• B. breve: cognición\n\n*Akkermansia*:\n• Mucosa intestinal\n• Metabolismo glucosa\n\nEstudios: probióticos = "psicobióticos".\n\n¿Modulamos tu eje intestino-cerebro?',
            '**Permeabilidad Intestinal - "Leaky Gut"**\n\nBARRERA INTESTINAL NORMAL:\n• Uniones estrechas (tight junctions)\n• Capa mucosa protectora\n• IgA secretora\n\nPERMEABILIDAD AUMENTADA:\n→ Paso de LPS (endotoxina)\n→ Partículas alimentarias no digeridas\n→ Activación inmune sistémica\n→ Inflamación crónica\n\nCAUSAS:\n• Gluten (zonulina ↑)\n• Azúcar/carbohidratos refinados\n• NSAIDs (ibuprofeno)\n• Estrés crónico\n• Alcohol\n• Disbiosis\n\n**REPARACIÓN:**\n1. Eliminar irritantes (gluten, lácteos)\n2. L-glutamina 5-10g/día\n3. Zinc-carnosina 150mg\n4. Colágeno 10g\n5. Probióticos multi-cepa\n6. Caldo de huesos\n7. Ayuno intermitente\n\nTiempo: 4-12 semanas.\n\n¿Sellamos tu intestino permeable?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getExerciseResponse() {
        const responses = [
            '**Ejercicio - Medicina Más Poderosa**\n\nBENEFICIOS MOLECULARES:\n• ↑ BDNF (neurogénesis)\n• ↑ PGC-1α (biogénesis mitocondrial)\n• ↑ AMPK (autofagia)\n• ↓ mTOR temporal (hormesis)\n• ↑ sensibilidad insulina\n• ↑ telomerasa\n• ↓ inflamación (↓ IL-6, TNF-α)\n\n**TIPOS ÓPTIMOS:**\n\n**HIIT** (High Intensity Interval Training):\n• 4x4 min @ 90% FC máx\n• 3x/semana\n• Máxima eficiencia mitocondrial\n\n**Fuerza**:\n• Compuestos: squats, deadlifts, press\n• 3x/semana\n• Preserva/aumenta masa muscular\n\n**Zone 2** (aeróbico bajo):\n• 60-70% FC máx\n• 45-60 min\n• Optimiza metabolismo graso\n\n¿Diseñamos tu programa?',
            '**HIIT - Hormesis y Adaptación Mitocondrial**\n\nPROTOCOLO NORUEGO 4x4:\n• 10 min calentamiento\n• 4 intervalos de 4 min @ 90-95% FC máx\n• 3 min recuperación activa entre intervalos\n• 5 min enfriamiento\n• 3x/semana\n\nADAPTACIONES:\n→ ↑ VO2 máx 10-15%\n→ ↑ mitocondrias 40%\n→ ↑ capacidad oxidativa\n→ ↓ grasa visceral\n→ ↑ sensibilidad insulina 25%\n\nEstudios:\n• HIIT = 2x beneficios vs cardio steady-state\n• Tiempo: 75% menos\n• Preserva músculo mejor\n\n**ALTERNATIVAS:**\n• Sprint 30s / descanso 4 min (x4-8)\n• Tabata: 20s máximo / 10s descanso (x8)\n• Ciclismo, remo, natación, correr\n\n¿Implementamos HIIT?',
            '**Entrenamiento de Fuerza - Longevidad y Sarcopenia**\n\nSARCOPENIA = pérdida muscular con edad.\n• Inicia 30s (-3-5% década)\n• Acelera post-50\n• Causa fragilidad, caídas, mortalidad\n\n**PREVENCIÓN:**\nFuerza = tratamiento #1\n\n**PROTOCOLO ÓPTIMO:**\n\n*Frecuencia:* 3x/semana\n*Ejercicios compuestos:*\n• Squat / Leg Press\n• Deadlift / Romanian DL\n• Bench Press / Push-ups\n• Rows / Pull-ups\n• Overhead Press\n\n*Parámetros:*\n• 3-4 series\n• 6-12 repeticiones\n• 70-85% 1RM\n• Progresión constante\n\n*Proteína:*\n• 1.6g/kg/día\n• 30-40g por comida\n• Leucina >3g\n\nResultado: músculo preservado/aumentado, metabolismo elevado.\n\n¿Construimos tu fuerza?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getTelomeresResponse() {
        const responses = [
            '**Telómeros - Reloj Biológico Celular**\n\nTELÓMEROS = secuencias ADN repetitivas (TTAGGG) en extremos cromosomas.\n\nFunción:\n• Protegen información genética\n• Se acortan con cada división celular\n• Longitud = edad biológica\n\nLÍMITE HAYFLICK:\n• 50-70 divisiones celulares\n• Telómeros críticos cortos → senescencia\n\n**TELOMERASA:**\nEnzima que alarga telómeros.\nActiva en:\n→ Células madre\n→ Células cancerosas (inmortales)\n→ Casi inactiva en células somáticas\n\nEstudios:\n• Meditación ↑ telomerasa 43%\n• Estrés crónico ↓ longitud telómeros\n• Ejercicio protege telómeros\n\n¿Protegemos tus telómeros?',
            '**Alargamiento de Telómeros - Estrategias Validadas**\n\n**EJERCICIO:**\n• Resistencia 45 min, 3x/semana\n• Protege telómeros leucocitos\n• Diferencia: 9 años edad biológica\n\n**MEDITACIÓN / MANEJO ESTRÉS:**\n• Mindfulness 20 min/día\n• ↑ telomerasa 30-40%\n• Reduce cortisol (daña telómeros)\n\n**NUTRICIÓN:**\n✓ Omega-3 (anti-inflamatorio)\n✓ Vitamina D (cofactor telomerasa)\n✓ Folato, B12 (síntesis ADN)\n✓ Antioxidantes (protegen)\n\n**SUPLEMENTOS:**\n• TA-65 (activador telomerasa)\n• Astragalus (tradicional chino)\n• NAD+ (reparación ADN)\n\n**EVITAR:**\n✗ Tabaco (-25% longitud)\n✗ Obesidad\n✗ Azúcar/inflamación\n✗ Estrés crónico\n\nEstudio Premio Nobel: longitud telómeros predice mortalidad.\n\n¿Rejuvenecemos tus telómeros?',
            '**Senescencia Celular - Células Zombies**\n\nCÉLULAS SENESCENTES:\n• Dejaron de dividirse\n• NO mueren (resisten apoptosis)\n• Secretan factores inflamatorios (SASP)\n• Acumulan con edad\n\nEFECTOS:\n→ Inflamación crónica\n→ Envejecimiento tejidos\n→ Enfermedades relacionadas edad\n→ Disfunción órganos\n\n**SENOLÍTICOS** (eliminan células senescentes):\n\n*Naturales:*\n• Fisetin 100mg/día (ciclos)\n• Quercetina 1g + Dasatinib\n• EGCG (té verde)\n• Piperlongumina\n\n*Intervenciones:*\n• Ayuno prolongado (autofagia)\n• Ejercicio (limpia senescentes)\n• Restricción calórica\n\nEstudios en ratones:\n→ Senolíticos ↑ lifespan 36%\n→ ↑ healthspan\n→ Reversión envejecimiento\n\nEnsayos clínicos humanos: en curso.\n\n¿Eliminamos tus células zombies?'
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
