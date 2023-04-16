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


	let scope = 'user-read-private+user-read-email+user-read-playback-state+user-modify-playback-state';

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
			<div className="App-container">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to the beginning of SpotiPi! </p>
				<button onClick={login}>
					Login
				</button>




				<div id="footer">
					<div>Copyright 2023</div>
					<a
						className="App-link"
						href="https://spotify.com"
						target="_blank"
						rel="noopener noreferrer"
					>Spotify's website</a></div>

			</div>
		</div >
	);
}

export default LandingPage;