const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get('/api/capsules', async (req, res) => {
  const result = await pool.query('SELECT id,recipient_name,message, open_date, created_at FROM time_capsules');
  res.json(result.rows);
});

app.post('/api/capsules', async (req, res) => {
  const { recipient_name, message, open_date } = req.body;
  const result = await pool.query(
    'INSERT INTO time_capsules (recipient_name, message, open_date, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [recipient_name, message, open_date, new Date()]
  );
  res.json(result.rows[0]);
});

app.put('/api/capsules/Editar/:id', async (req, res) => {
  const { id } = req.params;
  const { recipient_name, message, open_date } = req.body;
  await pool.query(
    'UPDATE time_capsules SET recipient_name = $1, message = $2, open_date = $3 WHERE id = $4',
    [recipient_name, message, open_date, id]
  );
  res.json({ message: 'Cápsula atualizada com sucesso' });
});

app.get('/api/capsules/Deletar/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM time_capsules WHERE id = $1', [id]);
  res.json({ message: 'Cápsula deletada com sucesso' });
});

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
