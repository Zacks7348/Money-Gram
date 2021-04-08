import React, { useEffect, useState } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

    const [data, setData] = useState([{}]);
    const [searched, setSearched] = useState([{}]);


    const fetchUsers = () => {
        axios.get(`http://localhost:4000/search`).then(({ data }) => {
            setData(data.users.rows);
        })
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setSearched(data.filter((user) => filterUsers(user, event)));
    }

    const filterUsers = (user, event) => {
        return user.username.includes(event.target.value) || user.email.includes(event.target.value) || user.phone.includes(event.target.value)
    }

    useEffect(() => {
        fetchUsers();
        return () => {
            setData([{}]);
        };
    }, []);


    return (
        <>
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
                    onChange={(event) => { handleSearch(event) }}
                />
            </div>

            {
                searched.map((user) => {
                    return (
                        <h5 key={Math.random().toString(36).substr(2, 9)}>{user.username}</h5>
                    )
                })
            }
        </>
    );
}
