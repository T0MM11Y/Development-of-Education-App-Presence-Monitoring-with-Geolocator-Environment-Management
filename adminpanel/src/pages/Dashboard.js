import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Header from '../component/header';
import Sidebar from '../component/sidebar';

function App() {
    const token = localStorage.getItem('accessToken');
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    return (
        <div id="layout-wrapper">
            <Header />
            <Sidebar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Dashboard</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Upcube</a></li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate font-size-14 mb-2">Siswa</p>
                                                <h4 className="mb-2">10</h4>
                                                <p className="text-muted mb-0"><span className="text-success fw-bold font-size-12 me-2"><i className="ri-arrow-right-up-line me-1 align-middle"></i>9.23%</span>from previous period</p>
                                            </div>
                                            <div className="avatar-sm">
                                                <span className="avatar-title bg-light text-primary rounded-3">
                                                    <i className="ri-user-line font-size-24"></i> {/* Replaced with a user icon */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate font-size-14 mb-2">Pengumuman</p>
                                                <h4 className="mb-2">21</h4>
                                                <p className="text-muted mb-0"><span className="text-danger fw-bold font-size-12 me-2"><i className="ri-arrow-right-down-line me-1 align-middle"></i>1.09%</span>from previous period</p>
                                            </div>
                                            <div className="avatar-sm">
                                                <span className="avatar-title bg-light text-success rounded-3">
                                                    <i className="ri-notification-line font-size-24"></i> {/* Replaced with a notification icon */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate font-size-14 mb-2">Mata pelajaran</p>
                                                <h4 className="mb-2">13</h4>
                                                <p className="text-muted mb-0"><span className="text-success fw-bold font-size-12 me-2"><i className="ri-arrow-right-up-line me-1 align-middle"></i>16.2%</span>from previous period</p>
                                            </div>
                                            <div className="avatar-sm">
                                                <span className="avatar-title bg-light text-primary rounded-3">
                                                    <i className="ri-book-line font-size-24"></i> {/* Replaced with a book icon */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate font-size-14 mb-2">Tanya Jawab</p>
                                                <h4 className="mb-2">13</h4>
                                                <p className="text-muted mb-0"><span className="text-success fw-bold font-size-12 me-2"><i className="ri-arrow-right-up-line me-1 align-middle"></i>11.7%</span>from previous period</p>
                                            </div>
                                            <div className="avatar-sm">
                                                <span className="avatar-title bg-light text-success rounded-3">
                                                    <i className="ri-question-answer-line font-size-24"></i> {/* Replaced with a question-answer icon */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title mb-12">Latest Transactions</h4>
                                        <div className="table-responsive">
                                            <div style={{ textDecoration: 'none', overflow: 'hidden', maxWidth: '100%', width: '100%', height: '500px' }}>
                                                <div id="embed-ded-map-canvas" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
                                                    <iframe style={{ height: '100%', width: '100%', border: '0' }} frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=SMA+N+1+PARMAKSIAN,+JL.TANJUNGAN+DESA,+Jonggi+Manulus,+Toba,+Sumatera+Utara,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                                                </div>
                                                <a className="google-map-html" rel="nofollow" href="https://www.bootstrapskins.com/themes" id="grab-map-data">premium bootstrap themes</a>
                                                <style>{`
                #embed-ded-map-canvas img.text-marker {
                    max-width: none!important;
                    background: none!important;
                }
                img {
                    max-width: none;
                }
            `}</style>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <script>document.write(new Date().getFullYear())</script> © Upcube.
                            </div>
                            <div className="col-sm-6">
                                <div className="text-sm-end d-none d-sm-block">
                                    Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;