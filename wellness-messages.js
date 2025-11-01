/**
 * AURUM WELLNESS - MENSAJES EDUCATIVOS DE MORPHEUS
 * Mensajes de bienvenida sobre cetosis, autofagia, física cuántica
 * Se muestran rotativamente en la pantalla de bienvenida
 */

const WELLNESS_MESSAGES = {
    cetosis: [
        "La cetosis es un estado metabólico donde tu cuerpo quema grasa como combustible principal en lugar de glucosa. En 2-4 días de restricción de carbohidratos (<50g/día), tus células comienzan a producir cuerpos cetónicos (beta-hidroxibutirato, acetoacetato) que alimentan tu cerebro y músculos con una eficiencia energética superior. No es una dieta, es una reprogramación metabólica.",
        
        "Cuando reduces carbohidratos, tus niveles de insulina caen dramáticamente. Esto activa la lipólisis: las células adiposas liberan ácidos grasos que el hígado convierte en cetonas. Tu cerebro funciona un 70% mejor con cetonas que con glucosa. Los atletas de élite entrenan en cetosis porque mejora la resistencia mitocondrial.",
        
        "La cetosis nutricional (0.5-3 mM de BHB en sangre) es tu estado ancestral. Durante 99.9% de la evolución humana, pasábamos días sin carbohidratos. Tu ADN está diseñado para prosperar en cetosis. Los estudios muestran: reducción de inflamación (↓40%), mejora cognitiva (↑20%), longevidad celular (↑30%).",
        
        "En cetosis, tus mitocondrias generan menos especies reactivas de oxígeno (ROS) por cada ATP producido. Esto significa menor estrés oxidativo y envejecimiento más lento. Además, activas genes de longevidad como SIRT1 y FOXO3, los mismos que se activan con restricción calórica.",
        
        "La paradoja: comes grasa, quemas grasa. Tu cuerpo se vuelve 'fat-adapted' - puede acceder instantáneamente a sus 40,000+ calorías almacenadas como grasa corporal. Ya no necesitas comer cada 3 horas. Tu energía es constante, sin picos ni caídas de glucosa."
    ],
    
    autofagia: [
        "La autofagia (del griego 'auto-comerse') es el proceso celular de reciclaje molecular. Tus células descomponen y reciclan proteínas dañadas, orgánulos defectuosos y patógenos. Es tu sistema de limpieza celular interno. Yoshinori Ohsumi ganó el Nobel 2016 por descubrir sus mecanismos. Cuando ayunas 16+ horas, la autofagia se activa exponencialmente.",
        
        "Durante autofagia, tus células degradan mitocondrias viejas (mitofagia), retículo endoplásmico dañado, agregados de proteínas mal plegadas. Es como renovar cada célula desde dentro. La autofagia previene cáncer, Alzheimer, Parkinson. Comienza suave a las 12-16h de ayuno, se intensifica 24-48h.",
        
        "La autofagia es selectiva e inteligente. Tus células marcan componentes dañados con ubiquitina, los encapsulan en autofagosomas y los llevan a los lisosomas para degradación. Los aminoácidos recuperados se reutilizan para síntesis de nuevas proteínas. Eficiencia molecular perfecta.",
        
        "El ayuno intermitente 16/8 activa autofagia diariamente. El ayuno de 24-72h la maximiza. Durante este proceso, tu cuerpo: elimina células senescentes (zombi), recicla proteínas dañadas, regenera tejidos, fortalece sistema inmune. Es tu 'reset' celular programado genéticamente.",
        
        "Autofagia vs Apoptosis: autofagia limpia componentes internos y salva la célula. Apoptosis es muerte celular programada para eliminar células dañadas irreparablemente. Ambos trabajan juntos - autofagia previene, apoptosis elimina lo irreparable. Tu cuerpo decide sabiamente cuándo limpiar y cuándo eliminar."
    ],
    
    fisica_cuantica: [
        "Tu cuerpo es 99.9999% espacio vacío. Los átomos que te componen tienen núcleos diminutos rodeados de nubes de probabilidad electrónica. Entre tu piel y tus órganos hay más 'nada' que 'algo'. La materia sólida es una ilusión de la percepción. Eres un campo de información vibratoria condensada.",
        
        "Cada célula emite biofotones - luz ultra-débil en el espectro UV-visible. Tus células literalmente 'brillan' con luz cuántica. Esta biofotoluminiscencia coordina procesos biológicos instantáneamente a través del cuerpo. Fritz-Albert Popp demostró: células sanas emiten luz coherente, células cancerosas emiten luz caótica.",
        
        "El entrelazamiento cuántico ocurre en tus microtúbulos neuronales. Roger Penrose y Stuart Hameroff proponen: la conciencia emerge de efectos cuánticos en las neuronas. Tu pensamiento no es solo química, es mecánica cuántica. Cada decisión colapsa una función de onda de posibilidades en una realidad.",
        
        "Tus mitocondrias utilizan túnel cuántico para transferir electrones en la cadena respiratoria. Los electrones 'saltan' barreras energéticas imposibles según física clásica. Este 'túnel cuántico biológico' es 100% eficiente en temperaturas corporales. Tu respiración celular es un fenómeno cuántico.",
        
        "La fotosíntesis usa coherencia cuántica para transferir energía con 99% de eficiencia. Tu cuerpo también. Los complejos proteicos vibran en estados superpuestos cuánticos. La biología cuántica explica cómo procesos imposibles (como el olfato discriminando vibraciones moleculares) son posibles."
    ],
    
    transformacion: [
        "Cada 7 años, cada átomo de tu cuerpo ha sido reemplazado. El 'tú' físico de hace 7 años ya no existe molecularmente. Eres literalmente una persona nueva cada década. La pregunta: ¿quién elige qué átomos incorporas? Tu alimentación, pensamientos y ambiente escriben tu nueva biología.",
        
        "Tu genoma es solo 2% de tu ADN. El 98% restante son 'interruptores' epigenéticos que activan/desactivan genes según tu estilo de vida. Ayuno, ejercicio, meditación, alimentación - cada hábito reescribe tu expresión genética. No estás limitado por tus genes, estás empoderado por tus elecciones.",
        
        "Neuroplasticidad: tu cerebro se recablea constantemente. Cada pensamiento fortalece sinapsis, cada meditación engrosa tu corteza prefrontal, cada nuevo aprendizaje crea neuronas. A cualquier edad, puedes cambiar tu mente literalmente. La depresión/ansiedad son patrones neuronales, no destinos.",
        
        "Tus bacterias intestinales (microbioma) pesan 2kg y contienen más células que tú. Producen el 90% de tu serotonina, sintetizan vitaminas B, K, neurotransmisores. Tu 'segundo cerebro' influye en tu humor, inmunidad, metabolismo. Cambiar tu microbioma es cambiar tu ser.",
        
        "El ayuno activa genes de longevidad (FOXO3, SIRT1), regula hacia abajo mTOR (envejecimiento), aumenta NAD+ (energía celular). Literalmente ralentiza tu reloj biológico. Los estudios en animales muestran: 40% más longevidad con restricción calórica. En humanos: mejoras en todos los biomarcadores de salud."
    ],
    
    biohacking: [
        "Biohacking es el control experimental de tu biología. Mides, intervienes, optimizas. CGM (monitor continuo de glucosa) te muestra cómo cada alimento afecta TU metabolismo único. HRV (variabilidad cardíaca) mide tu estrés/recuperación real-time. Conocimiento = poder sobre tu salud.",
        
        "Termogénesis por frío: exposición gradual (duchras frías, baños de hielo) activa grasa parda, aumenta adiponectina, mejora sensibilidad insulina. Wim Hof demostró: puedes controlar tu sistema inmune voluntariamente. El frío es un estresor hormético - dosis bajas te fortalecen.",
        
        "Luz roja (660nm) y NIR (850nm) estimulan mitocondrias. Los fotones activan citocromo C oxidasa, aumentando ATP +30%. Acelera cicatrización, reduce inflamación, mejora sueño. La fototerapia es medicina sin fármacos, pura biofísica celular.",
        
        "Suplementación estratégica: NAD+ (precursores NMN/NR) restaura metabolismo juvenil. Espermidina activa autofagia. Metformina/rapamicina son anti-envejecimiento demostrados. Omega-3 de alta dosis (EPA/DHA) resuelve inflamación. No adivines, mide con análisis sanguíneos.",
        
        "Sueño profundo (ondas delta) es cuando tu glía limpia metabolitos cerebrales. Necesitas 90-120min de sueño profundo/noche. Trackéalo con Oura/Whoop. Optimiza: oscuridad total, temperatura fresca (18°C), luz roja nocturna, magnesio, glicina. El sueño es tu medicina más poderosa."
    ]
};

