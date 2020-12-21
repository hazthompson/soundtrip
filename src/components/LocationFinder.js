import { makeStyles } from '@material-ui/core/styles';

const locationFinderStyles = makeStyles({
  eventLists__container: {
    gridColumn: '5 /span 3',
    width: '100%',
    height: '500px',
  },
});

function LocationFinder() {
  const classes = locationFinderStyles();

  return (
    <div className={classes.locationFinder__container}>
      <div></div>
    </div>
  );
}

export default LocationFinder;
