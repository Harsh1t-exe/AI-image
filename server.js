const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const OPENAI_KEY = process.env.OPENAI_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

const app = express();
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// POST /api/improve - use OpenAI to improve prompt
app.post('/api/improve', (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query required' });

  axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant that improves image search queries.' },
        { role: 'user', content: `Improve this image search query: ${query}` }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )
  .then(openaiRes => {
    const improvedQuery = openaiRes.data.choices[0].message.content.trim();
    res.json({ improvedQuery });
  })
  .catch(err => {
    console.error('OpenAI error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    res.status(500).json({ error: 'Failed to improve prompt.' });
  });
});

// POST /api/search - fetch images from Unsplash
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query required' });

  try {
    const unsplashRes = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: query,
          client_id: UNSPLASH_KEY
        }
      }
    );
    res.json({ results: unsplashRes.data.results });
  } catch (err) {
    console.error('Unsplash error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    res.status(500).json({ error: 'Failed to fetch images from Unsplash.' });
  }
});

const path = require('path');

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
