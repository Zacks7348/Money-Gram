const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

router.get('/', async (req, res, next) => {
    try {

        const getAllUsers = await pool.query("SELECT username, phone, email, profile_url FROM moneygram_account ");

        if (getAllUsers.rows.length !== 0) {
            res.send(
                {
                    users: getAllUsers
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
