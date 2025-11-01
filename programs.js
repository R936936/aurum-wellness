// ═══════════════════════════════════════════════════════════════════════
// 🌿 AURUM WELLNESS - PROGRAMAS DE TRANSFORMACIÓN
// ═══════════════════════════════════════════════════════════════════════

class AurumPrograms {
    constructor(userSystem) {
        this.userSystem = userSystem;
        this.programs = this.initializePrograms();
        console.log('🌿 Programas de Transformación: ACTIVOS');
    }

    initializePrograms() {
        return {
            detox: new DetoxProgram(),
            energia: new EnergiaProgram(),
            balance: new BalanceProgram(),
            regeneracion: new RegeneracionProgram()
        };
    }

    getProgram(name) {
        return this.programs[name];
    }

    getAllPrograms() {
        return Object.values(this.programs);
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 🌿 PROGRAMA DETOX - 21 DÍAS
// ═══════════════════════════════════════════════════════════════════════

class DetoxProgram {
    constructor() {
        this.name = 'Programa Detox';
        this.duration = 21;
        this.icon = '🌿';
        this.description = 'Limpieza profunda celular y activación de autofagia';
    }

    getDayPlan(day) {
        const plans = {
            1: {
                title: 'Día 1: Iniciación',
                ayuno: '16:8 (16 horas ayuno, 8 horas ventana alimenticia)',
                comidas: [
                    'Desayuno (12:00): Café bulletproof con aceite MCT',
                    'Almuerzo (15:00): Ensalada verde + aguacate + salmón',
                    'Cena (19:00): Caldo de huesos + verduras al vapor'
                ],
                hidratacion: '3 litros agua + electrolitos',
                suplementos: 'Magnesio 400mg, Omega-3',
                ejercicio: 'Caminata 30 min en ayunas',
                nota: 'Tu cuerpo empieza a cambiar de glucosa a grasa como combustible'
            },
            7: {
                title: 'Día 7: Primera Semana Completa',
                ayuno: '18:6',
                comidas: [
                    'Comida 1 (14:00): Bowl cetogénico con carne grass-fed',
                    'Comida 2 (19:00): Pescado + espárragos + aceite oliva'
                ],
                hidratacion: '3 litros agua + té verde',
                suplementos: 'Magnesio, Omega-3, Vitamina D',
                ejercicio: 'HIIT 20 min',
                nota: 'Cetosis establecida. Autofagia activándose.'
            },
            14: {
                title: 'Día 14: Mitad del Camino',
                ayuno: '20:4',
                comidas: [
                    'Comida única (16:00-20:00): Banquete cetogénico completo'
                ],
                hidratacion: '4 litros agua',
                suplementos: 'Stack completo',
                ejercicio: 'Pesas + cardio moderado',
                nota: 'Autofagia en nivel óptimo. Células renovándose.'
            },
            21: {
                title: 'Día 21: Transformación Completa',
                ayuno: '23:1 (OMAD - One Meal A Day)',
                comidas: [
                    'Comida épica (18:00): Todo lo que necesitas en una ventana de 1 hora'
                ],
                hidratacion: '4 litros + minerales',
                suplementos: 'Stack completo',
                ejercicio: 'Entrenamiento de fuerza',
                nota: '¡COMPLETADO! Tu cuerpo está completamente renovado a nivel celular.'
            }
        };

        // Interpolar días intermedios
        if (plans[day]) return plans[day];
        
        // Plan genérico para días no específicos
        if (day <= 7) return this.interpolate(plans[1], plans[7], day, 1, 7);
        if (day <= 14) return this.interpolate(plans[7], plans[14], day, 7, 14);
        return this.interpolate(plans[14], plans[21], day, 14, 21);
    }

    interpolate(start, end, current, startDay, endDay) {
        // Progresión gradual entre días clave
        return {
            title: `Día ${current}: Progresión Constante`,
            ayuno: current <= 7 ? '16:8' : current <= 14 ? '18:6' : '20:4',
            comidas: start.comidas,
            hidratacion: start.hidratacion,
            suplementos: start.suplementos,
            ejercicio: start.ejercicio,
            nota: `Mantén el enfoque. Estás en el ${Math.round((current/endDay)*100)}% del programa.`
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════
// ⚡ PROGRAMA ENERGÍA VITAL - 30 DÍAS
// ═══════════════════════════════════════════════════════════════════════

class EnergiaProgram {
    constructor() {
        this.name = 'Energía Vital';
        this.duration = 30;
        this.icon = '⚡';
        this.description = 'Optimización mitocondrial y producción máxima de ATP';
    }

    getDayPlan(day) {
        return {
            title: `Día ${day}: Activación Mitocondrial`,
            protocolo: [
                '🌅 Mañana: Exposición luz solar 20 min (vitamina D + ritmo circadiano)',
                '⚡ Ayuno: 16:8 mínimo',
                '💊 Suplementos: CoQ10, PQQ, L-Carnitina, Creatina',
                '🏃 Ejercicio: HIIT o pesas (crea nuevas mitocondrias)',
                '🧊 Cold therapy: Ducha fría 5 min (aumenta adiponectina)',
                '🥩 Nutrición: Alto en grasas saludables, proteína moderada, carbos mínimos'
            ],
            objetivo: day <= 10 ? 'Limpieza mitocondrial (mitofagia)' :
                     day <= 20 ? 'Biogénesis mitocondrial (nuevas mitocondrias)' :
                     'Optimización completa de producción de ATP',
            energia_esperada: `${Math.min(50 + (day * 1.5), 100)}%`
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════
// ☯️ PROGRAMA BALANCE MENTAL - 40 DÍAS
// ═══════════════════════════════════════════════════════════════════════

class BalanceProgram {
    constructor() {
        this.name = 'Balance Mental';
        this.duration = 40;
        this.icon = '☯️';
        this.description = 'Coherencia neuronal y optimización cognitiva';
    }

    getDayPlan(day) {
        return {
            title: `Día ${day}: Neuroplasticidad Activa`,
            practicas: [
                '🧘 Meditación: 20 min (aumenta BDNF)',
                '🧠 Ejercicio mental: Aprender algo nuevo',
                '📚 Lectura profunda: 30 min sin distracciones',
                '🎵 Música: Binaurales o clásica para focus',
                '🌿 Suplementos nootrópicos: Lion\'s Mane, Bacopa, Rhodiola',
                '💤 Sueño: 7-9 horas + oscuridad total',
                '🚫 Detox digital: 2 horas sin pantallas antes de dormir'
            ],
            neurociencia: day <= 14 ? 'Formación de nuevas sinapsis' :
                         day <= 28 ? 'Consolidación de redes neuronales' :
                         'Integración completa - Nueva versión de ti',
            claridad_mental: `${Math.min(40 + (day * 1.5), 100)}%`
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 🔄 PROGRAMA REGENERACIÓN - 90 DÍAS
// ═══════════════════════════════════════════════════════════════════════

class RegeneracionProgram {
    constructor() {
        this.name = 'Regeneración';
        this.duration = 90;
        this.icon = '🔄';
        this.description = 'Renovación celular completa y activación de longevidad';
    }

    getDayPlan(day) {
        return {
            title: `Día ${day}: Renovación Celular`,
            fase: day <= 30 ? 'FASE 1: Limpieza y Detox' :
                  day <= 60 ? 'FASE 2: Regeneración Activa' :
                  'FASE 3: Optimización y Longevidad',
            protocolos: [
                '🕐 Ayuno intermitente: 18:6 mínimo',
                '🌙 Ayuno prolongado: 36-48h cada 2 semanas',
                '🧬 Activación de sirtuinas (genes de longevidad)',
                '📊 Restricción calórica: 20% bajo mantenimiento',
                '💊 Stack longevidad: Resveratrol, NMN, Berberina',
                '🏋️ Ejercicio: Fuerza + flexibilidad + movilidad',
                '❄️ Hormesis: Estrés controlado (frío, calor, ayuno)',
                '😴 Sueño profundo: Regeneración nocturna óptima'
            ],
            metricas: {
                autofagia: `${Math.min(30 + day, 100)}%`,
                telomeros: 'Protección activada',
                inflamacion: `Reducida ${Math.min(10 + day/2, 80)}%`,
                edad_biologica: `Revirtiendo...`
            },
            objetivo_final: day === 90 ? '🎉 ¡RENACIMIENTO COMPLETO! Has renovado cada célula de tu cuerpo.' : 
                           `Progreso: ${Math.round((day/90)*100)}%`
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════
// SISTEMA DE RECETAS CETOGÉNICAS
// ═══════════════════════════════════════════════════════════════════════

class RecipeGenerator {
    constructor() {
        this.templates = this.initializeTemplates();
    }

    initializeTemplates() {
        return [
            {
                name: 'Café Bulletproof Supremo',
                categoria: 'Desayuno',
                tiempo: '5 min',
                macros: { grasas: 40, proteina: 2, carbos: 1, calorias: 400 },
                ingredientes: [
                    '1 taza café orgánico',
                    '2 cucharadas aceite MCT',
                    '2 cucharadas mantequilla grass-fed',
                    '1 cucharada colágeno en polvo',
                    'Pizca canela'
                ],
                preparacion: [
                    'Preparar café fuerte',
                    'Añadir todos los ingredientes a licuadora',
                    'Licuar 30 segundos hasta cremoso',
                    'Servir inmediatamente'
                ],
                beneficios: 'Energía sostenida, cetosis profunda, claridad mental'
            },
            {
                name: 'Bowl Cetogénico Power',
                categoria: 'Almuerzo',
                tiempo: '15 min',
                macros: { grasas: 45, proteina: 35, carbos: 8, calorias: 550 },
                ingredientes: [
                    '150g carne grass-fed',
                    '1 aguacate entero',
                    '2 tazas espinaca',
                    '4 cucharadas aceite oliva extra virgen',
                    '30g queso de cabra',
                    'Sal marina, pimienta'
                ],
                preparacion: [
                    'Cocinar carne a término deseado',
                    'Armar bowl con espinaca de base',
                    'Agregar carne, aguacate en cubos',
                    'Coronar con queso desmoronado',
                    'Rociar aceite de oliva generosamente'
                ],
                beneficios: 'Máxima saciedad, perfil completo de nutrientes'
            },
            {
                name: 'Salmón Omega Supremo',
                categoria: 'Cena',
                tiempo: '20 min',
                macros: { grasas: 35, proteina: 40, carbos: 5, calorias: 500 },
                ingredientes: [
                    '200g salmón salvaje',
                    '2 tazas brócoli',
                    '3 cucharadas mantequilla ghee',
                    '1/2 limón',
                    'Ajo, hierbas frescas'
                ],
                preparacion: [
                    'Hornear salmón a 200°C por 15 min',
                    'Cocinar brócoli al vapor',
                    'Derretir ghee con ajo',
                    'Servir salmón sobre brócoli',
                    'Rociar con ghee y jugo de limón'
                ],
                beneficios: 'Omega-3 máximo, antiinflamatorio, regeneración celular'
            }
        ];
    }

    getRandomRecipe() {
        return this.templates[Math.floor(Math.random() * this.templates.length)];
    }

    getAllRecipes() {
        return this.templates;
    }

    generateCustomRecipe(preferences) {
        // TODO: Implementar generador con IA
        return this.getRandomRecipe();
    }
}

// ═══════════════════════════════════════════════════════════════════════
// Inicializar sistemas
// ═══════════════════════════════════════════════════════════════════════

window.AurumPrograms = new AurumPrograms(window.AurumUserSystem);
window.RecipeGenerator = new RecipeGenerator();

console.log('✅ Programas y Recetas: ACTIVOS');
