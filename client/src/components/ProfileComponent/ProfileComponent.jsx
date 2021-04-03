import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';


// Recoil State
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import { responseUserNameState } from '../../Store/Atoms';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 18,
    },
    green: {
        color: '#66BB6A',
    },
    large: {
        width: 80,
        height: 80,
    },
});


export default function Profile() {
    const classes = useStyles();
    const responseUserName = useRecoilValue(responseUserNameState);

    const getAccountBalance = () => {
        
    }
    
    useEffect(() => {

    },)
    
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar alt="Jonathan" src="https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/102307838_10216628556055508_6582034269021835304_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=nhTKrTl21osAX9Aw2Kr&_nc_ht=scontent.fmia1-1.fna&oh=a95afcb438431c32cdbb953beb27d977&oe=608643FE" className={classes.large} />}
                title={<Typography className={classes.title} color="textPrimary"><strong className={classes.green}>HI!</strong> {"Jonathan"}</Typography>}
                subheader={"@" + responseUserName}
            />
            <CardContent>
                <Typography variant="h5" component="h2">$ 0.00  <Typography className={classes.pos} color="textSecondary">Avaliable Balance</Typography></Typography>
            </CardContent>
        </Card>
    );
}