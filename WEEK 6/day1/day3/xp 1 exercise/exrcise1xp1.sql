-- Create the base language table
CREATE TABLE IF NOT EXISTS language (
    language_id SERIAL PRIMARY KEY,
    name CHARACTER(20) NOT NULL,
    last_update TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

-- Create the base film table
CREATE TABLE IF NOT EXISTS film (
    film_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_year INTEGER,
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    rental_duration SMALLINT DEFAULT 3 NOT NULL,
    rental_rate NUMERIC(4,2) DEFAULT 4.99 NOT NULL,
    length SMALLINT,
    replacement_cost NUMERIC(5,2) DEFAULT 19.99 NOT NULL,
    rating VARCHAR(10) DEFAULT 'G'
);

-- Insert sample Languages
INSERT INTO language (name) VALUES ('English'), ('Italian'), ('Japanese'), ('Mandarin'), ('French'), ('German')
ON CONFLICT DO NOTHING;

-- Insert sample Films
INSERT INTO film (title, description, language_id, length, rental_rate, replacement_cost, rating) 
VALUES 
('ACADEMY DINOSAUR', 'A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies', 1, 86, 0.99, 20.99, 'PG'),
('ACE GOLDFINGER', 'A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China', 1, 48, 4.99, 12.99, 'G'),
('SUMO CONFESSIONS', 'A film about a sumo wrestler featuring Penelope Monroe', 1, 90, 4.99, 25.00, 'R'),
('MODERN DOCUMENTARY', 'A short documentary less than 1 hour', 1, 50, 2.99, 15.00, 'R')
ON CONFLICT DO NOTHING;
