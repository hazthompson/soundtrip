import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';

const playlistStyles = makeStyles((theme) => ({
  playlist__container: {
    background: `${GlobalStyles.darkTeal}`,
    gridColumn: '8 /span 4',
    height: '100%',
    width: '100%',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      height: '80px',
      gridColumn: '2 /span 10',
      gridRow: 2,
      marginBottom: '40px',
    },
  },
}));

function Playlist({ loadingPLaylist, playlistId }) {
  const classes = playlistStyles();
  let playlistSrc = `https://open.spotify.com/embed/playlist/${playlistId}`;

  return loadingPLaylist ? (
    <p>Loading</p>
  ) : (
    <iframe
      className={classes.playlist__container}
      title={playlistId}
      src={playlistSrc}
      frameBorder='0'
      allowtransparency='true'
      allow='encrypted-media'
    ></iframe>
  );
}

export default Playlist;
