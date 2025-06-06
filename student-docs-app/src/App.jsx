// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import InstitutionSignup from './pages/InstitutionSignup';
import InstitutionLogin from './pages/InstitutionLogin';
import InstitutionChoice from './pages/InstitutionChoice';
import StudentChoice from './pages/StudentChoice'; // ✅ New

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<StudentChoice />} /> {/* ✅ New */}
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/institution" element={<InstitutionChoice />} />
      <Route path="/institution-signup" element={<InstitutionSignup />} />
      <Route path="/institution-login" element={<InstitutionLogin />} />
    </Routes>
  );
}
