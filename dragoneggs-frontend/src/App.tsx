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
import { ethers, providers } from 'ethers';

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

    checkNetwork = async () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const network = await provider.getNetwork();

        return (network.name !== 'homestead' || network.chainId !== 1);
    }

    connectWallet = async () => {
        const isTestNetwork = await this.checkNetwork();

        if (isTestNetwork) {
            try {
                console.log('Connecting..');
                const provider = new ethers.providers.Web3Provider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);

                const signer = provider.getSigner();
                const accountWallet = await signer.getAddress();
                const accountBalance = await signer.getBalance();

                console.log(`${accountWallet} -> ${accountBalance}`);
                this.setState({
                    wallet: accountWallet,
                    balance: ethers.utils.formatEther(accountBalance),
                    isConnected: true,
                });
            }
            catch (error) {
                console.log((error as any).message);
            }
            console.log(this.state);
        }
        else {
            alert('To use this dapp, please switch to a test network.');
        }
    }

    diconnectWallet = async () => {
        console.log('Disconnecting..')
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