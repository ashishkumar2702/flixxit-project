import { Box, Button, Checkbox, OutlinedInput, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "../styles/signin.css";
import { toast } from "react-toastify";
import { postSignin, postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/styles";
export default function SignUp() {
  const go = useNavigate();

  useEffect(() => {
    let nav = document.getElementsByClassName("nav-container")[0];
    nav.style.display = "none";
    return () => {
      nav.style.display = "flex";
    };
  }, []);
  const handle_signin = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    if (pass.length <= 8) {
      toast.error("Password length must be minimum 8");
      return;
    }
    if (email.length == 0 || name.length == 0) {
      toast.error("Please enter all the fields");
      return;
    } else {
      postSignup({ email: email, pass: pass, name: name })
        .then((res) => {
          // localStorage.setItem('userdet', JSON.stringify(res.user))
          // localStorage.setItem('access', JSON.stringify(res.user.token))
          console.log(res);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };
  return (
    <Box
      sx={{
        background: "url('https://www.technologycompanians.com/wp-content/uploads/2021/08/Full-Form-Of-OTT.jpg') center/cover",
        p: "5vh 10vh",
        minHeight: "100vh",
        [theme.breakpoints.down("sm")]: {
          padding: "2vw",
        },
      }}
    >
      <Box className="signin-nav-logo">
        <img src="/Images/logo.png" />
      </Box>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Box className="signin-container">
          <Box sx={{ fontSize: "3vh", mb: "5vh", fontWeight: "600" }}>
            Sign Up
          </Box>

          <Box sx={{ mb: "2vh" }}>
            <TextField
              id="email"
              fullWidth
              label="Email Address"
              className="signin-textfield"
              placeholder="Email Address"
            />
          </Box>
          <Box sx={{ mb: "2vh" }}>
            <TextField
              id="pass"
              fullWidth
              label="Password"
              className="signin-textfield"
              placeholder="Password"
              type="password"
            />
          </Box>
          <Box sx={{ mb: "5vh" }}>
            <TextField
              id="name"
              fullWidth
              label="Full Name"
              className="signin-textfield"
              placeholder="Full Name"
            />
          </Box>

          <Box sx={{ mb: "1vh" }}>
            <Button
              onClick={() => {
                handle_signin();
              }}
              className="auth-button"
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ color: "#c3c3c3", mb: "3vh" }}>
            Already on Flixxit?&ensp;
            <span
              onClick={() => {
                go("/SignIn");
              }}
              style={{
                color: "white",
                fontSize: "2vh",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              SignIn Now
            </span>
          </Box>
          <Box sx={{ color: "#c3c3c3", fontSize: "1.4vh" }}>
            Flixxit aims to be a web application with the likeness and basic
            feature set of OTT platforms such as Netflix, Prime Video and
            AppleTV+
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