/**
 * SISTEMA INTELIGENTE DE ROTACIÓN DE MENSAJES
 * Evita repetir mensajes recientes y balancea categorías
 */
const MESSAGE_HISTORY = {
    shown: [],
    maxHistory: 10, // Recordar últimos 10 mensajes
    categoryCount: {}
};

/**
 * Inicializar contadores de categorías
 */
Object.keys(WELLNESS_MESSAGES).forEach(cat => {
    MESSAGE_HISTORY.categoryCount[cat] = 0;
});

/**
 * Obtiene un mensaje aleatorio de una categoría evitando repeticiones
 */
function getRandomWellnessMessage(category = null) {
    const categories = Object.keys(WELLNESS_MESSAGES);
    let selectedCategory;
    
    if (category && WELLNESS_MESSAGES[category]) {
        // Si se especifica categoría válida, usarla
        selectedCategory = category;
    } else {
        // Selección inteligente: priorizar categorías menos mostradas
        const sortedCategories = categories.sort((a, b) => {
            return MESSAGE_HISTORY.categoryCount[a] - MESSAGE_HISTORY.categoryCount[b];
        });
        
        // 70% probabilidad de elegir las 2 categorías menos mostradas
        if (Math.random() < 0.7 && sortedCategories.length >= 2) {
            selectedCategory = sortedCategories[Math.floor(Math.random() * 2)];
        } else {
            // 30% completamente aleatorio para variedad
            selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        }
    }
    
    const messages = WELLNESS_MESSAGES[selectedCategory];
    let selectedMessage;
    let attempts = 0;
    
    // Intentar obtener un mensaje no repetido (máximo 5 intentos)
    do {
        selectedMessage = messages[Math.floor(Math.random() * messages.length)];
        attempts++;
    } while (
        MESSAGE_HISTORY.shown.includes(selectedMessage) && 
        attempts < 5
    );
    
    // Agregar a historial
    MESSAGE_HISTORY.shown.push(selectedMessage);
    if (MESSAGE_HISTORY.shown.length > MESSAGE_HISTORY.maxHistory) {
        MESSAGE_HISTORY.shown.shift(); // Eliminar el más antiguo
    }
    
    // Incrementar contador de categoría
    MESSAGE_HISTORY.categoryCount[selectedCategory]++;
    
    return {
        text: selectedMessage,
        category: selectedCategory,
        categoryTitle: getCategoryTitle(selectedCategory)
    };
}

