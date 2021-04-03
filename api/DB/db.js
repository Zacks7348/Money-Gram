const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'moneygram',
    password: '$moneygram7',
    database: 'moneygram',
    host: '96.30.198.109',
    port: 5432
});

module.exports = pool;