/**
 * ═══════════════════════════════════════════════════════════════════════
 *  🔱 AURUM WELLNESS - CONFIGURACIÓN DINÁMICA v5.0 🔱
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Este archivo carga configuración de:
 * 1. Variables de entorno (Vercel, producción)
 * 2. config.local.js (desarrollo local)
 * 3. Fallback a solo Morpheus Local
 */

(function() {
    // Detectar si estamos en producción (Vercel) o desarrollo (local)
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1';
    
    console.log(`🔱 Cargando configuración para: ${isProduction ? 'PRODUCCIÓN' : 'DESARROLLO'}`);
    
    // Función para obtener API key (simulando process.env para frontend)
    function getEnvVar(name) {
        // En producción, las API keys se inyectan en build time
        // Por ahora, retornamos null para que use config.local.js en dev
        return null;
    }
    
    // Configuración base
    const baseConfig = {
        ai: {
            claude: {
                enabled: false,
                apiKey: null,
                model: 'claude-3-5-sonnet-20241022',
                maxTokens: 2000
            },
            perplexity: {
                enabled: false,
                apiKey: null,
                model: 'llama-3.1-sonar-large-128k-online',
                maxTokens: 2000
            },
            gemini: {
                enabled: false,
                apiKey: null,
                model: 'gemini-2.0-flash-exp',
                maxTokens: 2000
            },
            openai: {
                enabled: false,
                apiKey: null,
                model: 'gpt-4-turbo-preview',
                maxTokens: 2000
            },
            morpheusLocal: {
                enabled: true,
                priority: 999
            }
        },
        trinity: {
            enabled: false,
            routingStrategy: 'intelligent',
            fallbackChain: ['gemini', 'openai', 'morpheus'],
            priorities: {
                claude: 1,
                gemini: 2,
                openai: 3,
                perplexity: 4,
                morpheus: 999
            }
        },
        ui: {
            morpheus: {
                terminalSize: 'large',
                fontSize: '16px',
                showAIProvider: false,
                conciseMode: true
            }
        }
    };
    
    // En desarrollo, intentar cargar config.local.js
    if (!isProduction) {
        console.log('📝 Modo desarrollo: esperando config.local.js...');
        // config.local.js se carga después y sobrescribe AURUM_CONFIG
    } else {
        console.log('🌐 Modo producción: usando configuración base');
        console.log('⚠️  Para habilitar IAs en producción, configura variables de entorno en Vercel');
    }
    
    // Publicar configuración global
    window.AURUM_CONFIG = baseConfig;
    
    console.log('✅ Config base cargado');
    
})();
