import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';

const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const [singinError, setSigninError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleLogin = (data) => {
        console.log(data)
        userLogin(data.email, data.password)
            .then(res => {
                const user = res.user;
                toast.success('Login successful')
            })
            .catch(err => {
                console.log(err)
                setSigninError(err.message)
            })
    }
    const handleUser = event => {
        console.log(event.target.value)
    }
    return (
        <div className='bg-base-200'>
            <div className='my-6 mx-4'>
                <label className="label">
                    <span className="label-text font-bold">Select the option if you are admin or seller.</span>
                </label>
                <select onChange={handleUser} name='userinfo' className="select select-bordered w-full max-w-xs">
                    <option value={null}>User</option>
                    <option value='admin'>Admin</option>
                    <option value='seller'>Seller</option>
                </select>
            </div>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;