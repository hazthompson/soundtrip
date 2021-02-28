import { makeStyles } from '@material-ui/core/styles';
import SearchBox from 'components/SearchBox/SearchBox';

const eventListStyles = makeStyles((theme) => ({
  landingPage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    justifySelf: 'center',
  },
  landingPage__locationDateContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumn: '4 /span 6',
    gridRow: 1,
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[200],
    borderRadius: '40px',
    marginBottom: '50px',
  },
}));

function LandingPage() {
  const classes = eventListStyles();

  return (
    <div className={classes.landingPage}>
      <SearchBox landingPage />
    </div>
  );
}

export default LandingPage;
