CREATE TABLE IF NOT EXISTS clubs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    president TEXT,
    email TEXT,
    meeting_day TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clubs (name, category, description, president, email, meeting_day)
VALUES
('Computer Science Club', 'Academic', 'Technology and programming activities', 'John Banda', 'csclub@example.com', 'Monday'),
('Drama Club', 'Arts', 'Drama and theatre performances', 'Mary Phiri', 'drama@example.com', 'Tuesday'),
('Debate Club', 'Academic', 'Debates and public speaking', 'Peter Zulu', 'debate@example.com', 'Wednesday'),
('Environmental Club', 'Environmental', 'Environmental protection and cleanups', 'Grace Tembo', 'green@example.com', 'Thursday'),
('Business Club', 'Professional', 'Entrepreneurship and business skills', 'James Chanda', 'business@example.com', 'Friday'),
('Music Club', 'Arts', 'Music practice and performances', 'Ruth Mwila', 'music@example.com', 'Monday'),
('Sports Club', 'Sports', 'Campus sports activities', 'David Phiri', 'sports@example.com', 'Tuesday'),
('Robotics Club', 'Technology', 'Robotics and electronics projects', 'Sarah Banda', 'robotics@example.com', 'Wednesday'),
('Photography Club', 'Arts', 'Photography and visual storytelling', 'Michael Zulu', 'photo@example.com', 'Thursday'),
('Entrepreneurship Club', 'Professional', 'Student business ideas and innovation', 'Esther Chileshe', 'startup@example.com', 'Friday');