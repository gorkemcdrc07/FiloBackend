const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { poolPromise } = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('🚀 Filo Backend Aktif!');
});

// Örnek API endpoint
app.get('/api/seferler', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT TOP 10 * FROM TblTamamlananSeferler');
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Hata:', err);
    res.status(500).send('Veri alınamadı');
  }
});

app.listen(port, () => {
  console.log(`🚀 Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
