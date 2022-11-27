import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import { AuthContext } from '../../../components/Context/AuthProvider/AuthProvider';

const BookingModal = ({ bookedCar }) => {
    const { user } = useContext(AuthContext)

    const { productName, resalePrice } = bookedCar
    console.log(bookedCar)
    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const userName = form.userName.value;
        const userEmail = form.userEmail.value;
        const carName = form.carName.value;
        const price = form.price.value;
        const number = form.number.value
        const location = form.location.value;
        const bookingDetails = {
            userName,
            userEmail,
            carName,
            price,
            number,
            location,
        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`Your booked this ${carName}`)
                    event.target.reset()
                }
            })

    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleBooking} className="modal-box relative">
                    <h5 className="text-xl font-semibold">Booking Form</h5>
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your name</span>
                        </label>
                        <input type="text" name='userName' defaultValue={user?.displayName} disabled className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="text" name='userEmail' defaultValue={user.email} disabled className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Car Name</span>
                        </label>
                        <input type="text" name='carName' defaultValue={productName} disabled placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" name='price' defaultValue={resalePrice} disabled placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" name='number' placeholder="Phone Number" required className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Pick Up Location</span>
                        </label>
                        <input type="text" name='location' required placeholder="From where you want to pick up" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <input type="submit" className='btn btn-wide btn-sm mt-3 mx-auto' value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default BookingModal;