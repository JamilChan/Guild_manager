import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Admin from './pages/admin/Home';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <AuthProvider>
            <Navbar/>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile/:username' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>

  );
}

export default App;