import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getRecentlyWatched } from "../apis/Home";
import { useLocation } from "react-router-dom";
import "../styles/allcards.css";
export default function AllCards(params) {
  const title = params.path == "watchlist" ? "WatchList" : "Recently Watched";
  const [cards, setCards] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const api_url =
      params.path == "watchlist" ? "watchlist" : "recentlyWatched";
    getRecentlyWatched(api_url).then((res) => {
      console.log(res);
      if (res) {
        setCards([...res]);
      }
    });
  }, [location]);
  return (
    <Box sx={{ minHeight: "100vh", p: "5vh", pt: "15vh", color: "white" }}>
      <Box sx={{ fontSize: "3vh", mb: "3vh" }}>{title}</Box>
      <Box
        className="allcards"
        sx={{ ".movie-card-container": { overflow: "hidden" } }}
      >
        {cards.map((card, ind) => (
          <MovieCard key={ind} data={card} />
        ))}
      </Box>
    </Box>
  );
}
