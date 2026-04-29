
CREATE TABLE IF NOT EXISTS actors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

INSERT INTO actors (first_name, last_name) VALUES 
('Keanu', 'Reeves'),
('Scarlett', 'Johansson'),
('Morgan', 'Freeman'),
('Tom', 'Hanks');


-- ==========================================
-- THE ACTUAL CHALLENGE
-- ==========================================

-- 1. Count how many actors are in the table.
SELECT COUNT(*) FROM actors;


-- 2. Try to add a new actor with some blank fields. 
INSERT INTO actors (first_name, last_name) 
VALUES ('Brad', NULL);

-- To prove it worked, let's fetch all the actors to see Brad's missing last name:
SELECT * FROM actors;