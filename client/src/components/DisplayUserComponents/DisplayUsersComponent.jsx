import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';

// Recoil
import { useRecoilValue } from 'recoil';
import { responseUserIDState } from '../../Store/Atoms'

const useStyles = makeStyles((theme) => ({
    scroll: {
        autoHeight: true
    },
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        '& > *': {
            margin: theme.spacing(1),
        },
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    paper: {
        height: 140,
        width: 100,
    },
    medium: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    top: {
        left: '65px',
        bottom: '10px',
        position: 'relative',
        color: '#66BB6A'
    },
    left: {
        right: '110px',
        position: 'relative',
    },
    user: {
        fontSize: '1.5vh',
        position: 'relative',
        left: '7px',
        fontFamily: "Roboto",
        fontWeight: '500',
        lineHeight: '1.6',
        letterSpacing: '0.0075em'
    }

}));

export default function DisplayUsers({ activeTab }) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const responseUserID = useRecoilValue(responseUserIDState);


    useEffect(() => {

        if (!activeTab || !responseUserID) {
            return;
        }

        if (activeTab === 'friends') {
            axios.post(`http://localhost:4000/statements`, {
                account_ID: responseUserID
            }).then(({ data }) => {
                setUsers(data.statements.rows);
            })
        } else if (activeTab === 'public') {
            axios.get(`http://localhost:4000/statements/all`).then(({ data }) => {
                setUsers(data.statements.rows.slice(-1 * 100));
            })
        }

    }, [])


    return (

        <Container maxWidth="sm" className={classes.scroll}>

            {activeTab === 'friends' ?

                users.map((users) => {
                    return (
                        <Paper elevation={3} className={classes.root} key={Math.random().toString(36).substr(2, 9)}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={3}>
                                    <Container maxWidth="sm">
                                        <Avatar className={classes.medium}>{users.reciever_fname[0] + users.reciever_lname[0]}</Avatar>
                                        <Typography className={classes.user}> {users.reciever_username} </Typography>
                                    </Container>
                                </Grid>
                                <Grid item xs={6}>
                                    <Container maxWidth="md">
                                        <Typography variant="h6" >Bail Money 🚓</Typography>
                                    </Container>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6" className={classes.top}> ${users.amount} </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                }) :

                users.map((users) => {
                    return (
                        <Paper elevation={3} className={classes.root} key={Math.random().toString(36).substr(2, 9)}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={3}>
                                    <Container maxWidth="sm">
                                        <Avatar className={classes.medium}>{users.fname[0] + users.lname[0]}</Avatar>
                                        <Typography className={classes.user}> {users.username} </Typography>
                                    </Container>
                                </Grid>
                                <Grid item xs={6}>
                                    <Container maxWidth="md">
                                        <Typography variant="h6" >Bail Money 🚓</Typography>
                                    </Container>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6" className={classes.top}> ${users.amount} </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })
            }
        </Container>
    );
}