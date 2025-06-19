import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DonorRegistration from './pages/DonorRegistration';
import HospitalRegistration from './pages/HospitalRegistration';
import AdminDashboard from './pages/AdminDashboard';
import BloodBankLogin from './pages/BloodBankLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="donor-registration" element={<DonorRegistration />} />
          <Route path="hospital-registration" element={<HospitalRegistration />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="login" element ={<BloodBankLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;