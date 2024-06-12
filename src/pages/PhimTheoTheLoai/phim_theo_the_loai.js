import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getGenres, getGenresMovie } from '../../api/Api';
import ReactPaginate from 'react-paginate';

const GenresMovie = () => {
    const { slug } = useParams();
    const [genresMovie, setGenresMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API với tham số `slug`
                const { genresMovie } = await getGenresMovie();
                const { genres } = await getGenres();

                setGenresMovie(genresMovie);
                setGenres(genres);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = genresMovie.slice(offset, offset + itemsPerPage);



    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className='film_component'>
                    <div className='category'>
                        <div className='category'>
                            {genres.length > 0 && genres.map(genre => (
                                genre.slug === slug && (
                                    <div key={genre.slug} style={{ color: "#f89e00" }}>
                                        #{genre.name} | <span style={{ color: "rgb(139 92 246)", fontSize: "20px" }}>{genresMovie.length} Kết quả</span>
                                    </div>
                                )
                            ))}

                        </div>
                        {/* {genres.length > 0 && genres.map(genre => (
                            genre.slug === slug && (
                                <div key={genre.slug} style={{ color: "#f89e00" }}>
                                    #{genre.name} | <span style={{ color: "rgb(139 92 246)", fontSize: "20px" }}>{genresMovie.length} Kết quả</span>
                                </div>
                            )
                        ))} */}
                    </div>
                    <div className="list2">
                        {currentPageData.map((movie) => (
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
                        <ReactPaginate
                            previousLabel={<i className="fa-sharp fa-solid fa-arrow-left"></i>}
                            nextLabel={<i className="fa-sharp fa-solid fa-arrow-right"></i>}
                            pageCount={Math.ceil(genresMovie.length / itemsPerPage)}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={5}
                            breakLabel={""}
                            onPageChange={handlePageClick}
                            containerClassName={"paginate"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                        <div className='result'>
                            <p>Trang {currentPage + 1}/{Math.ceil(genresMovie.length / itemsPerPage)} | Tổng {genresMovie.length} Kết quả</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenresMovie;
