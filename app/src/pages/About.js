import { Box } from "@mui/material";
import React from "react";
import "../styles/about.css";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CallIcon from "@mui/icons-material/Call";
import WorkIcon from "@mui/icons-material/Work";
import { theme } from "../styles/styles";

export default function About() {
  const details = {
    name: "Ashish Kumar",
    designation: "Full Stack Developer",
    phone: "+91 7488926022",
    mail: "ashishkr272001@gmail.com",
    profile_img: "/Images/profile.jpg",
  };
  const features = {
    "User Accounts": [
      "Sign up and login using email IDs and passwords.",
      "User profile displaying account information.",
      "Update preferences.",
    ],
    Dashboard: [
      "Browse titles using horizontally scrollable carousels.",
      "Categorized content by categories.",
    ],
    "Title View": [
      "View detailed information about a selected title.",
      "Synopsis, rating, release date, and description.",
    ],
    Search: [
      "Search for various types of content like web series, movies, short films, documentaries.",
      "Integration with a third- party API like themoviedb.org for obtaining content data.",
    ],
    Watchlist: [
      "Add programs to a watchlist for later viewing.",
      "Autoplay feature for continuous watching.",
    ],
    Rating: ["Allow users to rate programs with upvotes."],
    "Video Player": [
      "Play selected content on the platform.",
      "Skip intro feature.",
    ],
    "Payment and Subscription": [
      "Subscribe for accessing all app features.",
      "Provide a Pay Now button.",
    ],
    "About Us": ["Information about the features, and help desk details."],
  };
  const handleLink = (link) => {
    window.open(link);
  };
  const terms = {
    "Acceptance of Terms": [
      'By using the Flixxit web application ("the App"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from using the App.',
    ],
    "User Accounts": [
      "To access certain features of the App, you may need to create a user account. You must provide accurate and complete information during the registration process.",
      "You are solely responsible for maintaining the confidentiality of your account information, including your email ID and password. Any activity that occurs under your account is your responsibility.",
      "You agree to notify us immediately of any unauthorized use of your account or any other breach of security.",
    ],
    "User Profile": [
      "The App provides a user profile where you can view your account information, consumed content, and receive suggestions based on your interests.",
      "You may update your preferences within the user profile to personalize your experience on the App.",
    ],
    Dashboard: [
      "The App offers a dashboard that allows you to browse titles using scrollable carousels categorized by genres, categories, and more.",
      "The availability and selection of titles may vary and are subject to change without notice.",
    ],
    "Title View": [
      "Clicking on a title within the App leads to a section where you can view the synopsis, rating, and other details of the selected title.",
      "The information provided for each title is for reference purposes and may not always be accurate or up to date.",
    ],
    Search: [
      "The App enables users to search for various types of content, including web series, movies, short films, documentaries, and more.",
      "The search feature may utilize third-party APIs to obtain data, such as from https://www.themoviedb.org/. The availability and accuracy of search results are not guaranteed.",
    ],
    Watchlist: [
      "Users can add programs they wish to watch later to their watchlist within the App.",
      'The "Autoplay" feature allows for automatic playback of content from the watchlist.',
    ],
    Rating: [
      "Users have the ability to rate programs by upvoting or downvoting and view the overall count of ratings.",
      "The ratings provided by users are subjective opinions and do not reflect the views or opinions of the App.",
    ],
    "Video Player": [
      "The App provides a video player that allows users to preview or play selected content.",
      'The "Skip Intro" feature allows users to skip the introductory part of the content.',
      "The video player supports at least two video quality options, including HD and Auto.",
    ],
    "Payment and Subscription": [
      "Users have the option to subscribe to monthly or yearly plans to access all features of the App.",
      "The subscription fees and plans are displayed within the App for reference purposes only.",
      'The App may display an invoice with a "Pay Now" button for demonstration purposes, but actual payment processing and integration with a payment gateway are not implemented.',
    ],
    "About Us": [
      'The "About Us" section of the App provides information about the features, origin, copyrights, terms and conditions, and help desk details.',
      "The information provided in this section is for informational purposes and does not constitute legal advice or a binding contract.",
    ],
    "Intellectual Property": [
      "The App and its content, including but not limited to text, graphics, logos, images, software, and audiovisual materials, are protected by intellectual property laws.",
      "You may not reproduce, distribute, modify, transmit, perform, or display any portion of the App's content without prior written consent from the rightful owner.",
    ],
    "Disclaimer of Liability": [
      'The App and its content are provided on an "as is" basis without any warrantiesor guarantees of any kind, either express or implied.',
      "We do not guarantee the accuracy, completeness, or reliability of the information or content provided within the App.",
      "We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the App or reliance on its content.",
    ],
    Indemnification: [
      "You agree to indemnify, defend, and hold us harmless from any claims, losses, liabilities, damages, costs, or expenses arising out of or related to your use of the App or any violation of these Terms and Conditions.",
    ],
    "Modifications to the App": [
      "We reserve the right to modify, suspend, or discontinue any aspect of the App, including its features, content, or availability, at any time without notice. We shall not be liable for any such modifications, suspension, or discontinuation.",
    ],
    "Privacy Policy": [
      "By using the App, you agree to our Privacy Policy, which governs the collection, use, and disclosure of personal information. The Privacy Policy is incorporated into these Terms and Conditions by reference.",
    ],
    "Governing Law and Jurisdiction": [
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Insert jurisdiction]. Any dispute arising out of or relating to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of [Insert jurisdiction].",
    ],
    "Entire Agreement": [
      "These Terms and Conditions constitute the entire agreement between you and us regarding the use of the App and supersede any prior or contemporaneous agreements, understandings, or representations, whether oral or written.",
    ],
    Severability: [
      "If any provision of these Terms and Conditions is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
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
        <Box
          sx={{
            width: "30%",
            height: "95vh",
            position: "sticky",
            top: "0",
            p: "5vh",
            pt: "15vh",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
              p: "0px",
              pt: "25vh",
              position: "unset",
              height: "fit-content",
            },
          }}
        >
          <Box className="about-profile-section">
            <Box sx={{ fontSize: "3vh", opacity: "0.7" }}>Developed By</Box>
            <Box className="about-profile-img">
              <img
                className="about-profile-img-blur"
                src={details.profile_img}
              />
              <img
                className="about-profile-img-org"
                src={details.profile_img}
              />
            </Box>
            <Box sx={{ fontSize: "3vh" }}>{details.name}</Box>
            <Box sx={{ cursor: "unset" }} className="about-profile-links">
              <WorkIcon /> {details.designation}
            </Box>
            <Box
              onClick={() => {
                handleLink("mailto:" + details.mail);
              }}
              className="about-profile-links"
            >
              <AlternateEmailIcon /> {details.mail}
            </Box>
            <Box
              onClick={() => {
                handleLink("tel:" + details.phone.replaceAll(" ", ""));
              }}
              className="about-profile-links"
            >
              <CallIcon /> {details.phone}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "70%",
            pt: "15vh",
            [theme.breakpoints.down("sm")]: {
              width: "calc(100% - 8vh)",
              p: "2vh 4vh",
            },
          }}
        >
          <Box sx={{ fontSize: "2.5vh", opacity: "0.8", py: "3vh" }}>
            Features
          </Box>
          <Box sx={{ fontSize: "2vh" }}>
            {Object.keys(features).map((fet) => {
              return (
                <Box>
                  <Box>{fet} :</Box>
                  <Box sx={{ fontSize: "1.7vh", opacity: "0.8", ml: "2vh" }}>
                    {features[fet].map((sfet) => (
                      <Box> • {sfet}</Box>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{ fontSize: "2.5vh", opacity: "0.8", py: "3vh", pt: "10vh" }}
          >
            Origin References / Credits
          </Box>
          <Box sx={{ fontSize: "2vh" }}>
            <Box>
              <Box>TMDB :</Box>
              <Box sx={{ fontSize: "1.7vh", opacity: "0.8", ml: "2vh" }}>
                {" "}
                • The movie content provided by tmdb website
              </Box>
            </Box>
            <Box>
              <Box>UI Animations :</Box>
              <Box sx={{ fontSize: "1.7vh", opacity: "0.8", ml: "2vh" }}>
                {" "}
                • Some of the animations provided by uiverse.io
              </Box>
            </Box>
            <Box>
              <Box>ChatGPT by OpenAI :</Box>
              <Box sx={{ fontSize: "1.7vh", opacity: "0.8", ml: "2vh" }}>
                {" "}
                • Terms and Conditions are referenced from chatgpt by OpenAI
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: "2vh 4vh" }}>
        <Box sx={{ fontSize: "2.5vh", opacity: "0.8", py: "3vh", pt: "10vh" }}>
          Terms and Conditions
        </Box>
        <Box sx={{ fontSize: "2vh" }}>
          {Object.keys(terms).map((term) => {
            return (
              <Box>
                <Box>{term} :</Box>
                {terms[term].map((child_term) => (
                  <Box sx={{ fontSize: "1.7vh", opacity: "0.8", ml: "2vh" }}>
                    {" "}
                    • {child_term}
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          fontSize: "2vh",
          mt: "5vh",
          opacity: "0.6",
          pb: "4vh",
        }}
      >
        Flixxit, All rights reserved
      </Box>
    </Box>
  );
}
