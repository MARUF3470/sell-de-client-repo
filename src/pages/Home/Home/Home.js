import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Advertisement from '../../Advertisement/Advertisement';
import Banner from '../Banner/Banner';

const Home = () => {
    const categories = [
        {
            id: '01',
            name: 'Toyota',
            img: 'https://www.nicepng.com/png/detail/377-3770207_toyota-logo-png-transparent-image-toyota-logo-black.png'
        },
        {
            id: '02',
            name: 'Honda',
            img: 'https://wieck-honda-production.s3.amazonaws.com/photos/84f6fb4995d66654633de74fd1c9d50e13862731/preview-928x522.jpg',
        },
        {
            id: '03',
            name: 'Audi',
            img: 'https://www.carlogos.org/car-logos/audi-logo-1985.png'
        },
        {
            id: '04',
            name: 'Mercedes',
            img: 'https://1000logos.net/wp-content/uploads/2018/04/Mercedes-Logo-1933.jpg'
        },
    ]
    const banks = [
        {
            id: '01',
            name: 'City Bank',
            img: 'https://www.thecitybank.com/newsevent/1623311243.jpg'
        },
        {
            id: '02',
            name: 'London Bank',
            img: 'https://images.ctfassets.net/7vw91n4qhnrl/lPmIAWK0j2kVNpXIm80kO/25d8544bdbb186cdf1e5768d9e36fed9/tbol-opengraph.png'
        },
        {
            id: '03',
            name: 'Capital Bank',
            img: 'https://innovia-iskibris.s3.eu-west-2.amazonaws.com/1_5fcdecc8d5dc1.png'
        },
        {
            id: '04',
            name: 'Ocean Bank',
            img: 'https://play-lh.googleusercontent.com/q5wqKXhyn4ubmHHWcqyCAcZJU1t6pmSUtzzdc8WSAEJD_ml0mu2l4Rp7XRRKuLjj2KA'
        },
    ]
    const { data: advertisements = [], refetch, isLoading } = useQuery(
        {
            queryKey: [],
            queryFn: async () => {
                const res = await fetch('http://localhost:5000/car/advertice')
                const data = await res.json()
                return data
            }
        }
    )

    console.log(advertisements)

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
                        categories.map(category => <Link key={category.id} to={`/category/${category.id}`} className='mr-2 '><img className='w-40 inline-block rounded-xl border h-20 my-2' src={category.img} alt="" /></Link>)
                    }
                </div>
            </div>
            {advertisements.length > 0 &&
                <div className='w-3/4 mx-auto'>
                    <h1 className='font-semibold text-3xl text-center'>Advertisements</h1>
                    <div className='grid grid-cols-1 lg:grid-cols-3'>
                        {
                            advertisements.map(advertisement => <Advertisement key={advertisement._id} advertisement={advertisement}></Advertisement>)
                        }
                    </div>
                </div>
            }
            <div className='my-24'>
                <h1 className='text-3xl font-semibold text-center'>Our Banking partners</h1>
                <p className='text-center'>Do you need car laon? Our Banking partners can help you with minimul trams and conditions.</p>
                <div className='grid lg:grid-cols-4 my-6'>
                    {
                        banks.map(bank => <div key={bank._id} className="card w-80 h-20 bg-base-100 shadow-xl image-full mx-auto my-4">
                            <figure><img src={bank.img} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{bank.name}</h2>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;