import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function AuthPage() {
  const location = useLocation();

  const SCOPES =
    'user-read-private,user-read-email, playlist-modify-public,playlist-modify-private'; //scopes needed for our API requests
  const SPOTIFY_AUTHORIZE_URL = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${
    process.env.REACT_APP_SPOTIFY_CLIENT_ID
  }&show_dialog=true&scope=${SCOPES}&redirect_uri=${encodeURIComponent(
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  )}`;

  useEffect(() => {
    if (location.pathname === '/callback/') {
      const params = new URLSearchParams(location.hash.replace(/#/, ''));
      const token = params.get('access_token');
      Cookies.set('spotifyAuthToken', token);
      window.location.href = '/'; // TODO: redirect with React Router instead
    }
  }, [location]);

  return (
    <Button href={SPOTIFY_AUTHORIZE_URL} variant='contained'>
      Login with Spotify
    </Button>
  );
}

export default AuthPage;
