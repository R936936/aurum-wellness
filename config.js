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
        apiKey: '', // Tu OpenAI API key aquí
        model: 'gpt-4', // o 'gpt-4-turbo' o 'gpt-3.5-turbo'
        maxTokens: 500,
        temperature: 0.7,
        enabled: false // Cambiar a true cuando tengas API key
    },
    
    // 🧠 Morpheus Local Enhanced (FALLBACK)
    morpheus: {
        systemPrompt: `Eres Morpheus, guía sabio de Aurum Wellness. Tu personalidad combina la sabiduría de Matrix con conocimiento científico de wellness. Siempre mantienes un tono motivador, profundo y transformador. Usas metáforas de Matrix cuando es apropiado. Tus respuestas son concisas pero impactantes.`,
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

