import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getchitiet } from "../../api/Api";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading";
import "./chitiet.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhimTuongTu from '../phimtuongtu/phimtuongtu'

const Chitiet = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const [chitiet, setChitiet] = useState(null);
  const [categoryNames, setCategoryNames] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getchitiet(slug);
        setChitiet(data.chitiet);
        setCategoryNames(data.category.map((cat) => cat.name));
        setCountryNames(data.country.map((cou) => cou.name));
      } catch (error) {
        console.error("Error fetching chitiet:", error);
        setError("Failed to fetch details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="load">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        className="chitiet"
        style={{
          backgroundImage: `url(${chitiet.thumb_url})`,
        }}
      >
        <div className="chitiet__poster">
          <img src={chitiet.poster_url} alt={chitiet.name} />
          <div className="watch">
            <Link to={`/movie/chitietphim/watch/${chitiet.slug}`}>
              <p className="">XEM PHIM</p>
            </Link>
            <button className="" onClick={() => setShowTrailer(!showTrailer)}>
              {showTrailer ? "Close Trailer" : "Trailer"}
            </button>
          </div>
        </div>
        <div className="chitiet__info">
          <h1>{chitiet.name}</h1>
          {chitiet.trailer_url && (
            <div className="trailer">

              {showTrailer && (
                <iframe className="iframe"
                  title="YouTube Video"
                  width="400"
                  height="200"
                  src={`https://www.youtube.com/embed/${getEmbedUrl(chitiet.trailer_url)}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          )}
          <div className="P1">
            <p>Trạng thái: </p>
            <h5>{chitiet.episode_current}</h5>
          </div>
          <div className="P1">
            <p>Số tập: </p>
            <h5>{chitiet.episode_total}</h5>
          </div>
          <div className="P1">
            <p>Thời lượng: </p>
            <h5>{chitiet.time}</h5>
          </div>
          <div className="P1">
            <p>Năm phát hành: </p>
            <h5>{chitiet.year}</h5>
          </div>
          <div className="P1">
            <p>Chất lượng: </p>
            <h5>{chitiet.quality}</h5>
          </div>
          <div className="P1">
            <p>Ngôn ngữ: </p>
            <h5>{chitiet.lang}</h5>
          </div>
          <div className="P1">
            <p>Thể Loại: </p>
            <h5>{categoryNames.join(", ")}</h5>
          </div>
          <div className="P1">
            <p>Đạo diễn: </p>
            <h5>{chitiet.director}</h5>
          </div>
          <div className="P1">
            <p>Diễn viên:</p>
            <h5>{chitiet.actor.join(", ")}</h5>
          </div>
          <div className="P1">
            <p>Quốc gia: </p>
            <h5>{countryNames.join(", ")}</h5>
          </div>
        </div>
      </div>
      <div>
        <PhimTuongTu />
      </div>
      {/* <div className="slider-container">
        <Slider {...settings}>
          <div><img src={chitiet.poster_url} alt={chitiet.name} /></div>
          <div><img src={chitiet.poster_url} alt={chitiet.name} /></div>
          <div><img src={chitiet.poster_url} alt={chitiet.name} /></div>
        </Slider>
      </div> */}
    </div>
  );
};

export default Chitiet;
