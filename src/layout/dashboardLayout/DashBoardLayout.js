import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';
import Header from '../../pages/shared/Header/Header';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    // const [savedUserData, setSavedUserData] = useState(null)
    // const handleUser = role => {
    //     console.log(role)
    //     fetch(`http://localhost:5000/users/role?email=${user.email}&&role=${role}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             setSavedUserData(data)
    //         })
    // }
    const { data: savedUsers = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['users', user.email],
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/users/${user.email}`)
                const data = await res.json()
                return data
            }
        })
    console.log(savedUsers)
    return (
        <div>
            <Header></Header>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                Options
            </label>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        <li><Link to="/dashboard">My Orders</Link></li>

                        {
                            savedUsers?.role === 'admin' &&
                            <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            </>
                        }
                        {
                            savedUsers?.role === 'seller' &&
                            <>
                                <li><Link to='/dashboard/addCar'>Add Car</Link></li>
                                <li><Link to='/dashboard/myCars'>My Cars</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;