// MORPHEUS SIMPLE - Versión mejorada con más respuestas
class SimpleMorpheus {
    constructor() {
        this.responses = {
            // Saludos
            hola: "Saludos. Matrix te da la bienvenida a Aurum Wellness. Soy Morpheus, tu guía en la transformación personal. Combino ciencia de vanguardia con sabiduría ancestral para optimizar tu cuerpo y mente. ¿En qué puedo ayudarte hoy? 💎🌟",
            
            // Programas
            detox: "El Detox Cuántico es un programa de 7 días diseñado para limpieza celular profunda. Activa la autofagia, elimina toxinas acumuladas y resetea tu metabolismo desde cero. Tu cuerpo se transforma a nivel celular. ¿Listo para comenzar tu transformación? 🌿✨",
            
            energia: "Energía Vital es un programa de 14 días que optimiza tu producción de ATP mitocondrial. Aumenta tu energía natural, mejora tu enfoque mental y revitaliza cada célula de tu cuerpo. Adiós al cansancio crónico, hola vitalidad infinita. ⚡🔋",
            
            balance: "Balance Mental Neuroquímico es un programa de 21 días que sincroniza tus neurotransmisores para alcanzar paz interior profunda. Reduce estrés, mejora tu sueño y optimiza tu claridad mental. Tu cerebro en su estado óptimo. ☯️��",
            
            regeneracion: "Regeneración Celular Avanzada es nuestro programa más completo (30 días). Activa telomerasa, repara ADN y rejuvenece a nivel celular profundo. El anti-envejecimiento real comienza desde adentro. 🔄✨",
            
            programa: "Tenemos 4 programas de transformación:\n\n🌿 Detox Cuántico (7 días) - Limpieza profunda\n⚡ Energía Vital (14 días) - Optimización mitocondrial\n☯️ Balance Mental (21 días) - Sincronización neuroquímica\n🔄 Regeneración Celular (30 días) - Rejuvenecimiento completo\n\n¿Cuál te llama la atención? 📋",
            
            // Ciencia
            cetosis: "La cetosis es un estado metabólico donde tu cuerpo quema grasas (produciendo cetonas) en lugar de glucosa. Los beneficios incluyen: autofagia activada, claridad mental aumentada, inflamación optimizada y composición corporal mejorada. Los cuerpos cetónicos (β-hidroxibutirato, acetoacetato) son combustible premium para tu cerebro. 🔬🧠",
            
            autofagia: "La autofagia es el proceso de 'reciclaje celular' donde las células degradan y reciclan componentes dañados. Se activa con ayuno, ejercicio y cetosis. Es clave para longevidad, prevención de enfermedades y regeneración celular. Tu cuerpo tiene su propio sistema de limpieza incorporado. 🧬♻️",
            
            mitocondria: "Las mitocondrias son las centrales energéticas de tus células, produciendo ATP (energía). Optimizarlas es clave para vitalidad, longevidad y salud óptima. Nuestros programas están diseñados para biogenesis mitocondrial - crear mitocondrias nuevas y más eficientes. ⚡🔬",
            
            // Nutrición
            receta: "El Creador de Recetas te permite diseñar smoothies cetogénicos, tés curativos, elixires y más. Todas las recetas están optimizadas para máxima biodisponibilidad y activación mitocondrial. Tu nutrición, personalizada y científica. 🍽️✨",
            
            // Entrenamiento
            entrenamiento: "El entrenamiento en Aurum combina tres pilares: (1) Fuerza con pesas y calistenia, (2) Flexibilidad y movilidad, (3) Artes marciales (Kung Fu/Taekwondo). El objetivo: construir un cuerpo fuerte, ágil, funcional y listo para cualquier desafío. 💪🥋",
            
            gym: "Nuestro enfoque de gym integra levantamiento de pesas con calistenia para construir fuerza real y funcional. No solo músculos, sino poder útil. Combinado con artes marciales para agilidad y coordinación. Forja tu templo. 🏋️‍♂️⚡",
            
            // Motivación
            motivacion: "Cada paso que das en tu transformación es una victoria. Los resultados no son lineales - hay valles y picos. Lo que importa es la dirección, no la velocidad. El camino de la transformación requiere paciencia, pero las recompensas son eternas. Confía en el proceso, eres más fuerte de lo que crees. 💪✨🌟",
            
            desanimado: "Entiendo que el viaje puede ser desafiante. Pero recuerda: la transformación real ocurre en la incomodidad. Cada día que persistes, te vuelves más fuerte. No por los resultados visibles, sino por la disciplina invisible que estás forjando. Tú no estás construyendo un cuerpo, estás forjando un espíritu inquebrantable. Sigue adelante, guerrero. 🔥💎",
            
            // General
            ayuda: "Puedo ayudarte con: programas de wellness, nutrición cetogénica, rutinas de entrenamiento, ciencia del metabolismo (cetosis, autofagia, mitocondrias) y motivación. También puedo guiarte sobre nuestros 4 programas principales o ayudarte a crear recetas personalizadas. ¿Qué necesitas saber? 💬✨"
        };
    }

    generateResponse(query) {
        console.log('🤖 SimpleMorpheus recibió:', query);
        const q = query.toLowerCase().trim();
        
        // Saludos
        if (q.includes('hola') || q.includes('hello') || q.includes('hi') || q.includes('buenas')) {
            return this.responses.hola;
        }
        
        // Programas específicos
        if (q.includes('detox') || q.includes('limpieza')) {
            return this.responses.detox;
        }
        if (q.includes('energia') || q.includes('energía') || q.includes('cansancio') || q.includes('fatiga')) {
            return this.responses.energia;
        }
        if (q.includes('balance') || q.includes('mental') || q.includes('estrés') || q.includes('estres')) {
            return this.responses.balance;
        }
        if (q.includes('regeneración') || q.includes('regeneracion') || q.includes('anti-age') || q.includes('antiage')) {
            return this.responses.regeneracion;
        }
        if (q.includes('programa') || q.includes('plan')) {
            return this.responses.programa;
        }
        
        // Ciencia
        if (q.includes('cetosis') || q.includes('cetona') || q.includes('keto')) {
            return this.responses.cetosis;
        }
        if (q.includes('autofagia') || q.includes('autophagy')) {
            return this.responses.autofagia;
        }
        if (q.includes('mitocondria') || q.includes('atp') || q.includes('energía celular')) {
            return this.responses.mitocondria;
        }
        
        // Nutrición
        if (q.includes('receta') || q.includes('comida') || q.includes('smoothie') || q.includes('té') || q.includes('te')) {
            return this.responses.receta;
        }
        
        // Entrenamiento
        if (q.includes('entrenamiento') || q.includes('ejercicio') || q.includes('workout')) {
            return this.responses.entrenamiento;
        }
        if (q.includes('gym') || q.includes('pesas') || q.includes('fuerza')) {
            return this.responses.gym;
        }
        
        // Motivación
        if (q.includes('motivación') || q.includes('motivacion') || q.includes('motivame')) {
            return this.responses.motivacion;
        }
        if (q.includes('desanimado') || q.includes('triste') || q.includes('difícil') || q.includes('dificil') || q.includes('no puedo')) {
            return this.responses.desanimado;
        }
        
        // Por defecto
        return this.responses.ayuda;
    }
}

// Crear instancia global INMEDIATAMENTE
window.SimpleMorpheus = new SimpleMorpheus();
console.log('✅ SimpleMorpheus v2.0 cargado con respuestas expandidas');
