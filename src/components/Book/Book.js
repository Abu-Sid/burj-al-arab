
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Booking from '../Booking/Booking';
  

const Book = () => {
    const {bedType} = useParams();
    const [loggedUser,setLoggedUser]=useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        checkIn:new Date(),
        checkOut:new Date()});

  const handleCheckIn = (date) => {
    const newDates={...selectedDate}
    newDates.checkIn=date;
    setSelectedDate(newDates);
    };
  const handleCheckOut = (date) => {
    const newDates={...selectedDate}
    newDates.checkOut=date;
    setSelectedDate(newDates);
    };
    const handleBooking=()=>{
        const newBooking={...loggedUser,...selectedDate}
        fetch('http://localhost:5000/addBooking',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newBooking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    return (
      <div style={{ textAlign: "center" }}>
        <h1>
          Welcome, {loggedUser.name} !! Let's book a {bedType} Room.
        </h1>
        <p>
          Want a <Link to="/home">different room?</Link>{" "}
        </p>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Check In Date"
              value={selectedDate.checkIn}
              onChange={handleCheckIn}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Check Out Date"
              format="MM/dd/yyyy"
              value={selectedDate.checkOut}
              onChange={handleCheckOut}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Button onClick={handleBooking} variant="contained" color="primary">
            BOOK NOW
          </Button>
        </MuiPickersUtilsProvider>
        <Booking/>
      </div>
    );
};

export default Book;