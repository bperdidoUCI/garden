
import './css/plantcard.css';

export default function plantcard() {
  return (
    <div>
        <header className="app-header">
            <h1 className="title-header">Homepage Plant Card</h1> 
        </header>
        <nav className="app-nav">
            <ul className="nav-list">
                <li className="list-home">
                    <a className="a-home" href="/">Home</a>
                </li>
                <li className="list-about">
                    <a className="a-about" href="/about">About</a>
                </li>
                <li className="list-signup">
                    <a className="a-singup" href="/sign up">Contact</a>
                </li>
            </ul>
        </nav>
        <main className="app-main">
            <section className="app-section">
                <h2 className="h2-section-plantcard">Plant Card</h2>
                <p className="p-section-plantcard">This is a plant card component.</p>
            </section>
        </main>
        <footer className="app-footer">
            <p className="p-footer-app">&copy; 2023 Plant Card. All rights reserved.</p>
        </footer>
    </div>
  )
}
