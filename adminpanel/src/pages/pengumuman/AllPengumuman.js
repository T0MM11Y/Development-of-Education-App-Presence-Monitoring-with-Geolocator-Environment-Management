import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import { Link } from "react-router-dom";
import swal from "sweetalert2";

function AllPengumuman() {
  const [pengumumans, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const { BASE_URL } = require("../../configapi");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(4); // Jumlah data per halaman
  const filteredPengumumans = Array.isArray(pengumumans)
    ? pengumumans.filter((pengumuman) =>
        pengumuman.judul.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      const offset = currentPage * perPage;
      fetch(`${BASE_URL}api/pengumuman/`)
        .then((response) => response.json())
        .then((data) => {
          setPengumuman(data.data || []);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    fetchData(); // Memanggil fetchData saat currentPage berubah
  }, [currentPage, perPage]); // Memanggil fetchData saat currentPage atau perPage berubah

  const deletePengumuman = (id) => {
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
          fetch(`${BASE_URL}api/pengumuman/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                // Remove the deleted pengumuman from the pengumumans array
                setPengumuman(
                  pengumumans.filter((pengumuman) => pengumuman.id !== id)
                );
                swal.fire("Deleted!", "Your file has been deleted.", "success");
              } else {
                console.error("Error:", response.status);
              }
            })
            .catch((error) => console.error("Error:", error));
        }
      });
  };

  const pageCount = Math.ceil(filteredPengumumans.length / perPage);
  const paginatedData = filteredPengumumans.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="card-title">Semua Pengumuman</h4>
                    </div>
                    <br></br>
                    <p className="card-title-desc">
                      This page displays all announcements in a searchable and
                      paginated table. The data is fetched from an external API
                      and updates dynamically.
                    </p>
                    <div
                      id="datatable-buttons_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="dt-buttons btn-group flex-wrap"></div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginLeft: "16px",
                              marginBottom: "5px",
                            }}
                          >
                            <Link
                              to="/add-pengumuman"
                              className="btn btn-primary waves-effect waves-light"
                            >
                              Add Pengumuman{" "}
                              <i class="  ri-newspaper-line align-middle ms-2 "></i>
                            </Link>
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
                          <th>ID</th>
                          <th>Judul</th>
                          <th>Photo</th>
                          <th className="action-column">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((pengumuman, index) => (
                            <tr key={pengumuman.id}>
                              <td>{currentPage * perPage + index + 1}</td>
                              <td>{pengumuman.judul}</td>
                              <td>
                                <img
                                  src={
                                    BASE_URL +
                                    pengumuman.urlphoto.replace(
                                      "http://localhost:5000/",
                                      ""
                                    )
                                  }
                                  alt={pengumuman.judul}
                                  style={{ width: "60px", height: "60px" }}
                                />
                              </td>
                              <td>
                                <Link
                                  to={`/edit-pengumuman/${pengumuman.id}`}
                                  className="btn btn-warning"
                                  style={{ marginRight: "10px" }}
                                >
                                  {" "}
                                  <i class="far fa-edit align-middle "></i>
                                </Link>
                                <button
                                  className="btn btn-danger waves-effect waves-light"
                                  onClick={() =>
                                    deletePengumuman(pengumuman.id)
                                  }
                                >
                                  <i class=" fas fa-trash-alt align-middle "></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">No data available</td>
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
                          {Math.min(
                            (currentPage + 1) * perPage,
                            pengumumans.length
                          )}{" "}
                          of {pengumumans.length} entries
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
                            pageRangeDisplayed={4}
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

export default AllPengumuman;
