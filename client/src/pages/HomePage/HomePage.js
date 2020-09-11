import React from 'react';
import './HomePage.scss';
import { useState, useEffect } from 'react';
import { getSpotifyAPI } from './../../utils/SpotifyApiUtils';

function HomePage({ history }) {
  const spotifyApi = getSpotifyAPI();
  const [response, setResponse] = useState(null);
  useEffect(() => {
    async function fetchMe() {
      setResponse(await spotifyApi.getMe());
    }
    fetchMe();
  }, []);
  return (
    <div>
      <h1>HOME</h1>
      {response != null && (
        <div>
          <h2>{response.display_name}</h2>
          <img src={response.images[0].url} />
        </div>
      )}
      <h2
        onClick={() => {
          history.push('merge');
        }}
      >
        Merge
      </h2>
      <h2
        onClick={() => {
          history.push('stats');
        }}
      >
        Statistics
      </h2>
    </div>
  );
}

export default HomePage;
