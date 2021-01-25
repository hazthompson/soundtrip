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

//install reacter
//set up a /login route which rendes the spotify auth set up a useEffect in this component that deletes that cookie (pass emptyarray so it happends on first render)
//look at js-cookie docs to remove this (.remove?)
//check for the 401 error and and then return redirect if it's present
//finally when it hits /callback redirect to homepage

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
          redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECT_URI_LOCAL}
          clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
          scopes={[Scopes.userReadPrivate, 'user-read-email']}
        />
      )}
    </div>
  );
}

export default App;
