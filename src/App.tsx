import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="/jobs" element={<Jobs />} />

          <Route element={<ProtectedRoute allowedRole="employer" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs/create" element={<CreateJob />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
