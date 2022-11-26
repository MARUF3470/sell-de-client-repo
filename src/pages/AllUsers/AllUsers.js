import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const { data: users = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['users'],
            queryFn: async () => {
                const res = await fetch('http://localhost:5000/users')
                const data = await res.json();
                return data;
            }
        }
    )
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }
    //  console.log(users)
    const handleMakeSeller = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('User account is upgraded as a seller account')
                }
                refetch()
            })
    }
    const handleMakeValid = (id) => {
        fetch(`http://localhost:5000/users/valid/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('User account is upgraded as a seller account')
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
                        <th>Role</th>
                        <th>Make Seller</th>
                        <th>Validation</th>
                        <th>Delete User</th>
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
                            <td>
                                {user?.role ? <p className='uppercase'>{user.role}</p> : 'USER'}
                            </td>
                            <th>
                                {!user?.role ? <button onClick={() => handleMakeSeller(user._id)} className="btn btn-ghost btn-xs">Make seller</button> : ''}
                            </th>
                            <th>
                                {!user?.valid ? <button onClick={() => handleMakeValid(user._id)} className="btn btn-ghost btn-xs">Make validate</button> : 'Validated'}
                            </th>
                            <th>
                                {user?.role === 'admin' ? '' : <button>Delete</button>}
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;