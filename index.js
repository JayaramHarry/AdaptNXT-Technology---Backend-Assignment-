// index.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.json());

// Route to get weather information
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
