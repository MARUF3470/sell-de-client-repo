import React from 'react';
import { useRouteError } from 'react-router-dom';
import img from '../../../components/images/images.png'

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div id="error-page" className='text-center'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <img src={img} alt="" className='mx-auto' />
        </div>
    );
};

export default ErrorPage;