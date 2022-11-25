import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Category from '../Category/Category';

const AddCar = () => {
    const currentdate = new Date().toLocaleString();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imageApiKey = process.env.REACT_APP_imgkey;
    const [photo, setPhoto] = useState(null)
    const handleAddProduct = data => {
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
                    //setPhoto(imgData.data.url)
                    const product = {
                        sellerName: data.YourName,
                        productName: data.ProductName,
                        image: imgData.data.url,
                        category: data.category,
                        location: data.location,
                        originalPrice: data.OriginalPrice,
                        resalePrice: data.NewPrice,
                        yearsOfUse: data.YearsOfUse,
                        postDate: currentdate
                    }
                    fetch('http://localhost:5000/cars', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(product),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success('Your car added successfully')
                            }
                        })
                }
            })

    }
    return (
        <form onSubmit={handleSubmit(handleAddProduct)} className='my-6 '>
            <p className='text-cyan-500 text-center text-4xl font-semibold font-mono'>{currentdate}</p>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">Your Name</span>
                </label>
                <input type="text" {...register('YourName', { required: 'Put a YourName' })} placeholder="YourName" className="input input-bordered w-1/2" />
                {errors.YourName && <p className='text-error'>{errors.YourName.message}</p>}
            </div>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">ProductName</span>
                </label>
                <input type="text" {...register('ProductName', { required: 'Put a ProductName' })} placeholder="ProductName" className="input input-bordered w-1/2" />
                {errors.ProductName && <p className='text-error'>{errors.ProductName.message}</p>}
            </div>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">Add Picture</span>
                </label>
                <input type="file" {...register('image', { required: 'Need to use a image' })} className="" />
                {errors.image && <p className='text-error'>{errors.image.message}</p>}
            </div>
            <div className="form-control w-1/2 mx-auto mt-4">
                <select {...register('category', { required: 'Select a category' })} className="select select-bordered w-full max-w-xs">
                    <option disabled value={null} selected >Select a Category</option>
                    <option value='01'>Toyota</option>
                    <option value='02'>Honda</option>
                    <option value='03'>Audi</option>
                    <option value='04'>Mercedes</option>
                </select>
            </div>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">Location</span>
                </label>
                <input type="text" {...register('location', { required: 'Provide Your location' })} placeholder="Add location" className="input input-bordered w-1/2" />
                {errors.location && <p className='text-error'>{errors.location.message}</p>}
            </div>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">Original Price</span>
                </label>
                <input type="text" {...register('OriginalPrice', { required: 'Provide the Original price' })} placeholder="Original Price" className="input input-bordered w-1/2" />
                {errors.OriginalPrice && <p className='text-error'>{errors.OriginalPrice.message}</p>}
            </div>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">New Price</span>
                </label>
                <input type="text" {...register('NewPrice', { required: 'Provide the New price' })} placeholder="New Price" className="input input-bordered w-1/2" />
                {errors.NewPrice && <p className='text-error'>{errors.NewPrice.message}</p>}
            </div>
            <div className="form-control w-1/2 mx-auto mt-2">
                <label className="label">
                    <span className="label-text">Years of use</span>
                </label>
                <input type="text" {...register('YearsOfUse', { required: 'Put the Year of Use' })} placeholder="How many years you used the car" className="input input-bordered w-1/2" />
                {errors.YearsOfuse && <p className='text-error'>{errors.YearsOfuse.message}</p>}
            </div>
            <div className='w-1/2 mx-auto my-2'><input type="submit" className='btn btn-outline btn-wide' value="Submit" /></div>
        </form>
    );
};

export default AddCar;