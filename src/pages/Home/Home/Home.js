import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';

const Home = () => {
    const categories = [
        {
            id: '01',
            name: 'Toyota'
        },
        {
            id: '02',
            name: 'Honda'
        },
        {
            id: '03',
            name: 'Audi'
        },
        {
            id: '04',
            name: 'Mercedes'
        },
    ]
    return (
        <div>
            <div className='lg:grid grid-cols-3 flex-row gap-2 items-center '>
                <div className='col-span-2'><Banner></Banner></div>
                <div>
                    <h3 className="text-4xl font-bold">Hey there,</h3>
                    <h5 className="text-2xl font-semibold">You want to buy or sell used car with best quality? you came to the rigth place.</h5>
                </div>
            </div>
            <div className='my-10 shadow-lg p-5'>
                <h1 className="text-5xl text-center">Categories</h1>
                <div className='text-center mt-4'>
                    {
                        categories.map(category => <Link key={category.id} to={`/category/${category.id}`} className='btn btn-sm btn-wide mr-2'>{category.name}</Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;