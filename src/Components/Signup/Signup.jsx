import * as React from "react";
import "./styles.css";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/CloudUploadOutlined";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [displayPicture, setDisplayPicture] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleWrapperClick = () => {
    !displayPicture && document.getElementById(`profile_fileupload`).click();
  };

  const handleInputChange = (ev) => {
    const { name, value, files } = ev.target;
    const currData = user;
    if (name === "picture") {
      currData[`${name}`] = files[0];
    } else {
      currData[`${name}`] = value;
    }
    setUser(currData);
  };

  const handleFileChange = (ev) => {
    const { files } = ev.target;
    setDisplayPicture(files[0]);
  };

  const handleSubmit = () => {
    setLoading(true);
    const createUserPromise = new Promise((resolve) =>
      resolve(createUserWithEmailAndPassword(auth, user.email, user.password))
    );
    createUserPromise
      .then((createRes) => {
        const storageRef = ref(
          storage,
          `${user.firstName}_${user.lastName}_${new Date().getTime()}`
        );
        return uploadBytesResumable(storageRef, displayPicture).then(() => [
          storageRef,
          createRes,
        ]);
      })
      .then((res) => {
        const [storageRef, createRes] = res;
        return getDownloadURL(storageRef).then((res) => [res, user, createRes]);
      })
      .then(async (res) => {
        const [downloadURL, user, createRes] = res;
        await updateProfile(createRes.user, {
          displayName: `${user.firstName} ${user.lastName}`,
          photoURL: downloadURL,
        });
        await setDoc(doc(db, "users", createRes.user.uid), {
          uid: createRes.user.uid,
          displayName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, "userChats", createRes.user.uid), {});

        navigate("/");
      });
  };

  return (
    <div className="unauthenticatedPage">
      <div className="loginWrapper">
        <div className="loaginHeader">Welcome to QuickChat</div>
        <div className="firstNameWrapper">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="standard"
            fullWidth
            onChange={handleInputChange}
          />
        </div>
        <div className="lastNameWrapper">
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="standard"
            fullWidth
            onChange={handleInputChange}
          />
        </div>

        <div className="emailWrapper">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            onChange={handleInputChange}
          />
        </div>
        <FormControl sx={{ m: 1, marginBottom: "16px" }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleInputChange}
          />
        </FormControl>
        <div className="fileUploadButton " onClick={handleWrapperClick}>
          {displayPicture ? (
            <div>{displayPicture.name}</div>
          ) : (
            <>
              <UploadIcon />
              <input
                className="inputfile"
                id={`profile_fileupload`}
                type="file"
                name={`picture`}
                onChange={handleFileChange}
                hidden
              />
              <label>{"Upload Profile Image"}</label>
            </>
          )}
        </div>
        <div>
          <LoadingButton
            variant="contained"
            loading={loading}
            loadingPosition="end"
            sx={{
              padding: "10px 20px",
              marginTop: "16px",
              marginBottom: "16px",
            }}
            fullWidth
            onClick={() => handleSubmit()}
          >
            Sign Up
          </LoadingButton>
        </div>
        <div>OR</div>
        <div>
          <Button
            variant="contained"
            sx={{
              padding: "10px 20px",
              marginTop: "16px",
              marginBottom: "12px",
            }}
            fullWidth
          >
            Sign Up using Google
          </Button>
        </div>
        <div>
          Already have an account? <a href="/login">Login</a> here
        </div>
      </div>
    </div>
  );
}
