import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../../pages/Home/Home/Home';
import Footer from '../../pages/shared/Header/Footer/Footer';
import Header from '../../pages/shared/Header/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;