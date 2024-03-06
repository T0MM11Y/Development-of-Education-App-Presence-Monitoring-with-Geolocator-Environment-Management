import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function Sidebar() {
    const [isOpen, setIsOpen] = useState({
        Siswa: false,
        Pengumuman: false,
        Matapelajaran: false,
        TanyaJawab: false,

    });
    const toggleDropdown = (name) => {
        setIsOpen({ ...isOpen, [name]: !isOpen[name] });
        
    };
    return (
        <div className="vertical-menu">

            <div data-simplebar className="h-100">

                <div className="user-profile text-center mt-5">
                    <div className="">
                        <img src="../robotprofilewhite.jpg" alt="" width={120} />
                    </div>
                    <div className="mt-3">
                        <h4 className="font-size-16 mb-1">Admin</h4>
                        <span className="text-muted"><i className="ri-record-circle-line align-middle font-size-14 text-success"></i> Online</span>
                    </div>
                </div>

                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        <li>
                            <Link to="/dashboard">
                                <i className="ri-dashboard-line"></i><span className="badge rounded-pill bg-success float-end">3</span>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <a href="calendar.html" className=" waves-effect">
                                <i className="ri-calendar-2-line"></i>
                                <span>Absensi</span>
                            </a>
                        </li>

                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect" onClick={() => toggleDropdown('Siswa')}>
                                <i className="ri-mail-send-line"></i>
                                <span>Siswa</span>
                            </a>
                            {isOpen.Siswa && (
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/all-siswa">All Siswa</Link></li>
                                    <li><Link to="/add-siswa">Add Siswa</Link></li>                                
                                    </ul>
                            )}
                        </li>

                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect" onClick={() => toggleDropdown('Pengumuman')}>
                                <i className="ri-layout-3-line"></i>
                                <span>Pengumuman</span>
                            </a>
                            {isOpen.Pengumuman && (
                                <ul className="sub-menu" aria-expanded="true">


                                    <li>
                                        <a href="javascript: void(0);" >All Pengumuman</a>

                                        <a href="javascript: void(0);" >Add Pengumuman</a>


                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect" onClick={() => toggleDropdown('Matapelajaran')}>
                                <i className="ri-layout-3-line"></i>
                                <span>Matapelajaran</span>
                            </a>
                            {isOpen.Matapelajaran && (
                                <ul className="sub-menu" aria-expanded="true">


                                    <li>
                                        <a href="javascript: void(0);" >All Matapelajaran</a>

                                        <a href="javascript: void(0);" >Add Matapelajaran</a>


                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect" onClick={() => toggleDropdown('TanyaJawab')}>
                                <i className="ri-layout-3-line"></i>
                                <span>TanyaJawab</span>
                            </a>
                            {isOpen.TanyaJawab && (
                                <ul className="sub-menu" aria-expanded="true">


                                    <li>
                                        <a href="javascript: void(0);" >All TanyaJawab</a>

                                        <a href="javascript: void(0);" >Add TanyaJawab</a>


                                    </li>
                                </ul>
                            )}
                        </li>


                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar; 