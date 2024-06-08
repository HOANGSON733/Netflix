import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPopulartheloai } from "../../api/Api"; // Adjust the import based on your project structure
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [theloai, setTheloai] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Implement the search redirect logic
      window.location.href = `/movie/search/keyword/${keyword}`;
    };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClear = () => {
    setKeyword('');
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
      <div className="navbar_item">
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
        </Link>
      </div>
      <div className="navbar_item">
        <ul className="ul1">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/movie/phim-bo">phim bộ</Link>
          </li>
          <li>
            <Link to="/movie/phim-le">phim lẻ</Link>
          </li>
          <li>
            <Link to="/danh-sach/tv-shows">Tv show</Link>
          </li>
          <li>
            <Link to="/movie/hoat-hinh">hoạt hình</Link>
          </li>
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
      </div>
      <div className="navbar_item">
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
      </div>
    </div>
  );
};

export default Navbar;
