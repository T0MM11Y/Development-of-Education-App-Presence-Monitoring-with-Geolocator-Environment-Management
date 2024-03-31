import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import Header from '../component/header';
import Footer from '../component/footer';
import Sidebar from '../component/sidebar';

function App() {
    const [jumlahSiswa, setJumlahSiswa] = useState(0);
    const [jumlahSiswaLakiLaki, setJumlahSiswaLakiLaki] = useState(0);
    const [jumlahSiswaPerempuan, setJumlahSiswaPerempuan] = useState(0);
    const [jumlahPengajarLakiLaki, setJumlahPengajarLakiLaki] = useState(0);
    const [jumlahPengajarPerempuan, setJumlahPengajarPerempuan] = useState(0);
    const [jumlahPengumuman, setJumlahPengumuman] = useState(0);
    const [jumlahPengumumanHariIni, setJumlahPengumumanHariIni] = useState(0);
    const [jumlahPengajar, setJumlahPengajar] = useState(0);
    const [jumlahTanyaJawab, setJumlahTanyaJawab] = useState(0);
    const [jumlahTanyaJawabHariIni, setJumlahTanyaJawabHariIni] = useState(0);
    const [chartData, setChartData] = useState({});
    const [absensiData, setAbsensiData] = useState([]);

    const { BASE_URL } = require('../configapi');

    useEffect(() => {
        const fetchData = async () => {
            const responseSiswa = fetch(`${BASE_URL}api/siswa`).then(res => res.json());
            const responsePengumuman = fetch(`${BASE_URL}api/pengumuman`).then(res => res.json());
            const responseTanyaJawab = fetch(`${BASE_URL}api/tanyajawab`).then(res => res.json());
            const responsePengajar = fetch(`${BASE_URL}api/pengajar`).then(res => res.json());
            const responseAbsensi = fetch(`${BASE_URL}api/absensi`).then(res => res.json()).then(data => data.data);

            const [dataSiswa, dataPengumuman, dataPengajar, dataTanyaJawab, absensiData] = await Promise.all([responseSiswa, responsePengumuman, responsePengajar, responseTanyaJawab, responseAbsensi]);

            const siswaLakiLaki = dataSiswa.filter(siswa => siswa.Jenis_Kelamin === 'Laki-Laki');
            const siswaPerempuan = dataSiswa.filter(siswa => siswa.Jenis_Kelamin === 'Perempuan');
            const pengajarLakiLaki = dataPengajar.filter(pengajar => pengajar.Jenis_Kelamin === 'Laki-Laki');
            const pengajarPerempuan = dataPengajar.filter(pengajar => pengajar.Jenis_Kelamin === 'Perempuan');

            setJumlahSiswaLakiLaki(siswaLakiLaki.length);
            setJumlahSiswaPerempuan(siswaPerempuan.length);
            setJumlahSiswa(dataSiswa.length);
            setJumlahPengumuman(dataPengumuman.length);
            setJumlahPengajar(dataPengajar.length);
            setJumlahPengajarLakiLaki(pengajarLakiLaki.length);
            setJumlahPengajarPerempuan(pengajarPerempuan.length);
            setJumlahTanyaJawab(dataTanyaJawab.length);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const pengumumanHariIni = dataPengumuman.data.filter(pengumuman => {
                const createdDate = new Date(pengumuman.Created_At);
                createdDate.setHours(0, 0, 0, 0);
                return createdDate.getTime() === today.getTime();
            });

            setJumlahPengumumanHariIni(pengumumanHariIni.length);

            const tanyaJawabHariIni = dataTanyaJawab.filter(tanyaJawab => {
                const createdDate = new Date(tanyaJawab.tanggal_tanya);
                createdDate.setHours(0, 0, 0, 0);
                return createdDate.getTime() === today.getTime();
            });
            setJumlahTanyaJawabHariIni(tanyaJawabHariIni.length);

            const absensiPerDay = absensiData.reduce((acc, curr) => {
                const date = new Date(curr.tanggal).toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = 0;
                }
                acc[date]++;
                return acc;
            }, {});

            const chartData = {
                labels: Object.keys(absensiPerDay),
                datasets: [{
                    label: 'Absensi per Hari',
                    data: Object.values(absensiPerDay),
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1
                }]
            };

            setChartData(chartData);
        };

        fetchData();
    }, []);

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
                                <Link to="/all-siswa">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-truncate font-size-18 mb-2">Siswa</p>
                                                    <h4 className="mb-2">
                                                        <label style={{ fontFamily: 'cursive', fontWeight: 'lighter' }}>Jumlah Siswa</label> : {jumlahSiswa}
                                                    </h4>
                                                    <p className="text-muted mb-0">
                                                        <span className="text-primary fw-bold font-size-12 me-2">
                                                            <i className="ri-user-3-line me-1 align-middle"></i>
                                                            {jumlahSiswaLakiLaki} Laki-Laki
                                                        </span>
                                                        <span className="text-danger fw-bold font-size-12 me-2" style={{ marginLeft: '10px' }}>
                                                            <i className="ri-user-2-line me-1 align-middle"></i>
                                                            {jumlahSiswaPerempuan} Perempuan
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-light text-primary rounded-3">
                                                        <i className="ri-user-line font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <Link to="/all-pengumuman">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-truncate text-success font-size-18 mb-2">Pengumuman</p>
                                                    <h4 className="mb-2">
                                                        <label style={{ fontFamily: 'cursive', fontWeight: 'lighter' }}>Jumlah Pengumuman</label> : {jumlahPengumuman}
                                                    </h4>
                                                    <p className="text-muted mb-0">
                                                        <span className="text-success fw-bold font-size-12 me-2">
                                                            <i className="ri-play-list-add-line me-1 align-middle"></i>
                                                            {jumlahPengumumanHariIni}
                                                        </span>
                                                        ditambahkan hari ini
                                                    </p>
                                                </div>
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-light text-success rounded-3">
                                                        <i className="ri-notification-line font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <Link to="/all-pengajar">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-truncate text-warning font-size-18 mb-2">Guru</p>
                                                    <h4 className="mb-2">
                                                        <label style={{ fontFamily: 'cursive', fontWeight: 'lighter' }}>Jumlah Guru</label> : {jumlahPengajar}
                                                    </h4>
                                                    <p className="text-muted mb-0">
                                                        <span className="text-primary fw-bold font-size-12 me-2">
                                                            <i className="ri-user-3-line me-1 align-middle"></i>
                                                            {jumlahPengajarLakiLaki} Laki-Laki
                                                        </span>
                                                        <span className="text-danger fw-bold font-size-12 me-2" style={{ marginLeft: '10px' }}>
                                                            <i className="ri-user-2-line me-1 align-middle"></i>
                                                            {jumlahPengajarPerempuan} Perempuan
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-light text-warning rounded-3">
                                                        <i className=" ri-team-line font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="card">
                                    <Link to="/tanya-jawab">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-truncate text-danger font-size-18 mb-2">Tanya Jawab</p>
                                                    <h4 className="mb-2">
                                                        <label style={{ fontFamily: 'cursive', fontWeight: 'lighter' }}>Jumlah Qna</label> : {jumlahTanyaJawab}
                                                    </h4>
                                                    <p className="text-muted mb-0">
                                                        <span className="text-danger fw-bold font-size-12 me-2">
                                                            <i className=" ri-question-answer-line me-1 align-middle"></i>
                                                            {jumlahTanyaJawabHariIni}
                                                        </span>
                                                        ditambahkan hari ini
                                                    </p>
                                                </div>
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-light text-danger rounded-3">
                                                        <i className="ri-notification-line font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
                                            <Bar data={chartData} options={options} />
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
    );
}

export default App;
