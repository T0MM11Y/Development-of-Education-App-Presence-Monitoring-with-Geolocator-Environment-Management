import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import Swal from 'sweetalert2';


import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../configapi";

import ReactPaginate from 'react-paginate'; // Import ReactPaginate

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function MyQuillComponent({ content, setContent }) {
  return <ReactQuill value={content} onChange={setContent} />;
}

function TanyaJawab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isReplied, setIsReplied] = useState(false);
  const [content, setContent] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(6);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [filterHari, setFilterHari] = useState('');
  const [filterRespons, setFilterRespons] = useState('Belum Dijawab');

  const handleFilterHariChange = (newFilter) => {

    setFilterHari(newFilter);
    if (newFilter) {
      fetchQuestions();
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterResponsChange = (newFilter) => {
    setFilterRespons(newFilter);
    if (newFilter) {
      fetchQuestions();
    }
  };
  const fetchQuestions = async () => {
    let url = `${BASE_URL}api/tanyajawab`;

    const response = await fetch(url);
    let data = await response.json();

    data.sort((a, b) => new Date(b.tanggal_tanya) - new Date(a.tanggal_tanya));
    // Filter by date
    if (filterHari) {
      const today = new Date();
      switch (filterHari) {
        case 'Hari Ini':
          data = data.filter(item => new Date(item.tanggal_tanya).toDateString() === today.toDateString());
          break;
        case 'Semalam':
          let yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          data = data.filter(item => new Date(item.tanggal_tanya).toDateString() === yesterday.toDateString());
          break;
        case 'Bulan Ini':
          data = data.filter(item => new Date(item.tanggal_tanya).getMonth() === today.getMonth());
          break;
        case 'Tahun Ini':
          data = data.filter(item => new Date(item.tanggal_tanya).getFullYear() === today.getFullYear());
          break;
        default:
          break;
      }
    }


    // Filter by response status
    if (filterRespons) {
      switch (filterRespons) {
        case 'Belum Dijawab':
          data = data.filter(item => !item.jawaban);
          break;
        case 'Sudah Dijawab':
          data = data.filter(item => !!item.jawaban);
          break;
        default:
          break;
      }
    }
    data = data.filter(item =>
      (item.pertanyaan ? item.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (item.user && item.user.Nama_Depan ? item.user.Nama_Depan.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (item.user && item.user.Nama_Belakang ? item.user.Nama_Belakang.toLowerCase().includes(searchTerm.toLowerCase()) : false)
    );
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [filterHari, filterRespons, searchTerm]);

  const pageCount = Math.ceil(questions.length / perPage); // Calculate total pages

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Balasan tidak boleh kosong',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return; // Return early from the function
    }
    const response = await fetch(`${BASE_URL}api/tanyajawab/${currentQuestionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jawaban: content }),
    });

    if (response.ok) {
      // If the response is ok, refresh the questions and return to the first page
      fetchQuestions();
      setCurrentPage(0);
      Swal.fire({
        title: 'Success!',
        text: 'Balasan berhasil dikirim',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Close the modal
        var modal = document.getElementById('event-modal');
        var modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.classList.remove('modal-backdrop');
        }
        modal.style.display = 'none';
      });
    }
  };

  const handleReplyClick = (id, answer) => {
    setCurrentQuestionId(id);
    setCurrentAnswer(answer);
    setIsReplied(!!answer);
  };

  const offset = currentPage * perPage;
  const currentData = questions.slice(offset, offset + perPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  }


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
                  <div className="btn-toolbar p-3" role="toolbar">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 className="card-title">Semua Pertanyaan</h4>
                    </div>
                    <br></br>
                    <p className="card-title-desc" >
                      This page displays all students in a searchable and paginated table. You can interact with the table to copy the data, download it as Excel or PDF. The data is fetched from an external API and updates dynamically.
                    </p>

                    <div class="btn-group me-2 mb-2 mb-sm-0">
                      <button type="button" class="btn btn-light waves-light waves-effect dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginRight: '13px' }}>
                        <i class="ri-history-line"></i> {filterHari || 'Filter Hari'}<i class="mdi mdi-chevron-down ms-1"></i>
                      </button>

                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" onClick={() => handleFilterHariChange('')}>Semua</a>
                        <a class="dropdown-item" href="#" onClick={() => handleFilterHariChange('Hari Ini')}>Hari Ini</a>
                        <a class="dropdown-item" href="#" onClick={() => handleFilterHariChange('Semalam')}>Semalam</a>
                        <a class="dropdown-item" href="#" onClick={() => handleFilterHariChange('Bulan Ini')}>Bulan Ini</a>
                        <a class="dropdown-item" href="#" onClick={() => handleFilterHariChange('Tahun Ini')}>Tahun Ini</a>
                      </div>
                    </div>
                    <div class="btn-group me-2 mb-2 mb-sm-0">
                      <button type="button" class="btn btn-light waves-light waves-effect dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="ri-find-replace-line"></i> {filterRespons || 'Filter Respons'}<i class="mdi mdi-chevron-down ms-1"></i>
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" onClick={() => handleFilterResponsChange('')}>Semua</a>
                        <a class="dropdown-item" href="#" onClick={() => handleFilterResponsChange('Belum Dijawab')}>Belum Dijawab</a>
                        <a class="dropdown-item" href="#" onClick={() => handleFilterResponsChange('Sudah Dijawab')}>Sudah Dijawab</a>
                      </div>
                    </div>
                    {/**biar kekanan  */}
                    <div class="btn-group " style={{ marginLeft: 'auto' }}>
                      <div id="datatable-buttons_filter" className="dataTables_filter">
                        <div className="input-group">
                          <input type="search" className="form-control form-control-sm" placeholder="Cari disini" aria-controls="datatable-buttons" value={searchTerm} onChange={handleSearchChange} />
                          <div className="input-group-append">
                            <span className="input-group-text">
                              <i className="fas fa-search"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>


                    <table id="datatable-buttons" className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline">
                      <thead>
                        <tr>
                          <th style={{ width: '10%' }}>#</th>
                          <th style={{ width: '30%' }}>Nama</th>
                          <th style={{ width: '50%' }}>Pertanyaan</th>
                          <th style={{ width: '20%' }}>Dikirim</th>
                          <th style={{ width: '10%' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody >
                        {questions.length > 0 ? (
                          currentData.map((question, index) => (
                            <tr key={index} style={{ backgroundColor: (index % 2 === 0) ? '#f8f9fa' : '#F0F4FA', margin: '2px' }}>                        <td>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <span
                                  style={{ fontSize: '14px', marginRight: '3px', fontFamily: 'cursive' }}
                                >
                                  {index + 1 + currentPage * perPage}
                                </span>
                                <i
                                  class={question.jawaban ? "ri-mail-check-fill" : "ri-mail-unread-fill"}
                                  style={{
                                    fontSize: '13px',
                                    marginBottom: '14px',
                                    color: question.jawaban ? '#008000' : '#ED7F7F'
                                  }}
                                ></i>
                              </div>
                            </td>
                              <td>{question.user.Nama_Depan}</td>
                              <td>{question.pertanyaan}</td>
                              <td>{timeSince(new Date(question.tanggal_tanya))}</td>
                              <td>
                                <button
                                  type="button"
                                  data-bs-toggle="modal" data-bs-target="#event-modal"
                                  className={question.jawaban ? "btn btn-success waves-effect waves-light" : "btn btn-warning waves-effect waves-light"}
                                  style={{ marginRight: "1em", width: "70px", height: "30px", fontSize: "11px" }}
                                  onClick={() => handleReplyClick(question.id, question.jawaban)}
                                >
                                  {question.jawaban ? <i className=" fas fa-eye" style={{ marginRight: "3 px" }}></i> : <i className="fa fa-reply" style={{ marginRight: "3px" }}></i>}
                                  <span style={{ fontSize: "10px" }}>
                                    {question.jawaban ? "Dijawab" : "Balas"}
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">Belum ada pertanyaan untuk hari ini</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div className="dataTables_info" id="datatable-buttons_info" role="status" aria-live="polite" style={{ marginLeft: '16px', marginTop: '10px ' }}>Showing {currentPage * perPage + 1} to {Math.min((currentPage + 1) * perPage, questions.length)} of {questions.length} entries</div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div className="dataTables_paginate paging_simple_numbers" id="datatable-buttons_paginate">
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={pageCount} // Use calculated pageCount
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={6}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`modal fade `} id="event-modal" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle" aria-modal="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <form onSubmit={handleSubmit}>

                        <div className="modal-header">
                          <h5 className="modal-title" id="composemodalTitle">Tanya Jawab</h5>
                        </div>

                        <div className="modal-body">
                          {!isReplied && (
                            <div className="mb-3">
                              <MyQuillComponent content={content} setContent={setContent} />
                            </div>
                          )}
                          {currentAnswer && (
                            <div className="mb-3">
                              <label style={{ fontSize: '11px', color: '#4a4a4a' }}>Jawaban:</label>
                              <div className="card" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '5px' }}>
                                <div className="card-body" style={{ padding: '1.5em' }}>
                                  <p className="card-text" style={{ fontSize: '11px', lineHeight: '1.9' }} dangerouslySetInnerHTML={{ __html: currentAnswer }}></p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-light me-1" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary" disabled={!!currentAnswer}>Send <i className="fab fa-telegram-plane ms-1"></i></button>                        </div>
                      </form>

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

export default TanyaJawab;