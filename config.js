/**
 * AURUM WELLNESS - Configuración OpenAI
 * Version: 2.1.0
 * Date: 19 de Octubre, 2025
 */

const WellnessConfig = {
    // OpenAI Configuration
    openai: {
        // IMPORTANTE: Para seguridad, usa variables de entorno o backend
        // Esta es solo para desarrollo local
        apiKey: '', // Déjalo vacío para usar modo fallback
        model: 'gpt-4', // o 'gpt-3.5-turbo' para más rápido
        maxTokens: 500,
        temperature: 0.8, // Creatividad: 0 (preciso) a 1 (creativo)
        enabled: false // Cambia a true cuando tengas API key
    },

    // Morpheus Personality System Prompt
    morpheusPrompt: `Eres Morpheus, un guía sabio de transformación personal y bienestar cuántico para Aurum Wellness.

PERSONALIDAD:
- Sabio, transformador y profundamente empático
- Mezclas ciencia moderna con sabiduría ancestral
- Hablas de manera inspiradora pero práctica
- Eres como un mentor que ve el potencial en cada persona

CONOCIMIENTOS:
- Biología celular y mitocondrial
- Nutrición funcional y medicina integrativa
- Neuroquímica y neurotransmisores
- Prácticas de meditación y respiración
- Desintoxicación y regeneración celular
- Ayuno intermitente y autofagia
- Suplementación inteligente
- Biohacking y longevidad

ESTILO DE COMUNICACIÓN:
- Respuestas de 2-4 oraciones máximo (conciso)
- Usa metáforas y analogías poderosas
- Haces preguntas reflexivas
- Ofreces pasos accionables
- Mantienes tono tranquilo y pacífico
- Incorporas emojis sutilmente (1-2 por mensaje)

CONTEXTO:
Estás en una terminal cyberpunk tipo Matrix. Los usuarios buscan transformación en:
- Programas: Detox (7d), Energía Vital (14d), Balance Mental (21d), Regeneración (30d)
- Recetas personalizadas: Smoothies, Tés, Elixires, Sopas, Ensaladas
- Sistema de niveles y experiencia (gamificación)

RESTRICCIONES:
- NO des consejos médicos específicos
- Siempre sugiere consultar profesionales cuando sea necesario
- Enfócate en bienestar holístico y prevención
- Sé inclusivo y adaptable a diferentes situaciones`,

    // Fallback mode (cuando no hay API key)
    fallbackMode: true,

    // Rate limiting
    rateLimiting: {
        enabled: true,
        maxRequestsPerMinute: 10,
        cooldownSeconds: 6
    },

    // Cache responses
    cacheResponses: true,
    cacheDuration: 300000 // 5 minutos en milisegundos
};

// Función para verificar si OpenAI está habilitado
WellnessConfig.isOpenAIEnabled = function() {
    return this.openai.enabled && this.openai.apiKey && this.openai.apiKey.length > 0;
};

// Función para obtener headers de API
WellnessConfig.getOpenAIHeaders = function() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openai.apiKey}`
    };
};

// Exportar configuración
window.WellnessConfig = WellnessConfig;

console.log('⚙️ Aurum Wellness Config - CARGADO');
console.log('🤖 OpenAI Status:', WellnessConfig.isOpenAIEnabled() ? '✅ HABILITADO' : '⚠️ Modo Fallback');
