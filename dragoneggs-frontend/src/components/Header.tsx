import React, { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
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

type HeaderProps = {
    onClick: () => void,
};

function Header(props: HeaderProps) {
    const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState(0);

    const classes = useStyles();

    const connectWallet = async () => {
        try {
            console.log('Connecting...');
            const [accountWallet] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            setWallet(accountWallet);

            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const accountBalance = await provider.getBalance(accountWallet);
            setBalance(Number(accountBalance));
        }
        catch (error) {
            console.log((error as any).message);
        }
    }

    return (
        <AppBar className={classes.header} position='static' color='primary'>
            <Toolbar>
                <Typography className={classes.title} variant='h5'>
                    Dragon Eggs
                </Typography>
                <Button variant='contained' onClick={() => connectWallet()}>
                    {wallet ? wallet : 'Connect Wallet'}
                    <WalletIcon style={{ paddingLeft: 5 }} />
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;