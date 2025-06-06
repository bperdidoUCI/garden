// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Nav from './components/navbar';
import SearchBar from './components/searchbar';
import PlantCard from './components/plantcard'; // Página com informações da planta
import About from './components/aboutcard'; // Página sobre
import Contact from './components/contact'; // Página de contato
import SignUp from './pages/signup';
import Login from './pages/login';
import Favorite from './pages/favorites';
import Dashboard from './pages/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <SearchBar onSearch={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="app-content">
        <Routes>
          {/* navbar routes */}
          <Route path="/" element={<PlantCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* login routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
