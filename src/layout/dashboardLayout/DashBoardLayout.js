import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';
import Header from '../../pages/shared/Header/Header';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    const [savedUserData, setSavedUserData] = useState(null)
    const handleUser = role => {
        console.log(role)
        fetch(`http://localhost:5000/users/role?email=${user.email}&&role=${role}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSavedUserData(data)
            })
    }
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
                            savedUserData?.role === 'admin' &&
                            <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            </>
                        }
                        {
                            savedUserData?.role === 'seller' &&
                            <>
                                <li><Link to='/dashboard/addCar'>Add Car</Link></li>
                                <li><Link to='/dashboard/myCars'>My Cars</Link></li>
                            </>
                        }
                        <p className='text-xs font-bold'>If you are a Admin? Select your role</p>
                        {
                            user?.email &&
                            <div>
                                <div className="dropdown">
                                    <label tabIndex={0} className="btn m-1">Selete</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><button onClick={() => handleUser('user')}>User</button></li>
                                        <li><button onClick={() => handleUser('admin')}>Admin</button></li>
                                        <li><button onClick={() => handleUser('seller')}>Seller</button></li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;