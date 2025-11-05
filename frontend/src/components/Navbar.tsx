import "./css/Navbar.css";
import logo from "../assets/logo.svg";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClickOutside = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="top-navbar">
      <Link to="/" className="homepage">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="name">WebStorage</div>
      </Link>

      <div className="user-menu">
        <button
          className="app-btn app-btn-primary user-btn"
          onClick={toggleMenu}
        >
          <FaUser />
        </button>

        {menuOpen && (
          <div className="user-dropdown">
            <button className="user-option">Zaloguj</button>
            <button className="user-option">Wyloguj</button>
            <button className="user-option">Zmień hasło</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
