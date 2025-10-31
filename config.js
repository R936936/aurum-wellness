// ═══════════════════════════════════════════════════════════════════════════
// 🔱 AURUM WELLNESS - TRINITY CONFIGURATION v5.0 🔱
// ═══════════════════════════════════════════════════════════════════════════
// Para producción en Vercel - Carga API keys desde Vercel Environment Variables
// ═══════════════════════════════════════════════════════════════════════════

// Configuración inicial (sin API keys)
let AURUM_CONFIG = {
    // ───────────────────────────────────────────────────────────────────────
    // CLAUDE 3.5 SONNET - Razonamiento Profundo 🧠
    // ───────────────────────────────────────────────────────────────────────
    claude: {
        apiKey: '', // Set via environment variable CLAUDE_API_KEY
        model: 'claude-3-5-sonnet-20241022',
        maxTokens: 500,
        temperature: 0.7,
        enabled: true,
        endpoint: 'https://api.anthropic.com/v1/messages',
        version: '2023-06-01',
        priority: 1
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // PERPLEXITY AI - Research en Tiempo Real 🔍
    // ───────────────────────────────────────────────────────────────────────
    perplexity: {
        apiKey: '', // Deshabilitado por ahora
        model: 'llama-3.1-sonar-large-128k-online',
        maxTokens: 400,
        temperature: 0.5,
        enabled: false,
        endpoint: 'https://api.perplexity.ai/chat/completions',
        searchDomainFilter: ['pubmed.gov', 'scholar.google.com', 'nature.com'],
        priority: 2
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // GEMINI 2.0 FLASH - Velocidad Ultra + Multimodal ⚡
    // ───────────────────────────────────────────────────────────────────────
    gemini: {
        apiKey: '', // Set via environment variable GEMINI_API_KEY
        model: 'gemini-2.0-flash-exp',
        maxTokens: 400,
        temperature: 0.7,
        enabled: true,
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
        priority: 3
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // OPENAI GPT-4 - Balanceado y Confiable 🤖
    // ───────────────────────────────────────────────────────────────────────
    openai: {
        apiKey: '', // Set via environment variable OPENAI_API_KEY
        model: 'gpt-4-turbo-preview',
        maxTokens: 400,
        temperature: 0.7,
        enabled: true,
        endpoint: 'https://api.openai.com/v1/chat/completions',
        priority: 4
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // MORPHEUS LOCAL - Fallback Offline 💎
    // ───────────────────────────────────────────────────────────────────────
    morpheusLocal: {
        enabled: true,
        priority: 999,
        maxTokens: 300
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // TRINITY ROUTER - Sistema Inteligente de Enrutamiento 🔱
    // ───────────────────────────────────────────────────────────────────────
    trinity: {
        enabled: true,
        routingStrategy: 'intelligent',
        fallbackChain: ['claude', 'gemini', 'openai', 'morpheus'],
        priorities: {
            claude: 1,
            perplexity: 2,
            gemini: 3,
            openai: 4,
            morpheus: 999
        },
        timeout: 15000,
        retryAttempts: 2
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // UI CONFIGURATION - Interfaz Morpheus 💎
    // ───────────────────────────────────────────────────────────────────────
    ui: {
        morpheus: {
            terminalSize: 'large',
            fontSize: '18px',
            showAIProvider: false,
            conciseMode: true,
            matrixEffect: true
        }
    },
    
    // ───────────────────────────────────────────────────────────────────────
    // WELLNESS CORE - Sistema de Bienestar 🌟
    // ───────────────────────────────────────────────────────────────────────
    wellness: {
        programs: ['detox', 'energy', 'balance', 'regeneration'],
        userLevel: {
            xpPerInteraction: 10,
            levelsEnabled: true
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// LOGGING & VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// LOAD API KEYS FROM VERCEL ENVIRONMENT (PRODUCCIÓN)
// ═══════════════════════════════════════════════════════════════════════════

(async function loadConfigFromAPI() {
    console.log('🔱 Loading config from Vercel API...');
    
    try {
        // Detectar si estamos en Vercel (producción) o local
        const isVercel = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        
        if (isVercel) {
            console.log('🌐 Production mode: fetching config from /api/config');
            
            const response = await fetch('/api/config');
            
            if (response.ok) {
                const configFromAPI = await response.json();
                
                // Merge API keys desde el backend
                if (configFromAPI.openai?.apiKey) {
                    AURUM_CONFIG.openai.apiKey = configFromAPI.openai.apiKey;
                    AURUM_CONFIG.openai.enabled = true;
                }
                
                if (configFromAPI.claude?.apiKey) {
                    AURUM_CONFIG.claude.apiKey = configFromAPI.claude.apiKey;
                    AURUM_CONFIG.claude.enabled = true;
                }
                
                if (configFromAPI.gemini?.apiKey) {
                    AURUM_CONFIG.gemini.apiKey = configFromAPI.gemini.apiKey;
                    AURUM_CONFIG.gemini.enabled = true;
                }
                
                if (configFromAPI.perplexity?.apiKey) {
                    AURUM_CONFIG.perplexity.apiKey = configFromAPI.perplexity.apiKey;
                    AURUM_CONFIG.perplexity.enabled = true;
                }
                
                console.log('✅ Config loaded from API successfully');
            } else {
                console.warn('⚠️ Could not load config from API, using defaults (Morpheus only)');
            }
        } else {
            console.log('💻 Local mode: using config from file');
        }
    } catch (error) {
        console.warn('⚠️ Error loading config from API:', error);
        console.log('💎 Falling back to Morpheus Local mode');
    }
    
    // Display final configuration
    console.log('🔱═══════════════════════════════════════════════════════════');
    console.log('   AURUM WELLNESS - TRINITY SYSTEM v5.0 LOADED');
    console.log('🔱═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('🧠 Claude 3.5 Sonnet:', AURUM_CONFIG.claude.enabled && AURUM_CONFIG.claude.apiKey ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('🔍 Perplexity AI:', AURUM_CONFIG.perplexity.enabled && AURUM_CONFIG.perplexity.apiKey ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('⚡ Gemini 2.0 Flash:', AURUM_CONFIG.gemini.enabled && AURUM_CONFIG.gemini.apiKey ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('🤖 OpenAI GPT-4:', AURUM_CONFIG.openai.enabled && AURUM_CONFIG.openai.apiKey ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('💎 Morpheus Local:', AURUM_CONFIG.morpheusLocal.enabled ? '✅ ACTIVO' : '⚪ Inactivo');
    console.log('');
    console.log('🔱 Trinity Router:', AURUM_CONFIG.trinity.enabled ? '✅ ACTIVADO' : '⚪ Desactivado');
    console.log('   Estrategia:', AURUM_CONFIG.trinity.routingStrategy);
    console.log('');
    console.log('💡 Para ver estadísticas: SuperWellnessAgent.getStats()');
    console.log('');
    
    // Disparar evento para que los demás scripts sepan que el config está listo
    window.dispatchEvent(new CustomEvent('aurumConfigReady', { detail: AURUM_CONFIG }));
})();
