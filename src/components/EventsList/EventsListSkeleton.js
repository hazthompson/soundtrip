import { makeStyles } from '@material-ui/core/styles';
import GlobalStyles from 'assets/GlobalStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const eventListStyles = makeStyles((theme) => ({
  eventLists__loadingContainer: {
    paddingTop: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    '& .MuiSkeleton-root': {
      backgroundColor: `${GlobalStyles.darkTeal}`,
      borderRadius: '4px',
    },
  },

  eventLists__loadingTextContainer: {
    gridColumn: '2/ span 2',
    paddingLeft: '10px',

    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignContent: 'space-between',
  },
}));

function EventsListSkeleton() {
  const classes = eventListStyles();

  return (
    <div className={classes.eventLists__loadingContainer}>
      <Skeleton variant='rect' width={210} height={118} borderradius={4} />
      <div className={classes.eventLists__loadingTextContainer}>
        <div style={{ gridColumn: '1 / span 2' }}>
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </div>
        <Skeleton style={{ gridColumn: '1/ span 1' }} variant='text' />
      </div>
    </div>
  );
}

export default EventsListSkeleton;
