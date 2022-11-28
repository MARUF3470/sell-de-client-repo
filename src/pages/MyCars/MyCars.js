import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';

const MyCars = () => {
    const { user } = useContext(AuthContext)
    const { data: cars = [], refetch, isLoading } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/cars')
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <progress className="progress w-56 mx-auto"></progress>
    }
    const handleDeleteCars = id => {
        fetch(`http://localhost:5000/cars/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Successfully deleted one car.");
                }
                refetch()
            })
    }
    const usersCar = cars.filter(savedUser => user.email === savedUser.email)
    console.log(usersCar)
    const handleAdvertisement = data => {
        console.log(data)
        fetch('http://localhost:5000/car/advertice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`Advertice done`)
                }
            })
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Resale Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersCar.map((car, i) => <tr key={car._id}>
                            <th>
                                {i + 1}
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={car.image} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{car.productName}</div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                {car?.status === 'available' ? <><span>Available</span> <button onClick={() => handleAdvertisement({ id: car._id, carName: car.productName, price: car.resalePrice, image: car.image, email: car.email, useyears: car.yearsOfUse })} className='btn btn-xs btn-outline'>Advertise</button></> : 'Sold'}
                            </td>
                            <td>{car.resalePrice}</td>
                            <th>
                                <button onClick={() => handleDeleteCars(car._id)} className="btn btn-ghost btn-xs">Delete</button>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyCars;