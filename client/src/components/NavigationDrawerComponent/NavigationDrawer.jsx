import React  from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import OpacityOutlinedIcon from '@material-ui/icons/OpacityOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import Profile from '../ProfileComponent/ProfileComponent';

const useStyles = makeStyles({
    list: {
        width: 300,
    },
    fullList: {
        width: 'auto',
    },
    floatRight: {
        float: 'right',
    }
});


export default function NavigationDrawer({handleSignout}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Profile/>

            <List>
                {['Search', 'Notifications', 'Incomplete', 'Statements', 'Settings', 'Help', 'Log out'].map((text, index) => {
                    if (index === 0) {
                        return (
                            <ListItem button key={text}>
                                {
                                    <ListItemIcon><SearchIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    } else if (index === 1) {
                        return (
                            <ListItem button key={text}>
                                {
                                    <ListItemIcon><NotificationsActiveIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    } else if (index === 2) {
                        return (
                            <ListItem button key={text}>
                                {
                                    <ListItemIcon><OpacityOutlinedIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    } else if (index === 3) {
                        return (
                            <ListItem button key={text}>
                                {
                                    <ListItemIcon><ReceiptOutlinedIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    } else if (index === 4) {
                        return (
                            <ListItem button key={text}>
                                {
                                    <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    } else if (index === 5) {
                        return (
                            <ListItem button key={text}>
                                {
                                    <ListItemIcon><ContactSupportOutlinedIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    } else {
                        return (
                            <ListItem button key={text} onClick={handleSignout}>
                                {
                                    <ListItemIcon><PowerSettingsNewOutlinedIcon /></ListItemIcon>
                                }
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    }

                })}
            </List>
        </div>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div className={classes.floatRight}>
                        <Button classes={classes.root} onClick={toggleDrawer(anchor, true)} startIcon={
                            <MenuOutlinedIcon style={{ fontSize: 30, marginRight: 0, marginLeft: 10 }} />
                        }></Button>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

