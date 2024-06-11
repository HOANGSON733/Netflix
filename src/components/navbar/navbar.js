import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPopulartheloai } from "../../api/Api";
import { FaSearch, FaChevronDown, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [theloai, setTheloai] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/movie/search/keyword/${keyword}`;
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClear = () => {
    setKeyword('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowDropdown(false); // Ensure dropdown is closed when menu is toggled
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { theloai } = await fetchPopulartheloai();
        setTheloai(theloai);
      } catch (error) {
        console.error("Error fetching popular theloai:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-background"></div>
      <div className="logo-container">
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <FaBars className="menu-icon" />
      </button>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <ul className="ul1">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/movie/phim-bo">Phim bộ</Link></li>
          <li><Link to="/movie/phim-le">Phim lẻ</Link></li>
          <li><Link to="/danh-sach/tv-shows">TV Show</Link></li>
          <li><Link to="/movie/hoat-hinh">Hoạt hình</Link></li>
          <li className="dropdown">
            <span className="dropbtn" onClick={handleDropdownClick}>
              Thể loại
              <FaChevronDown className="icon" />
            </span>
            {showDropdown && (
              <ul className="dropdown-content">
                {Array.isArray(theloai) && theloai.length > 0 ? (
                  theloai.map((item) => (
                    <li key={item.id}>
                      <Link to="#">{item.name}</Link>
                    </li>
                  ))
                ) : (
                  <p>Không có thể loại nào</p>
                )}
              </ul>
            )}
          </li>
        </ul>
        {isMenuOpen && (
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search">
              <FaSearch className="search-icon" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm phim"
                className="search-input"
              />
              {keyword && (
                <button type="button" onClick={handleClear} className="clear-button">
                  <IoMdClose className="clear-icon" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Navbar;
