import React, { useEffect, useState } from 'react';
import Header from '../../component/header';
import Sidebar from '../../component/sidebar';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

function AddPengajar() {
    const [kelas, setKelas] = useState([]);
    const { BASE_URL } = require('../../configapi');
    const [formData, setFormData] = useState({
        NIP: '',
        Nama_Depan: '',
        Nama_Belakang: '',
        Agama: '',
        Email: '',
        Bidang: '',
        Alamat: '',
        Jenis_Kelamin: '',
        Tanggal_Lahir: '',
        Urlphoto: '',
        KelasID: '', // Added KelasID field to formData state
    });
    const [imageURL, setImageURL] = useState("/no-image-available.png");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}api/kelas`)
            .then(response => response.json())
            .then(data => setKelas(data));
    }, []);

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
        const requiredFields = ['NIP', 'Nama_Depan', 'Nama_Belakang', 'Agama', 'Email', 'Bidang', 'Alamat', 'Jenis_Kelamin', 'Tanggal_Lahir'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Field ${field} is required`,
                });
                return; // Prevent the form from being submitted
            }
        }
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key].toString());
        });

        const fileField = document.querySelector('input[type="file"]');
        data.append('file', fileField.files[0]);

        const response = await fetch(`${BASE_URL}api/pengajar`, {
            method: 'POST',
            body: data,
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.user_id) {
            setImageURL("/no-image-available.png");
            setFormData({
                NIP: '',
                Nama_Depan: '',
                Nama_Belakang: '',
                Agama: '',
                Email: '',
                Bidang: '',
                Alamat: '',
                Jenis_Kelamin: '',
                Tanggal_Lahir: '',
                Urlphoto: '',
                KelasID: '', // Reset KelasID field
            });
            window.toastr.success('Pengajar berhasil ditambahkan!');
            navigate('/all-pengajar')
        } else if (responseData.message) {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseData.message,
            });
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
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Edit Pengajar</h4>
                                        <p className="card-title-desc">This form is used to update the details of a pengajar in the system. Please fill out all necessary fields and ensure the information is accurate and up-to-date.</p>
                                        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                                            <label htmlFor="NIP" className="form-label">NIP</label>
                                            <input type="text" name="NIP" className="form-control" placeholder="NIP" value={formData.NIP} onChange={handleChange} required />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Nama_Depan" className="form-label">Nama Depan</label>
                                                        <input type="text" className="form-control" id="Nama_Depan" name="Nama_Depan" placeholder="First name" value={formData.Nama_Depan} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Nama_Belakang" className="form-label">Nama Belakang</label>
                                                        <input type="text" className="form-control" id="Nama_Belakang" name="Nama_Belakang" placeholder="Last name" value={formData.Nama_Belakang} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Bidang" className="form-label">Bidang</label>
                                                        <input type="text" className="form-control" id="Bidang" name="Bidang" placeholder="Bidang" value={formData.Bidang} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Agama" className="form-label">Agama</label>
                                                        <input type="text" className="form-control" id="Agama" name="Agama" placeholder="Agama" value={formData.Agama} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Email" className="form-label">Email</label>
                                                        <input type="email" className="form-control" id="Email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Alamat" className="form-label">Alamat</label>
                                                        <input type="text" className="form-control" id="Alamat" name="Alamat" placeholder="Alamat" value={formData.Alamat} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Jenis_Kelamin" className="form-label">Jenis Kelamin</label>
                                                        <select className="form-select" id="Jenis_Kelamin" name="Jenis_Kelamin" value={formData.Jenis_Kelamin} onChange={handleChange} required>
                                                            <option value="">Pilih...</option>
                                                            <option value="Laki-Laki">Laki-laki</option>
                                                            <option value="Perempuan">Perempuan</option>
                                                            <option value="Lainnya">Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="Tanggal_Lahir" className="form-label">Tanggal Lahir</label>
                                                        <input type="date" className="form-control" id="Tanggal_Lahir" name="Tanggal_Lahir" value={formData.Tanggal_Lahir} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="customFile" className="form-label">Upload Photo</label>
                                                        <input type="file" className="form-control" id="customFile" onChange={handleFileChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="col-xl-3">
                                                    <img
                                                        src={imageURL}
                                                        alt="Uploaded"
                                                        style={{
                                                            width: imageURL === "/no-image-available.png" ? '112px' : '112px',
                                                            height: imageURL === "/no-image-available.png" ? '112px' : '112px',
                                                            margin: '30px',
                                                        }}
                                                    />                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <button className="btn btn-primary" type="submit">Submit Form <i class="  fas fa-arrow-circle-right align-middle ms-2"></i></button>
                                            </div>
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

export default AddPengajar;
