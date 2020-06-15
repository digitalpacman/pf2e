const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    min: 19,
    max: 19,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
});

module.exports = pool;
