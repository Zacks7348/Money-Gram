const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

router.post('/', async (req, res, next) => {
    try {
        const { card_number, name_on_card, cvc, exp_date, account_ID } = req.body;

        pool.connect();

        console.log(account_ID);

        const checkPaymentExists = await pool.query("SELECT account_ID FROM payment_method WHERE account_ID = ($1)", [account_ID]);

        if (checkPaymentExists.rows.length === 0) {

            const payment = await pool.query("INSERT INTO payment_method (card_number, name_on_card, exp_date, account_ID) VALUES ($1, $2, $3, $4)", [card_number, name_on_card, 0122, account_ID]);

            if (payment) {
                res.send(
                    {
                        status: 'success'
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
        } else {

            
            const payment = await pool.query("UPDATE payment_method SET card_number = ($1), name_on_card= ($2), exp_date = ($3) WHERE account_ID = ($4)", [card_number, name_on_card, 0122, account_ID]);
            
            if (payment) {
                res.send(
                    {
                        status: 'success'
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
        }


    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "Connection Error"
        });
    }
});

module.exports = router;
