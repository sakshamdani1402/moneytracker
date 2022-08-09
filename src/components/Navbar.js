import React from 'react'
import { Link, useLocation } from 'wouter'
const appNavbar = () => {
    const [location, setLocation] = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLocation('/login');
      }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Trackspense</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?"active": ""}`} aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/saved'?"active": ""}`} href="/saved">Saved</Link>
                        </li>
                    </ul>
                    {
                        !localStorage.getItem("token") ?
                        <div className="d-flex ms-auto justify-content-end">
                          <Link className="btn blue mx-2" to="/login" role="button">Login</Link>
                          <Link className="btn blue mx-2" to="/register" role="button">SignUp</Link>
                        </div> :
                        <div className="d-flex ms-auto justify-content-end">
                          <div onClick={handleLogout} className="btn blue mx-4">Logout</div>
                        </div>
                            
                    }
                </div>
            </div>
        </nav>

    )
}

export default appNavbar