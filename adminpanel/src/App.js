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
import Roster from './pages/roster/AllRoster';
import AllPengajar from './pages/pengajar/AllPengajar';
import AddPengajar from './pages/pengajar/addPengajar';
import EditPengajar from './pages/pengajar/EditPengajar';
import TanyaJawab from './pages/tanya_jawab/TanyaJawab';
import Absensi from './pages/absensi/absensi';

function App() {

    return (
        <Router>
            <Routes>
                {/* Route Auth */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Route Siswa */}
                <Route path="/add-siswa" element={<AddSiswa />} />
                <Route path="/all-siswa" element={<AllSiswa />} />
                <Route path='/edit-siswa/:id' element={<EditSiswa />} />

                {/* Route Pengumuman */}
                <Route path="/add-pengumuman" element={<AddPengumuman />} />
                <Route path="/all-pengumuman" element={<AllPengumuman />} />
                <Route path='/edit-pengumuman/:id' element={<EditPengumuman />} />

                {/* Route Kelas */}
                <Route path="/all-kelas" element={<AllKelas />} />

                {/* Route Roster*/}
                <Route path="/all-roster" element={<Roster />} />

                {/*Route Pengajar */}
                <Route path="/add-pengajar" element={<AddPengajar />} />
                <Route path="/all-pengajar" element={<AllPengajar />} />
                <Route path='/edit-pengajar/:id' element={<EditPengajar />} />

                {/*Route Tanya Jawab */}
                <Route path="/tanya-jawab" element={<TanyaJawab />} />

                {/*Route Absensi */}
                <Route path="/absensi" element={<Absensi />} />




            </Routes>
        </Router>
    );
}

export default App;