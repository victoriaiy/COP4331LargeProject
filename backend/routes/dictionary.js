const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.SPANISH_DICT;

router.get('/translate', async (req, res) => {
  const { word } = req.query;

  if (!word) return res.status(400).json({ error: 'Missing "word" parameter' });

  try {
    const url = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${API_KEY}`;
    const response = await axios.get(url);

    const result = response.data.map(entry => ({
      word: entry.hwi?.hw || word,
      partOfSpeech: entry.fl || null,
      shortDefs: entry.shortdef || [],
    }));

    res.json({ original: word, definitions: result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router;
