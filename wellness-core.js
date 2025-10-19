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
    }

    async generateResponse(userQuery) {
        // Por ahora, respuestas inteligentes basadas en keywords
        // En v3.0 se integrará API de IA real
        
        const keywords = this.extractKeywords(userQuery.toLowerCase());
        let response = '';

        if (keywords.includes('detox') || keywords.includes('toxinas')) {
            response = this.getDetoxResponse();
        } else if (keywords.includes('energía') || keywords.includes('cansado')) {
            response = this.getEnergyResponse();
        } else if (keywords.includes('estrés') || keywords.includes('ansiedad')) {
            response = this.getBalanceResponse();
        } else if (keywords.includes('receta') || keywords.includes('comida')) {
            response = this.getRecipeResponse();
        } else if (keywords.includes('programa') || keywords.includes('plan')) {
            response = this.getProgramResponse();
        } else {
            response = this.getGeneralResponse();
        }

        // Guardar en historial
        this.saveToHistory(userQuery, response);
        
        return response;
    }

    extractKeywords(text) {
        return text.split(' ');
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
