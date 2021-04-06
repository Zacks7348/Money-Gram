import React, { useState } from "react";
import axios from 'axios';
import Cards from "react-credit-cards";

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

// Style Components
import { creditCardStyle } from './CreditCardComponentStyle';

// Recoil
import {useRecoilValue} from 'recoil';
import {responseUserIDState} from '../../Store/Atoms'

// CSS
import "react-credit-cards/es/styles-compiled.css";

const useStyles = makeStyles((theme) => (creditCardStyle(theme)));

const CreditCard = () => {

    const classes = useStyles();

    const [data, setData] = useState({
        cvc: "",
        expiry: "",
        name: "",
        number: ""
    });

    const responseUserID = useRecoilValue(responseUserIDState);

    const handleInputChange = (e) => {

        if (e.target.name === 'number') {

            e.target.value = e.target.value.toString().slice(0, 16)

            setData({
                ...data,
                number: e.target.value
            });
        } else if (e.target.name === 'cvc') {
            e.target.value = e.target.value.toString().slice(0, 3)
            setData({
                ...data,
                cvc: e.target.value
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();


        if (data.name === "" && data.number === "" && data.cvc === "" && data.expiry === "") {
            alert("All fields must be filled out before submitting");
            return null;
        }
        if (data.name === "") {
            alert("Card name must be filled out before submitting");
            return null;
        }
        else if (data.number === "") {
            alert("Card number must be filled out before submitting");
            return null;
        }
        else if (data.cvc === "") {
            alert("CVC must be filled out before submitting");
            return null;
        }
        else if (data.expiry === "") {
            alert("Expiration date must be filled out before submitting");
            return null;
        } else {

            try {
                return await axios.post(`http://localhost:4000/payment`, {
                    card_number: data.number, 
                    name_on_card: data.name, 
                    cvc: data.cvc,
                    exp_date: data.expiry, 
                    account_ID: responseUserID
                }).catch(error => { 
                    console.log("Error fetching data");
                });
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Cards
                                cvc={data.cvc}
                                expiry={data.expiry}
                                focus={data.focus}
                                name={data.name}
                                number={data.number}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.input}
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                name="number"
                                placeholder="Card Number"
                                onChange={handleInputChange}
                                inputProps={{ maxLength: 16 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.input}
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                name="cvc"
                                placeholder="CVC"
                                onChange={handleInputChange}
                                inputProps={{ maxLength: 3 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="expiry"
                                placeholder="Expire Date"
                                onChange={handleInputChange}
                                inputProps={{ maxLength: 5 }}
                            />
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={e => handleSignUp(e)}>
                            Submit Card Information
                         </Button>

                    </Grid>
                </form>
            </div>

        </Container>

    );
};

export default CreditCard;




