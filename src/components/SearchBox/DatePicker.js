import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  datePicker: {
    justifySelf: 'Center',
  },
}));

export default function DatePicker({ selectedDate, setSelectedDate }) {
  const classes = useStyles();

  const handleDateChange = (date) => {
    console.log('date change', date);
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.datePicker}>
        <KeyboardDatePicker
          margin='normal'
          id='date-picker-dialog'
          label='Choose your date'
          format='dd/MM/yyyy'
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
