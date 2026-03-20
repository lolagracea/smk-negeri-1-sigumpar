import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import TataUsahaDashboard from "./pages/tata-usaha/Dashboard";

// Komponen yang berisi routing dan menggunakan useAuth
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Tentukan dashboard berdasarkan role
  const Dashboard =
    user?.role === "admin" ? AdminDashboard : TataUsahaDashboard;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
