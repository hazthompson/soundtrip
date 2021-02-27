import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';

const playlistStyles = makeStyles({
  playlist__container: {
    background: `${GlobalStyles.darkTeal}`,
    gridColumn: '8 /span 4',
    width: '100%',
    height: '100%',
    borderRadius: '15px',
  },
});

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
