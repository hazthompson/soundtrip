import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import Homepage from 'pages/Homepage';
import Navbar from 'components/Navbar';

const useStyles = makeStyles({
  App: {
    fontFamily: `${GlobalStyles.bodyFont}`,
    // backgroundColor: `${GlobalStyles.backgroundColor}`,
    minHeight: '100vh',
  },
});

function App() {
  const token = Cookies.get('spotifyAuthToken');
  const classes = useStyles();

  return (
    <div className={classes.App}>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <Navbar />
          <Homepage />
        </SpotifyApiContext.Provider>
      ) : (
        // Display the spotify login page
        <SpotifyAuth
          redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECT_URI}
          clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
          scopes={[Scopes.userReadPrivate, 'user-read-email']}
        />
      )}
    </div>
  );
}

export default App;
