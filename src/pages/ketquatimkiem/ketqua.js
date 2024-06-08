import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSearch } from "../../api/Api";
import "./ketqua.css";
import ReactPaginate from "react-paginate";
import Loading from "../../components/loading/loading.js"
const Search = () => {
  const [loading, setLoading] = useState(true);
  const { keyword } = useParams();
  const [timkiem, setTimKiem] = useState(null);
  const [titlePage, setTitlePage] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { timkiem, titlePage } = await getSearch(keyword);
        setTimKiem(timkiem);
        setTitlePage(titlePage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [keyword]);

  const pageCount = Math.ceil(timkiem ? timkiem.length / moviesPerPage : 0);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayMovies = timkiem
    ? timkiem
        .slice(pageNumber * moviesPerPage, (pageNumber + 2) * moviesPerPage)
        .map((movie) => (
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
            {/* <div className="year">
              <p>{movie.year}</p>
            </div> */}
            <div className="title">
              <Link to={`/movie/detailsmovie/${movie.slug}`}>{movie.name}</Link>
            </div>
          </div>
        ))
    : null;

    return (
      <div className="search-results">
        {loading ? (
            <Loading/>
        ) : (
          <>
            {titlePage && <div className="category">{titlePage}</div>}
            <div className="list1">{displayMovies}</div>
            <div calssname="tt1">
              {timkiem && (
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
};

export default Search;
