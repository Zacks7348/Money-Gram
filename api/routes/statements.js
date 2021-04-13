const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

router.post('/', async(req, res, next) => {

    try {
        const { account_ID } = req.body;

        const getStatements = await pool.query("SELECT * FROM transaction ts INNER JOIN moneygram_account acc ON ts.sender_ID = acc.account_ID WHERE sender_ID = ($1)", [account_ID]);

        const pushRecieverId = new Promise((resolve, reject) => {
            let params = [];
            let values = []
            for (var i = 1; i <= getStatements.rows.length; i++) {
                params.push('$' + i);
                values.push(getStatements.rows[i - 1].reciever_id)
            }

            resolve({
                params,
                values
            })
        });

        const { params, values } = await pushRecieverId;


        const getReceivers = await pool.query('SELECT fname, lname, username FROM moneygram_account WHERE account_ID IN (' + params.join(',') + ')', values);

        const getStatusDef = await pool.query('SELECT * FROM status_enum');


        const pushUsername = new Promise((resolve, reject) => {

            for (var i = 0; i < getStatements.rows.length; i++) {
                getStatements.rows[i][`reciever_username`] = getReceivers.rows[i].username;
                getStatements.rows[i][`reciever_fname`] = getReceivers.rows[i].fname;
                getStatements.rows[i][`reciever_lname`] = getReceivers.rows[i].lname;
            }

            resolve({
                statements: getStatements
            })

        });


        const { statements } = await pushUsername;


        const assignStatus = new Promise((resolve, reject) => {

            for (var i = 0; i < statements.rows.length; i++) {

                if (statements.rows[i].status_id === 0) {
                    statements.rows[i][`status_description`] = getStatusDef.rows[0].description;
                }

                if (statements.rows[i].status_id === 1) {
                    statements.rows[i][`status_description`] = getStatusDef.rows[1].description;
                }

                if (statements.rows[i].status_id === 2) {
                    statements.rows[i][`status_description`] = getStatusDef.rows[2].description;
                }

                if (statements.rows[i].status_id === 3) {
                    statements.rows[i][`status_description`] = getStatusDef.rows[3].description;
                }

            }

            resolve({
                final_statements: statements
            })

        });

        const { final_statements } = await assignStatus;

        if (getStatements.rows.length !== 0) {
            res.send({
                statements: final_statements
            });
        } else {
            res.status(500).send({
                status: 'error'
            });
            pool.end();
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "Connection Error"
        });
    }
});


router.get('/all', async(req, res, next) => {

    try {

        const getStatements = await pool.query("SELECT * FROM transaction ts INNER JOIN moneygram_account acc ON ts.sender_ID = acc.account_ID");

        const pushRecieverId = new Promise((resolve, reject) => {
            let params = [];
            let values = []
            for (var i = 1; i <= getStatements.rows.length; i++) {
                params.push('$' + i);
                values.push(getStatements.rows[i - 1].reciever_id)
            }

            resolve({
                params,
                values
            })
        });

        const { params, values } = await pushRecieverId;


        const getReceivers = await pool.query('SELECT fname, lname, username FROM moneygram_account WHERE account_ID IN (' + params.join(',') + ')', values);

        console.log(getReceivers);


        const pushUsername = new Promise((resolve, reject) => {

            for (var i = 0; i < getStatements.rows.length; i++) {
                if (getReceivers.rows[i] !== undefined) {

                    getStatements.rows[i][`reciever_username`] = getReceivers.rows[i].username;
                    getStatements.rows[i][`reciever_fname`] = getReceivers.rows[i].fname;
                    getStatements.rows[i][`reciever_lname`] = getReceivers.rows[i].lname;
                }
            }

            resolve({
                statements: getStatements
            })

        });

        const { statements } = await pushUsername;

        if (getStatements.rows.length !== 0) {
            res.send({
                statements
            });
        } else {
            res.status(500).send({
                status: 'error'
            });
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