import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import Sidebar from "../../component/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

function MyQuillComponent({ content, setContent }) {
  return <ReactQuill value={content} onChange={setContent} />;
}

function EditPengumuman() {
  const { BASE_URL } = require("../../configapi");
  const navigate = useNavigate();
  const { id } = useParams();

  const [judul, setJudul] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("/no-image-available.png");

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/pengumuman/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Log the data here
          setJudul(data.data.judul);
          setContent(data.data.isi);
          setImageURL(data.data.urlphoto);
        } else {
          toast.error("Error: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching pengumuman:", error);
      }
    };

    fetchPengumuman(); // Call fetchPengumuman here
  }, [id]); // Add id to the dependency array
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("isi", content);
        if (file) {
          formData.append("Urlphoto", file);
        }

        try {
          const response = await fetch(`${BASE_URL}api/pengumuman/${id}`, {
            method: "PUT",
            body: formData,
          });

          if (response.ok) {
            navigate("/all-pengumuman");
          } else {
            toast.error("Error: " + response.status);
          }
        } catch (error) {
          console.error("Error updating pengumuman:", error);
        }
      }
    });
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
                    <h4 className="card-title">Edit Pengumuman</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-sm-2 col-form-label"
                        >
                          Judul
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Masukkan Judul"
                            id="example-text-input"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="example-date-input"
                          className="col-sm-2 col-form-label"
                        >
                          Isi
                        </label>
                        <div className="col-sm-10">
                          <MyQuillComponent
                            content={content}
                            setContent={setContent}
                          />{" "}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="customFile"
                          className="col-sm-2 col-form-label"
                        >
                          Upload File
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="file"
                            className="form-control"
                            id="customFile"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-10 offset-sm-2">
                          <img
                            src={
                              imageURL
                                ? BASE_URL +
                                  imageURL.replace("http://localhost:5000/", "")
                                : "/no-image-available.png"
                            }
                            alt="Uploaded"
                            style={{
                              width: "10em",
                              height: "auto",
                              marginTop: "20px",
                            }}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-sm-10 offset">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
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

export default EditPengumuman;
