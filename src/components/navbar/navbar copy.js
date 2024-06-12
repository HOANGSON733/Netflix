import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { fetchPopulartheloai } from '../../api/Api';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [menu, setMenu] = useState(null);
  const [menuGenres, setMenuGenres] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [genres, setGenres] = useState('');
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { genres } = await fetchPopulartheloai();
        setGenres(genres);
        console.log("Genres", genres);
      } catch (error) {
        console.error('Error fetching Genres:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleClick = (category) => {
    setMenu(category);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };  

  const handleClickGenres = (cate) => {
    setDropdownOpen(!dropdownOpen);
    window.scrollTo({ top: 0 });
    setMenuOpen(!menuOpen);
    setMenuGenres(cate);
  };

  localStorage.setItem("logo", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png")
  const logo = localStorage.getItem("logo");

  return (
    <>
      <div className='navbar_container'>
        <div className={`navbar ${menuOpen ? 'active' : ''}`}>
          <div className='logo'>
            <Link style={menu === "trang_chu" ? { borderBottom: "none" } : {}} onClick={() => handleClick('trang_chu')} to={'/'}>
              <img src={`${logo}`} alt="logo" />
            </Link>
          </div>
          <button className='menu-toggle' onClick={toggleMenu}>
            {menuOpen ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-bars"></i>}
          </button>
          <div className={`bar ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/movie/phim-le">Phim lẻ</Link></li>
              <li><Link to="/movie/phim-bo">Phim bộ</Link></li>
              <li><Link to="/danh-sach/tv-shows">TV Show</Link></li>
              <li><Link to="/movie/hoat-hinh">Hoạt hình</Link></li>
              <li className="dropdown">
                <span className="dropbtn" onClick={handleDropdownClick}>
                  Thể loại
                  <FaChevronDown className="icon" />
                </span>
                {showDropdown && (
                  <ul className="dropdown-content">
                    {Array.isArray(genres) && genres.length > 0 ? (
                      genres.map((item) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;




