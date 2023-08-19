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
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    const currData = credentials;
    currData[`${name}`] = value;
    setCredentials(currData);
  };

  const handleLogin = () => {
    const { email, password } = credentials;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div className="unauthenticatedPage">
      <div className="loginWrapper">
        <div className="loaginHeader">Welcome to QuickChat</div>
        <div className="emailWrapper">
          <TextField
            id="email"
            label="Email"
            variant="standard"
            name="email"
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
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
            name="password"
            onChange={handleInputChange}
          />
        </FormControl>
        <div>
          <LoadingButton
            variant="contained"
            loading={loading}
            loadingPosition="end"
            sx={{
              padding: "10px 20px",
              marginTop: "16px",
              marginBottom: "12px",
            }}
            fullWidth
            onClick={() => handleLogin()}
          >
            Login
          </LoadingButton>
        </div>
        {error && <div className="loginError">{error.code.split("/")[1]}</div>}
        <div>
          Dont have an account? <a href="/signup">Register</a> here
        </div>
      </div>
    </div>
  );
}