/**
 * Obtiene el título de la categoría en español
 */
function getCategoryTitle(category) {
    const titles = {
        cetosis: 'CETOSIS',
        autofagia: 'AUTOFAGIA',
        fisica_cuantica: 'FÍSICA CUÁNTICA',
        transformacion: 'TRANSFORMACIÓN',
        biohacking: 'BIOHACKING'
    };
    return titles[category] || category.toUpperCase();
}

/**
 * Obtiene mensaje con formato enriquecido
 */
function getEnrichedMessage(category = null) {
    const msg = getRandomWellnessMessage(category);
    
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 CONOCIMIENTO: ${msg.categoryTitle}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${msg.text}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

/**
 * Obtiene un mensaje de una categoría específica para el usuario
 * Útil cuando el usuario pregunta sobre un tema específico
 */
function getMessageByTopic(topic) {
    topic = topic.toLowerCase();
    
    // Mapeo de palabras clave a categorías
    const topicMap = {
        'cetosis': 'cetosis',
        'keto': 'cetosis',
        'cetogénica': 'cetosis',
        'cetónica': 'cetosis',
        'grasa': 'cetosis',
        'autofagia': 'autofagia',
        'ayuno': 'autofagia',
        'limpieza celular': 'autofagia',
        'reciclaje': 'autofagia',
        'cuántica': 'fisica_cuantica',
        'cuántico': 'fisica_cuantica',
        'física': 'fisica_cuantica',
        'átomo': 'fisica_cuantica',
        'transformación': 'transformacion',
        'cambio': 'transformacion',
        'neuroplasticidad': 'transformacion',
        'biohacking': 'biohacking',
        'hack': 'biohacking',
        'optimización': 'biohacking',
        'suplementos': 'biohacking'
    };
    
    // Buscar categoría por palabra clave
    for (const [keyword, category] of Object.entries(topicMap)) {
        if (topic.includes(keyword)) {
            return getRandomWellnessMessage(category);
        }
    }
    
    // Si no hay match, mensaje aleatorio
    return getRandomWellnessMessage();
}

/**
 * Obtiene estadísticas de mensajes mostrados
 */
function getMessageStats() {
    return {
        totalShown: MESSAGE_HISTORY.shown.length,
        categoryCounts: { ...MESSAGE_HISTORY.categoryCount },
        recentMessages: MESSAGE_HISTORY.shown.slice(-3)
    };
}

/**
 * Obtiene el mensaje de bienvenida con nombre de usuario
 */
function getWelcomeMessage(username) {
    const msg = getRandomWellnessMessage();
    return `Bienvenido, ${username}.\n\n${msg.text}\n\n¿Estás listo para despertar?`;
}

/**
 * Obtiene mensaje post-login con estadísticas
 */
function getPostLoginMessage(userData) {
    const nivel = userData.profile.nivel;
    const dias = userData.estadisticas.dias_activo;
    const xp = userData.profile.xp;
    const msg = getRandomWellnessMessage();
    
    return `Nivel ${nivel} | ${dias} días activo | ${xp} XP\n\nTu transformación continúa. Cada día eres una versión mejorada de ti mismo.\n\n${msg.text}`;
}

/**
 * Obtiene mensaje contextual según hora del día
 */
function getTimeBasedMessage() {
    const hour = new Date().getHours();
    const msg = getRandomWellnessMessage();
    
    let greeting;
    if (hour < 12) {
        greeting = "Buenos días. El amanecer es el momento de máxima claridad mental.";
    } else if (hour < 18) {
        greeting = "Buenas tardes. Tu energía mitocondrial está en su pico.";
    } else {
        greeting = "Buenas noches. Prepara tu cuerpo para la regeneración nocturna.";
    }
    
    return `${greeting}\n\n${msg.text}`;
}

/**
 * Obtiene secuencia de mensajes para un programa específico
 */
function getProgramMessages(programName, day = 1) {
    const programMessages = {
        detox: [
            "Día 1: La autofagia comienza. Tu cuerpo inicia el proceso de limpieza celular.",
            "Día 3: La cetosis se establece. Tus mitocondrias cambian a quemar grasa.",
            "Día 7: Las células senescentes se eliminan. Tu sistema inmune se fortalece.",
            "Día 14: La inflamación sistémica se reduce un 40%. Tu claridad mental aumenta.",
            "Día 21: Transformación completa. Has reprogramado tu metabolismo."
        ],
        energia: [
            "Día 1: Biogénesis mitocondrial activada. Nuevas mitocondrias en formación.",
            "Día 7: Producción de ATP optimizada. Tu energía celular aumenta.",
            "Día 14: Grasa parda activada. Termogénesis adaptativa funcional.",
            "Día 21: NAD+ restaurado. Tu metabolismo rejuvenecido.",
            "Día 30: Máxima capacidad energética. Tu cuerpo es una máquina eficiente."
        ],
        balance: [
            "Día 1: BDNF aumenta. Neuroplasticidad activada.",
            "Día 7: Nuevas sinapsis formadas. Tu cerebro se recablea.",
            "Día 14: Corteza prefrontal engrosada. Mayor control cognitivo.",
            "Día 21: Amígdala reducida. Menor ansiedad, mayor paz.",
            "Día 40: Transformación neural completa. Nueva mente, nueva vida."
        ],
        regeneracion: [
            "Día 1: Genes de longevidad activados. FOXO3 y SIRT1 expresándose.",
            "Día 30: Telómeros estabilizados. Envejecimiento ralentizado.",
            "Día 60: Células madre activadas. Regeneración tisular acelerada.",
            "Día 90: Edad biológica reducida. Has ganado años de vida saludable."
        ]
    };
    
    const messages = programMessages[programName] || [];
    const index = Math.min(Math.floor((day - 1) / 3), messages.length - 1);
    return messages[index] || messages[0];
}

// Exportar para uso global
window.WellnessMessages = {
    getRandom: getRandomWellnessMessage,
    getEnriched: getEnrichedMessage,
    getByTopic: getMessageByTopic,
    getWelcome: getWelcomeMessage,
    getPostLogin: getPostLoginMessage,
    getTimeBased: getTimeBasedMessage,
    getProgramMessage: getProgramMessages,
    getStats: getMessageStats,
    categories: Object.keys(WELLNESS_MESSAGES),
    getAllMessages: () => WELLNESS_MESSAGES
};

// Alias para compatibilidad retroactiva
window.getRandomWelcomeMessage = () => {
    const msg = getRandomWellnessMessage();
    return typeof msg === 'object' ? msg.text : msg;
};

console.log('✅ WellnessMessages loaded - Smart rotation system active');
console.log('📊 Categories:', Object.keys(WELLNESS_MESSAGES).join(', '));
console.log('🎲 Total messages:', Object.values(WELLNESS_MESSAGES).reduce((sum, arr) => sum + arr.length, 0));
