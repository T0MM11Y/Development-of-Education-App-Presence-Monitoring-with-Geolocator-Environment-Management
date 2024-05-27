import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import Swal from "sweetalert2";

function Absensi() {
  const { BASE_URL } = require("../../configapi");
  const [absensi, setAbsensi] = useState([]);
  const [filteredAbsensi, setFilteredAbsensi] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); // Jumlah data per halaman

  useEffect(() => {
    fetch(`${BASE_URL}api/absensi`)
      .then((res) => res.json())
      .then((data) => {
        // Sort data by tanggal in descending order
        data.data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        setAbsensi(data.data);
        setFilteredAbsensi(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredData = absensi.filter(
      (absen) =>
        absen.user.Nama_Depan.toLowerCase().includes(
          searchText.toLowerCase()
        ) ||
        absen.user.Nama_Belakang.toLowerCase().includes(
          searchText.toLowerCase()
        )
    );
    setFilteredAbsensi(filteredData);
  }, [searchText, absensi]);
  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this attendance record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${BASE_URL}api/absensi/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        // Fetch the updated attendance list
        const updatedAbsensiResponse = await fetch(`${BASE_URL}api/absensi`);
        const updatedAbsensiData = await updatedAbsensiResponse.json();
        updatedAbsensiData.data.sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
        );
        setAbsensi(updatedAbsensiData.data);
        setFilteredAbsensi(updatedAbsensiData.data);

        Swal.fire(
          "Deleted!",
          "Your attendance record has been deleted.",
          "success"
        );
      } catch (error) {
        console.error("Failed to delete the attendance record: ", error);
        Swal.fire(
          "Failed!",
          "Failed to delete the attendance record.",
          "error"
        );
      }
    }
  }
  const pageCount = Math.ceil(filteredAbsensi.length / perPage);
  const paginatedData = filteredAbsensi.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const filteredData = absensi.filter(
        (absen) =>
          new Date(absen.tanggal).toDateString() ===
          new Date(date).toDateString()
      );
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
                    <p className="card-title-desc">
                      List of attendance records for all students. You can
                      filter the attendance records by date and search for a
                      specific student.
                    </p>
                    <div className="table-rep-plugin">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <label
                            style={{ fontFamily: "cursive", fontSize: "12px" }}
                          >
                            Filter
                          </label>
                          <i
                            className=" ri-time-fill"
                            aria-hidden="true"
                            style={{
                              fontSize: "19px",
                              color: "#189881",
                              marginLeft: "10px",
                            }}
                          ></i>
                          <input
                            type="date"
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="form-control"
                            value={
                              selectedDate
                                ? new Date(selectedDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            id="example-date-input"
                            style={{
                              padding: "7px",
                              width: "80px",
                              fontSize: "9px",
                              border: "none",
                              borderRadius: "5px",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                              color: "#987118",
                              fontFamily: "cursive",
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
                              style={{ width: "16em" }}
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
                              <th data-priority="3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedData.map((absen, index) => (
                              <tr key={index}>
                                <td>{currentPage * perPage + index + 1}</td>{" "}
                                <td>
                                  {absen.user.Nama_Depan.toLowerCase()
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}{" "}
                                  {absen.user.Nama_Belakang.toLowerCase()
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}
                                </td>
                                <td>
                                  {new Date(absen.tanggal).toLocaleDateString(
                                    "id-ID"
                                  ) +
                                    " " +
                                    new Date(absen.tanggal).toLocaleTimeString(
                                      "id-ID",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      }
                                    )}
                                </td>
                                <td>{absen.status}</td>
                                <td>
                                  <a
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(absen.ID)}
                                  >
                                    Hapus
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          <div
                            className="dataTables_info"
                            id="datatable-buttons_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing {currentPage * perPage + 1} to{" "}
                            {Math.min(
                              (currentPage + 1) * perPage,
                              absensi.length
                            )}{" "}
                            of {absensi.length} entries
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
                              pageRangeDisplayed={10}
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
    </div>
  );
}
export default Absensi;
