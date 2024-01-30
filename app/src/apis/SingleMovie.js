import axios from "axios";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../components/common_functions";

const paths = {
  rate: "/users/ratings",
  watchlist: "/users/watchlist",
  recentlyWatched: "/users/recently-watched",
};

const postRating = async ({ id, rating, cat }) => {
  showLoader();
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL + paths.rate}`,
    headers: {
      Authorization: localStorage.getItem("access"),
    },
    data: {
      id: id,
      rating: rating,
      cat: cat,
    },
  })
    .then((response) => {
      hideLoader();
      toast.success(response.data.message);
      return true;
    })
    .catch((err) => {
      hideLoader();
      if (err.response.data.error) toast.error(err.response.data.error);
      else toast.error(JSON.stringify(err));
      return false;
    });
};
const getRating = async ({ id }) => {
  showLoader();
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL + paths.rate + "/" + id}`,
    headers: {
      Authorization: localStorage.getItem("access"),
    },
  })
    .then((response) => {
      hideLoader();
      return response.data;
    })
    .catch((err) => {
      hideLoader();
      return false;
    });
};
const postWish = async ({ id }) => {
  showLoader();
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL + paths.watchlist}`,
    headers: {
      Authorization: localStorage.getItem("access"),
    },
    data: {
      id: id,
    },
  })
    .then((response) => {
      hideLoader();
      toast.success(response.data.message);
      return true;
    })
    .catch((err) => {
      hideLoader();
      if (err.response.data.error) toast.error(err.response.data.error);
      else toast.error(JSON.stringify(err));
      return false;
    });
};
const getWish = async ({ id }) => {
  showLoader();
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL + paths.watchlist + "/" + id}`,
    headers: {
      Authorization: localStorage.getItem("access"),
    },
  })
    .then((response) => {
      hideLoader();
      return response.data;
    })
    .catch((err) => {
      hideLoader();
      return false;
    });
};

const addRecentlyWatched = async (id) => {
  showLoader();
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL + paths.recentlyWatched}`,
    headers: {
      Authorization: localStorage.getItem("access"),
    },
    data: {
      id: id,
    },
  })
    .then((response) => {
      hideLoader();
      return response.data;
    })
    .catch((err) => {
      hideLoader();
      return false;
    });
};
export { postRating, getRating, postWish, getWish, addRecentlyWatched };
