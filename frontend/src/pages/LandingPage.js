import React, { useEffect, useContext } from "react";
import logo from '../pictures/spotipi.png';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
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

	async function getID() {
		const response = await fetch("http://localhost:8888/apival");

		AUTH_URL = "https://accounts.spotify.com/authorize?" +
			"client_id=" + await response.text() +
			"&response_type=code" +
			"&redirect_uri=http://localhost:3000";
	}

	const login = () => {
		window.location.href = AUTH_URL;

	}



	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to the beginning of SpotiPi! </p>
				<button onClick={login}>
					Login
				</button>


				<a
					className="App-link"
					href="https://spotify.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Spotify's website
				</a>
			</header>

		</div >
	);
}

export default LandingPage;