import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {
    const { data: users = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['buyers'],
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/buyers`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('genius-token')}`
                    }
                })
                const data = await res.json();
                return data;
            }
        }
    )
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }
    const handleUserDelete = (id) => {
        fetch(`http://localhost:5000/buyers/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Successfully deleted one document.");
                }
                refetch()
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
                        <th>Email</th>
                        {/* <th>Validation</th> */}
                        <th>Delete Seller</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => <tr key={user._id}>
                            <th>
                                {i + 1}
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            {/* <th>
                                {!user?.valid ? <button onClick={() => handleMakeValid(user._id)} className="btn btn-ghost btn-xs">Make validate</button> : 'Validated'}
                            </th> */}
                            <th>
                                <button onClick={() => handleUserDelete(user._id)} className='btn btn-sm'>Delete</button>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBuyers;