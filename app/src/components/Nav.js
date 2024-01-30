import React, { useEffect, useState } from "react";
import { Box, Button, OutlinedInput, TextField } from "@mui/material";
import "../styles/Nav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../apis/Nav";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "../styles/styles";

export default function Nav() {
  const menu = [
    {
      name: "Home",
      path: "",
      auth: false,
    },
    {
      name: "WatchList",
      path: "watchlist",
      auth: true,
    },
    {
      name: "Recently Watched",
      path: "recently-watched",
      auth: true,
    },
    {
      name: "About",
      path: "about",
      auth: false,
    },
  ];
  const logout = (path) => {
    setUser(null);
    localStorage.removeItem("userdet");
    localStorage.removeItem("access");
    go(path);
  };
  const profile_menu = [
    {
      name: "Profile",
      path: "/profile",
      funtion: null,
    },
    {
      name: "Logout",
      path: "/SignIn",
      function: logout,
    },
  ];
  const go = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("userdet") &&
      JSON.parse(localStorage.getItem("userdet"))
  );
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const mobile = window.innerWidth <= 720;
  const [openmenu, setOpenmenu] = useState(false);

  useEffect(() => {
    setUser(
      localStorage.getItem("userdet") &&
        JSON.parse(localStorage.getItem("userdet"))
    );
  }, [location]);
  useEffect(() => {
    if (!user) {
      getUser()
        .then((res) => {
          if (res) {
            setUser({ ...res.data });
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, []);

  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          flexFlow: "column",
        },
      }}
      className="nav-container"
    >
      <Box sx={{ display: "flex", gap: "4vh", alignItems: "center" }}>
        <Box onClick={() => go("/")} className="nav-logo">
          <img src={"/Images/logo.png"}></img>
        </Box>
        <Box
          className="navbar-menu-container"
          sx={{
            display: "flex",
            gap: "2vh",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "1.7vh",
            left: mobile && openmenu ? "0px !important" : "-200% !important",
          }}
        >
          {mobile && (
            <Button
              onClick={() => setOpenmenu(!openmenu)}
              className={"nav-menu-icon" + (openmenu ? " open-nav-button" : "")}
            >
              <MenuIcon />
            </Button>
          )}
          {menu.map((item, ind) => {
            return (item.auth && user) || !item.auth ? (
              <Box
                key={"nav-item-" + ind}
                onClick={() => {
                  go(item.path);
                  setOpenmenu(false);
                }}
              >
                {item.name}
              </Box>
            ) : (
              <></>
            );
          })}
        </Box>
        <Box className="nav-search-container">
          <OutlinedInput
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "100% !important",
              },
            }}
            id="search-input"
            endAdornment={
              <SearchIcon
                onClick={() => {
                  go(
                    "/Search/" + document.getElementById("search-input").value
                  );
                }}
                className="search-icon"
              />
            }
            className="nav-search"
            placeholder='Search "Ant"'
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "70%",
          margin: "2rem"
        }}
      >
        {user ? (
          <Box>
            <Button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                if (mobile) {
                  setTimeout(() => {
                    setShowProfileMenu(false);
                  }, 2000);
                }
              }}
              className="custom-btn-mui"
            >
              <Box className="nav-username custom-btn">{user.name}</Box>
            </Button>
            {
              <Box
                onMouseLeave={() => {
                  setShowProfileMenu(false);
                }}
                className={
                  "profile-menu-container" +
                  (showProfileMenu ? " show-profile-menu" : "")
                }
              >
                {profile_menu.map((item) => (
                  <Box
                    onClick={() => {
                      item.function ? item.function(item.path) : go(item.path);
                    }}
                    className="profile-menu-items"
                  >
                    {item.name}
                  </Box>
                ))}
              </Box>
            }
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "2vh" }}>
            <Button
              sx={{ p: "1vh 3vh !important", height: "fit-content" }}
              onClick={() => {
                go("/SignIn");
              }}
              className="auth-button"
            >
              SignIn
            </Button>
            <Button
              sx={{ p: "1vh 3vh !important", height: "fit-content" }}
              onClick={() => {
                go("/SignUp");
              }}
              className="auth-button auth-2-button"
            >
              SignUp
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
