import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from './components/Header';
import Body from './components/Body';

const useStyles = makeStyles((theme: Theme) => createStyles({
    app: {
        alignItems: 'center',
        // justifyContent: 'center',
    },
}));

function App() {
    // [<name of state>, <function to alter state>] = useState(<initialState>)
    const [name, setName] = useState('example');
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <Header />
            <Body onClick={() => setName('Jerry')} />
            <span>
                {name}
            </span>
        </div>
    );
}

export default App;