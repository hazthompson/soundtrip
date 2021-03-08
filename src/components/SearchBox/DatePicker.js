import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useWindowSize } from 'utils/hooks';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: '100%',
    justifySelf: 'Center',
    paddingLeft: 15,
    paddingRight: 15,

    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  input: {
    backgroundColor: theme.palette.grey[200],
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
          fullWidth
          inputVariant={isMobile ? 'outlined' : 'standard'}
          InputProps={{
            className: classes.input,
          }}
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
