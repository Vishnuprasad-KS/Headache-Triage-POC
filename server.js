import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Corti LLM configuration
const CORTI_API_URL = process.env.CORTI_API_URL || 'https://api.corti.ai/v1/chat/completions';
const CORTI_API_KEY = process.env.CORTI_API_KEY;

if (!CORTI_API_KEY) {
  console.warn('Warning: CORTI_API_KEY not found in environment variables');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Chat completion endpoint for headache analysis
app.post('/api/ask', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request format. Expected messages array.' 
      });
    }

    if (!CORTI_API_KEY) {
      // Return demo response when API key is not configured
      const demoResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              analysis: {
                category: 'low',
                riskLevel: 'low',
                explanation: 'Based on the provided information, this appears to be a routine headache without significant red flags. However, please note that this is a demo response as the Corti API is not configured.',
                recommendations: [
                  'Configure Corti API credentials for proper analysis',
                  'Consider over-the-counter pain relief if appropriate',
                  'Monitor symptoms and seek medical attention if they worsen',
                  'Consult with a healthcare provider for persistent headaches'
                ],
                urgency: 'routine'
              },
              reasoning: 'This is a demonstration response. To get proper medical analysis, please configure your Corti API credentials in the .env file.'
            })
          }
        }]
      };

      return res.json(demoResponse);
    }

    // Make request to Corti LLM
    const response = await axios.post(CORTI_API_URL, {
      model: process.env.CORTI_MODEL || 'corti-chat',
      messages: messages,
      temperature: 0.3,
      max_tokens: 2000,
      top_p: 0.9
    }, {
      headers: {
        'Authorization': `Bearer ${CORTI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    res.json(response.data);

  } catch (error) {
    console.error('Error calling Corti API:', error.message);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ 
        error: 'Request timeout. Please try again.' 
      });
    }

    if (error.response) {
      // API returned an error response
      const status = error.response.status;
      const message = error.response.data?.error?.message || 'API request failed';
      
      return res.status(status).json({ 
        error: `Corti API Error: ${message}` 
      });
    }

    // Network or other errors
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Corti API configured: ${CORTI_API_KEY ? '✅' : '❌'}`);
});