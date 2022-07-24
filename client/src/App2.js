
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

function App() {
	return (
		<Router>
			<Navbar/>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile/:username' element={<Profile />} />

				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;