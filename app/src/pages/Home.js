import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Box, Button, OutlinedInput, TextField } from "@mui/material";
import { getAllMovies } from "../apis/Home";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { styles, theme } from "../styles/styles";
import InfoIcon from "@mui/icons-material/Info";
import MovieCard from "../components/MovieCard";
import { getUser } from "../apis/Nav";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { checkSubscription } from "../apis/auth";
import { hideLoader, showLoader } from "../components/common_functions";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
export default function Home() {
  const [home_videos, setHomeVideos] = useState({});
  const [selectedVid, setSelectedVid] = useState({ name: "videoUrl" });
  const [user, setUser] = useState(
    localStorage.getItem("userdet") &&
      JSON.parse(localStorage.getItem("userdet"))
  );
  const go = useNavigate();
  const [cat_genrs, setCatGenrs] = useState([]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    getAllMovies().then(async (res) => {
      showLoader();
      const random = Math.floor(Math.random() * res.content.length);
      setSelectedVid({ ...res.content[random] });

      const set_data = {
        top_rated: res.content,
        popular: shuffleArray([...res.content]),
        upcoming: shuffleArray([...res.content]),
      };
      if (res.recentlyWatched) {
        set_data.recently_watched = res.recentlyWatched;
      }
      if (res.watchlist) {
        set_data.watchlist = res.watchlist;
      }
      setHomeVideos({ ...set_data });

      const by_genre = {};
      for await (let i of res.content) {
        let geners = i.genre.split(", ");
        for await (let j of geners) {
          if (!by_genre[j]) {
            by_genre[j] = [];
          }
          by_genre[j].push(i);
        }
      }
      console.log(by_genre);
      setCatGenrs({ ...by_genre });
      hideLoader();
    });
  }, []);

  useEffect(() => {
    if (user) {
      const video = document.getElementById("home-video");
      video.src = selectedVid.videoUrl;
    }
  }, [selectedVid]);

  const window_width = window.innerWidth;

  const move = (card_section, direction) => {
    const section_div =
      document.getElementsByClassName("card-section")[card_section];
    if (direction === "right") section_div.scrollLeft += window_width * 0.7;
    else section_div.scrollLeft -= window_width * 0.7;
  };
  const mobile = window.innerWidth <= 720;

  const [volume, setVolume] = useState(true);
  return (
    <Box>
      {user ? (
        <>
          <Box className="home-video-container">
            <video autoPlay muted={volume} loop id="home-video">
              <source type="video/mp4" />
            </video>
          </Box>
          <Box
            className="hero-container"
            sx={{
              p: "0 10vh",
              [theme.breakpoints.down("sm")]: {
                p: "2vw 3vw",
                width: "calc(100% - 6vw)",
              },
            }}
          >
            <Box sx={{ color: "whitesmoke" }}>
              <Box
                sx={{
                  fontSize: "8vh",
                  color: "white",
                  width: "70vw",
                  [theme.breakpoints.down("sm")]: {
                    width: "100%",
                  },
                }}
              >
                {selectedVid.title}
              </Box>
              <Box
                className="hero-movie-description"
                sx={{
                  width: "70vh",
                  [theme.breakpoints.down("sm")]: {
                    width: "100%",
                  },
                }}
              >
                <Box sx={{ fontSize: "5vh" }}>
                  {selectedVid.releaseDate &&
                    new Date(selectedVid.releaseDate).getFullYear()}
                </Box>
                <Box className="three-line-clamp" sx={{ fontSize: "2.2vh" }}>
                  {selectedVid.description}
                </Box>
                <Box
                  sx={{
                    mt: "4vh",
                    display: "flex",
                    gap: "3vh",
                    position: "relative",
                    zIndex: "10",
                  }}
                >
                  <Button
                    sx={{ ...styles.primary_button }}
                    onClick={async () => {
                      const check = await checkSubscription();
                      if (check) window.open("/VideoPlay/" + selectedVid._id);
                    }}
                    startIcon={<PlayCircleIcon />}
                  >
                    Play
                  </Button>
                  <Button
                    sx={{ ...styles.secondary_button }}
                    onClick={() => go("/SingleMovie/" + selectedVid._id)}
                    startIcon={<InfoIcon />}
                  >
                    More Info
                  </Button>
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    zIndex: "10",
                    display: "flex",
                    justifyContent: "end",
                    width: "100%",
                    mt: "-5vh",
                    svg: {
                      cursor: "pointer",
                    },
                  }}
                >
                  {volume ? (
                    <VolumeOffIcon
                      onClick={() => {
                        setVolume(false);
                        console.log(false);
                      }}
                    />
                  ) : (
                    <VolumeUpIcon
                      onClick={() => {
                        setVolume(true);
                        console.log(true);
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box
  className="home-visitor-view"
  sx={{
    backgroundImage: `url('https://csis-website-prod.s3.amazonaws.com/s3fs-public/styles/768x461/s3/blog_post/171222_Abstract_Movie.jpg?VersionId=RChOOCDTtDCFatIEboQyqYUNwgu.Tc4L&h=266da715&itok=62XeMIId')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>
      
          <Box sx={{ fontSize: "5.5vh", fontWeight: "600", mt: "10vh" }}>
             Movies, TV shows and more
          </Box>
          <Box sx={{ fontSize: "3vh", mb: "4vh" }}>
            Watch anywhere. Cancel anytime.
          </Box>
          <Box sx={{ fontSize: "2vh", color: "lightgrey" }}>
            Ready to watch? Enter your email to create or restart your
            membership.
          </Box>
          <Box sx={{ display: "flex", gap: "2vh", mt: "3vh" }}>
            <Button
              sx={{
                p: "1vh 3vh !important",
                height: "fit-content",
                fontSize: "2.5vh !important",
              }}
              onClick={() => {
                go("/SignIn");
              }}
              className="auth-button"
            >
              SignIn
            </Button>
            <Button
              sx={{
                p: "1vh 3vh !important",
                height: "fit-content",
                fontSize: "2.5vh !important",
              }}
              onClick={() => {
                go("/SignUp");
              }}
              className="auth-button auth-2-button"
            >
              SignUp
            </Button>
          </Box>
        </Box>
      )}
      <Box className="home-top-rated-container">
        <Box
          sx={{
            background: "#000000b3",
            p: "3vh 5vh",
            width: "calc(100vw - 10vh - 15px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ fontSize: "3vh" }}>Popular Movies</Box>
          <Box sx={{ display: "flex" }}>
            {!mobile && (
              <Button
                onClick={() => {
                  move(0, "left");
                }}
                className="cards-left-icon"
              >
                <ChevronLeftIcon />
              </Button>
            )}
            <Box id="home-popular-list" className="home-card-list card-section">
              {home_videos.popular &&
                home_videos.popular.map((movie, ind) => {
                  return <MovieCard key={ind} data={movie} />;
                })}
            </Box>
            {!mobile && (
              <Button
                onClick={() => {
                  move(0, "right");
                }}
                className="cards-right-icon"
              >
                <ChevronRightIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box className="home-recently-watched-container">
        <Box
          sx={{
            background: "#000000b3",
            p: "3vh 5vh",
            width: "calc(100vw - 10vh - 15px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ fontSize: "3vh" }}>Upcoming New Movies</Box>
          <Box sx={{ display: "flex" }}>
            {!mobile && (
              <Button
                onClick={() => {
                  move(1, "left");
                }}
                className="cards-left-icon"
              >
                <ChevronLeftIcon />
              </Button>
            )}
            <Box
              id="home-upcoming-new-list"
              className="home-card-list card-section"
            >
              {home_videos.upcoming &&
                home_videos.upcoming.map((movie, ind) => {
                  return <MovieCard key={ind} data={movie} />;
                })}
            </Box>
            {!mobile && (
              <Button
                onClick={() => {
                  move(1, "right");
                }}
                className="cards-right-icon"
              >
                <ChevronRightIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box className="home-watchlist-container">
        <Box
          sx={{
            background: "#000000b3",
            p: "3vh 5vh",
            width: "calc(100vw - 10vh - 15px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ fontSize: "3vh" }}>Top Rated Movies</Box>
          <Box sx={{ display: "flex" }}>
            {!mobile && (
              <Button
                onClick={() => {
                  move(2, "left");
                }}
                className="cards-left-icon"
              >
                <ChevronLeftIcon />
              </Button>
            )}
            <Box
              id="home-top-rated-list"
              className="home-card-list card-section"
            >
              {home_videos.top_rated &&
                home_videos.top_rated.map((movie, ind) => {
                  return <MovieCard key={ind} data={movie} />;
                })}
            </Box>
            {!mobile && (
              <Button
                onClick={() => {
                  move(2, "right");
                }}
                className="cards-right-icon"
              >
                <ChevronRightIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {home_videos.recently_watched &&
        home_videos.recently_watched.length > 0 && (
          <Box className="home-recently-watched-container">
            <Box
              sx={{
                background: "#000000b3",
                p: "3vh 5vh",
                width: "calc(100vw - 10vh - 15px)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box sx={{ fontSize: "3vh" }}>Recently Watched Movies</Box>
              <Box sx={{ display: "flex" }}>
                {!mobile && (
                  <Button
                    onClick={() => {
                      move(3, "left");
                    }}
                    className="cards-left-icon"
                  >
                    <ChevronLeftIcon />
                  </Button>
                )}
                <Box
                  id="home-recently-watched-list"
                  className="home-card-list card-section"
                >
                  {home_videos.recently_watched.map((movie, ind) => {
                    return <MovieCard key={ind} data={movie} />;
                  })}
                </Box>
                {!mobile && (
                  <Button
                    onClick={() => {
                      move(3, "right");
                    }}
                    className="cards-right-icon"
                  >
                    <ChevronRightIcon />
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      {home_videos.watchlist && home_videos.watchlist.length > 0 && (
        <Box className="home-watchlist-container">
          <Box
            sx={{
              background: "#000000b3",
              p: "3vh 5vh",
              width: "calc(100vw - 10vh - 15px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ fontSize: "3vh" }}>Wishlist Movies</Box>
            <Box sx={{ display: "flex" }}>
              {!mobile && (
                <Button
                  onClick={() => {
                    move(4, "left");
                  }}
                  className="cards-left-icon"
                >
                  <ChevronLeftIcon />
                </Button>
              )}
              <Box
                id="home-watchlist-list"
                className="home-card-list card-section"
              >
                {home_videos.watchlist.map((movie, ind) => {
                  return <MovieCard key={ind} data={movie} />;
                })}
              </Box>
              {!mobile && (
                <Button
                  onClick={() => {
                    move(4, "right");
                  }}
                  className="cards-right-icon"
                >
                  <ChevronRightIcon />
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {Object.keys(cat_genrs).map((cat, ind) => {
        return (
          <Box className="home-watchlist-container">
            <Box
              sx={{
                background: "#000000b3",
                p: "3vh 5vh",
                width: "calc(100vw - 10vh - 15px)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box sx={{ fontSize: "3vh" }}>{cat}</Box>
              <Box sx={{ display: "flex" }}>
                {!mobile && (
                  <Button
                    onClick={() => {
                      move(ind + 3, "left");
                    }}
                    className="cards-left-icon"
                  >
                    <ChevronLeftIcon />
                  </Button>
                )}
                <Box
                  id="home-top-rated-list"
                  className="home-card-list card-section"
                >
                  {cat_genrs[cat].map((movie, ind) => {
                    return <MovieCard key={ind} data={movie} />;
                  })}
                </Box>
                {!mobile && (
                  <Button
                    onClick={() => {
                      move(ind + 3, "right");
                    }}
                    className="cards-right-icon"
                  >
                    <ChevronRightIcon />
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
