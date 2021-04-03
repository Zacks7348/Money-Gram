import { green } from '@material-ui/core/colors';

export const loginStyle = (theme) => {
    return {
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.success.main
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: "#333",
            "&:hover": {
                backgroundColor: theme.palette.success.main,
            }
        }
    };
};

export const checkStyle = {
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
};