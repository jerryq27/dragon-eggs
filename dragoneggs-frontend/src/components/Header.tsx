import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    header: {},
}));

type HeaderProps = {
    // css: string
}

function Header(props: HeaderProps) {
    const classes = useStyles();

    return (
        <AppBar className={classes.header} position='static' color='primary'>
            <Toolbar>
                <Typography variant='h5' color='inherit'>
                    Dragon Eggs
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;