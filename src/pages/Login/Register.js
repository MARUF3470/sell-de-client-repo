import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthProvider/AuthProvider';
import './register.css'

const Register = () => {
    const { registration, updateUserProfile } = useContext(AuthContext)
    const [passErr, setPassErr] = useState('')
    const navigate = useNavigate()
    const [registrationError, setRegistrationError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imageApiKey = process.env.REACT_APP_imgkey;
    console.log(imageApiKey)
    const handleLogin = data => {
        setRegistrationError('')
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageApiKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url)
                    registration(data.email, data.password)
                        .then(res => {
                            const user = res.user;
                            toast.success('Your account is created successfully')
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
                                });

                            //    console.log(user)
                            const profile = {
                                displayName: data.name,
                                photoURL: imgData.data.url
                            }
                            updateUser(profile)
                            saveUer(data.name, data.role, user.email, imgData.data.url)
                        })
                        .catch(err => {
                            console.error(err)
                            setRegistrationError(err.message)
                        })
                }
            })
    }
    const updateUser = profile => {
        updateUserProfile(profile)
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const saveUer = (name, role, email, image) => {
        const user = { name, role, email, image }
        //mconsole.log(name, email, image)
        fetch('https://sell-de-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div className="hero min-h-screen  bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Are you new to this website? Register now for enjoing all our services.</p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div>
                            <label className="label">
                                <span className="label-text">What type of account you want to create?</span>
                            </label>
                            <select {...register('role')} className="select select-bordered w-full max-w-xs">
                                <option value='buyer' disabled>Selete your account type</option>
                                <option value='buyer'>Buyer</option>
                                <option value='seller'>Seller</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name', { required: 'User name field must be completed' })} placeholder="name" className="input input-bordered" />
                            {errors.name && <p className='text-red-400'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">image</span>
                            </label>
                            <input type="file" {...register('image', { required: 'User Your image' })} className="custom-file-input" />
                            {errors.image && <p className='text-red-400'>{errors.image?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email', { required: 'Enter your email address' })} placeholder="email" className="input input-bordered" />
                            {
                                errors.email && <p className='text-red-400'>{errors.email?.message}</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password', { required: 'Enter Your password' })} placeholder="password" className="input input-bordered" />
                            {
                                errors.password && <p className='text-red-400'>{errors.password?.message}</p>
                            }
                            <p className='text-warning'>{passErr}</p>
                            <label className="label">
                                <p>Already have an account? <Link className='text-blue-600' to='/login'>Login</Link></p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Register" />
                        </div>
                        <p className='text-error'>{registrationError}</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;