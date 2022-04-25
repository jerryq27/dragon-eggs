import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core';
import Header from './components/Header';
import Body from './components/Body';
import { ethers } from 'ethers';

type AppProps = {};

class App extends React.Component {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            wallet: '',
            balance: null,
            isConnected: false,
        };
    }

    connectWallet = async () => {
        try {
            console.log('Connecting...');
            const [accountWallet] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const accountBalance = await provider.getBalance(accountWallet);

            console.log(`${accountWallet} -> ${accountBalance}`);
            this.setState({
                wallet: accountWallet,
                balance: accountBalance,
                isConnected: true,
            });
        }
        catch (error) {
            console.log((error as any).message);
        }
        console.log(this.state);
    }

    mintEgg() {
        console.log('Minting egg..');
    }

    render() {
        // [<name of state>, <function to alter state>] = useState(<initialState>)
        // const [name, setName] = useState('example');

        if ((window as any).ethereum) {
            return (
                <div style={{ alignItems: 'center' }}>
                    <Header
                        wallet={(this as any).state.wallet}
                        isConnected={(this as any).state.isConnected}
                        onClick={this.connectWallet} />
                    <Body onClick={this.mintEgg} />
                </div>
            );
        }
        else {
            return (
                <Card style={{ maxWidth: '40%', margin: '0 auto' }}>
                    <CardContent style={{ textAlign: 'center' }}>
                        <Typography>No wallet detected.</Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <a href='https://metamask.io/download.html'>
                            <Button variant='outlined'>Install Metamask</Button>
                        </a>
                    </CardActions>
                </Card>
            )
        }
    }
}

export default App;