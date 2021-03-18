import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Products from './Products'

const Home = ({length, addtoCart}) => {
    return (
        <>
            <Navbar length={length}/>
            <Header/>
            <Products addtoCart={addtoCart}/>
        </>
    )
}

export default Home
