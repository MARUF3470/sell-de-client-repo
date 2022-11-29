import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../components/Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const { data: bookings = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['bookings', user.email],
            queryFn: async () => {
                const req = await fetch(`https://sell-de-server.vercel.app/bookings/${user.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('sell-de-token')}`
                    }
                })
                const data = await req.json()
                return data;
            }
        }
    )
    if (isLoading) {
        return <progress className="progress w-56 text-center"></progress>
    }
    const handleDetele = (id) => {
        fetch(`https://sell-de-server.vercel.app/bookings/${id}`, {
            method: 'Delete'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Successfully deleted one car.");
                }
                refetch()
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Car Name</th>
                            <th>Buyer Name</th>
                            <th>Price</th>
                            <th>Buy</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <th className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={booking.image} alt='' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{booking.carName}</div>

                                    </div>
                                </th>
                                <td>{booking.userName}</td>
                                <td>{booking.price}</td>
                                <td><button className='btn btn-sm btn-outline'>Pay</button></td>
                                <td><button onClick={() => handleDetele(booking._id)} className='btn btn-sm btn-outline'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;