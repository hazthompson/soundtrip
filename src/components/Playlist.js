import { makeStyles } from '@material-ui/core/styles';

const playlistStyles = makeStyles({
  playlist__container: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    gridColumn: '9 /span 3',
    height: '90vh',
  },
});

function Playlist() {
  const classes = playlistStyles();

  return (
    <iframe
      className={classes.playlist__container}
      title='123' //make this playlist id
      src='https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3'
      width='300'
      height='380'
      frameBorder='0'
      allowtransparency='true'
      allow='encrypted-media'
    ></iframe>
  );
}

export default Playlist;
