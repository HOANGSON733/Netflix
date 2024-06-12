/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchPopulartheloai, getphimbo } from '../../api/Api';

const PhimBo = () => {
  const [phimbo, setPhimBo] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [theloai, setTheLoai] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = async (pageNumber) => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const { phimbo, pagination } = await getphimbo(pageNumber);
      setPhimBo(phimbo);
      const { theloai } = await fetchPopulartheloai();
      setTheLoai(theloai);
      setPagination(pagination);

      console.log('PhimLe:', phimbo);
      console.log('Pagination:', pagination);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    handleClick(1);
  }, []);

  const filteredMovies = phimbo.filter((movie) => {
    return (
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === "" || movie.genre.includes(selectedGenre))
    );
  });



  return (
    <div>
      {phimbo ? (
        <div className='film_component'>
          <div className='category' style={{ color: "#f89e00" }}>Phim Bộ</div>
          <div className="film_componet_loc">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
              <option value="">Phim</option>
              {theloai.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
              <option value="">All Genres</option>
              {theloai.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
              <option value="">Year</option>
              {theloai.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
              <option value="">Quốc gia</option>
              {theloai.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <button className="button">Lọc Phim</button>
          </div>
          <div className="list2">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie1">
                <div>
                  <Link to={`/movie/chitiet/${movie.slug}`}>
                    <img
                      src={`https://img.phimapi.com/${movie.poster_url}`}
                      alt={movie.title}
                    />
                  </Link>
                </div>
                <Link to={`/movie/chitiet/${movie.slug}`}>
                  <div class="overlay1">
                    <div class="overlay-content1">
                      <h3>{movie.name}</h3>
                    </div>
                  </div>
                </Link>
                <div className="title">
                  <Link to={`/movie/detailsmovie/${movie.slug}`}>{movie.name}</Link>
                </div>
              </div>
            ))}
          </div>
          <div className='pagination'>
            <div className='page'>
              <button hidden={pagination.currentPage <= 1} onClick={() => handleClick(pagination.currentPage - 1)}><i class="fa-sharp fa-solid fa-arrow-left"></i></button>
              <button hidden={pagination.currentPage <= 2} onClick={() => handleClick(pagination.currentPage - 2)}>{pagination.currentPage - 2}</button>
              <button hidden={pagination.currentPage <= 1} onClick={() => handleClick(pagination.currentPage - 1)}>{pagination.currentPage - 1}</button>
              <button style={{ backgroundColor: '#e50914', color: "#fff" }}>{pagination.currentPage}</button>
              <button hidden={pagination.currentPage >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 1)}>{pagination.currentPage + 1}</button>
              <button hidden={pagination.currentPage >= pagination.totalPages} onClick={() => handleClick(pagination.currentPage + 2)}>{pagination.currentPage + 2}</button>
              <button onClick={() => handleClick(pagination.currentPage + 1)}><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
            </div>
            <div className='result'>
              <p>Trang {pagination.currentPage}/{pagination.totalPages} | Tổng {pagination.totalItems} Kết quả</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}

    </div>
  );
};

export default PhimBo;
