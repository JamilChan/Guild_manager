import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Characters from './pages/Characters';
import Login from './pages/Login';
import Admin from './pages/admin/Home';
import CreateGuild from './pages/guild/Create';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import JoinGuild from './pages/JoinGuild';
import { AuthProvider } from './context/AuthContext'
import {CharacterlistProvider} from './context/CharacterlistContext'
import Invite from './redirect/Invite';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import AdminRoute from "./privateroutes/AdminRoute"
import UserRoute from "./privateroutes/UserRoute"
import NoUserRoute from "./privateroutes/NoUserRoute"
import Guild from './pages/Guild';


function App() {
  const client = new QueryClient();

  return (
    <div className="App">
      <div>
        <QueryClientProvider client={client}>
          <Router>
            <AuthProvider>
              <CharacterlistProvider>
                <Navbar/>

                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route element={<UserRoute />} >
                    <Route element={<Profile/>} path='/profile/:username' />
                  </Route>
                  <Route element={<UserRoute />} >
                    <Route element={<Characters/>} path='/characters' />
                  </Route>
                  <Route element={<UserRoute />} >
                    <Route element={<Guild/>} path='/guild' />
                  </Route>
                  <Route element={<AdminRoute />} >
                    <Route element={<Admin/>} path='/admin' />
                  </Route>
                  <Route element={<UserRoute />} >
                    <Route element={<JoinGuild/>} path='/invite/:invitetoken' />
                  </Route>
                  <Route element={<UserRoute />} >
                    <Route element={<CreateGuild/>} path='/guild/create' />
                  </Route>
                  <Route element={<NoUserRoute />} >
                    <Route element={<Login/>} path='/login' />
                  </Route>



                  <Route element={<UserRoute />} >
                    <Route element={<Invite/>} path='/invite' />
                  </Route>
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </CharacterlistProvider>
            </AuthProvider>
          </Router>
        </QueryClientProvider>
      </div>
    </div>

  );
}

export default App;