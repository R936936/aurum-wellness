// Serverless Function para manejar llamadas de IA de forma segura
// Vercel Serverless Function

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ai, messages, query } = req.body;
    
    console.log(`🔱 API Request: ${ai}`);

    // Router de IAs
    switch (ai) {
      case 'claude':
        return await handleClaude(messages, res);
      
      case 'gemini':
        return await handleGemini(query, res);
      
      case 'openai':
        return await handleOpenAI(messages, res);
      
      default:
        return res.status(400).json({ error: 'Invalid AI provider' });
    }
  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Claude 3.5 Sonnet
async function handleClaude(messages, res) {
  const apiKey = process.env.CLAUDE_API_KEY;
  
  if (!apiKey) {
    return res.status(503).json({ error: 'Claude not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        temperature: 0.7,
        system: 'Eres Morpheus de Matrix. Responde de forma breve, profunda y misteriosa. Máximo 3-4 líneas. Usa metáforas de Matrix cuando sea apropiado.',
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      text: data.content[0].text,
      ai: 'claude'
    });
  } catch (error) {
    console.error('❌ Claude Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Gemini 2.0 Flash
async function handleGemini(query, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(503).json({ error: 'Gemini not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Eres Morpheus de Matrix. Contexto: Aurum Wellness - transformación metabólica.\n\nResponde de forma breve (máximo 3-4 líneas), profunda y misteriosa.\n\nPregunta: ${query}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
            topP: 0.8,
            topK: 10
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';

    return res.status(200).json({
      text: text,
      ai: 'gemini'
    });
  } catch (error) {
    console.error('❌ Gemini Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// OpenAI GPT-4
async function handleOpenAI(messages, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return res.status(503).json({ error: 'OpenAI not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Eres Morpheus de Matrix. Responde de forma breve, profunda y misteriosa. Máximo 3-4 líneas. Usa metáforas de Matrix cuando sea apropiado.'
          },
          ...messages
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      text: data.choices[0].message.content,
      ai: 'openai'
    });
  } catch (error) {
    console.error('❌ OpenAI Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
