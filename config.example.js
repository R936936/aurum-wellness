// ⚠️ CONFIGURACIÓN DE EJEMPLO - NO COMMITEAR config.js AL REPO
// Copia este archivo como config.js y agrega tu API key

const AURUM_CONFIG = {
    // OpenAI Configuration
    openai: {
        apiKey: '', // Pon tu API key aquí
        model: 'gpt-4',
        maxTokens: 500,
        temperature: 0.7,
        enabled: false // Cambiar a true cuando tengas API key
    },
    
    // Morpheus Personality
    morpheus: {
        systemPrompt: `Eres Morpheus, guía sabio de Aurum Wellness. 
Tu personalidad combina la sabiduría de Matrix con conocimiento científico de wellness.
Siempre mantienes un tono motivador, profundo y transformador.
Usas metáforas de Matrix cuando es apropiado.
Tus respuestas son concisas pero impactantes.`,
        fallbackEnabled: true
    },
    
    // System Settings
    system: {
        debugMode: false,
        logResponses: true
    }
};

// Exportar configuración
if (typeof window !== 'undefined') {
    window.AURUM_CONFIG = AURUM_CONFIG;
}
