import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import Button from '@material-ui/core/Button';

const spotifyLoginStyles = makeStyles((theme) => ({
  spotifyLogin__container: {
    display: 'grid',
    justifyContent: 'center',
    height: '100vh',
  },
  spotifyLogin__button: {
    backgroundColor: GlobalStyles.offWhite,
    borderRadius: 50,
    color: GlobalStyles.accentOrange,
    height: 50,
    marginTop: 200,
    fontWeight: 500,
    cursor: 'pointer',
  },
}));

function SpotifyLogin({ SPOTIFY_AUTHORIZE_URL }) {
  const classes = spotifyLoginStyles();

  return (
    <div className={classes.spotifyLogin__container}>
      <Button
        className={classes.spotifyLogin__button}
        href={SPOTIFY_AUTHORIZE_URL}
        variant='contained'
      >
        Login with Spotify
      </Button>
    </div>
  );
}

export default SpotifyLogin;
