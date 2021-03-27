import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [loggedUser,setLoggedUser]=useContext(UserContext)
    const [booking, setBooking] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/booking?email='+loggedUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
                
            }
        })
        .then(res=>res.json())
        .then(data=>setBooking(data))
        
    }, [loggedUser.email])
    return (
        <div>
            <h1>You have :{booking.length} bookings</h1>
            {
                booking.map(book=><li key={book._id}> {book.name} from {new Date(book.checkIn).toDateString('MM/dd/yyyy')} to {new Date(book.checkOut).toDateString('MM/dd/yyyy')}</li>)
            }
        </div>
    );
};

export default Booking;