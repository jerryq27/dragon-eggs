import React from 'react';
import {
    AppBar,
    Button,
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
    }
}));

type HeaderProps = {}

function Header(props: HeaderProps) {
    const classes = useStyles();

    return (
        <AppBar className={classes.header} position='static' color='primary'>
            <Toolbar>
                <Typography className={classes.title} variant='h5'>
                    Dragon Eggs
                </Typography>
                <Button variant='contained'>
                    Connect Wallet
                    <WalletIcon style={{ paddingLeft: 5 }} />
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;