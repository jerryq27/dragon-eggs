import React from "react";
import {
    Button,
    Card,
    CardActions,
} from '@material-ui/core';

type BodyProps = {
    onClick: () => void,
    css: string,
}

function Body(props: BodyProps) {
    const { css, onClick } = props;

    return (
        <div className={css}>
            <Card className={css}>
                <CardActions>
                    <Button
                        onClick={() => onClick()}
                        variant='outlined'
                        color='primary'>
                        Click Me!
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Body;