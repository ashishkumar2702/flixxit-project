import { Box, Button, Checkbox, OutlinedInput, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "../styles/signin.css";
import { toast } from "react-toastify";
import { postSignin } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/styles";
export default function SignIn() {
  const go = useNavigate();

  useEffect(() => {
    let nav = document.getElementsByClassName("nav-container")[0];
    nav.style.display = "none";
    return () => {
      nav.style.display = "flex";
    };
  }, []);

  const handle_signin = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    if (email.length == 0 || pass.length == 0) {
      toast.error("Please enter all the fields");
      return;
    } else {
      postSignin({ email: email, pass: pass })
        .then((res) => {
          localStorage.setItem("userdet", JSON.stringify(res.user));
          localStorage.setItem("access", res.user.token);
          go("/");
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
            Sign In
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
          <Box sx={{ mb: "5vh" }}>
            <TextField
              id="pass"
              fullWidth
              label="Password"
              className="signin-textfield"
              placeholder="Password"
              type="password"
            />
          </Box>

          <Box sx={{ mb: "1vh" }}>
            <Button
              onClick={() => {
                handle_signin();
              }}
              className="auth-button"
            >
              Sign In
            </Button>
          </Box>

          <Box sx={{ color: "#c3c3c3", mb: "3vh" }}>
            New to Flixxit?&ensp;
            <span
              onClick={() => {
                go("/SignUp");
              }}
              style={{
                color: "white",
                fontSize: "2vh",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              SignUp Now
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
