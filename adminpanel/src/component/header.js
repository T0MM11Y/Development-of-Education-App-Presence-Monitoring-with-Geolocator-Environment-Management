import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const { BASE_URL } = require('../configapi');

function Header() {
    const navigate = useNavigate();

    // Function to handle logout
    // Function to handle logoutimport Swal from 'sweetalert2';

    // Function to handle logout
    const handleLogout = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform logout operation here
                logoutOperation();
            }
        })
    };

    const logoutOperation = async () => {
        try {
            const response = await fetch(`${BASE_URL}api/logoutAdmin`, { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                if (data.message === 'Success') {
                    // Remove the access token from local storage
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    // Redirect the user to the login page
                    navigate('/login');
                }
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out', error);
        }
    };
    return (
        <header id="page-topbar" style={{ boxShadow: '0px 7px 6px #00000029' }}>
            <div className="navbar-header">
                <div className="d-flex">
                
                    <div className="navbar-brand-box">
                        <a href="index.html" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src="../images/real.png" alt="logo-sm" width="50% " style={{marginRight:'10em'}} />
                            </span>
                            <span className="logo-lg">
                                <img src="../images/real.png" alt="logo-dark" width="79%" />{/*real logo*/}
                            </span>
                        </a>

                        <a href="index.html" className="logo logo-light">
                            <span className="logo-sm">
                                <img src="../images/real.png" alt="logo-sm-light" width="50%"  style={{marginRight:'10em'}}/>
                            </span>
                            <span className="logo-lg">
                                <img src="../images/real.png" alt="logo-light" width="50%" style={{marginRight:'10em'}} />
                            </span>
                        </a>
                    </div>
                </div>

                <div className="d-flex">
                    <div className="dropdown d-inline-block user-dropdown">
                        <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle header-profile-user" src="../robotprofilewhite.jpg"
                                alt="Header Avatar" />
                            <span className="d-none d-xl-inline-block ms-1">Admin</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item text-danger" href="#" onClick={handleLogout}><i className="ri-shut-down-line align-middle me-1 text-danger"></i> Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;