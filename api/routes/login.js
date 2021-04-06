const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../DB/db');


router.post('/', async (req, res, next) => {

    const { username, password } = req.body;

    let response = await pool.query("SELECT account_ID, username, password FROM moneygram_account WHERE username = ($1) OR email = ($1)", [username]);

    let user = {
        user_id: '',
        username: ''
    };

    //Cant find user
    if (response.rows.length === 0) {
        return res.status(400).send(
            {
                auth: false,
                user: null,
                error: "User does not exist"
            }
        );
    } else {
        user = {
            user_id: response.rows[0].account_id,
            username: response.rows[0].username
        }
    }

    try {
        const match = await bcrypt.compare(password, response.rows[0].password);

        if (match) {
            res.send({
                auth: match,
                user,
                error: ""
            });

        } else {
            res.send({
                auth: match,
                user,
                error: "Incorrect username or password"
            });
        }

    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;