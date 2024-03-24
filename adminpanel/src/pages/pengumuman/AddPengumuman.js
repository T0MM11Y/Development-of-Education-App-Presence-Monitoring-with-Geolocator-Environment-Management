import React, { useState } from 'react';
import Header from '../../component/header';
import Sidebar from '../../component/sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';

import swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
function MyQuillComponent({ content, setContent }) {
    return <ReactQuill value={content} onChange={setContent} />;
}


function AddPengumuman() {
    const { BASE_URL } = require('../../configapi');

    const [judul, setJudul] = useState('');
    const [file, setFile] = useState(null); // For file input
    const navigate = useNavigate();
    const [content, setContent] = useState(''); // Add this line at the beginning of your component

    const [imageURL, setImageURL] = useState('/no-image-available.png'); // Default image URL
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('file', file);
        formData.append('content', content); // Append content
    
        console.log(content); // Add this line just before the fetch request
        const response = await fetch(`${BASE_URL}api/pengumuman`, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            window.toastr.success('Pengumuman berhasil ditambahkan!');
            navigate('/all-pengumuman')

        } else {
            toast.error('Error: ' + response.status);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Assuming you want to store the file in state
        setImageURL(URL.createObjectURL(e.target.files[0])); // Create a URL for the uploaded image file
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
                                        <h4 className="card-title">Tambahkan Pengumuman</h4>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Judul</label>
                                                <div className="col-sm-10">
                                                    <input className="form-control" type="text" placeholder="Masukkan Judul" id="example-text-input" value={judul} onChange={(e) => setJudul(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label htmlFor="example-date-input" className="col-sm-2 col-form-label">Isi</label>
                                                <div className="col-sm-10">
                                                    <MyQuillComponent content={content} setContent={setContent} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label htmlFor="customFile" className="col-sm-2 col-form-label">Upload File</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" id="customFile" onChange={handleFileChange} />
                                                </div>
                                            </div>  
                                            <div className="row mb-3">
                                                <div className="col-sm-10 offset-sm-2">
                                                    <img src={imageURL} alt="Uploaded" style={{ width: '10em', height: 'auto', marginBottom: '20px' }} />
                                                </div>
                                            </div>
                                            <div className="col-sm-10 offset">
                                                <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddPengumuman;