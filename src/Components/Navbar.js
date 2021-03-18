import React, { useContext } from "react";
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Navbar = ({ length }) => {

    const context = useContext(UserContext)

    return (
        <div className="navbar">
            <div className="branding">
                <Link to='/'>
                    <img src={logo} alt="" />
                </Link>
                <div className="selectAddress">
                    <a href="#" id="map-marker">
                        <i className="fa fa-map-marker"></i>
                        <div>
                            <span id="hello">Hello,</span>
                            <span><strong>{
                                context.user?.email ? context.user.email : 'Guest'
                            }</strong></span>
                        </div>
                    </a>
                </div>
            </div>
            <div className="searchBar">
                <div className="form-wrap">
                    <input type="text" name="search" placeholder="Search a product..." />
                    <button className="btn"><i className="fa fa-search"></i></button>
                </div>
            </div>
            <div className="navOptions">
                <div>
                    <span id="hello">Hello,</span>
                    {context.user ?
                        <span id="id" onClick={() => { context.setUser(null) }}><strong>Logout</strong></span>
                        :
                        <span id="id"><Link to='/login'><strong>Sign In</strong></Link></span>
                    }
                </div>
                <div>
                    <a href="#">
                        <span id="returns">Returns</span>
                        <span id="orders"><strong>& Orders</strong></span>
                    </a>
                </div>
                <div>
                    <Link to='/cart'>
                        <i className="fa fa-shopping-cart"> {length}</i>
                    </Link>
                </div>
            </div>
            <a className="menuBar" href="#"><i className="fa fa-bars"></i></a>
        </div>
    );
};

export default Navbar;
