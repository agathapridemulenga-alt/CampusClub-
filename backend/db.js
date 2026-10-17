const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, 'campus_club.db'));

// Read and execute our database schema
const schema = fs.readFileSync(
    path.join(__dirname, 'schema.sql'),
    'utf8'
);

db.exec(schema);

// Create the table if it does not exist
db.exec(schema);

// Keep only the first 10 sample records
db.prepare('DELETE FROM clubs WHERE id > 10').run();

console.log('SQLite database connected successfully!');

const clubs = db.prepare('SELECT * FROM clubs').all();
console.log(`Number of clubs: ${clubs.length}`);

module.exports = db;