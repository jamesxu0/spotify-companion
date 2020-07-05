import React from 'react';
import { useEffect, useState } from 'react';
import './App.scss';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function App() {
  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  });

  return (
    <div className="App">
      <a href="http://localhost:8888/login">Login</a>
    </div>
  );
}

export default App;
