const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET: List all clubs
app.get('/api/clubs', (req, res) => {
    const clubs = db.prepare('SELECT * FROM clubs ORDER BY id').all();
    res.json(clubs);
});

// GET: Get one club
app.get('/api/clubs/:id', (req, res) => {
    const club = db.prepare('SELECT * FROM clubs WHERE id = ?')
        .get(req.params.id);

    if (!club) {
        return res.status(404).json({ error: 'Club not found' });
    }

    res.json(club);
});

// POST: Create a club
app.post('/api/clubs', (req, res) => {
    const { name, category, description, president, email, meeting_day } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            error: 'Club name and category are required'
        });
    }

    const result = db.prepare(`
        INSERT INTO clubs
        (name, category, description, president, email, meeting_day)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, category, description || '', president || '',
           email || '', meeting_day || '');

    const club = db.prepare('SELECT * FROM clubs WHERE id = ?')
        .get(result.lastInsertRowid);

    res.status(201).json(club);
});

// PUT: Update a club
app.put('/api/clubs/:id', (req, res) => {
    const existing = db.prepare('SELECT * FROM clubs WHERE id = ?')
        .get(req.params.id);

    if (!existing) {
        return res.status(404).json({ error: 'Club not found' });
    }

    const { name, category, description, president, email, meeting_day } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            error: 'Club name and category are required'
        });
    }

    db.prepare(`
        UPDATE clubs
        SET name = ?, category = ?, description = ?, president = ?,
            email = ?, meeting_day = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(name, category, description || '', president || '',
           email || '', meeting_day || '', req.params.id);

    const updated = db.prepare('SELECT * FROM clubs WHERE id = ?')
        .get(req.params.id);

    res.json(updated);
});

// DELETE: Delete a club
app.delete('/api/clubs/:id', (req, res) => {
    const result = db.prepare('DELETE FROM clubs WHERE id = ?')
        .run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Club not found' });
    }

    res.json({ message: 'Club deleted successfully' });
});

// Serve our frontend later
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Start the server
app.listen(PORT, () => {
    console.log(`Campus Club API running at http://localhost:${PORT}`);
});