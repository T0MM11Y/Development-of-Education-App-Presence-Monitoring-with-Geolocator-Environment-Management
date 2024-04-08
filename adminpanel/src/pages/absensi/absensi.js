import React, { useState, useEffect } from 'react';
import Header from '../../component/header';
import Sidebar from '../../component/sidebar';
import Footer from '../../component/footer';
import ReactPaginate from 'react-paginate'; // Import ReactPaginate

function Absensi() {
    const { BASE_URL } = require('../../configapi');
    const [absensi, setAbsensi] = useState([]);
    const [filteredAbsensi, setFilteredAbsensi] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(10); // Jumlah data per halaman

    useEffect(() => {
        fetch(`${BASE_URL}api/absensi`)
            .then(res => res.json())
            .then(data => {
                // Sort data by tanggal in descending order
                data.data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
                setAbsensi(data.data);
                setFilteredAbsensi(data.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const filteredData = absensi.filter(absen =>
            absen.user.Nama_Depan.toLowerCase().includes(searchText.toLowerCase()) ||
            absen.user.Nama_Belakang.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredAbsensi(filteredData);
    }, [searchText, absensi]);

    const pageCount = Math.ceil(filteredAbsensi.length / perPage);
    const paginatedData = filteredAbsensi.slice(currentPage * perPage, (currentPage + 1) * perPage);
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            const filteredData = absensi.filter(absen => new Date(absen.tanggal).toDateString() === new Date(date).toDateString());
            setFilteredAbsensi(filteredData);
        } else {
            setFilteredAbsensi(absensi);
        }
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
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Absensi</h4>
                                        <p className="card-title-desc">This is an experimental awesome solution for responsive tables with complex data.</p>
                                        <div className="table-rep-plugin">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div>
                                                    <label style={{ fontFamily: 'cursive', fontSize: '12px' }}>Filter</label>
                                                    <i className=" ri-time-fill" aria-hidden="true" style={{ fontSize: '19px', color: '#189881', marginLeft: '10px' }}></i>
                                                    <input
                                                        type="date"
                                                        onChange={(e) => handleDateChange(e.target.value)}
                                                        className="form-control"
                                                        value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ""}
                                                        id="example-date-input"
                                                        style={{
                                                            padding: '7px',
                                                            width: '80px',
                                                            fontSize: '9px',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                                                            color: '#987118',
                                                            fontFamily: 'cursive',
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="input-group">
                                                        <input
                                                            type="search"
                                                            className="form-control form-control-sm"
                                                            placeholder="Cari Siswa"
                                                            onChange={(e) => setSearchText(e.target.value)}
                                                            style={{ width: '16em' }}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">
                                                                <i className="fas fa-search"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <table className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th data-priority="1">User</th>
                                                            <th data-priority="3">Waktu</th>
                                                            <th data-priority="3">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedData.map((absen, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{absen.user.Nama_Depan} {absen.user.Nama_Belakang}</td>
                                                                <td>{new Date(absen.tanggal).toLocaleDateString('id-ID') + ' ' + new Date(absen.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                                                <td>{absen.status}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-5">
                                                    <div className="dataTables_info" id="datatable-buttons_info" role="status" aria-live="polite">Showing {currentPage * perPage + 1} to {Math.min((currentPage + 1) * perPage, absensi.length)} of {absensi.length} entries</div>
                                                </div>
                                                <div className="col-sm-12 col-md-7">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="datatable-buttons_paginate">
                                                        <ReactPaginate
                                                            previousLabel={'previous'}
                                                            nextLabel={'next'}
                                                            breakLabel={'...'}
                                                            breakClassName={'break-me'}
                                                            pageCount={pageCount}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={10}
                                                            onPageChange={handlePageClick}
                                                            containerClassName={'pagination'}
                                                            subContainerClassName={'pages pagination'}
                                                            activeClassName={'active'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
export default Absensi;