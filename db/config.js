require('dotenv').config();
const sql = require('mssql');

const dbSettings = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'), // Ensure port is an integer
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false // Required for Azure
  }
};

/**
 * Creates and returns a connection pool to the SQL Server database.
 * Handles connection errors and logs messages to the console.
 * @returns {Promise<sql.ConnectionPool>} A promise that resolves with the connection pool.
 */
const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    console.log('Database connection successful.');
    return pool;
  } catch (error) {
    console.error('Database connection error:', error);
    // Depending on your error handling strategy, you might want to:
    // - Throw the error to be caught by the caller
    // - Exit the process
    // - Implement retry logic
    throw error; // Re-throwing the error for now
  }
};

module.exports = {
  getConnection,
  sql // Export the mssql library itself for convenience
};