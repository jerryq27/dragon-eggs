import React, { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from './components/Header';
import Body from './components/Body';

const useStyles = makeStyles((theme: Theme) => createStyles({
    app: {
        alignItems: 'center',
    },
    nowallet: {
        maxWidth: '40%',
        margin: '0 auto',
    }
}));

function App() {
    // [<name of state>, <function to alter state>] = useState(<initialState>)
    // const [name, setName] = useState('example');
    const classes = useStyles();

    if ((window as any).ethereum) {
        return (
            <div className={classes.app}>
                <Header />
                <Body onClick={() => alert('Hello!')} />
            </div>
        );
    }
    else {
        return (
            <Card className={classes.nowallet}>
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

export default App;