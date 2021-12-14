import React from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';


const Navbar = () => {
  return(
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark shadow">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-3" to="/home">
                      BidX
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="navbar-nav">
                            <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to='/home'>Home</NavLink>
                            <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/UserLogin'>Login</NavLink>
                            {/* <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/contactus'>Contact Us</NavLink>
                            <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/career'>Careers</NavLink>
                            <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/about'>About Us</NavLink> */}
                    </div>
                    </div>
                </div>
                </nav>
        </>
   )

 }

export default Navbar