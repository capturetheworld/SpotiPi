import React, { useEffect, useContext } from "react";
import logo from '../pictures/spotipi.png';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button } from '@mui/material'
import '../styles/landing.css';



function LandingPage() {


	const { setCode } = useContext(AuthContext)
	let navigate = useNavigate();
	let AUTH_URL = "";


	useEffect(() => {
		let code = new URLSearchParams(window.location.search).get('code');
		getID();
		if (code) {
			setCode(code);
			return navigate('/dashboard');
		}
	}, [])

	// KEEP SCOPE AS IS
	let scope = 'user-read-private+user-read-email+user-read-playback-state+user-modify-playback-state';

	async function getID() {
		const response = await fetch("http://localhost:8888/apival");

		AUTH_URL = "https://accounts.spotify.com/authorize?" +
			"client_id=" + await response.text() +
			"&response_type=code" +
			"&redirect_uri=http://localhost:3000" +
			"&scope=" + scope
	}

	const login = () => {
		window.location.href = AUTH_URL;

	}



	return (
		<div className="App">
			<div className="App-container">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to the beginning of SpotiPi! </p>
				<Button onClick={login} style={{ color: 'white', backgroundColor: '#04aa6d' }}>
					Login
				</Button>
			</div>
		</div >
	);
}

export default LandingPage;