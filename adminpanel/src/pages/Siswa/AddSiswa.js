import React, { useEffect, useState } from 'react';
import Header from '../../component/header';
import Sidebar from '../../component/sidebar';
import { useNavigate } from 'react-router-dom';

import swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

function AddSiswa() {
    const [kelas, setKelas] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}api/kelas`)
            .then(response => response.json())
            .then(data => setKelas(data));
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        NISN: '',
        Nama_Depan: '',
        Nama_Belakang: '',
        KelasID: '',
        Agama: '',
        Email: '',
        Alamat: '',
        Jenis_Kelamin: '',
        Tanggal_Lahir: '',
        Password: '',
        Urlphoto: '',
    });

    const [imageURL, setImageURL] = useState("/no-image-available.png");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            Urlphoto: e.target.files[0],
        });
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key].toString());
        });

        const fileField = document.querySelector('input[type="file"]');
        data.append('file', fileField.files[0]);
        const response = await fetch(`${BASE_URL}api/register`, {
            method: 'POST',
            body: data,
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.user_id) {
            setImageURL("/no-image-available.png");
            setFormData({
                NISN: '',
                Nama_Depan: '',
                Nama_Belakang: '',
                KelasID: '',
                Agama: '',
                Email: '',
                Alamat: '',
                Jenis_Kelamin: '',
                Tanggal_Lahir: '',
                Password: '',
                Urlphoto: '',
            });
            window.toastr.success('Siswa berhasil ditambahkan!');
            navigate('/all-siswa')
        }
        else if (responseData.message) {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseData.message,
            });
        }
    };
    const { BASE_URL } = require('../../configapi');

    return (
        <div id="layout-wrapper">
            <Header />
            <Sidebar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Tambahkan Siswa</h4>
                                        <p className="card-title-desc">Formulir ini digunakan untuk menambahkan siswa baru ke dalam sistem. Harap isi semua bidang yang diperlukan dan pastikan informasinya akurat.</p>
                                        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                                            <input type="text" name="NISN" className="form-control" placeholder="NISN" value={formData.NISN} onChange={handleChange} required />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Nama_Depan" className="form-label">Nama Depan</label>
                                                        <input type="text" className="form-control" id="Nama_Depan" name="Nama_Depan" placeholder="First name" value={formData.Nama_Depan} onChange={handleChange} required />
                                                        <div className="valid-feedback"></div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Nama_Belakang" className="form-label">Nama Belakang</label>
                                                        <input type="text" className="form-control" id="Nama_Belakang" name="Nama_Belakang" placeholder="Last name" value={formData.Nama_Belakang} onChange={handleChange} required />
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label htmlFor="validationCustom03" className="form-label">Kelas</label>
                                                        <select className="form-select" id="validationCustom03" name="KelasID" value={formData.KelasID} onChange={handleChange} required>
                                                            <option defaultValue disabled value="">Choose...</option>
                                                            {kelas.map((kelasItem, index) => (
                                                                <option key={index} value={kelasItem.id}>{kelasItem.nama_kelas}</option>
                                                            ))}
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            Please select a valid state.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label htmlFor="validationCustom04" className="form-label">Agama</label>
                                                        <input type="text" className="form-control" name="Agama" required placeholder="Agama" value={formData.Agama} onChange={handleChange} />
                                                        <div className="invalid-feedback">
                                                            Please provide a valid Religion
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="mb-2">
                                                        <label htmlFor="validationCustom05" className="form-label">Email</label>
                                                        <input type="email" className="form-control" id="validationCustom05" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
                                                        <div className="invalid-feedback">
                                                            Please provide a valid email.
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="mb-2">
                                                        <label>Alamat</label>
                                                        <input type="text" className="form-control" name="Alamat" required placeholder="Alamat" value={formData.Alamat} onChange={handleChange} />                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="mb-3">
                                                        <label>Jenis Kelamin</label>
                                                        <select className="form-select" name="Jenis_Kelamin" aria-label="Default select example" value={formData.Jenis_Kelamin} onChange={handleChange}>
                                                            <option selected="">Pilih...</option>
                                                            <option value="Laki-Laki">Laki-laki</option>
                                                            <option value="Perempuan">Perempuan</option>
                                                            <option value="Lainnya">Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <label>Tanggal Lahir</label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-12">
                                                    <input className="form-control" required type="date" name="Tanggal_Lahir" value={formData.Tanggal_Lahir} onChange={handleChange} id="example-date-input" />
                                                </div>
                                            </div>

                                            <div className="input-group">
                                                <div className="col-sm-12">

                                                    <input type="file" className="form-control" id="customFile" onChange={handleFileChange} />
                                                </div>                                      </div>
                                            <br></br>
                                            <div className="col-xl-3">
                                                <img src={imageURL} alt="Uploaded" style={{ width: '10em', height: 'auto', 'marginBottom': '20px' }} />                                            </div>


                                            <button className="btn btn-primary" type="submit">Submit form</button>
                                        </form>
                                    </div>
                                </div>


                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSiswa;
