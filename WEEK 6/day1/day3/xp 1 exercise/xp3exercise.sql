-- ============================================================
-- Exercise 1: DVD Rentals - Family & Kids Movies
-- ============================================================

-- ============================================================
-- QUESTION 1: Retrieve all G or PG films NOT currently rented
-- ============================================================

-- Films with rating G or PG that are available (not currently rented out)
SELECT DISTINCT
    f.film_id,
    f.title,
    f.description,
    f.rating,
    f.rental_rate,
    f.length
FROM film f
WHERE f.rating IN ('G', 'PG')
  AND f.film_id NOT IN (
      -- Subquery: films currently rented out (return_date IS NULL)
      SELECT i.film_id
      FROM rental r
      INNER JOIN inventory i ON r.inventory_id = i.inventory_id
      WHERE r.return_date IS NULL
  )
ORDER BY f.title;

-- Alternative using NOT EXISTS (often more efficient)
SELECT
    f.film_id,
    f.title,
    f.description,
    f.rating,
    f.rental_rate,
    f.length
FROM film f
WHERE f.rating IN ('G', 'PG')
  AND NOT EXISTS (
      SELECT 1
      FROM rental r
      INNER JOIN inventory i ON r.inventory_id = i.inventory_id
      WHERE i.film_id = f.film_id
        AND r.return_date IS NULL
  )
ORDER BY f.title;


-- ============================================================
-- QUESTION 2: Create Waiting List Table
-- ============================================================

-- Waiting list for children's movies (G/PG rated)
-- References: film (which movie), customer (which child/parent)
CREATE TABLE children_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    film_id INT NOT NULL REFERENCES film(film_id) ON DELETE CASCADE,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'waiting',  -- 'waiting', 'notified', 'fulfilled'
    
    -- Prevent duplicate entries for same customer + film
    UNIQUE(customer_id, film_id)
);

-- Add index for faster lookups
CREATE INDEX idx_waiting_film ON children_waiting_list(film_id);
CREATE INDEX idx_waiting_customer ON children_waiting_list(customer_id);


-- ============================================================
-- QUESTION 3: Number of people waiting for each children's DVD
-- ============================================================

-- Add some test data to the waiting list
INSERT INTO children_waiting_list (customer_id, film_id) VALUES
(1, (SELECT film_id FROM film WHERE title = 'Academy Dinosaur')),      -- G rated
(2, (SELECT film_id FROM film WHERE title = 'Academy Dinosaur')),
(3, (SELECT film_id FROM film WHERE title = 'Academy Dinosaur')),
(1, (SELECT film_id FROM film WHERE title = 'Ace Goldfinger')),        -- G rated
(4, (SELECT film_id FROM film WHERE title = 'Ace Goldfinger')),
(5, (SELECT film_id FROM film WHERE title = 'Adaptation Holes')),      -- PG rated
(2, (SELECT film_id FROM film WHERE title = 'Adaptation Holes')),
(3, (SELECT film_id FROM film WHERE title = 'Adaptation Holes')),
(6, (SELECT film_id FROM film WHERE title = 'Adaptation Holes'));

-- Count people waiting for each children's DVD
SELECT
    f.film_id,
    f.title,
    f.rating,
    COUNT(cwl.waiting_id) AS people_waiting
FROM film f
LEFT JOIN children_waiting_list cwl ON f.film_id = cwl.film_id
    AND cwl.status = 'waiting'
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
HAVING COUNT(cwl.waiting_id) > 0  -- Only show films with people waiting
ORDER BY people_waiting DESC, f.title;

-- Alternative: Show ALL G/PG films with waiting count (including 0)
SELECT
    f.film_id,
    f.title,
    f.rating,
    COUNT(cwl.waiting_id) AS people_waiting
FROM film f
LEFT JOIN children_waiting_list cwl 
    ON f.film_id = cwl.film_id 
    AND cwl.status = 'waiting'
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
ORDER BY people_waiting DESC, f.title;


-- ============================================================
-- BONUS: Useful Views & Queries
-- ============================================================

-- View: Available children's films (G/PG, not rented out)
CREATE OR REPLACE VIEW available_children_films AS
SELECT
    f.film_id,
    f.title,
    f.description,
    f.rating,
    f.rental_rate,
    i.inventory_id,
    s.store_id
FROM film f
INNER JOIN inventory i ON f.film_id = i.film_id
INNER JOIN store s ON i.store_id = s.store_id
WHERE f.rating IN ('G', 'PG')
  AND i.inventory_id NOT IN (
      SELECT r.inventory_id
      FROM rental r
      WHERE r.return_date IS NULL
  );

-- Check waiting list with customer details
SELECT
    cwl.waiting_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.email,
    f.title AS movie_title,
    f.rating,
    cwl.added_date,
    cwl.status
FROM children_waiting_list cwl
INNER JOIN customer c ON cwl.customer_id = c.customer_id
INNER JOIN film f ON cwl.film_id = f.film_id
WHERE cwl.status = 'waiting'
ORDER BY cwl.added_date;

-- Remove from waiting list when DVD is taken (Python would call this)
-- DELETE FROM children_waiting_list WHERE waiting_id = ?;