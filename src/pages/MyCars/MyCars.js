import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
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
    const usersCar = cars.filter(savedUser => user.email === savedUser.email)
    console.log(usersCar)
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
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
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>{car.resalePrice}</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">Delete</button>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyCars;