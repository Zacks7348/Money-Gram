import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import CreditCard from '../CreditCardComponent/CreditCardComponent';

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

// Style Components
import { creditCardStyle } from '../CreditCardComponent/CreditCardComponentStyle';

// Recoil
import { useRecoilValue } from 'recoil';
import { responseUserIDState } from '../../Store/Atoms'


const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const useStyles = makeStyles((theme) => (creditCardStyle(theme)));


const CurrencyInput = ({ maskOptions, ...inputProps }) => {

  // Redirect
  const history = useHistory();

  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })

  const [data, setData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: ''
  });

  const [amount, setAmount] = useState('$0.00');

  const responseUserID = useRecoilValue(responseUserIDState);

  const classes = useStyles();

  const fetchCardInfo = () => {
    axios.post(`http://localhost:4000/payment/info`, {
      account_ID: responseUserID
    }).then(({ data }) => {
      setData(data);
    })
  }

  const handleAddFunds = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4000/payment/add-funds`, {
      account_ID: responseUserID,
      amount
    }).then(({ data }) => {
      if (data.status === "success") {
        alert(`Balance updated succesfully \n New Balance: $${data.balance}`);
        history.push('/home');
      } else {
        alert("Fund transfer was not succesful something went wrong");
      }
    })

  }

  useEffect(() => {
    fetchCardInfo();
    return () => {
      setData({});
    }
  }, [])


  return (

    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <h1>Add Funds Using This Payment Method</h1>
      {data.cvc !== undefined ? <CreditCard simple={true} card_data={data} /> : null}
      {data.cvc !== undefined ? <MaskedInput className="Currency-input" mask={currencyMask} {...inputProps} onChange={(e) => setAmount(e.target.value)} /> : <h1>Please Add a Payment Method</h1>}
      {data.cvc !== undefined ? <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(event) => handleAddFunds(event)}>
        Add Funds
      </Button> : null}
    </Container>

  )
}

export default CurrencyInput
