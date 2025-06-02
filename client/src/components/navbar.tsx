// src/components/Nav.tsx
import './css/navbar.css';

export default function Nav() {
    return (
        <nav className="app-nav">
            <ul className="nav-list">
                <li>
                    <a className="nav-link" href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a className="nav-link" href="/about">
                        About
                    </a>
                </li>
                <li>
                    <a className="nav-link" href="/contact">
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
}
