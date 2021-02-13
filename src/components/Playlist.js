import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import EventContext from 'utils/EventContext';

const playlistStyles = makeStyles({
  playlist__container: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    gridColumn: '9 /span 3',
    height: '90vh',
  },
});

function Playlist() {
  const { events } = useContext(EventContext);
  const classes = playlistStyles();
  const playlistID = Cookies.get('tempPlaylistID');
  let playlistSrc = `https://open.spotify.com/embed/playlist/${playlistID}`;
  return (
    <>
      <iframe
        className={classes.playlist__container}
        title={playlistID}
        src={playlistSrc}
        width='300'
        height='380'
        frameBorder='0'
        allowtransparency='true'
        allow='encrypted-media'
      ></iframe>
    </>
  );
}

export default Playlist;
