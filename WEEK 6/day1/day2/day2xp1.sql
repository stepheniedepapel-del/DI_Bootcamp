-- ============================================================
-- DI_BOOTCAMP WEEK 5 - Exercise 1: Items and Customers
-- Includes SETUP + QUERIES
-- ============================================================

-- SETUP (run this first if tables don't exist)
CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- Only insert if tables are empty (avoid duplicates)
INSERT INTO items (item_name, price)
SELECT * FROM (VALUES ('Small Desk', 100), ('Large desk', 300), ('Fan', 80)) AS v(name, price)
WHERE NOT EXISTS (SELECT 1 FROM items);

INSERT INTO customers (first_name, last_name)
SELECT * FROM (VALUES ('Greg', 'Jones'), ('Sandra', 'Jones'), ('Scott', 'Scott'), ('Trevor', 'Green'), ('Melanie', 'Johnson')) AS v(first, last)
WHERE NOT EXISTS (SELECT 1 FROM customers);

-- EXERCISE QUERIES
SELECT * FROM items ORDER BY price ASC;
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;
SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;
SELECT last_name FROM customers ORDER BY last_name DESC;