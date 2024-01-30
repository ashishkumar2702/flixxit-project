import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { Box, Button, TextField } from "@mui/material";
import { styles } from "../styles/styles";
import { putProfile } from "../apis/Profile";
import ReactDOM from "react-dom/client";
import PayCard from "../components/PayCard";
export default function Profile() {
  const [user, setUser] = useState(
    localStorage.getItem("userdet") &&
      JSON.parse(localStorage.getItem("userdet"))
  );
  const [edit, setEdit] = useState(false);

  const changeName = () => {
    const name = document.getElementById("profile-name").value;
    putProfile({ name: name }).then((res) => {
      setEdit(false);
      setUser({ ...res });
    });
  };
  const [update, setUpdate] = useState(Date.now());
  useEffect(() => {
    setUser({ ...JSON.parse(localStorage.getItem("userdet")) });
  }, [update]);
  return (
    <Box className="profile-container">
      <Box className="profile-card">
        <Box className="row profile-row">
          <Box>Name</Box>
          <Box>
            <TextField
              id="profile-name"
              className={
                "profile-textfield" + (edit ? " profile-textfield-show" : "")
              }
              defaultValue={user.name}
            />
            <Box sx={{ width: "100%" }}>{!edit && user.name}</Box>
            <Box sx={{ width: "100%" }}></Box>
          </Box>
        </Box>
        <Box className="row profile-row">
          <Box>Email</Box>
          <Box>{user.email}</Box>
        </Box>
        <Box className="row profile-row">
          <Box>userID</Box>
          <Box># {user._id}</Box>
        </Box>
        <Box className="row profile-row">
          <Box>Subscribed</Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user.subscription ? "Yes" : "No"}
            {!user.subscription ? (
              <Box>
                <Button
                  onClick={() => {
                    const div = document.getElementById("payCard");
                    const root = ReactDOM.createRoot(div);
                    root.render(<PayCard setUpdate={setUpdate} />);
                  }}
                  className="auth-button subscribe-button"
                >
                  Subscribe
                </Button>
              </Box>
            ) : (
              <Box className="sub-img-container">
                <img src="/Images/sub.png" />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            mt: "5vh",
            mb: "2vh",
            display: "flex",
            gap: "3vh",
            justifyContent: "center",
          }}
        >
          {edit && (
            <Button
              onClick={() => setEdit(false)}
              className="profile-edit-button"
              sx={styles.secondary_button}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              if (!edit) {
                setEdit(true);
              } else {
                changeName();
              }
            }}
            className="profile-edit-button"
            sx={styles.primary_button}
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
