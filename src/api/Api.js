import axios from "axios";

const BASE_URL = "https://phimapi.com";

const movieApi = axios.create({
  baseURL: BASE_URL
});

export const fetchPopulartheloai = async () => {
  try {
    const response = await movieApi.get("/the-loai", {});
    return { theloai: response.data };
  } catch (error) {
    throw error;
  }
};


export const getSearch = async (keyword) => {
  try {
    // Chuyển đổi keyword thành chuỗi
    const response = await movieApi.get('/v1/api/tim-kiem', {
      params: {
        keyword: keyword,
      }
    });
    return {
      timkiem: response.data.data.items,
      titlePage: response.data.data.titlePage
    };
  } catch (error) {
    throw error;
  }
};



export const fetchPopularMovies = async () => {
  try {
    const response = await movieApi.get("/danh-sach/phim-moi-cap-nhat", {});
    return { movies: response.data.items };
  } catch (error) {
    throw error;
  }
};

export const getchitiet = async (slug) => {
  try {
    const response = await movieApi.get(`/phim/${slug}`);
    return {
      chitiet: response.data.movie,
      category: response.data.movie.category,
      country: response.data.movie.country,
      episodes: response.data.episodes
    };

  } catch (error) {
    throw error;
  }
};

export const getphimbo = async (pageNumber) => {
  try {
    const response = await movieApi.get('/v1/api/danh-sach/phim-bo', {
      params: {
        page: pageNumber
      }
    });
    return {
      phimbo: response.data.data.items,
      titlePL: response.data.data,
      pagination: response.data.data.params.pagination
    }
  } catch (error) {
    throw error;
  }
};


export const getphimle = async (pageNumber) => {
  try {
    const response = await movieApi.get('/v1/api/danh-sach/phim-le', {
      params: {
        page: pageNumber
      }
    });
    return {
      phimLe: response.data.data.items,
      titlePL: response.data.data,
      pagination: response.data.data.params.pagination
    }
  } catch (error) {
    throw error;
  }
};

export const getphimhoathinh = async (id) => {
  try {
    const response = await movieApi.get(`/v1/api/danh-sach/hoat-hinh`);
    return {
      hoathinh: response.data.data.items
    };
  } catch (error) {
    throw error;
  }
};
export const getTvShow = async (id) => {
  try {
    const response = await movieApi.get(`v1/api/danh-sach/tv-shows`);
    return {
      TvShow: response.data.data.items
    };
  } catch (error) {
    throw error;
  }
};


export const getPhimTuongTu = async () => {
  try {
    const response = await movieApi.get('/v1/api/tim-kiem', {
      params: {
        keyword: "a", // Replace with actual search criteria if needed
        limit: 200  // Adjust limit as necessary
      }
    });
    console.log("Similar Movies Response:", response.data.items); // Add logging to check response
    return {
      phimtuongtu: response.data.items
    };
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};


export const getGenresMovie = async () => {
  try {
    // Chuyển đổi keyword thành chuỗi
    const response = await movieApi.get('/v1/api/tim-kiem', {
      params: {
        keyword: "a",
        limit: 1000,
      }
    });
    return {
      genresMovie: response.data.data.items,
    };
  } catch (error) {
    throw error;
  }
};

export const getGenres = async () => {
  try {
    // Chuyển đổi keyword thành chuỗi
    const response = await movieApi.get('/the-loai', {
    });
    return {
      genres: response.data
    };
  } catch (error) {
    throw error;
  }
};