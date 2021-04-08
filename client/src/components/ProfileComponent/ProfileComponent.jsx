import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';


// Recoil State
import { useRecoilValue } from 'recoil';
import { responseUserIDState } from '../../Store/Atoms';

// Material UI components
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 18,
    },
    green: {
        color: '#66BB6A',
    },
    deepGreen: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
      },
    large: {
        width: 80,
        height: 80,
    },
}));


export default function Profile() {
    const classes = useStyles();
    const responseUserID = useRecoilValue(responseUserIDState);

    const [data, setData] = useState([{}]);

    const fetchProfile = () => {
        axios.post(`http://localhost:4000/users/profile`, {
            account_ID: responseUserID
        }).then(({ data }) => {
            setData(data.user[0]);
        })
    }

    useEffect(() => {
        fetchProfile();
        return () => {
            setData({});
        }
    }, [])

    return (
        <Card className={classes.root}>
            {data.profile_url !== null ? <CardHeader
                avatar={<Avatar alt={data.fname} src={data.profile_ur} className={classes.large} />}
                title={<Typography className={classes.title} color="textPrimary"><strong className={classes.green}>HI!</strong> {data.fname}</Typography>}
                subheader={"@" + data.username}
            /> : <CardHeader
                avatar={<Avatar alt={data.fname} className={[classes.large, classes.deepGreen]}> {data.fname[0] + data.lname[0]} </Avatar> }
                title={<Typography className={classes.title} color="textPrimary"><strong className={classes.green}>HI!</strong> {data.fname}</Typography>}
                subheader={"@" + data.username}
            />}
            <CardContent>
                <Typography variant="h5" component="h2">$ {data.balance} <Typography className={classes.pos} color="textSecondary">Avaliable Balance</Typography></Typography>
            </CardContent>
        </Card>
    );
}