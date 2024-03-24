import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import AddSiswa from './pages/Siswa/AddSiswa';
import AllSiswa from './pages/Siswa/AllSiswa';
import EditSiswa from './pages/Siswa/EditSiswa';
import AddPengumuman from './pages/pengumuman/AddPengumuman';
import AllPengumuman from './pages/pengumuman/AllPengumuman';
import EditPengumuman from './pages/pengumuman/EditPengumuman';
import AllKelas from './pages/kelas/allKelas';

function App() {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        const tokenWatcher = setInterval(() => {
            setToken(localStorage.getItem('accessToken'));
        }, 1000);

        return () => {
            clearInterval(tokenWatcher);
        };
    }, []);

    return (
        <Router>
            <Routes>
                {/* Route Auth */}
                <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

                {/* Route Siswa */}
                <Route path="/add-siswa" element={<AddSiswa/>}  />
                <Route path="/all-siswa" element={<AllSiswa />} />
                <Route path='/edit-siswa/:id' element={<EditSiswa/>} />

                {/* Route Pengumuman */}
                <Route path="/add-pengumuman" element={<AddPengumuman/>}  />
                <Route path="/all-pengumuman" element={<AllPengumuman />} />
                <Route path='/edit-pengumuman/:id' element={<EditPengumuman/>} />

                {/* Route Kelas */}
                <Route path="/all-kelas" element={<AllKelas/>}  />



            </Routes>
        </Router>
    );
}

export default App;