import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';
import BlankEgg from '../img/question-egg.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
    body: {
        margin: 10,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
    },
    egg: {
        width: '45%',
        height: '75%',
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
    },
    debug: {
        border: '2px solid red',
    }
}));

type BodyProps = {
    onClick: () => void,
}

function Body(props: BodyProps) {

    const classes = useStyles();

    return (
        <Grid container justifyContent="center">
            <Card className={classes.body}>
                <CardContent className={classes.content}>
                    <CardMedia
                        src={BlankEgg}
                        title='Dragon Egg'
                        className={classes.egg}
                        component='img' />
                </CardContent>

                <CardActions className={classes.controls}>
                    <Button
                        onClick={() => props.onClick()}
                        variant='outlined'
                        color='primary'>
                        Mint Egg
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Body;