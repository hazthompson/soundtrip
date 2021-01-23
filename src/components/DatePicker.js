import 'date-fns';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    // gridColumn: '5 /span 4',
    justifySelf: 'Center',

    // MuiInputBaseRoot: {
    //   color: 'white',
    // },
  },
}));

export default function DatePicker() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54')
  );

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
          label='Date picker dialog'
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
