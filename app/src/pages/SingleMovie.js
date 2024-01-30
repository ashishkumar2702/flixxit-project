import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSingleMovie } from "../apis/Home";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "react-circular-progressbar/dist/styles.css";
import "../styles/singlemovie.css";
import { getRating, getWish, postRating, postWish } from "../apis/SingleMovie";
import { styles, theme } from "../styles/styles";
import { checkSubscription } from "../apis/auth";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
export default function SingleMovie() {
  const [data, setData] = useState({});
  const [ratingStyles, setRatingStyles] = useState({
    path_color: "rgb(0, 200, 83)",
    path_back: "rgba(0, 200, 83, 0.3)",
  });
  const colors = {
    green: "rgb(0, 200, 83)",
    green_back: "rgba(0, 200, 83, 0.3)",
    orange: "rgb(244, 81, 30)",
    orange_back: "rgba(244, 81, 30, 0.3)",
    red: "rgb(229, 57, 53)",
    red_back: "rgba(229, 57, 53, 0.3)",
  };
  const [liked, setLiked] = useState(false);
  const [wished, setWished] = useState(false);
  const [downed, setDowned] = useState(false);

  const setRatingsColors = (dat) => {
    if (dat.rating <= 3.3) {
      setRatingStyles({
        path_back: colors.red_back,
        path_color: colors.red,
      });
    } else if (dat.rating <= 6.6) {
      setRatingStyles({
        path_back: colors.orange_back,
        path_color: colors.orange,
      });
    } else {
      setRatingStyles({
        path_back: colors.green_back,
        path_color: colors.green,
      });
    }
  };
  const animate = (id) => {
    document.getElementById(id).classList.toggle("animate-jelly");
    setTimeout(() => {
      document.getElementById(id).classList.toggle("animate-jelly");
    }, 1000);
  };
  useEffect(() => {
    let id = window.location.href.split("/").pop();
    getSingleMovie(id).then((dat) => {
      console.log(dat);
      setData({ ...dat });
      setRatingsColors(dat);
      //fetch ratings
      getRating({ id: dat._id }).then((rat) =>
        rat[dat._id] != undefined
          ? rat[dat._id] == true
            ? setLiked(true)
            : setDowned(true)
          : console.log("asd")
      );
      getWish({ id: dat._id }).then((rat) => setWished(rat[dat._id]));
    });

    // animate the icons
    let divs = document.getElementsByClassName("single-movie-icons");
    for (let i of divs) {
      i.classList.toggle("animate-jelly");
    }
    window.scrollTo({
      top: 0,
    });
    setTimeout(() => {
      for (let i of divs) {
        i.classList.toggle("animate-jelly");
      }
    }, 1000);
  }, []);

  const mobile = window.innerWidth <= 720;
  return (
    <Box id="scrolle" sx={{ minHeight: "100vh", p: "10vh 0vh" }}>
      <Box
        sx={{
          color: "white",
          px: "10vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            [theme.breakpoints.down("sm")]: {
              flexFlow: "column",
            },
          }}
        >
          <Box class="single-movie-img" sx={{ width: "45%" }}>
            <Box class="single-movie-img-reflection-top">
              <Box class="single-movie-img-reflection">
                {!mobile ? (
                  <Box class="single-movie-img-reflection-bottom">
                    <img src={data.poster} />
                  </Box>
                ) : (
                  <img src={data.poster} />
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "55%",
              pt: "10vh",
              [theme.breakpoints.down("sm")]: {
                width: "80vw",
                pt: "2vh",
              },
            }}
          >
            <Box
              sx={{
                fontSize: "5vh",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>{data.title}</Box>
              {wished ? (
                <svg
                  id="single-movie-watchlist"
                  className="single-movie-watchlist single-movie-icons single-movie-watchlist"
                  onClick={() => {
                    postWish({ id: data._id }).then((res) => {
                      if (res) {
                        setWished(!wished);
                      }
                    });
                    animate("single-movie-watchlist");
                  }}
                  x="0"
                  y="0"
                  viewBox="0 0 32 32"
                  style={{ enableBackground: "new 0 0 512 512" }}
                >
                  <g>
                    <path
                      d="M27.78 6.07a7.58 7.58 0 0 0-10.7 0L16 7.15l-1.08-1.08a7.58 7.58 0 0 0-10.7 0 7.59 7.59 0 0 0 0 10.71l11.07 11.07a1 1 0 0 0 1.42 0l11.07-11.07a7.59 7.59 0 0 0 0-10.71z"
                      fill="rgb(0, 200, 83)"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    postWish({ id: data._id }).then((res) => {
                      if (res) {
                        setWished(!wished);
                      }
                    });
                    animate("single-movie-watchlist");
                  }}
                  id="single-movie-watchlist"
                  className="single-movie-watchlist single-movie-icons"
                  viewBox="0 0 122.88 107.21"
                >
                  <path
                    d="M73.13,93.77,59.58,107.21,44,92.19c-2.43-2.35-5.25-4.92-8.18-7.59C19.93,70.14.79,52.69,0,31.09l0-1.65A28.51,28.51,0,0,1,9,8.54,31.68,31.68,0,0,1,29.57.31l1.71,0c13.72.18,20,6.2,28.18,14.24C66.21,7.38,71.81,1.52,83.21.21a33.07,33.07,0,0,1,18.62,3.37,34.41,34.41,0,0,1,12.24,10.25,31,31,0,0,1,6,14.86A30.55,30.55,0,0,1,116.82,46c-.41.8-.88,1.65-1.39,2.52l-.45.74A30.65,30.65,0,0,1,73.13,93.77Zm15.22-35.6a3.69,3.69,0,0,1,.3-1.48l0-.06a3.8,3.8,0,0,1,2.06-2,3.94,3.94,0,0,1,1.47-.31h0a3.87,3.87,0,0,1,1.48.29,4.15,4.15,0,0,1,1.26.84,3.87,3.87,0,0,1,.84,1.25l0,.07a4,4,0,0,1,.28,1.4v7.78h7.75a3.87,3.87,0,0,1,1.48.29,3.92,3.92,0,0,1,1.26.84,4,4,0,0,1,.84,1.25l0,.07a3.78,3.78,0,0,1,.28,1.35v.15a3.86,3.86,0,0,1-.29,1.41,4.15,4.15,0,0,1-.84,1.26,3.7,3.7,0,0,1-1.25.83l-.07,0a4,4,0,0,1-1.39.28H96.12v7.75a3.87,3.87,0,0,1-.3,1.48A3.92,3.92,0,0,1,95,84.17l-.08.07a3.72,3.72,0,0,1-1.17.77l-.07,0a3.8,3.8,0,0,1-1.4.28h0a4.07,4.07,0,0,1-1.48-.3,3.85,3.85,0,0,1-2.09-2.08,3.79,3.79,0,0,1-.3-1.47V73.69H80.6a3.87,3.87,0,0,1-1.48-.3l-.06,0a3.58,3.58,0,0,1-1.2-.81A3.87,3.87,0,0,1,77,71.3l0-.07a4,4,0,0,1-.28-1.4v0A4,4,0,0,1,77,68.33a3.86,3.86,0,0,1,.84-1.27,4,4,0,0,1,1.25-.83,3.71,3.71,0,0,1,1.47-.3h7.78V58.17Zm21.7-13.31c.34-.58.67-1.17,1-1.76a24.13,24.13,0,0,0,2.56-13.67,24.39,24.39,0,0,0-4.72-11.73,27.78,27.78,0,0,0-9.92-8.31A26.62,26.62,0,0,0,84,6.68c-9.13,1-14,6.2-19.9,12.47l-4.43,4.64L55.2,19.45c-7.27-7.14-12.74-12.52-24-12.67l-1.4,0a25.21,25.21,0,0,0-16.36,6.5A22.12,22.12,0,0,0,6.49,29.52l0,1.34c.67,18.85,18.72,35.3,33.67,48.93,2.89,2.63,5.67,5.16,8.32,7.72l11,10.61,9-8.91a30.66,30.66,0,0,1,41.55-44.35Zm-.76,7.87a24.14,24.14,0,1,0,7.07,17.07,24.06,24.06,0,0,0-7.07-17.07Z"
                    fill="rgb(0, 200, 83)"
                  />
                </svg>
              )}
            </Box>
            <Box sx={{ mb: "3vh", fontSize: "2.5vh", opacity: "0.7" }}>
              {new Date(data.releaseDate).getFullYear()}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "2vh" }}>
                <Box
                  className="single-movie-rating-circle"
                  sx={{ height: "7vh", width: "7vh" }}
                >
                  <CircularProgressbar
                    styles={buildStyles({
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 1,

                      pathColor: ratingStyles.path_color,
                      textColor: ratingStyles.path_color,
                      trailColor: ratingStyles.path_back,
                    })}
                    value={data.rating * 10}
                    maxValue={100}
                    text={`${data.rating * 10}%`}
                  />
                </Box>
                <Box>
                  {data.rating * 10}% of people Liked {data.title}
                </Box>
              </Box>
              <Box className="single-movie-icons" id="single-movie-like">
                {!liked && !downed ? (
                  <>
                    <ThumbUpIcon
                      sx={{
                        fontSize: "4vh",
                        color: liked
                          ? "rgb(0, 200, 83)"
                          : downed
                          ? "red"
                          : "white",
                      }}
                      onClick={() => {
                        postRating({
                          id: data._id,
                          rating: true,
                          cat: "rating",
                        }).then((res) => {
                          if (res) {
                            setLiked(true);
                          }
                        });
                        animate("single-movie-like");
                      }}
                    />
                    &emsp;
                    <ThumbDownIcon
                      sx={{
                        fontSize: "4vh",
                        color: liked
                          ? "rgb(0, 200, 83)"
                          : downed
                          ? "red"
                          : "white",
                      }}
                      onClick={() => {
                        postRating({
                          id: data._id,
                          rating: true,
                          cat: "downvote",
                        }).then((res) => {
                          if (res) {
                            setDowned(true);
                          }
                        });
                        animate("single-movie-like");
                      }}
                    />
                  </>
                ) : liked ? (
                  <>
                    <Box sx={{ color: "green" }}>You Have Liked this Movie</Box>
                    &emsp;
                    <Button
                      onClick={() => {
                        postRating({
                          id: data._id,
                          rating: false,
                          cat: "rating",
                        }).then((res) => {
                          if (res) {
                            if (downed) {
                              setDowned(false);
                            } else if (liked) setLiked(false);
                          }
                        });
                        animate("single-movie-like");
                      }}
                      sx={styles.secondary_button}
                    >
                      {" "}
                      Remove{" "}
                    </Button>
                  </>
                ) : downed ? (
                  <>
                    <Box sx={{ color: "red" }}>
                      You Have Down Voted this Movie
                    </Box>
                    &emsp;
                    <Button
                      onClick={() => {
                        postRating({
                          id: data._id,
                          rating: false,
                          cat: "downvote",
                        }).then((res) => {
                          if (res) {
                            if (downed) {
                              setDowned(false);
                            } else if (liked) setLiked(false);
                          }
                        });
                        animate("single-movie-like");
                      }}
                      sx={styles.secondary_button}
                    >
                      {" "}
                      Remove{" "}
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            <Box sx={{ mt: "3vh" }}>
              <Button
                onClick={async () => {
                  animate("single-movie-playbutton");
                  const check = await checkSubscription();
                  setTimeout(() => {
                    if (check) window.open("/VideoPlay/" + data._id);
                  }, 500);
                }}
                id="single-movie-playbutton"
                className="auth-button"
                sx={styles.playButton}
                startIcon={<PlayCircleIcon />}
              >
                Play
              </Button>
            </Box>
            <Box sx={{ mt: "3vh" }}>{data.description}</Box>
            <Box sx={{ mt: "3vh", fontSize: "2vh", opacity: "0.7" }}>Cast</Box>
            <Box
              sx={{
                mt: "2vh",
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                gap: "2vh",
              }}
            >
              {data.cast &&
                data.cast.map((cast) => {
                  return (
                    <Box
                      className="single-movie-cast-div"
                      onClick={() => {
                        window.open(
                          "https://www.google.com/search?q=about+" +
                            cast.replaceAll(" ", "+") +
                            "+in+" +
                            data.title
                        );
                      }}
                    >
                      {cast}
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
