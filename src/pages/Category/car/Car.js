import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
const Car = ({ car, setBookedCar }) => {
    const { category, image, location, originalPrice, postDate, productName, resalePrice, sellerName, yearsOfUse,
        email } = car
    const [valid, setValid] = useState('')
    console.log(email)
    useEffect(() => {
        fetch('https://sell-de-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const currentUser = data.find(sData => sData.email === email)
                console.log(currentUser)
                setValid(currentUser.valid)
            })
    }, [])
    return (
        <div className="hero p-5 bg-base-200 lg:w-3/4 mx-auto rounded my-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={image} className="lg:max-w-sm rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">{productName}</h1>
                    <p className="py-2 font-semibold">Location: {location}</p>
                    <p className="py-2 font-semibold">Resale Price: {resalePrice}</p>
                    <p className="py-2 font-semibold">Original: price{originalPrice}</p>
                    <p className="py-2 font-semibold">Years of Use: {yearsOfUse}</p>
                    <p className="py-2 font-semibold inline-flex items-center gap-1">Seller Name: {sellerName} <span>{valid === 'validated' && <FaCheckCircle className='text-blue-600'></FaCheckCircle>}</span> </p>
                    <p className="py-2 font-semibold">Post Time: {postDate}</p>
                    {/* <a href="#booking-modal" onClick={() => setBookedCar(car)} className="btn btn-primary">Book Now</a> */}
                    <label htmlFor="booking-modal" onClick={() => setBookedCar(car)} className="btn btn-primary">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default Car;