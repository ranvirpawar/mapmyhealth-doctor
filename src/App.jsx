import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import AppointmentDetails from './pages/AppointmentDetails';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Consultation from './pages/Consultation';
import Prescriptions from './pages/Prescriptions';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function PrivateRoute({ children }) {
  const isAuth = useStore(s => s.isAuthenticated);
  return isAuth ? children : <Navigate to="/" />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
        <Route path="/appointments/:id" element={<PrivateRoute><AppointmentDetails /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
        <Route path="/patients/:id" element={<PrivateRoute><PatientProfile /></PrivateRoute>} />
        <Route path="/consultation/:id" element={<PrivateRoute><Consultation /></PrivateRoute>} />
        <Route path="/prescriptions" element={<PrivateRoute><Prescriptions /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </HashRouter>
  );
}

export default App;