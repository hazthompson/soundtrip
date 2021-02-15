import { makeStyles } from '@material-ui/core/styles';

const playlistStyles = makeStyles({
  playlist__container: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    gridColumn: '9 /span 3',
    height: '90vh',
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
      width='300'
      height='380'
      frameBorder='0'
      allowtransparency='true'
      allow='encrypted-media'
    ></iframe>
  );
}

export default Playlist;
