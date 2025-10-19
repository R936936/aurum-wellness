// CONFIGURACIÓN LOCAL - Este archivo NO se commitea al repo
const AURUM_CONFIG = {
    openai: {
        apiKey: '', // Tu API key aquí
        model: 'gpt-4',
        maxTokens: 500,
        temperature: 0.7,
        enabled: false // Cambiar a true cuando tengas API key
    },
    morpheus: {
        systemPrompt: `Eres Morpheus, guía sabio de Aurum Wellness. Tu personalidad combina la sabiduría de Matrix con conocimiento científico de wellness. Siempre mantienes un tono motivador, profundo y transformador. Usas metáforas de Matrix cuando es apropiado. Tus respuestas son concisas pero impactantes.`,
        fallbackEnabled: true
    },
    system: {
        debugMode: true,
        logResponses: true
    }
};

if (typeof window !== 'undefined') {
    window.AURUM_CONFIG = AURUM_CONFIG;
}
