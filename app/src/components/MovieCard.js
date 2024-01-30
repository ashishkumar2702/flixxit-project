import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ data }) {
  const go = useNavigate();
  return (
    <Box
      onClick={() => go("/SingleMovie/" + data._id)}
      className="movie-card-container anim-card"
    >
      {
        <img
          loading="lazy"
          className="anim-img"
          src={data.poster}
          alt={data.title}
        />
      }
      <Box className="anim-textBox">
        <Box className="movie-card-data">
          <Box className="movie-card-data-item movie-card-name">
            {data.title}
          </Box>
          <Box
            sx={{ fontSize: "1.4vh" }}
            className="movie-card-data-item eight-line-clamp"
          >
            {data.description}
          </Box>
          <Box sx={{ fontSize: "1.4vh" }} className="movie-card-data-item">
            {data.genre}
          </Box>
          <Box sx={{ fontSize: "1.4vh" }} className="movie-card-data-item">
            Rating: {data.rating}/10
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
