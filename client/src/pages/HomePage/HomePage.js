import React from 'react';
import './HomePage.scss';
import { useContext, useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import TokenContext from './../../contexts/token.context';

function HomePage() {
  const accessToken = useContext(TokenContext);
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      setResponse(await spotifyApi.getMe());
    }
    fetchMe();
  }, []);

  console.log(response);

  return (
    <div>
      <h1>HOME</h1>
      {response != null && (
        <div>
          <h2>{response.display_name}</h2>
          <img src={response.images[0].url} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
