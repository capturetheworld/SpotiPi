import React, { useState, useEffect, useContext} from "react";
import { Button } from '@mui/material'
import AuthContext from "../context/AuthContext";
import logo from '../pictures/spotipi.png';
import '../styles/landing.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Dashbaord() {
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext)
	let navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:8888/login', {code: code})
        .then(res => {
            console.log(res.data)
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
           // window.history.pushState({}, null, "/")
        })
        .catch(err => {
            console.log(err)
			return navigate('/');
        })

        console.log(accessToken,refreshToken,expiresIn)
    },[code])

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Button>{code}</Button>
			</header>
		</div>
	);
}

export default Dashbaord;