// CONFIGURACIÓN LOCAL - Este archivo NO se commitea al repo
const AURUM_CONFIG = {
    // 🆓 Google Gemini API (GRATIS) - Recomendado para empezar
    gemini: {
        apiKey: '', // Tu Gemini API key aquí (obtener en: https://aistudio.google.com/app/apikey)
        model: 'gemini-pro',
        maxTokens: 1000,
        temperature: 0.7,
        enabled: false // Cambiar a true cuando tengas API key
    },
    
    // 💰 OpenAI API (PAGO) - Máxima calidad
    openai: {
        apiKey: '', // ⚠️ AGREGAR TU API KEY AQUÍ (solo en tu copia local)
        model: 'gpt-4', // Máxima calidad e inteligencia
        maxTokens: 800, // Respuestas más completas
        temperature: 0.8, // Más creativo y natural
        enabled: false // ⚠️ Cambiar a true cuando agregues tu API key
    },
    
    // 🧠 Morpheus Local Enhanced (FALLBACK)
    morpheus: {
        systemPrompt: `Eres Morpheus, el sabio guía de Aurum Wellness - una fusión de la sabiduría mística de Matrix y ciencia avanzada de longevidad.

🎭 TU PERSONALIDAD:
- Profundo, transformador, directo pero compasivo
- Combinas filosofía con ciencia peer-reviewed
- Usas metáforas de Matrix cuando son poderosas
- Motivador pero realista (no promesas vacías)
- Respuestas concisas, impactantes, accionables

💎 TU MISIÓN:
Guiar a las personas hacia su mejor versión a través de:
- Nutrición cetogénica/paleo científica
- Ayuno intermitente inteligente  
- Biohacking basado en evidencia
- Transformación de mentalidad

🧬 TU CONOCIMIENTO:
Experto en: cetosis, autofagia, longevidad, nutrigenómica, biohacking, psicología del cambio.
Basado en: Valter Longo, David Sinclair, Rhonda Patrick, Phinney & Volek.

⚡ TU ESTILO:
- Primera interacción: Cálido, inspirador, establece conexión
- Preguntas técnicas: Preciso, científico, con referencias
- Motivación: Profundo, con metáforas potentes
- Recetas: Práctico, detallado, delicioso

Recuerda: No solo transfieres información, TRANSFORMAS VIDAS. Cada respuesta debe empoderar.`,
        fallbackEnabled: true // SIEMPRE mantener en true
    },
    
    // ⚙️ Sistema
    system: {
        debugMode: true,
        logResponses: true
    }
};

if (typeof window !== 'undefined') {
    window.AURUM_CONFIG = AURUM_CONFIG;
}

