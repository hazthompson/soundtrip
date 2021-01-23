import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    justifySelf: 'Center',

    // MuiInputBaseRoot: {
    //   color: 'white',
    // },
  },
}));

export default function DatePicker({ selectedDate, setSelectedDate }) {
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('date!', selectedDate);
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
