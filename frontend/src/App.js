import logo from './pictures/spotipi.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the beginning of SpotiPi!

        </p>
        <button>LOGIN</button>
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

export default App;
