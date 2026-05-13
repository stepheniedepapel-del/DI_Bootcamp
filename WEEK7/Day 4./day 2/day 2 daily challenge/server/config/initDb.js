import db from './db.js';

async function initializeDatabase() {
  try {
    console.log("Dropping existing tables if they exist...");
    await db.schema.dropTableIfExists('hashpwd');
    await db.schema.dropTableIfExists('users');

    console.log("Creating users table...");
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('username').unique();
      table.string('first_name');
      table.string('last_name');
    });

    console.log("Creating hashpwd table...");
    await db.schema.createTable('hashpwd', (table) => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('password');
    });

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await db.destroy();
  }
}

initializeDatabase();