// File: index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Simpan di .env
});

// Create ucapan
app.post("/ucapan", async (req, res) => {
  const { nama, ucapan, hadir } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO ucapan_pernikahan (nama, ucapan, hadir) VALUES ($1, $2, $3) RETURNING *",
      [nama, ucapan, hadir]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all ucapan
app.get("/ucapan", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ucapan_pernikahan ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update ucapan
app.put("/ucapan/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, ucapan, hadir } = req.body;
  try {
    const result = await pool.query(
      "UPDATE ucapan_pernikahan SET nama=$1, ucapan=$2, hadir=$3 WHERE id=$4 RETURNING *",
      [nama, ucapan, hadir, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete ucapan
app.delete("/ucapan/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM ucapan_pernikahan WHERE id=$1", [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API berjalan di http://localhost:${PORT}`));
