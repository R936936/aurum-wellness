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
 * Obtiene un mensaje aleatorio de una categoría
 */
function getRandomWellnessMessage(category = null) {
    const categories = Object.keys(WELLNESS_MESSAGES);
    const selectedCategory = category || categories[Math.floor(Math.random() * categories.length)];
    const messages = WELLNESS_MESSAGES[selectedCategory];
    return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Obtiene el mensaje de bienvenida con nombre de usuario
 */
function getWelcomeMessage(username) {
    const message = getRandomWellnessMessage();
    return `Bienvenido, ${username}.\n\n${message}\n\n¿Estás listo para despertar?`;
}

/**
 * Obtiene mensaje post-login con estadísticas
 */
function getPostLoginMessage(userData) {
    const nivel = userData.profile.nivel;
    const dias = userData.estadisticas.dias_activo;
    const xp = userData.profile.xp;
    
    return `Nivel ${nivel} | ${dias} días activo | ${xp} XP\n\nTu transformación continúa. Cada día eres una versión mejorada de ti mismo.\n\n${getRandomWellnessMessage()}`;
}

// Exportar para uso global
window.WellnessMessages = {
    getRandom: getRandomWellnessMessage,
    getWelcome: getWelcomeMessage,
    getPostLogin: getPostLoginMessage,
    categories: Object.keys(WELLNESS_MESSAGES)
};

// Alias para compatibilidad
window.getRandomWelcomeMessage = getRandomWellnessMessage;

console.log('✅ WellnessMessages loaded');
