import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Characters from './pages/Characters';
import Login from './pages/Login';
import Admin from './pages/admin/Home';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"
import JoinGuild from './pages/JoinGuild';
import { AuthProvider } from "./contexts/AuthContext"
import BlizzardStuff from './pages/BlizzardStuff';

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
              <Route path='/characters' element={<PrivateRoute><Characters /></PrivateRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path='/invite/:invitetoken' element={<PrivateRoute><JoinGuild /></PrivateRoute>} />
              <Route path='/blizzardstuff' element={<PrivateRoute><BlizzardStuff /></PrivateRoute>} />

              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>

  );
}

export default App;