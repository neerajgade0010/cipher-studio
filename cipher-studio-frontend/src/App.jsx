import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import IdePage from './pages/IdePage';
import AuthPage from './pages/AuthPage';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading-screen">Loading CipherStudio...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <AuthPage /> : <Navigate to="/ide" />} />
      <Route path="/ide" element={user ? <IdePage /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;