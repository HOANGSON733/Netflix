import Register from "./pages/regisiter/register";
import "./app.css";
import Home from "./pages/home/home";
import NavBar from "./components/navbar/navbar";
import ChiTiet from "./pages/chitiet/chitiet";
import { Route, Routes } from "react-router";
import Watch from "./pages/waching/watching";
import TimKiem from "./pages/ketquatimkiem/ketqua";
import Phimle from "./pages/Phim le/phimle";
import Phimbo from "./pages/Phim bo/phimbo";
import TvShow from "./pages/Tv Show/Tvshow";
import PhimHoatHinh from "./pages/Phim Hoat Hinh/phimhoathinh";
import '@fortawesome/fontawesome-free/css/all.css';
import Footer from "./components/footer/footer";

function App() {

  return (
    <div>
      <NavBar />
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/chitiet/:slug" element={<ChiTiet />}></Route>
        <Route path="/movie/chitietphim/watch/:slug" element={<Watch />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/movie/phim-le" element={<Phimle/>} />
        <Route path="/movie/phim-bo" element={<Phimbo/>} />
        <Route path="/movie/hoat-hinh" element={<PhimHoatHinh/>} />
        <Route path="/danh-sach/tv-shows" element={<TvShow/>} />
        <Route path="/movie/search/keyword/:keyword" element={<TimKiem />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
