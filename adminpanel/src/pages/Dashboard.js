import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

import Header from '../component/header';
import Footer from '../component/footer';
import Sidebar from '../component/sidebar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch('/api/check-auth', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                navigate('/login');
            }
        };

        checkAuthentication();
    }, [navigate]);

    if (!isAuthenticated) {
        return null;
    }
    const data = {
        labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        datasets: [
            {
                label: '# of absensi',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title mb-12">Based Location</h4>
                                        <div className="table-responsive">
                                            <div style={{ textDecoration: 'none', overflow: 'hidden', maxWidth: '100%', width: '100%', height: '300px' }}>
                                                <div id="embed-ded-map-canvas" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
                                                    <iframe title="Google Map" style={{ height: '100%', width: '100%', border: '0' }} frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=SMA+N+1+PARMAKSIAN,+JL.TANJUNGAN+DESA,+Jonggi+Manulus,+Toba,+Sumatera+Utara,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                                                </div>
                                                <a className="google-map-html" rel="nofollow" href="https://www.bootstrapskins.com/themes" id="grab-map-data">premium bootstrap themes</a>
                                                <style>{`#embed-ded-map-canvas img.text-marker {max-width: none!important;background: none!important;}img {max-width: none;}`}</style>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title mb-12">Latest Absensi</h4>
                                        <div className="table-responsive" style={{ height: '300px' }}>
                                            {/**chart */}
                                            <Bar data={data} options={options} />

                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </div>

    );
}

export default App;