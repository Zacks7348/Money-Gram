const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../DB/db');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {
  try {
    const { username, Fname, Mname, Lname, DOB, phone, password } = req.body;
    const formattedPhone = phone.replace(/\D+/g, '');
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    pool.connect();
    const user = await pool.query("INSERT INTO moneygram_user (user_ID, fname,mname,lname,dob,phone,username,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, Fname, Mname, Lname, DOB, formattedPhone, username, hashedPassword]);
    const account = await pool.query("INSERT INTO moneygram_account (account_ID) VALUES ($1)", [id]);

    const response = {
      user_id: id,
      username: username
    }

    if(user && account){
      res.send(
        {
          auth: true,
          username: response,
          error: ""
        }
      );
    } else {
      res.status(500).send(
        {
          auth: false,
          username: null,
          error: "Connection Error"
        }
      );

      pool.end();
    }

  } catch (e) {
    console.log(e);
    res.status(500).send({
      auth: false,
      username: null,
      error: "Connection Error"
    });
  }
});

module.exports = router;
