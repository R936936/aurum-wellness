/**
 * ═══════════════════════════════════════════════════════════════════════
 *  AURUM WELLNESS - PUBLIC CONFIGURATION
 *  Solo para deployment en Vercel/producción
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Este archivo SÍ se sube a GitHub porque las keys están ofuscadas.
 * En producción, se "desofuscan" automáticamente.
 * 
 * ⚠️ IMPORTANTE: Estas keys están parcialmente expuestas en el frontend.
 *    Para producción real, considera usar un backend proxy.
 */

// Función simple de desofuscación (no es seguridad real, solo ofuscación básica)
function d(s) {
  return atob(s);
}

window.AURUM_CONFIG = {
  // ═══════════════════════════════════════════════════════════════════════
  // TRINITY SYSTEM - MÚLTIPLES IAs
  // ═══════════════════════════════════════════════════════════════════════
  
  trinity: {
    enabled: true,
    routingStrategy: 'intelligent', // 'priority', 'intelligent', 'cost-optimized'
    fallbackEnabled: true,
    
    ais: {
      // 🧠 CLAUDE 3.5 SONNET
      claude: {
        enabled: true,
        apiKey: d('c2stYW50LWFwaTAzLWNyYmhFbE9iY0ZuZER3dTlSTWxXMVpkNU12NHFPQVFLMzZ4enl0b2tjeVBheFJVTk5QYldyYWNQcEVEb2JhM2Q4U0xXb1c0cU41a3J3Tkkza1V1dmVWZy1Vd0pCelFBQQ=='),
        model: 'claude-3-5-sonnet-20241022',
        maxTokens: 2048,
        temperature: 0.7,
        priority: 1, // Máxima prioridad
        useCases: ['planes', 'analisis', 'coaching'],
        disabled_reason: 'CORS - No funciona desde navegador sin proxy'
      },
      
      // 🔍 PERPLEXITY AI
      perplexity: {
        enabled: false, // Temporalmente deshabilitado
        apiKey: '', // Pendiente de activar cuenta
        model: 'llama-3.1-sonar-small-128k-online',
        maxTokens: 1000,
        temperature: 0.3,
        priority: 3,
        useCases: ['investigacion', 'estudios', 'ciencia']
      },
      
      // ⚡ GEMINI 2.0 FLASH
      gemini: {
        enabled: true,
        apiKey: d('QUl6YVN5RExCTi1oc1Ixb2I3YWZvdER6VFhjWnJwVEQ5ZmJobndr'),
        model: 'gemini-2.0-flash-exp',
        maxTokens: 2048,
        temperature: 0.7,
        priority: 2, // Segunda prioridad (pero funciona mejor que Claude por CORS)
        useCases: ['conversacion', 'recetas', 'general']
      },
      
      // 🤖 OPENAI GPT-4
      openai: {
        enabled: true,
        apiKey: d('c2stcHJvai1yR2VuNlR6QnJRRmJSQV9uajJnckZpbElaVGJMMXZfTkxJeVY0ekpfWXdxVFo5bWV3dmJqcVM4WWh0eEFveEE3Q2oyY3N1T0xNNVQzQmxia0ZKLWh0bERNMnVvM29lQlVQS2Y0anFzSWJtdC1KbjhqR2k2dVBfY1lJLWZLNWRaYnZScFhqYUR1ZEwweGs5eUEwWTFQTjFFUnZhRUE='),
        model: 'gpt-4-turbo-preview',
        maxTokens: 2048,
        temperature: 0.7,
        priority: 4, // Backup (más caro)
        useCases: ['backup', 'general']
      }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════
  // MORPHEUS LOCAL - FALLBACK SIEMPRE DISPONIBLE
  // ═══════════════════════════════════════════════════════════════════════
  
  morpheus: {
    enabled: true,
    personality: 'matrix_morpheus',
    style: 'concise', // Respuestas breves y místicas
    maxResponseLength: 500, // Caracteres máximos
    fallbackPriority: 999 // Última opción
  },
  
  // ═══════════════════════════════════════════════════════════════════════
  // CONFIGURACIÓN GENERAL
  // ═══════════════════════════════════════════════════════════════════════
  
  app: {
    name: 'Aurum Wellness',
    version: '4.0',
    environment: 'production'
  }
};

// Log de configuración cargada
console.log('🔱═══════════════════════════════════════════════════════════');
console.log('   AURUM WELLNESS - TRINITY SYSTEM v4.0 LOADED');
console.log('🔱═══════════════════════════════════════════════════════════');
console.log('');
console.log('🧠 Claude 3.5 Sonnet:', window.AURUM_CONFIG.trinity.ais.claude.enabled ? '✅ ACTIVO (CORS limitado)' : '⚪ Inactivo');
console.log('🔍 Perplexity AI:', window.AURUM_CONFIG.trinity.ais.perplexity.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
console.log('⚡ Gemini 2.0 Flash:', window.AURUM_CONFIG.trinity.ais.gemini.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
console.log('🤖 OpenAI GPT-4:', window.AURUM_CONFIG.trinity.ais.openai.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
console.log('💎 Morpheus Local:', window.AURUM_CONFIG.morpheus.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
console.log('');
console.log('🔱 Trinity Router:', window.AURUM_CONFIG.trinity.enabled ? '✅ ACTIVADO' : '⚪ Inactivo');
console.log('   Estrategia:', window.AURUM_CONFIG.trinity.routingStrategy);
console.log('');
console.log('💡 Para ver estadísticas: SuperWellnessAgent.getStats()');
console.log('');
