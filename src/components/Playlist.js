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

  return <div className={classes.playlist__container}></div>;
}

export default Playlist;
