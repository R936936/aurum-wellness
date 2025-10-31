/**
 * Vercel API Route - Config con API keys desde variables de entorno
 * 
 * Este endpoint sirve la configuración con las API keys de forma segura
 * sin exponerlas en el código del frontend.
 */

export default function handler(req, res) {
  // Headers CORS para permitir requests desde el frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Configuración con variables de entorno
  const config = {
    openai: {
      enabled: !!process.env.OPENAI_API_KEY,
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4-turbo',
      maxTokens: 500,
      temperature: 0.7
    },
    claude: {
      enabled: !!process.env.CLAUDE_API_KEY,
      apiKey: process.env.CLAUDE_API_KEY || '',
      model: 'claude-3-5-sonnet-20241022',
      maxTokens: 500,
      temperature: 0.7
    },
    gemini: {
      enabled: !!process.env.GEMINI_API_KEY,
      apiKey: process.env.GEMINI_API_KEY || '',
      model: 'gemini-2.0-flash-exp',
      maxTokens: 500,
      temperature: 0.7
    },
    perplexity: {
      enabled: !!process.env.PERPLEXITY_API_KEY,
      apiKey: process.env.PERPLEXITY_API_KEY || '',
      model: 'llama-3.1-sonar-small-128k-online',
      maxTokens: 500,
      temperature: 0.7
    },
    morpheus: {
      enabled: true,
      fallbackMode: true
    },
    trinity: {
      enabled: true,
      routingStrategy: 'intelligent',
      fallbackChain: ['gemini', 'openai', 'claude', 'morpheus']
    }
  };

  // Log para debug (sin mostrar las keys completas)
  console.log('🔱 Config API called');
  console.log('  OpenAI:', config.openai.enabled ? '✅' : '❌');
  console.log('  Claude:', config.claude.enabled ? '✅' : '❌');
  console.log('  Gemini:', config.gemini.enabled ? '✅' : '❌');
  console.log('  Perplexity:', config.perplexity.enabled ? '✅' : '❌');

  res.status(200).json(config);
}
