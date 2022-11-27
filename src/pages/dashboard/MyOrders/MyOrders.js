import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../components/Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const { data: bookings = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['bookings', user.email],
            queryFn: async () => {
                const req = await fetch(`http://localhost:5000/bookings/${user.email}`)
                const data = await req.json()
                return data;
            }
        }
    )
    if (isLoading) {
        return <progress className="progress w-56 text-center"></progress>
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.carName}</td>
                                <td>{booking.userName}</td>
                                <td>{booking.price}</td>
                                <td><button className='btn btn-sm btn-outline'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;