import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';  // assuming you're using react-slick for the slider
import { fetchPopularMovies, getPhimTuongTu, getchitiet } from '../../api/Api';

const DetailsMovie = () => {
    const { slug } = useParams();
    const [movies, setPhimCapNhat] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { movies } = await fetchPopularMovies();
                setPhimCapNhat(movies);

               
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [slug]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ]
    };


    return (
        <>
            {(movies) ? (
                <>
                    <div className="show_series">
                        <div className='category'>đề xuất phim mới</div>
                        <Slider {...settings}>
                            {movies && movies.map(movie => (
                                <div key={movie.id} className="movie">
                                    <Link to={`/movie/detailsmovie/${movie.slug}`}>
                                        <img src={`${movie.poster_url}`} alt={movie.title} />
                                    </Link>
                                    <div className='year'>
                                        <p>{movie.year}</p>
                                    </div>
                                    <div className='title'>
                                        <Link to={`/movie/detailsmovie/${movie.slug}`}>{movie.name}</Link>
                                    </div>
                                </div>
                            ))}
                            <div className='view_more'>
                                <Link to={"/movie/phim_moi_cap_nhat"}><button>View More</button></Link>
                            </div>
                        </Slider>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}


        </>
    );
};

export default DetailsMovie;
