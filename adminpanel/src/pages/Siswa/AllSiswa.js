import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import jsPDF from "jspdf"; // Untuk PDF
import autoTable from "jspdf-autotable"; // Untuk tabel PDF
import * as XLSX from "xlsx"; // Untuk Excel
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import { Link } from "react-router-dom";

import swal from "sweetalert2";

function AllSiswa() {
  const [siswas, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const { BASE_URL } = require("../../configapi");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); // Jumlah data per halaman
  const [kelas, setKelas] = useState([]);

  // Fetch data kelas dalam useEffect
  useEffect(() => {
    fetch(`${BASE_URL}api/kelas`)
      .then((response) => response.json())
      .then((data) => setKelas(data))
      .catch((error) => console.error(error));

    fetchData();
  }, [currentPage]);
  const fetchData = () => {
    const offset = currentPage * perPage;
    fetch(`${BASE_URL}api/siswa?_start=${offset}&_limit=${perPage}`)
      .then((response) => response.json())
      .then((data) => {
        setSiswa(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const deleteSiswa = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${BASE_URL}api/siswa/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              // Refresh the data
              fetchData();
              swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch((error) => console.error(error));
        }
      });
  };

  const filteredSiswas = Array.isArray(siswas)
    ? siswas.filter(
        (siswa) =>
          siswa.Nama_Depan.toLowerCase().includes(search.toLowerCase()) ||
          siswa.Nama_Belakang.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  const pageCount = Math.ceil(siswas.length / perPage);

  const paginatedData = filteredSiswas.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );
  const copyData = () => {
    const dataToCopy = siswas.map((siswa) => ({
      NISN: siswa.NISN,
      Nama_Depan: siswa.Nama_Depan,
      Nama_Belakang: siswa.Nama_Belakang,
      Kelas:
        kelas.find((kelasItem) => kelasItem.id === siswa.kelas_id)
          ?.nama_kelas || "Kelas tidak ditemukan",
    }));
    navigator.clipboard.writeText(JSON.stringify(dataToCopy));
  };
  const downloadExcel = () => {
    const modifiedData = siswas.map((siswa, index) => ({
      ID: index + 1,
      NISN: siswa.NISN,
      Nama: `${siswa.Nama_Depan} ${siswa.Nama_Belakang}`,
      Kelas:
        kelas.find((kelasItem) => kelasItem.id === siswa.kelas_id)
          ?.nama_kelas || "Kelas tidak ditemukan",
    }));

    modifiedData.push({
      ID: "",
      NISN: "",
      Nama: `Total Siswa: ${siswas.length}`,
      Kelas: "",
    });
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Siswa");
    XLSX.writeFile(wb, "siswa.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Daftar Siswa SMA N 1 PARMAKSIAN", 10, 10);
    const modifiedData = siswas.map((siswa, index) => [
      index + 1,
      siswa.NISN,
      `${siswa.Nama_Depan} ${siswa.Nama_Belakang}`,
      kelas.find((kelasItem) => kelasItem.id === siswa.kelas_id)?.nama_kelas ||
        "Kelas tidak ditemukan",
    ]);
    modifiedData.push(["", "", `Total Siswa: ${siswas.length}`, ""]);
    autoTable(doc, {
      startY: 20,
      head: [["ID", "NISN", "Nama", "Kelas"]],
      body: modifiedData,
    });
    doc.save("siswa.pdf");
  };

  if (loading) {
    return <div>Loading...</div>;
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
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="card-title">Semua Siswa</h4>
                    </div>
                    <br></br>
                    <p className="card-title-desc">
                      This page displays all students in a searchable and
                      paginated table. You can interact with the table to copy
                      the data, download it as Excel or PDF. The data is fetched
                      from an external API and updates dynamically.
                    </p>
                    <div
                      id="datatable-buttons_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="dt-buttons btn-group flex-wrap">
                            <button
                              className="btn btn-secondary buttons-copy buttons-html5"
                              tabIndex="0"
                              aria-controls="datatable-buttons"
                              type="button"
                              onClick={copyData}
                            >
                              <span>Copy</span>
                            </button>
                            <button
                              className="btn btn-secondary buttons-excel buttons-html5"
                              tabIndex="0"
                              aria-controls="datatable-buttons"
                              type="button"
                              onClick={downloadExcel}
                            >
                              <span>Excel</span>
                            </button>
                            <button
                              className="btn btn-secondary buttons-pdf buttons-html5"
                              tabIndex="0"
                              aria-controls="datatable-buttons"
                              type="button"
                              onClick={downloadPDF}
                            >
                              <span>PDF</span>
                            </button>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginLeft: "16px",
                              }}
                            >
                              <Link
                                to="/add-siswa"
                                className="btn btn-primary waves-effect waves-light"
                              >
                                Add Siswa{" "}
                                <i class=" fas fa-user-plus align-middle ms-2"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div
                            id="datatable-buttons_filter"
                            className="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder=""
                                aria-controls="datatable-buttons"
                                onChange={handleSearchChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <table
                      id="datatable-buttons"
                      className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline"
                    >
                      <thead>
                        <tr role="row">
                          <th>NO</th>
                          <th>NISN</th>
                          <th>Nama Depan</th>
                          <th>Nama Belakang</th>
                          <th>Kelas</th>
                          <th>Email</th>
                          <th className="action-column">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map(
                            (siswa, index) => (
                              console.log(siswa),
                              (
                                <tr key={siswa.ID}>
                                  <td>{currentPage * perPage + index + 1}</td>{" "}
                                  <td>{siswa.NISN}</td>
                                  <td>
                                    {siswa.Nama_Depan.toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </td>
                                  <td>
                                    {siswa.Nama_Belakang.toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </td>
                                  {/**ambil nama kelas berdasrkan foreign key */}
                                  <td>
                                    {kelas.find(
                                      (kelasItem) =>
                                        kelasItem.id === siswa.kelas_id
                                    )?.nama_kelas || "Kelas tidak ditemukan"}
                                  </td>
                                  <td>{siswa.Email}</td>
                                  <td>
                                    <Link
                                      to={`/edit-siswa/${siswa.ID}`}
                                      className="btn btn-warning"
                                      style={{ marginRight: "10px" }}
                                    >
                                      <i class="far fa-edit align-middle "></i>
                                    </Link>
                                    <button
                                      className="btn btn-danger waves-effect waves-light"
                                      onClick={() => deleteSiswa(siswa.ID)}
                                    >
                                      <i class=" fas fa-trash-alt align-middle "></i>
                                    </button>
                                  </td>
                                </tr>
                              )
                            )
                          )
                        ) : (
                          <tr>
                            <td colSpan="6">No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          id="datatable-buttons_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {currentPage * perPage + 1} to{" "}
                          {Math.min((currentPage + 1) * perPage, siswas.length)}{" "}
                          of {siswas.length} entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="datatable-buttons_paginate"
                        >
                          <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
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
  );
}

export default AllSiswa;
