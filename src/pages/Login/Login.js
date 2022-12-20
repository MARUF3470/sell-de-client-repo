import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';

const Login = () => {
    const { userLogin, googleLogin } = useContext(AuthContext)
    const [singinError, setSigninError] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleLogin = (data) => {
        //console.log(data)
        setSigninError('')
        userLogin(data.email, data.password)
            .then(res => {
                const user = res.user;
                const currentUser = {
                    email: user.email
                }

                console.log(currentUser);
                toast.success('Login Done')

                // get jwt token
                fetch('https://sell-de-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                        localStorage.setItem('sell-de-token', data.token);
                        navigate(from, { replace: true });
                    });
            })
            .catch(err => {
                console.log(err)
                setSigninError(err.message)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const user = res.user;
                const currentUser = {
                    email: user.email
                }

                console.log(currentUser);

                // get jwt token
                fetch('https://sell-de-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                        localStorage.setItem('sell-de-token', data.token);
                        navigate(from, { replace: true });
                    });
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='bg-base-200'>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Login to your account for getting all our services</p>
                    </div>
                    <form onSubmit={handleSubmit(handleLogin)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register('email', { required: 'Email is needed' })} placeholder="email" className="input input-bordered" />
                                {errors.email && <p className='text-error'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password', { required: 'Password is needed' })} placeholder="password" className="input input-bordered" />
                                {errors.password && <p className='text-error'>{errors.password.message}</p>}
                                <label className="label">
                                    <p>Are you new to this website? <Link to='/register' className='text-blue-600'>Register</Link></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p className='text-error'>{singinError.split(':')[1]}</p>
                        </div>
                        <button className='btn w-full btn-circle btn-outline' onClick={handleGoogleLogin}>Google</button>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Login;