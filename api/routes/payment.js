const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

router.post('/', async(req, res, next) => {
    try {
        const { card_number, name_on_card, cvc, exp_date, account_ID } = req.body;

        pool.connect();

        const checkPaymentExists = await pool.query("SELECT account_ID FROM payment_method WHERE account_ID = ($1)", [account_ID]);

        if (checkPaymentExists.rows.length === 0) {

            const payment = await pool.query("INSERT INTO payment_method (card_number, cvc,  name_on_card, exp_date, account_ID) VALUES ($1, $2, $3, $4, $5)", [card_number, cvc, name_on_card, exp_date, account_ID]);

            if (payment) {
                res.send({
                    status: 'success'
                });
            } else {
                res.status(500).send({
                    status: 'error'
                });

                pool.end();
            }
        } else {

            const payment = await pool.query("UPDATE payment_method SET card_number = ($1), name_on_card= ($2), exp_date = ($3), cvc = ($4) WHERE account_ID = ($5)", [card_number, name_on_card, exp_date, cvc, account_ID]);

            if (payment) {
                res.send({
                    status: 'success'
                });
            } else {
                res.status(500).send({
                    status: 'error'
                });

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


router.post('/info', async(req, res, next) => {

    const { account_ID } = req.body;

    if (account_ID !== "") {
        try {
            const paymentInfo = await pool.query("SELECT card_number, name_on_card, exp_date, cvc FROM payment_method WHERE account_ID = ($1)", [account_ID]);

            if (paymentInfo.rows.length > 0) {

                res.send({
                    cvc: paymentInfo.rows[0].cvc,
                    expiry: paymentInfo.rows[0].exp_date,
                    name: paymentInfo.rows[0].name_on_card,
                    number: paymentInfo.rows[0].card_number
                });
            }

        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "Connection Error"
            });
        }
    }

});

router.post('/add-funds', async(req, res, next) => {

    const { account_ID, amount } = req.body;

    if (account_ID !== "" && amount !== "") {
        try {

            let getBalance = await pool.query("SELECT balance from moneygram_account WHERE account_ID = ($1)", [account_ID]);
            let parsedAmount = parseFloat(amount.replace(/\$|,/g, ''));

            if (getBalance.rows.length > 0) {

                let parsedBalance = parseFloat(getBalance.rows[0].balance);

                if (parsedAmount > -1) {
                    let updatedAmount = parsedBalance + parsedAmount;

                    const updated = await pool.query("UPDATE moneygram_account SET balance = ($1) WHERE account_ID = ($2)", [updatedAmount, account_ID]);
                    getBalance = await pool.query("SELECT balance from moneygram_account WHERE account_ID = ($1)", [account_ID]);

                    if (updated.rowCount === 1) {
                        res.send({
                            status: 'success',
                            balance: getBalance.rows[0].balance
                        })
                    } else {
                        res.send({
                            status: 'fail'
                        })
                    }
                }
            }

        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "Connection Error"
            });
        }
    }

});


module.exports = router;