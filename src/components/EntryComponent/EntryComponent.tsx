import React from 'react';
import styles from './EntryComponent.module.css';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid"

type EntryComponentProps = {
    submitHandler : any,
    playerNameRef : any
}

const EntryComponent: React.FC<EntryComponentProps> = ({submitHandler, playerNameRef}) => (
    <form onSubmit={submitHandler}>
        <Box mx="auto" className={styles.EntryComponent}>
            <Paper elevation={2}>
                <Box p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2>Join The Game!</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth id="username" label="Username" inputRef={playerNameRef}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={"submit"} fullWidth variant="contained" color="primary">Play!</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    </form>
);


export default EntryComponent;
