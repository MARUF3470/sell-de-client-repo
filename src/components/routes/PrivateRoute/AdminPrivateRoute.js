import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const AdminPrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const { data: savedUser = [], isLoading } = useQuery(
        {
            queryKey: ['user', user.email],
            queryFn: async () => {
                const res = await fetch(`https://sell-de-server.vercel.app/users/${user.email}`)
                const data = await res.json()
                return data
            }
        }
    )
    console.log("hvgvghvgt----->", savedUser)
    if (isLoading || !savedUser) {
        return <progress className="progress w-56"></progress>
    }
    if (savedUser.role === 'admin') {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminPrivateRoute;