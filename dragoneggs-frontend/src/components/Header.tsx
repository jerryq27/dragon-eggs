import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';

type HeaderProps = {
    css: string
}
function Header(props: HeaderProps) {
    const { css } = props;

    return (
        <AppBar position='static' color='primary'>
            <Toolbar>
                <Typography variant='h5' color='inherit'>
                    Dragon Eggs
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;