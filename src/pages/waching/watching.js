import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getchitiet } from "../../api/Api";
import Hls from "hls.js";
import "./watch.css";
import Loading from "../../components/loading/loading";

const DetailsMovie = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const videoRef = useRef(null);
  const [activeLink, setActiveLink] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  const handleClick = (link) => {
    setActiveLink(link);
    setLoadingVideo(true); // Set loading state to true when a new link is clicked
    setVideoReady(false);

    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(link);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoadingVideo(false);
        setVideoReady(true);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = link;
      video.addEventListener("loadeddata", () => {
        setLoadingVideo(false);
        setVideoReady(true);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { chitiet, episodes } = await getchitiet(slug);
        setDetails(chitiet);
        setEpisodes(episodes);

        // If no active link, set the first episode's link as the active link
        if (episodes.length > 0 && episodes[0].server_data.length > 0) {
          handleClick(episodes[0].server_data[0].link_m3u8);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [slug]);

  const handlePlay = () => {
    const video = videoRef.current;
    video.play();
  };

  const handleVideoLoad = () => {
    setTimeout(() => {
      setLoadingVideo(false);
    }, 16000); // Adjust the delay as needed (1000 ms = 1 second)
  };

  return (
    <div>
      {details ? (
        <div className="details_container">
          <div className="video">
            {loadingVideo && (
              <div className="loading-video">
                <img src="https://images.viblo.asia/a87852d0-d60c-4a7c-ae42-0bfb6679ecb3.gif" alt="Loading" />
              </div>
            )}
            {!videoReady && !loadingVideo && (
              <div className="play-button" onClick={handlePlay}>
                ▶
              </div>
            )}
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              controls
              onLoadedData={handleVideoLoad} // Use the handleVideoLoad function
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div></div>
          <div className="episodes">
            <div className="title1">
              <h5>Danh sách phim</h5>
            </div>
            {episodes.length > 0 ? (
              episodes.map((server, index) => (
                <div key={index} className="info_item">
                  {server.server_data.map((item, idx) => (
                    <div key={idx} className="button_container">
                      <button
                        onClick={() => handleClick(item.link_m3u8)}
                        style={
                          activeLink === item.link_m3u8
                            ? { background: "#eb0000" }
                            : {}
                        }
                      >
                        {item.name} 
                      </button>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No episodes available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="loading">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default DetailsMovie;
