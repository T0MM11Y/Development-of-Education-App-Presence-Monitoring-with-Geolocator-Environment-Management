import React, { useEffect, useState } from 'react';
import Header from '../../component/header';
import Sidebar from '../../component/sidebar';
import Footer from '../../component/footer';
import Swal from 'sweetalert2';

function AllKelas() {
    const [kelas, setKelas] = useState([]);
    const [namaKelas, setNamaKelas] = useState('');
    const [selectedKelas, setSelectedKelas] = useState(null);
    const { BASE_URL } = require('../../configapi');
    const [editingKelas, setEditingKelas] = useState(null);
    useEffect(() => {
        fetch(`${BASE_URL}api/kelas`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setKelas(data);
                    // Find the "X IPA 1" class and set it as the selected class
                    const defaultClass = data.find(kelasItem => kelasItem.nama_kelas === 'X IPA 1');
                    if (defaultClass) {
                        handleButtonClick(defaultClass.id);
                    }
                }
            });
    }, []);

    const handleNamaKelasChange = (event) => {
        setNamaKelas(event.target.value);
    };
    // Add a new function to handle the button click
    const handleButtonClick = (kelasId) => {
        fetch(`${BASE_URL}api/kelas/${kelasId}`)
            .then(response => response.json())
            .then(data => setSelectedKelas(data))
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire(
                    'Gagal!',
                    'Terjadi kesalahan saat mengambil data kelas!',
                    'error'
                );

            });
    };
    const handleDeleteButtonClick = (kelasId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${BASE_URL}api/kelas/${kelasId}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        setKelas(kelas.filter(kelasItem => kelasItem.id !== kelasId));
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        Swal.fire(
                            'Failed!',
                            'There was an error deleting this class.',
                            'error'
                        );
                    });
            }
        })
    };

    const handleEditButtonClick = (kelasId) => {
        const kelasToEdit = kelas.find(kelasItem => kelasItem.id === kelasId);
        setEditingKelas(kelasToEdit);
    };



    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        // Send a PUT request to the server to update the class
        fetch(`${BASE_URL}api/kelas/${editingKelas.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingKelas),
        })
            .then(response => response.json())
            .then(data => {
                // Update the class in the local state
                setKelas(kelas.map(kelasItem => kelasItem.id === data.id ? data : kelasItem));
                setEditingKelas(null);
                Swal.fire(
                    'Berhasil!',
                    'Kelas berhasil diperbarui!',
                    'success'
                );
                // Close the modal
                var modal = document.getElementById('edit-modal');
                var modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.classList.remove('modal-backdrop');
                }
                modal.style.display = 'none';

            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire(
                    'Gagal!',
                    'Terjadi kesalahan saat memperbarui kelas!',
                    'error'
                );
            });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const existingClass = kelas.find(kelasItem => kelasItem.nama_kelas === namaKelas);
        if (existingClass) {
            Swal.fire(
                'Gagal!',
                'Kelas dengan nama ini sudah ada!',
                'error'
            );
            return;
        }

        fetch(`${BASE_URL}api/kelas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nama_kelas: namaKelas }),
        })
            .then(response => response.json())
            .then(data => {
                setKelas(prevKelas => [...prevKelas, data]);
                setNamaKelas('');
                Swal.fire(
                    'Berhasil!',
                    'Kelas berhasil ditambahkan!',
                    'success'
                );
                //TUTUP MODAL
                var modal = document.getElementById('event-modal');
                var modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.classList.remove('modal-backdrop');
                }
                modal.style.display = 'none';

            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire(
                    'Gagal!',
                    'Terjadi kesalahan saat menambahkan kelas!',
                    'error'
                );
                //TUTUP MODAL 
                var modal = document.getElementById('event-modal');
                var modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.classList.remove('modal-backdrop');
                }
                modal.style.display = 'none';
            });
    };

    const colors = ['bg-success', 'bg-primary']; // Add more colors if needed

    return (
        <div id="layout-wrapper">
            <Header />
            <Sidebar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex a  lign-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Daftar Kelas</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Upcube</a></li>
                                            <li className="breadcrumb-item active">Calendar</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <button type="button" class="btn btn-info waves-effect waves-info w-100" id="btn-new-event" data-bs-toggle="modal" data-bs-target="#event-modal">
                                            Tambahkan Kelas
                                        </button>

                                        <div id="external-events">
                                            <br />
                                            <p className="text-muted">Daftar Kelas </p>

                                            {Array.isArray(kelas) && kelas.map((kelasItem, index) => (
                                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <button
                                                        className={`external-event fc-event w-100 ${colors[index % colors.length]}`}
                                                        data-className={colors[index % colors.length]}
                                                        onClick={() => handleButtonClick(kelasItem.id)}
                                                        style={{ flex: 1 }} // This will make the button take up the remaining space
                                                    >
                                                        <i className="mdi font-size-11 me-2"></i>{kelasItem.nama_kelas}
                                                    </button>
                                                    <button
                                                        id="btn-new-edit"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-modal"
                                                        type="button"
                                                        class="btn btn-warning waves-effect waves-light "
                                                        onClick={() => handleEditButtonClick(kelasItem.id)}
                                                        style={{ marginRight: '5px' }}
                                                    >
                                                        <i class="far fa-edit align-middle "></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        class="btn btn-danger waves-effect waves-light"
                                                        onClick={() => handleDeleteButtonClick(kelasItem.id)}
                                                    >
                                                        <i class=" fas fa-trash-alt align-middle "></i>
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                <div className="card mb-0">
                                    <div class="card-body">
                                        {selectedKelas && (
                                            <>
                                                <h4 class="card-title"> {selectedKelas.nama_kelas}</h4>
                                            </>
                                        )}
                                        <p class="card-title-desc">
                                            Jumlah siswa: {selectedKelas && selectedKelas.users ? selectedKelas.users.length : 0}
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>NISN </th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Jenis Kelamin</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedKelas ? selectedKelas.users.map((user, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user.NISN}</td>
                                                            <td>{user.Nama_Depan}</td>
                                                            <td>{user.Email}</td>
                                                            <td>{user.Jenis_Kelamin}</td>
                                                        </tr>
                                                    )) : (
                                                        <tr><td colSpan="5"><center>Pilih salah satu kelas untuk menampilkan daftar siswa</center></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ clear: 'both' }}></div>

                        <div className="modal fade" id="event-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" style={{ display: 'none' }} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header py-3 px-4">
                                        <h5 className="modal-title" id="modal-title">Tambahkan Kelas</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body p-4">
                                        <form className="needs-validation" name="event-form" id="form-event" noValidate="" onSubmit={handleFormSubmit}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Nama Kelas</label>
                                                        <input className="form-control" placeholder="Masukkan Nama Kelas" type="text" name="title" id="event-title" required="" value={namaKelas} onChange={handleNamaKelasChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-12 text-end">
                                                    <button type="button" className="btn btn-light me-1" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-success" id="btn-save-event">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="modal fade" id="edit-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" style={{ display: 'none' }} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header py-3 px-4">
                                        <h5 className="modal-title" id="modal-title">Edit Kelas</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body p-4">
                                        <form className="needs-validation" name="event-form" id="form-event" noValidate="" onSubmit={handleEditFormSubmit}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Nama Kelas</label>
                                                        <input className="form-control" placeholder="Masukkan Nama Kelas" type="text" name="title" id="event-title" required="" value={editingKelas ? editingKelas.nama_kelas : ''} onChange={event => setEditingKelas({ ...editingKelas, nama_kelas: event.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-12 text-end">
                                                    <button type="button" className="btn btn-light me-1" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-success" id="btn-save-event">Save</button>
                                                </div>
                                            </div>
                                        </form>
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
export default AllKelas;

