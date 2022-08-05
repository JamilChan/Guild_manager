import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Characters from './pages/Characters';
import Login from './pages/Login';
import Admin from './pages/admin/Home';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import JoinGuild from './pages/JoinGuild';
import { AuthProvider } from './context/AuthContext'

import AdminRoute from "./privateroutes/AdminRoute"
import UserRoute from "./privateroutes/UserRoute"
import NoUserRoute from "./privateroutes/NoUserRoute"


function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <AuthProvider>
          <Navbar/>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route element={<UserRoute />} >
                <Route element={<Profile/>} path='/profile/:username' />
              </Route>
              <Route element={<UserRoute />} >
                <Route element={<Characters/>} path='/characters' />
              </Route>
              <Route element={<AdminRoute />} >
                <Route element={<Admin/>} path='/admin' />
              </Route>
              <Route element={<UserRoute />} >
                <Route element={<JoinGuild/>} path='/invite/:invitetoken' />
              </Route>
              <Route element={<NoUserRoute />} >
                <Route element={<Login/>} path='/login' />
              </Route>

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>

  );
}

export default App;