import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';
import Header from '../../pages/shared/Header/Header';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    const { data: savedUsers = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['users', user.email],
            queryFn: async () => {
                const res = await fetch(`https://sell-de-server.vercel.app/users/${user.email}`)
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

                        {
                            savedUsers?.role === 'buyer' && <li><Link to="/dashboard/orders">My Orders</Link></li>
                        },
                        {
                            !savedUsers?.role && <li><Link to="/dashboard/orders">My Orders</Link></li>
                        }

                        {
                            savedUsers?.role === 'admin' &&
                            <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
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