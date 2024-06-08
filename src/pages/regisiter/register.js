/* eslint-disable jsx-a11y/alt-text */
import "./register.css";

export default function Register() {
  return (
    <>
      <div className="register">
        <div className="register_img"></div>
        <div className="top">
          <div className="wrapper">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />

            <button className="loginButton">Sign In</button>
          </div>
        </div>
        <div className="container">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="input">
            <input type="email" placeholder="email address" />
            <button className="registerButton">Get Started</button>
          </div>
        </div>
      </div>

      {/* <div className="contents">
        <div className="register_background"><p>akjlfbdafbp</p>
        </div>
        <div className="contents_list">
        </div>
        </div> */}
      <div className="content">
        <div className="content_text">
          <h1>Enjoy on your TV</h1>
          <p>Watch on smart TVs, Playstation, Xbox, ChromeCast, AppTV</p>
        </div>
        <div className="content_img">
          <img src="../../../z5458546792117_276bcd33cbf78ab0b3f91b6672a381c1.jpg" />
        </div>
      </div>
      <div className="content">
        <div className="content_img">
          <img src="../../../z5458546792117_276bcd33cbf78ab0b3f91b6672a381c1.jpg" />
        </div>
        

        <div className="content_text">
          <h1>Enjoy on your TV</h1>
          <p>Watch on smart TVs, Playstation, Xbox, ChromeCast, AppTV</p>
        </div>
      </div>
      <div className="content">
        <div className="content_text">
          <h1>Enjoy on your TV</h1>
          <p>Watch on smart TVs, Playstation, Xbox, ChromeCast, AppTV</p>
        </div>
        <div className="content_img">
          <img src="../../../z5458546792117_276bcd33cbf78ab0b3f91b6672a381c1.jpg" />
        </div>
      </div>
      <div className="content">
        <div className="content_img">
          <img src="../../../z5458546792117_276bcd33cbf78ab0b3f91b6672a381c1.jpg" />
        </div>
        <div className="content_text">
          <h1>Enjoy on your TV</h1>
          <p>Watch on smart TVs, Playstation, Xbox, ChromeCast, AppTV</p>
        </div>
      </div>
    </>
  );
}
