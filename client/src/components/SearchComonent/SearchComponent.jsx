import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// const CONTACTS = [{
//     id: 1,
//     name: 'Apple',
//     phoneNumber: 'IOS',
//     image: 'https://cdn.worldvectorlogo.com/logos/apple.svg'
// }, {
//     id: 2,
//     name: 'Google',
//     phoneNumber: 'Android',
//     image: 'https://cdn.worldvectorlogo.com/logos/android.svg'
// }, {
//     id: 3,
//     name: 'Microsoft',
//     phoneNumber: 'Windows mobile',
//     image: 'https://cdn.worldvectorlogo.com/logos/windows.svg'
// }, {
//     id: 4,
//     name: 'Blackberry',
//     phoneNumber: 'Blackberry OS',
//     image: 'https://cdn.worldvectorlogo.com/logos/bbm-blackberry-messenger.svg'
// }];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                id="outlined-full-width"
                label="Find User"
                style={{ margin: 10 }}
                placeholder="@"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onFocus = {((event) => {event.target.value = '@'})}
                onChange = {((event) => {console.log(event.target.value)})}
            />
        </div>
    );
}
