import React, {createRef, useEffect, useRef, useState} from 'react';
import './App.css';

import axios from "axios";
// Material UI Components
import Container from "@material-ui/core/Container";
import ScoreTable from "./components/ScoreTable/ScoreTable";
import EntryComponent from "./components/EntryComponent/EntryComponent";
import {IPlayer} from "./models/player";
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert, {AlertProps, Color} from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<IPlayer>()
    const[topPlayer, setTopPlayer] = useState<IPlayer>()
    const[worstPlayer, setWorstPlayer] = useState<IPlayer>()
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState<Color>("warning")
    const [errorMessage, setErrorMessage] = React.useState("Something went wrong")


    const [formData, updateFormData] = useState('');

    const playerNameRef = useRef<HTMLInputElement>(null)

    const addPlayer = async(username : string) => {
        try {
            const result = await axios.post('/players', null,{
                params: {
                    username : username
                }
            })
            setCurrentPlayer(result.data)
            setErrorMessage( `Hi ${result.data.username}, you got ${result.data.score} points.`)
            setSeverity('success')
            setOpen(true)
            getPlayers()
        } catch(err) {
            if(err.response.data.errorMessage) {
                setErrorMessage(err.response.data.errorMessage)
            } else {
                setSeverity("error")
                setErrorMessage("Something went wrong.")
            }
            if(err.response.status === 409 || err.response.status === 400) {
                setSeverity("warning")
            } else {
                setSeverity("error")
            }
            setOpen(true)
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getPlayers = async() => {
        try {
            const result = await axios("/players");
            const sorted = result.data.sort((a : IPlayer, b : IPlayer) => a.score - b.score)
            if(sorted.length > 0) {
                setWorstPlayer(sorted[0]);
                setTopPlayer(sorted[sorted.length - 1]);
            }
            if(currentPlayer != null) {

            }
            setPlayers(result.data)
        } catch(err) {
            alert("Error!")
        }
        return players
    }


    useEffect(() => {
        getPlayers()
    }, []);

    const handleChange = (e : any) => {
        updateFormData(e.target.value)
    }

    const handleSubmit = (event : any) => {
        event.preventDefault()
        if(playerNameRef.current) {
            addPlayer(playerNameRef.current.value.trim());
            getPlayers()
        }
    }

    return (
        <Container maxWidth="md">
            <header className="App-header">
                <h1>The <span className="App-highlight">Boring</span> Game</h1>
            </header>
            <Container maxWidth="sm">
                <EntryComponent submitHandler={handleSubmit} playerNameRef={playerNameRef}/>
            </Container>
            <ScoreTable players={players} topPlayer={topPlayer} worstPlayer={worstPlayer} currentPlayer={currentPlayer}/>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity={severity}>{errorMessage}</Alert>
            </Snackbar>

        </Container>
    );
}

export default App;
