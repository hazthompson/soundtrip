import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { EventProvider } from 'utils/EventContext';
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import Homepage from 'pages/Homepage';
import Navbar from 'components/Navbar';
import AuthPage from 'components/AuthPage';

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        backgroundColor: `${GlobalStyles.offWhite}`,
      },
    },
  },
});

const useStyles = makeStyles({
  App: {
    fontFamily: `${GlobalStyles.bodyFont}`,
    minHeight: '100vh',
    backgroundColor: `${GlobalStyles.offWhite}`,
  },
});

function App() {
  const [token, setToken] = useState();
  const classes = useStyles();

  useEffect(() => {
    setToken(Cookies.get('spotifyAuthToken'));
  }, []);

  return (
    <Router>
      <div className={classes.App}>
        {token ? (
          <EventProvider>
            <SpotifyApiContext.Provider value={token}>
              <ThemeProvider theme={theme}>
                <Navbar />
                <Switch>
                  <Route path='/' exact>
                    <Homepage />
                  </Route>
                  <Redirect to='/' />
                </Switch>
              </ThemeProvider>
            </SpotifyApiContext.Provider>
          </EventProvider>
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
