import SpotifyWebApi from 'spotify-web-api-js';

export const getSpotifyAPI = () => {
  const accessToken = sessionStorage.getItem(
    'spotify-companion-access-token',
  );
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};
