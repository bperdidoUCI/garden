// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Nav from './components/navbar';
import PlantCard from './components/plantcard';
import About from './components/aboutcard';
import Contact from './components/contact';
import SignUp from './pages/signup';
import Login from './pages/login';
import Favorite from './pages/favorites';
import Dashboard from './pages/dashboard';
import Search from './pages/search';

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <div className="app-content">
        <Routes>
          {/* navbar routes */}
          <Route path="/" element={<PlantCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* login routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorite plant={{
            id: 0,
            image_url: '',
            common_name: '',
            scientific_name: ''
          }} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
