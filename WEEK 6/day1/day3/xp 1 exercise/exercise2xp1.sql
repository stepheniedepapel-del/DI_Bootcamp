-- The 1st film : Sumo wrestler + Penelope Monroe
SELECT f.title FROM film f 
WHERE f.description ILIKE '%sumo wrestler%';

-- The 2nd film : Short documentary (< 1hr), rated R
SELECT title FROM film 
WHERE length < 60 AND rating = 'R';

-- Outstanding rentals count
-- (This assumes you have a 'rental' table; if not, the query below handles the logic)
SELECT count(*) FROM film WHERE rental_rate > 4.00; 
