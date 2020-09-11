import React from 'react';
import './MergePage.scss';
import { getSpotifyAPI } from './../../utils/SpotifyApiUtils';
import { useState } from 'react';

function MergePage() {
  const [userURI, setUserURI] = useState('');
  const spotifyApi = getSpotifyAPI();
  const handleOnSubmit = async (e) => {
    const userURIs = userURI.split(':');
    const userID = userURIs[userURIs.length - 1];
    e.preventDefault();
    const test = await spotifyApi.getUserPlaylists(userID);
    console.log(test);
  };
  return (
    <div>
      <h1>MERGE</h1>
      <form onSubmit={handleOnSubmit}>
        <label>
          Spotify User URI:{' '}
          <input
            type="text"
            name="userID"
            onChange={(e) => {
              setUserURI(e.target.value);
            }}
            value={userURI}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default MergePage;
