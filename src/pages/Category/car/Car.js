import React from 'react';

const Car = ({ car, setBookedCar }) => {
    const { category, image, location, originalPrice, postDate, productName, resalePrice, sellerName, yearsOfUse
    } = car
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
                    <p className="py-2 font-semibold">Seller Name: {sellerName}</p>
                    <p className="py-2 font-semibold">Post Time: {postDate}</p>
                    <label htmlFor="booking-modal" onClick={() => setBookedCar(car)} className="btn btn-primary">open modal</label>
                </div>
            </div>
        </div>
    );
};

export default Car;