import React, { useEffect, useContext } from "react";
import logo from '../pictures/spotipi.png';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import '../styles/landing.css';
import config from "../config";
import Player from '../components/Player.js';

function LandingPage() {
	const { setCode } = useContext(AuthContext)
	let navigate = useNavigate();

	useEffect(() => {
		let code = new URLSearchParams(window.location.search).get('code')
		if (code) {
			setCode(code);
			return navigate('/dashboard');
		}
	}, [])

	let AUTH_URL = "https://accounts.spotify.com/authorize?" +
		"client_id=" + config.client_id +
		"&response_type=code" +
		"&redirect_uri=http://localhost:3000"

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to the beginning of SpotiPi! </p>

				<a href={AUTH_URL}>LOGIN</a>
				<a
					className="App-link"
					href="https://spotify.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Spotify's website
				</a>
			</header>
			<div className="player-container">
				<Player />
			</div>
		</div >
	);
}

export default LandingPage;