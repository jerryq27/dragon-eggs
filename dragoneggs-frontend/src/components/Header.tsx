import React, { useState } from 'react';
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
    connected: {
        color: 'green',
        '&:hover': {
            color: 'red'
        },
    },
    disconnected: {

    }
}));

type HeaderProps = {
    wallet: string,
    isConnected: boolean,
    onClick: () => void,
};

function Header(props: HeaderProps) {

    let [label, setLabel] = useState('Connect Wallet');
    const classes = useStyles();

    const determineButtonLabel = (isHovering: boolean) => {
        if (props.isConnected && isHovering) {
            setLabel('Disconnect');
        }
        else {
            setLabel('Connected');
        }
    };

    const determineButton = () => {
        if (props.isConnected) {
            return (
                <Button
                    className={classes.connected}
                    variant='contained'
                    onMouseEnter={() => determineButtonLabel(true)}
                    onMouseLeave={() => determineButtonLabel(false)}>
                    {label}
                    <WalletIcon style={{ paddingLeft: 5 }} />
                </Button>
            );
        }
        else {
            return (
                <Button
                    className={classes.disconnected}
                    variant='contained'
                    onClick={() => {
                        props.onClick();
                        determineButtonLabel(false);
                    }}>
                    Connect Wallet
                    <WalletIcon style={{ paddingLeft: 5 }} />
                </Button>
            );
        }
    }

    return (
        <AppBar className={classes.header} position='static' color='primary'>
            <Toolbar>
                <Typography className={classes.title} variant='h5'>
                    Dragon Eggs
                </Typography>
                {determineButton()}
            </Toolbar>
        </AppBar>
    );
}

export default Header;