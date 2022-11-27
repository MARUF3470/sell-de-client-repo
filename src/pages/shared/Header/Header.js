import React, { useContext, useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { AuthContext } from '../../../components/Context/AuthProvider/AuthProvider';

const Header = () => {
    const { logOut, user } = useContext(AuthContext)

    console.log(user)
    const handleLogout = () => {
        logOut()
            .then(res => {
                window.location.reload()
            })
            .catch(err => console.log(err))

    }

    // console.log(savedUserData)

    // const handleUser = role => {
    //     console.log(role)
    //     fetch(`http://localhost:5000/users/role?email=${user.email}&&role=${role}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })
    // }
    // console.log(savedUserData)
    const menu = <>
        <li><Link className='btn btn-ghost' to='/'>Home</Link></li>
        {
            !user?.email ? <><li ><Link className='btn btn-ghost' to='/login'>Login</Link></li>
                <li><Link className='btn btn-ghost' to='/register'>Register</Link></li></> : <>
                <li><Link className='btn btn-ghost' to='/dashboard'>Dashboard</Link></li>
            </>
        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menu}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">Sell De</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menu}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email && <button onClick={handleLogout} className='btn'>LogOut</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;