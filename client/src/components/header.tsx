// src/components/Header.tsx
import './css/header.css';
import plantIcon from '../assets/plantIcon.png';

export default function Header() {
    return (
        <header className="app-header">
            <h1 className="title-header">
                <img src={plantIcon} alt="Plant" className="plant-icon" />
                Seedsmart 🌿
            </h1>
        </header>
    );
}
