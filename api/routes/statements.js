const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

router.post('/', async (req, res, next) => {

    try {
        const { account_ID } = req.body;

        const getStatements = await pool.query("SELECT * FROM transaction WHERE sender_ID = ($1)", [account_ID]);

        if (getStatements.rows.length !== 0) {
            res.send(
                {
                    statements: getStatements
                }
            );
        } else {
            res.status(500).send(
                {
                    status: 'error'
                }
            );
            pool.end();
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "Connection Error"
        });
    }
});

module.exports = router;
