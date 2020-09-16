import React from 'react';
import './MergePage.scss';
import PlayListComponent from './../../components/PlaylistComponent/PlaylistComponent';
import { getSpotifyAPI } from './../../utils/SpotifyApiUtils';
import { useState } from 'react';

function MergePage() {
  const [hasSearched, setHasSearched] = useState(false);
  const [userURI, setUserURI] = useState('');
  const [mePlaylists, setMePlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const spotifyApi = getSpotifyAPI();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userURIs = userURI.split(':');
    const userID = userURIs[userURIs.length - 1];
    const mePlaylistsResponse = await spotifyApi.getUserPlaylists();
    const userPlaylistsResponse = await spotifyApi.getUserPlaylists(
      userID,
    );
    setMePlaylists(
      mePlaylistsResponse.items.map((item) => {
        item.selected = false;
        return item;
      }),
    );
    setUserPlaylists(
      userPlaylistsResponse.items.map((item) => {
        item.selected = false;
        return item;
      }),
    );
    setHasSearched(true);
  };
  let meSongCount = 0;
  let userSongCount = 0;
  mePlaylists.forEach((playlist) => {
    if (playlist.selected) {
      meSongCount += playlist.tracks.total;
    }
  });
  userPlaylists.forEach((playlist) => {
    if (playlist.selected) {
      userSongCount += playlist.tracks.total;
    }
  });
  return (
    <div className="mergeContainer">
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
      <div className="playlistContainer">
        <div className="leftPlaylistContainer">
          {mePlaylists.length !== 0 ? (
            <>
              <h2>Your Playlists</h2>
              <h3 className="songCount">
                {meSongCount} songs selected
              </h3>
              <div className="playlistList">
                {mePlaylists.map((playlist, idx) => {
                  const handleMeClick = (index) => {
                    return () => {
                      mePlaylists[index].selected = !mePlaylists[
                        index
                      ].selected;
                      setMePlaylists([...mePlaylists]);
                    };
                  };
                  return (
                    <PlayListComponent
                      name={playlist.name}
                      count={playlist.tracks.total}
                      description={playlist.description}
                      image={playlist.images[0]?.url}
                      key={'mePlaylist' + idx}
                      onClick={handleMeClick(idx)}
                      selected={mePlaylists[idx].selected}
                    />
                  );
                })}
              </div>
            </>
          ) : hasSearched ? (
            <h2>You have no playlists</h2>
          ) : null}
        </div>
        {hasSearched && (
          <select className="mergeOptions">
            <option value="intersect">Intersect</option>
            <option value="union">Union</option>
          </select>
        )}
        <div className="rightPlaylistContainer">
          {userPlaylists.length !== 0 ? (
            <>
              <h2>
                {userPlaylists[0].owner.display_name}'s Playlists
              </h2>
              <h3 className="songCount">
                {userSongCount} songs selected
              </h3>
              <div className="playlistList">
                {userPlaylists.map((playlist, idx) => {
                  const handleUserClick = (index) => {
                    return () => {
                      userPlaylists[index].selected = !userPlaylists[
                        index
                      ].selected;
                      setUserPlaylists([...userPlaylists]);
                    };
                  };
                  return (
                    <PlayListComponent
                      name={playlist.name}
                      count={playlist.tracks.total}
                      description={playlist.description}
                      image={playlist.images[0]?.url}
                      key={'userPlaylist' + idx}
                      onClick={handleUserClick(idx)}
                      selected={userPlaylists[idx].selected}
                    />
                  );
                })}
              </div>
            </>
          ) : hasSearched ? (
            <h2>User has no playlists</h2>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MergePage;
