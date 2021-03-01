import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useWindowSize } from 'utils/hooks';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    justifySelf: 'Center',
    paddingLeft: '15px',
    [theme.breakpoints.down('xs')]: {
      paddingRight: '15px',
      gridColumn: '1 /span2',
      paddingLeft: '0px',
    },
  },
}));

export default function DatePicker({ selectedDate, setSelectedDate }) {
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.datePicker}>
        <KeyboardDatePicker
          disablePast
          autoOk
          margin='normal'
          id='date-picker-dialog'
          label={isMobile ? '' : 'Choose your date'}
          format='Do MMM YYYY'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
