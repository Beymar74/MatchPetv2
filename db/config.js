require('dotenv').config();
const sql = require('mssql');

const dbSettings = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true // Añadido para mejorar la estabilidad
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 15000 // Tiempo máximo para obtener una conexión
  },
  connectionTimeout: 30000 // Tiempo máximo para la conexión inicial
};

let pool = null;

/**
 * Creates and returns a connection pool to the SQL Server database.
 * Handles connection errors and logs messages to the console.
 * @returns {Promise<sql.ConnectionPool>} A promise that resolves with the connection pool.
 */
const getConnection = async () => {
  if (pool && !pool.closed) {
    return pool; // Return existing pool if already created and not closed
  }
  
  try {
    console.log('Attempting to connect to the database...');
    pool = await new sql.ConnectionPool(dbSettings).connect();
    console.log('Database connection successful.');

    // Manejar errores en el pool de conexión
    pool.on('error', err => {
      console.error('Database pool error:', err);
      // No asignar automáticamente pool = null aquí para evitar
      // problemas con conexiones en uso, mejor usar closePool() cuando sea apropiado
    });

    return pool;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    pool = null;
    throw new Error(`Failed to connect to database: ${error.message}`);
  }
};

/**
 * Ejecuta una consulta simple para verificar la conexión
 * @returns {Promise<boolean>} true si la conexión está activa
 */
const testConnection = async () => {
  try {
    const connection = await getConnection();
    const result = await connection.request().query('SELECT 1 as connectionTest');
    return result && result.recordset && result.recordset[0].connectionTest === 1;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    return false;
  }
};

/**
 * Closes the connection pool gracefully.
 * @returns {Promise<void>}
 */
const closePool = async () => {
  if (pool) {
    try {
      await pool.close();
      console.log('Database pool closed successfully.');
      pool = null;
    } catch (error) {
      console.error('Error closing database pool:', error.message);
      // Forzar la eliminación de la referencia aunque haya un error al cerrar
      pool = null;
    }
  }
};

// Manejar señales del sistema para cerrar la conexión al terminar la aplicación
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});

module.exports = {
  getConnection,
  testConnection,
  closePool,
  sql
};