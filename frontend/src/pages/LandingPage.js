import React, { useState } from "react";
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import logo from '../pictures/spotipi.png';
import '../styles/landing.css';

function LandingPage () {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        console.log(userName, password)
        // axios.get()
        // .then()
        // .catch()
    }

    const handleUserChange = (e) => {
        setUserName(e.target.value)
    }
    
    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to the beginning of SpotiPi! </p>

            <TextField label='Username' placeholder="Username" onChange={ handleUserChange }/> <br/>
            <TextField label='Password' type='password' placeholder="Password" onChange={ handlePassChange }/>
            <Button onClick={login}>LOGIN</Button>
            
            <a
              className="App-link"
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify's website
            </a>
          </header>
        </div>
      );
}

export default LandingPage;