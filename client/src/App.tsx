// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Nav from './components/navbar';
import SearchBar from './components/searchbar';
import PlantCard from './components/plantcard'; // Página com informações da planta
import About from './components/aboutcard'; // Página sobre
import Contact from './components/contact'; // Página de contato
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
          <Route path="/" element={<PlantCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
