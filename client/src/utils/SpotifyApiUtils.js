import SpotifyWebApi from 'spotify-web-api-js';

export const getSpotifyAPI = () => {
  const accessToken = sessionStorage.getItem(
    'spotify-companion-access-token',
  );
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};

export const getAllTracksFromPlaylist = async (
  spotifyApi,
  playlistID,
) => {
  const tracks = [];
  let offset = 0;
  let trackResponse = await spotifyApi.getPlaylistTracks(playlistID);
  tracks.push(...trackResponse.items);
  while (trackResponse.next) {
    offset += 100;
    trackResponse = await spotifyApi.getPlaylistTracks(playlistID, {
      offset,
    });
    tracks.push(...trackResponse.items);
  }
  return tracks;
};
