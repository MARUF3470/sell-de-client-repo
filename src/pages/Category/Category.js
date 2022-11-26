import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Car from './car/Car';

const Category = () => {
    const cars = useLoaderData()

    return (
        <div>
            {
                cars.map(car => <Car key={car._id} car={car}></Car>)
            }
        </div>
    );
};

export default Category;