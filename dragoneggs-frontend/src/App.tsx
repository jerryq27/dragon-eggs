import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from './components/Header';
import Body from './components/Body';

// const useStyles = makeStyles({
//     app: {},
//     header: {},
//     body: {
//         padding: 50,
//     }
// })

const useStyles = makeStyles((theme: Theme) => createStyles({
    app: {},
    header: {},
    body: {
        maxWidth: '75%',
        margin: 'auto 0 auto',
        marginTop: '25%',
        textAlign: 'center'
    }
}));

function App() {
    // [<name of state>, <function to alter state>] = useState(<initialState>)
    const [name, setName] = useState('example');
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <Header css={classes.header} />
            <Body css={classes.body} onClick={() => setName('Jerry')} />
            <span>
                {name}
            </span>
        </div>
    );
}

export default App;