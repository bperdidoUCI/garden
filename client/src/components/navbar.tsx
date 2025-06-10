import { Link } from 'react-router-dom';
import './css/navbar.css';

export default function Nav() {
    return (
        <nav className="app-nav">
            <ul className="nav-list">
                <li>
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/contact">
                        Contact
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
