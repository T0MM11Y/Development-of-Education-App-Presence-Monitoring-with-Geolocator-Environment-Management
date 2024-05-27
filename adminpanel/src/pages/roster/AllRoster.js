import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
// Mendefinisikan komponen AllRoster
function AllRoster() {
  // State untuk menyimpan data pengajar yang telah difilter
  const [filteredPengajar, setFilteredPengajar] = useState([]);

  // State untuk menyimpan data mata pelajaran
  const [mataPelajaran, setMataPelajaran] = useState([]);

  // State untuk menyimpan data roster
  const [rosters, setRosters] = useState([]);

  // State untuk menyimpan data kelas
  const [kelas, setKelas] = useState([]);

  // State untuk menyimpan hari yang dipilih
  const [selectedDay, setSelectedDay] = useState("");

  // State untuk menyimpan kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk menyimpan kelas yang dipilih
  const [selectedKelas, setSelectedKelas] = useState(null);

  // Mendapatkan URL dasar dari file konfigurasi
  const { BASE_URL } = require("../../configapi");

  // State untuk menyimpan halaman saat ini
  const [currentPage, setCurrentPage] = useState(0);

  // Konstanta untuk jumlah item per halaman
  const PER_PAGE = 5;

  //SEGALA MACAM KEPERLUAN EDIT ROSTER UNTUK MEMUNCULKAN MODAL DENGAN VALUE DARI YANG DISELECT

  // State untuk menyimpan data roster yang dipilih
  const [selectedRoster, setSelectedRoster] = useState(null);

  // Fungsi untuk menangani klik tombol edit
  const handleEditButtonClick = (roster) => {
    setSelectedRoster(roster);
    document.getElementById("edit-mata-pelajaran").value =
      roster.mata_pelajaran;
    document.getElementById("edit-kelas").value = roster.kelas_id;
    document.getElementById("edit-guru-pengajar").value = roster.pengajar_id;
    document.getElementById("edit-hari").value = roster.hari;
    document.getElementById("edit-waktu-mulai").value = roster.waktu_mulai;
    document.getElementById("edit-waktu-selesai").value = roster.waktu_selesai;
    document.getElementById("edit-roster-modal").click();
  };

  // Fungsi untuk menangani submit form edit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    // Mendapatkan nilai dari setiap field dalam form
    const mataPelajaran = event.target.elements["edit-mata-pelajaran"].value;
    const kelas = Number(event.target.elements["edit-kelas"].value); // Ubah string menjadi angka
    const guruPengajar = Number(
      event.target.elements["edit-guru-pengajar"].value
    ); // Ubah string menjadi angka
    const waktuMulai = event.target.elements["edit-waktu-mulai"].value;
    const waktuSelesai = event.target.elements["edit-waktu-selesai"].value;
    const hari = event.target.elements["edit-hari"].value;

    // Membuat objek data untuk dikirimkan ke API
    const data = {
      mata_pelajaran: mataPelajaran,
      kelas_id: kelas,
      pengajar_id: guruPengajar,
      waktu_mulai: waktuMulai,
      waktu_selesai: waktuSelesai,
      hari: hari,
    };

    // Mengirimkan data ke API
    fetch(`${BASE_URL}api/roster/${selectedRoster.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Roster updated successfully") {
          // Jika sukses, lakukan sesuatu di sini (misalnya, menampilkan pesan sukses)
          Swal.fire("Roster berhasil diubah", "", "success").then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire("Roster gagal diubah", "", "error");
        }
      })
      .catch((error) => console.error(error));
  };

  // Fetch data kelas dari API ketika komponen dimuat
  useEffect(() => {
    fetch(`${BASE_URL}api/kelas`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setKelas(data);
          handleAllClassesClick();
        }
      });
  }, []);

  // Fungsi untuk mengubah halaman saat ini
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  // Fungsi untuk mengubah pengajar yang difilter berdasarkan mata pelajaran yang dipilih
  const handleMataPelajaranChange = (event) => {
    const selectedMataPelajaran = event.target.value;
    const filtered = pengajar.filter((pengajarItem) =>
      pengajarItem.Bidang.split(",").includes(selectedMataPelajaran)
    );
    setFilteredPengajar(filtered);
  };

  // Menghitung offset berdasarkan halaman saat ini
  const offset = currentPage * PER_PAGE;

  // Mendapatkan data roster untuk halaman saat ini
  const currentPageData = rosters.filter(
    (roster) =>
      (!selectedDay || roster.hari === selectedDay) &&
      (roster.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roster.pengajar.Nama_Depan.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
        roster.pengajar.Nama_Belakang.toLowerCase().includes(
          searchTerm.toLowerCase()
        ))
  );

  // Menghitung jumlah halaman
  const pageCount = Math.ceil(rosters.length / PER_PAGE);

  // Fungsi untuk mengubah kata kunci pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch semua data roster dari API ketika komponen dimuat
  useEffect(() => {
    handleAllClassesClick();
  }, []);

  // Fungsi untuk fetch semua data roster dari API
  const handleAllClassesClick = () => {
    fetch(`${BASE_URL}api/roster`)
      .then((response) => response.json())
      .then((data) => {
        const rostersWithPengajarAndKelas = data.map((roster) => {
          return Promise.all([
            fetch(`${BASE_URL}api/pengajar/${roster.pengajar_id}`),
            fetch(`${BASE_URL}api/kelas/${roster.kelas_id}`),
          ])
            .then(([pengajarResponse, kelasResponse]) =>
              Promise.all([pengajarResponse.json(), kelasResponse.json()])
            )
            .then(([pengajar, kelas]) => {
              return { ...roster, pengajar, kelas };
            })
            .catch((error) => console.error(error));
        });
        return Promise.all(rostersWithPengajarAndKelas);
      })
      .then((rosters) => setRosters(rosters))
      .catch((error) => console.error(error));
  };

  // State untuk menyimpan data pengajar
  const [pengajar, setPengajar] = useState([]);
  // Fetch data pengajar dari API ketika komponen dimuat
  useEffect(() => {
    fetch(`${BASE_URL}api/pengajar`)
      .then((response) => response.json())
      .then((data) => {
        setPengajar(data);
        // Memisahkan bidang yang memiliki koma dan menggabungkan semua bidang
        const bidang = data.flatMap((pengajar) => pengajar.Bidang.split(","));
        setMataPelajaran(bidang);
      })
      .catch((error) => console.error(error));
  }, []);
  // Fungsi untuk mengubah hari yang dipilih
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // Fungsi untuk menangani submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Mendapatkan nilai dari setiap field dalam form
    const mataPelajaran = event.target.elements.mata_pelajaran.value;
    const kelas = Number(event.target.elements.kelas.value); // Ubah string menjadi angka
    const guruPengajar = Number(event.target.elements.guru_pengajar.value); // Ubah string menjadi angka
    const waktuMulai = event.target.elements.waktu_mulai.value;
    const waktuSelesai = event.target.elements.waktu_selesai.value;
    const hari = event.target.elements.hari.value;

    // Membuat objek data untuk dikirimkan ke API
    const data = {
      mata_pelajaran: mataPelajaran,
      kelas_id: kelas,
      pengajar_id: guruPengajar,
      waktu_mulai: waktuMulai,
      waktu_selesai: waktuSelesai,
      hari: hari,
    };

    // Mengirimkan data ke API
    fetch(`${BASE_URL}api/roster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Roster created successfully") {
          // Jika sukses, lakukan sesuatu di sini (misalnya, menampilkan pesan sukses)
          Swal.fire("Roster berhasil ditambahkan", "", "success").then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire("Roster gagal ditambahkan", "", "error");
        }
      })
      .catch((error) => console.error(error));
  };

  // Mendapatkan array mata pelajaran unik
  const uniqueMataPelajaran = mataPelajaran.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);

  // Fungsi untuk menangani klik tombol

  const handleButtonClick = (id) => {
    fetch(`${BASE_URL}api/kelas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedKelas(data);
        const rostersWithPengajarAndKelas = data.rosters.map((roster) => {
          return Promise.all([
            fetch(`${BASE_URL}api/pengajar/${roster.pengajar_id}`),
            fetch(`${BASE_URL}api/kelas/${roster.kelas_id}`),
          ])
            .then(([pengajarResponse, kelasResponse]) =>
              Promise.all([pengajarResponse.json(), kelasResponse.json()])
            )
            .then(([pengajar, kelas]) => {
              return { ...roster, pengajar, kelas };
            })
            .catch((error) => console.error(error));
        });
        return Promise.all(rostersWithPengajarAndKelas);
      })
      .then((rosters) => setRosters(rosters))
      .catch((error) => console.error(error));
  };
  // Array warna untuk styling

  const colors = ["bg-success", "bg-warning", "bg-primary"];
  return (
    <div id="layout-wrapper">
      <div
        className="modal fade"
        id="event-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header py-3 px-4">
              <h5 className="modal-title" id="modal-title">
                Tambahkan Roster
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form
                className="needs-validation"
                name="event-form"
                id="form-event"
                noValidate=""
                onSubmit={handleFormSubmit}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Mata Pelajaran</label>
                      <select
                        className="form-control"
                        name="mata_pelajaran"
                        id="mata_pelajaran"
                        required=""
                        onChange={handleMataPelajaranChange}
                      >
                        <option value="">Pilih Mata Pelajaran</option>
                        {uniqueMataPelajaran.map((mataPelajaranItem, index) => (
                          <option key={index} value={mataPelajaranItem}>
                            {mataPelajaranItem}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Kelas</label>
                      <select
                        className="form-control"
                        name="kelas"
                        id="kelas"
                        required=""
                      >
                        <option value="">Pilih Kelas</option>
                        {kelas.map((kelasItem, index) => (
                          <option key={index} value={kelasItem.id}>
                            {kelasItem.nama_kelas}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Guru Pengajar</label>
                      <select
                        className="form-control"
                        name="guru_pengajar"
                        id="guru_pengajar"
                        required=""
                      >
                        <option value="">Pilih Guru Pengajar</option>
                        {filteredPengajar.map((pengajarItem, index) => (
                          <option key={index} value={pengajarItem.ID}>
                            {pengajarItem.Nama_Depan}{" "}
                            {pengajarItem.Nama_Belakang}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Hari</label>
                      <select
                        className="form-control"
                        name="hari"
                        id="hari"
                        required=""
                      >
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                        <option value="Sabtu">Sabtu</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Waktu Mulai</label>
                      <input
                        className="form-control"
                        placeholder="Masukkan Waktu Mulai"
                        type="time"
                        name="waktu_mulai"
                        id="waktu_mulai"
                        required=""
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Waktu Selesai</label>
                      <input
                        className="form-control"
                        placeholder="Masukkan Waktu Selesai"
                        type="time"
                        name="waktu_selesai"
                        id="waktu_selesai"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 text-end">
                    <button
                      type="button"
                      className="btn btn-light me-1"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      id="btn-save-event"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="edit-roster-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header py-3 px-4">
              <h5 className="modal-title" id="modal-title">
                Edit Roster
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form
                className="needs-validation"
                name="edit-event-form"
                id="form-edit-event"
                noValidate=""
                onSubmit={handleEditFormSubmit}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Mata Pelajaran</label>
                      <select
                        className="form-control"
                        name="edit-mata-pelajaran"
                        id="edit-mata-pelajaran"
                        required=""
                        onChange={handleMataPelajaranChange}
                      >
                        <option value="">Pilih Mata Pelajaran</option>
                        {uniqueMataPelajaran.map((mataPelajaranItem, index) => (
                          <option key={index} value={mataPelajaranItem}>
                            {mataPelajaranItem}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Kelas</label>
                      <select
                        className="form-control"
                        name="edit-kelas"
                        id="edit-kelas"
                        required=""
                      >
                        <option value="">Pilih Kelas</option>
                        {kelas.map((kelasItem, index) => (
                          <option key={index} value={kelasItem.id}>
                            {kelasItem.nama_kelas}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Guru Pengajar</label>
                      <select
                        className="form-control"
                        name="edit-guru-pengajar"
                        id="edit-guru-pengajar"
                        required=""
                      >
                        <option value="">Pilih Guru Pengajar</option>
                        {pengajar.map((pengajarItem, index) => (
                          //handlematapelajaranchange
                          <option key={index} value={pengajarItem.ID}>
                            {pengajarItem.Nama_Depan}{" "}
                            {pengajarItem.Nama_Belakang}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Hari</label>
                      <select
                        className="form-control"
                        name="edit-hari"
                        id="edit-hari"
                        required=""
                      >
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                        <option value="Sabtu">Sabtu</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Waktu Mulai</label>
                      <input
                        className="form-control"
                        placeholder="Masukkan Waktu Mulai"
                        type="time"
                        name="edit-waktu-mulai"
                        id="edit-waktu-mulai"
                        required=""
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Waktu Selesai</label>
                      <input
                        className="form-control"
                        placeholder="Masukkan Waktu Selesai"
                        type="time"
                        name="edit-waktu-selesai"
                        id="edit-waktu-selesai"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 text-end">
                    <button
                      type="button"
                      className="btn btn-light me-1"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      id="btn-save-event"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Upcube</a>
                      </li>
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
                    <button
                      type="button"
                      class="btn font-16 btn-info waves-effect waves-light w-100"
                      id="btn-new-event"
                      data-bs-toggle="modal"
                      data-bs-target="#event-modal"
                    >
                      Tambahkan Roster
                    </button>
                    <div id="external-events">
                      <br />
                      <p className="text-muted">Daftar Kelas </p>
                      <button
                        className="btn btn-secondary w-100"
                        onClick={handleAllClassesClick}
                        style={{ marginBottom: "1em" }}
                      >
                        <i className="mdi font-size-15 me-10"></i>Semua Kelas
                      </button>

                      {Array.isArray(kelas) &&
                        kelas.map((kelasItem, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <button
                              className={`external-event fc-event w-100 ${
                                colors[index % colors.length]
                              }`}
                              data-className={colors[index % colors.length]}
                              onClick={() => handleButtonClick(kelasItem.id)}
                              style={{ flex: 1 }} // This will make the button take up the remaining space
                            >
                              <i className="mdi font-size-11 me-2"></i>
                              {kelasItem.nama_kelas}
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
                    <div class="row">
                      <div class="col-sm-12 col-md-9">
                        <div
                          class="dataTables_length"
                          id="complex-header-datatable_length"
                          style={{ marginLeft: "2em" }} // Add this line
                        >
                          <label>
                            Filter by Day:
                            <select
                              name="complex-header-datatable_length"
                              aria-controls="complex-header-datatable"
                              className="custom-select custom-select-sm form-control form-control-sm form-select form-select-sm"
                              style={{ width: "11em", marginTop: "0.5em" }}
                              onChange={handleDayChange} // Tambahkan ini
                            >
                              <option value="">Semua Hari </option>
                              <option value="Senin">Senin</option>
                              <option value="Selasa">Selasa</option>
                              <option value="Rabu">Rabu</option>
                              <option value="Kamis">Kamis</option>
                              <option value="Jumat">Jumat</option>
                              <option value="Sabtu">Sabtu</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-2">
                        <div
                          id="complex-header-datatable_filter"
                          class="dataTables_filter"
                        >
                          <label>
                            Search:
                            <input
                              type="search"
                              style={{ width: "140" }}
                              class="form-control form-control-sm"
                              placeholder="Cari disini "
                              aria-controls="complex-header-datatable"
                              onChange={handleSearchChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table className="table table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Matkul</th>
                            <th>Kelas</th>
                            <th>Pengajar</th>
                            <th>Hari</th>
                            <th>Mulai</th>
                            <th>Selesai</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rosters
                            .filter(
                              (roster) =>
                                (!selectedDay || roster.hari === selectedDay) &&
                                (roster.mata_pelajaran
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                  roster.pengajar.Nama_Depan.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                  ) ||
                                  roster.pengajar.Nama_Belakang.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                  ))
                            )
                            .slice(offset, offset + PER_PAGE)
                            .map((roster, index) => {
                              return (
                                <tr key={index}>
                                  <td>{offset + index + 1}</td>{" "}
                                  {/* Updated this line */}
                                  <td>{roster.mata_pelajaran}</td>
                                  <td>{roster.kelas.nama_kelas}</td>
                                  <td>
                                    {roster.pengajar.Nama_Depan}{" "}
                                    {roster.pengajar.Nama_Belakang}
                                  </td>
                                  <td>{roster.hari}</td>
                                  <td>{roster.waktu_mulai}</td>
                                  <td>{roster.waktu_selesai}</td>
                                  <td>
                                    <button
                                      className="btn btn-warning me-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-roster-modal"
                                      onClick={() =>
                                        handleEditButtonClick(roster)
                                      }
                                    >
                                      Edit
                                    </button>

                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        Swal.fire({
                                          title: "Apakah Anda yakin?",
                                          text: "Data akan dihapus secara permanen",
                                          icon: "warning",
                                          showCancelButton: true,
                                          confirmButtonColor: "#3085d6",
                                          cancelButtonColor: "#d33",
                                          confirmButtonText: "Ya, hapus",
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            fetch(
                                              `${BASE_URL}api/roster/${roster.id}`,
                                              {
                                                method: "DELETE",
                                              }
                                            )
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((data) => {
                                                if (
                                                  data.message ===
                                                  "Roster deleted successfully"
                                                ) {
                                                  Swal.fire(
                                                    "Roster berhasil dihapus",
                                                    "",
                                                    "success"
                                                  ).then(() => {
                                                    window.location.reload();
                                                  });
                                                } else {
                                                  Swal.fire(
                                                    "Roster gagal dihapus",
                                                    "",
                                                    "error"
                                                  );
                                                }
                                              })
                                              .catch((error) =>
                                                console.error(error)
                                              );
                                          }
                                        });
                                      }}
                                    >
                                      Hapus
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-5 mt-4">
                        <div
                          className="dataTables_info"
                          id="datatable-buttons_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {currentPage * PER_PAGE + 1} to{" "}
                          {Math.min(
                            (currentPage + 1) * PER_PAGE,
                            rosters.length
                          )}{" "}
                          of {rosters.length} entries
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
            <div style={{ clear: "both" }}></div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default AllRoster;
