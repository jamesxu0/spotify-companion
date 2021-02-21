import React from 'react';
import './HomePage.scss';
import { useState, useEffect } from 'react';
import { getSpotifyAPI } from './../../utils/SpotifyApiUtils';

function HomePage({ history }) {
  const spotifyApi = getSpotifyAPI();
  const [meResponse, setMeResponse] = useState(null);
  useEffect(() => {
    async function fetchMe() {
      setMeResponse(await spotifyApi.getMe());
    }
    fetchMe();
  }, []);
  return (
    <div>
      <h1>HOME</h1>
      {meResponse != null && (
        <div>
          <h2>{meResponse.display_name}</h2>
          <img src={meResponse.images[0].url} />
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
