import React from 'react';

const Advertisement = ({ advertisement }) => {
    const { image, carName, price, email, useyears } = advertisement
    return (
        <div className="card w-80 bg-base-100 shadow-xl image-full my-4">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">Car Name: {carName}</h2>
                <p>Price: {price}</p>
                <p>Seller Email: {email}</p>
                <p>Used Years: {useyears}</p>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Book now</button>
                </div> */}
            </div>
        </div>
    );
};

export default Advertisement;