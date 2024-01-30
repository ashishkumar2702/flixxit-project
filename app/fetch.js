const axios = require("axios");

const genrs = {};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=";
const genre_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const cast_url = [
  "https://api.themoviedb.org/3/movie/",
  "/credits?language=en-US",
];
const poster_path = "http://image.tmdb.org/t/p/w500";
const backend_url = "http://localhost:5050/api/content";

const headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjE3OTZmOWI3NzIwOTMzZWU2ZTY2MjkyOGU4NjVhMCIsInN1YiI6IjY0OWE2YjNlYTZkZGNiMDBhZTY3YzAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S1AcQnGQy4j96pLc31lklHz2hH6T1LX0t4hivAGUX88",
};
const sample_videos = [
  "/Videos/spiderman_720p.mp4",
  "/Videos/extraction_2_720p.mp4",
  "/Videos/got_720p.mp4",
];
const getPage = async (page) => {
  var movies = {};
  await axios
    .get(url + page, {
      headers: headers,
    })
    .then(async (resa) => {
      var apis = [];
      for (let j = 0; j < resa.data.results.length; j++) {
        var i = resa.data.results[j];
        apis.push({
          api: axios.get(cast_url.join(i.id), {
            headers: headers,
          }),
          data: i,
        });
      }
      axios
        .all(apis.map((api) => api.api))
        .then((res1) => {
          // console.log(movies);
          // console.log(res1)
          for (let k = 0; k < res1.length; k++) {
            let i = apis[k].data;
            let cast = res1[k].data.cast.map((cas) => cas.name);
            const random = Math.floor(Math.random() * 3);
            movies[i.id] = {
              poster: poster_path + i.poster_path,
              title: i.title,
              rating: i.vote_average,
              genre: i.genre_ids.map((gen) => genrs[gen]).join(", "),
              releaseDate: new Date(i.release_date),
              description: i.overview,
              cast: cast,
              videoUrl: sample_videos[random],
              intro_skip: 10 + Math.floor(Math.random() * 10),
            };
          }
          // .then(res1 => {
          // })
          var post_apis = [];
          for (let j = 0; j < Object.values(movies).length; j++) {
            let i = Object.values(movies)[j];
            post_apis.push(
              axios.post(backend_url, i).catch((er) => {
                console.log(er);
              })
            );
          }
          axios
            .all(post_apis)
            .then((res) => {
              console.log("all added");
              console.log(url + page);
              console.log(
                res1.length,
                Object.values(movies).length,
                post_apis.length
              );
            })
            .catch((er) => {
              console.log(er);
            });
        })
        .catch((er) => console.log(er));
    })
    .catch((er) => {
      console.log(er);
    });
};
const getGeneres = async () => {
  await axios
    .get(genre_url, {
      headers: headers,
    })
    .then((res) => {
      // console.log(res.data.genres)
      for (let i of res.data.genres) {
        genrs[i.id] = i.name;
      }
    })
    .catch((er) => {
      console.log(er);
    });
};
const start = async () => {
  await getGeneres().catch((err) => {
    console.log(err);
    return;
  });
  let count = 20;
  for (let i = 1; i < count; i++) {
    await getPage(i);
  }
};
start();
