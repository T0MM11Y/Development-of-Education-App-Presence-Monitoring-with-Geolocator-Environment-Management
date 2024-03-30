import React, { useState, useEffect } from 'react';
import Header from '../../component/header';
import Sidebar from '../../component/sidebar';
import Footer from '../../component/footer';

function Absensi() {
    const { BASE_URL } = require('../../configapi');
    const [absensi, setAbsensi] = useState([]);
    const [filteredAbsensi, setFilteredAbsensi] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetch(`${BASE_URL}api/absensi`)
            .then(res => res.json())
            .then(data => {
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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const filteredData = absensi.filter(absen => new Date(absen.tanggal).toDateString() === new Date(date).toDateString());
        setFilteredAbsensi(filteredData);
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
                                            <div className="btn-group me-2 mb-2 mb-sm-0">
                                                <div className="col-sm-10"><label style={{ fontFamily: 'cursive', fontSize: '12px' }}>Filter</label>
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

                                            </div>
                                            <div class="btn-group " style={{ marginLeft: '620px' }}>
                                                <div id="datatable-buttons_filter" className="dataTables_filter">
                                                    <div className="input-group">
                                                        <input
                                                            type="search"
                                                            className="form-control form-control-sm"
                                                            placeholder="Cari Siswa"
                                                            onChange={(e) => setSearchText(e.target.value)}
                                                            style={{ width: '130px' }}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">
                                                                <i className="fas fa-search"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mb-0 fixed-solution" data-pattern="priority-columns">
                                                <table id="tech-companies-1" className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th data-priority="1">User</th>
                                                            <th data-priority="3">Waktu</th>
                                                            <th data-priority="1">Lokasi</th>
                                                            <th data-priority="3">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {filteredAbsensi.map((absen, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{absen.user.Nama_Depan} {absen.user.Nama_Belakang}</td>
                                                                <td>{new Date(absen.tanggal).toLocaleDateString('id-ID') + ' ' + new Date(absen.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                                                <td>{absen.lokasi}</td>
                                                                <td>{absen.status}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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