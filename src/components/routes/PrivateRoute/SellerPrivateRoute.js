import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const SellerPrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const { data: savedUser = [], isLoading } = useQuery(
        {
            queryKey: [],
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/users/${user.email}`)
                const data = await res.json()
                return data
            }
        }
    )
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (savedUser?.role === 'seller') {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerPrivateRoute;