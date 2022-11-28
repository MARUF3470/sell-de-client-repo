import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal/BookingModal';
import Car from './car/Car';

const Category = () => {
    const cars = useLoaderData()
    const [bookedCar, setBookedCar] = useState(null)
    console.log(bookedCar)


    return (
        <div>
            {
                cars.map(car => <Car key={car._id} car={car} setBookedCar={setBookedCar}></Car>)
            }
            {
                bookedCar && <BookingModal bookedCar={bookedCar} setBookedCar={setBookedCar}></BookingModal>
            }
        </div>
    );
};

export default Category;