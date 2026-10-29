import { NavLink } from "react-router-dom";
import "./styles.css";

export function SiteNav() {
    return (
        <header className="site-nav-wrapper">
            <nav className="site-nav" aria-label="Navegação principal">
                <NavLink className="site-nav__link" to="/" end aria-label="Home" title="Home">
                    <img className="site-nav__home-icon" src="/assets/images/icons/home.svg" alt="Home" />
                </NavLink>
                <NavLink className="site-nav__link" to="/videos">Videos</NavLink>
                <NavLink className="site-nav__link" to="/blog">Blog</NavLink>
            </nav>
        </header>
    );
}
