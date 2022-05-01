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
                onClick={() => props.onClick()}
                disabled={props.isConnected}
                variant='contained'
                color='primary'
            >
                <Typography style={props.isConnected ? { color: 'gray' } : { color: 'white' }}>
                    {props.isConnected ? 'Connected' : 'Connect Wallet'}
                </Typography>
                <WalletIcon style={{ paddingLeft: 5 }} />
            </Button>
        );
    }
    console.log(props);

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