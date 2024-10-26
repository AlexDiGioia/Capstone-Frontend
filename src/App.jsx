import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './slices/authSlice';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import UserPage from './pages/UserPage';
import RequestPage from './pages/RequestPage';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchWithAuth } from './utils/api';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Ottieni la posizione attuale
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await fetchWithAuth('/utenti/me');
          dispatch(setUser({ email: data.email, role: data.ruolo }));
        } catch (error) {
          // Se il token non è valido o è scaduto, rimuovilo e reindirizza al login
          localStorage.removeItem('token');
          dispatch(clearUser());
          if (location.pathname === '/requests') {
            navigate('/login');
          }
        }
      } else {
        // Se non c'è il token e si sta tentando di accedere alla pagina delle richieste
        if (location.pathname === '/requests') {
          navigate('/login');
        }
      }
    };

    // Esegui il controllo solo quando l'utente naviga alla pagina delle richieste
    if (location.pathname === '/requests') {
      verifyUser();
    }
  }, [dispatch, navigate, location]);

  return (
    <>
      <AppNavbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
