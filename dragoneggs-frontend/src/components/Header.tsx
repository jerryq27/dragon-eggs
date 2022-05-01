import React from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Toolbar,
    Typography,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';

const useStyles = makeStyles((theme: Theme) => createStyles({
    header: {},
    title: {
        flexGrow: 1,
    },
    connectedBtn: {

    },
    disconnectedBtn: {
        backgroundColor: 'green',
    },
    connectedTxt: {
        color: 'gray',
    },
    disconnectedTxt: {
        color: 'white',
    },
    progress: {
        color: 'white', // theme.palette.primary.main,
        position: 'absolute',
        top: '20%',
        left: '40%',
    },
}));

type HeaderProps = {
    wallet: string,
    isConnected: boolean,
    loading: boolean,
    onClick: () => void,
};

function Header(props: HeaderProps) {
    const classes = useStyles();

    const simpleButton = () => {
        return (
            <Button
                className={props.isConnected ? classes.connectedBtn : classes.disconnectedBtn}
                onClick={() => props.onClick()}
                disabled={props.isConnected || props.loading}
                variant='contained'
            >
                {props.loading ?
                    <CircularProgress className={classes.progress} size={24} /> : ''
                }
                <Typography className={props.isConnected ? classes.connectedTxt : classes.disconnectedTxt}>
                    {props.isConnected ? 'Connected' : 'Connect Wallet'}
                </Typography>
                <WalletIcon className={props.isConnected ? classes.connectedTxt : classes.disconnectedTxt} style={{ paddingLeft: 5 }} />
            </Button>
        );
    }

    return (
        <AppBar className={classes.header} position='static' color='primary'>
            <Toolbar>
                <Typography className={classes.title} variant='h5'>
                    Dragon Eggs
                </Typography>
                {simpleButton()}
            </Toolbar>
        </AppBar>
    );
}

export default Header;