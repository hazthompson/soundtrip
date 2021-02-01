import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { SpotifyApiContext, useUser } from 'react-spotify-api';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import Homepage from 'pages/Homepage';
import Navbar from 'components/Navbar';
import AuthPage from 'components/AuthPage';
import { createTempPlaylist } from './utils/spotifyHelpers';

const useStyles = makeStyles({
  App: {
    fontFamily: `${GlobalStyles.bodyFont}`,
    // backgroundColor: `${GlobalStyles.backgroundColor}`,
    minHeight: '100vh',
  },
});

function App() {
  const [token, setToken] = useState();
  const classes = useStyles();
  const { data: userData } = useUser();

  useEffect(() => {
    setToken(Cookies.get('spotifyAuthToken'));
  }, []);

  useEffect(() => {
    console.log('ALL COOKIES?', Cookies.get());

    if (!Cookies.get('tempPlaylistID')) {
      console.log('did you get in no tempPlatlist?');
      if (token) {
        console.log('but there is a token');
        createTempPlaylist(userData?.id);
        console.log(
          'is there a playlist id in cookies',
          Cookies.get('tempPlaylistID')
        );
      }
    }
  }, [token, userData]);

  return (
    <Router>
      <div className={classes.App}>
        {token ? (
          <SpotifyApiContext.Provider value={token}>
            <Navbar />
            <Switch>
              <Route path='/' exact>
                <Homepage />
              </Route>
              <Redirect to='/' />
            </Switch>
          </SpotifyApiContext.Provider>
        ) : (
          // Display the spotify login page
          <Switch>
            <Route path='/callback' exact>
              <AuthPage />
            </Route>
            <Route path='/auth' exact>
              <AuthPage />
            </Route>
            <Redirect to='/auth' />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
