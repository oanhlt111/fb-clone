import GoogleIcon from "@mui/icons-material/Google";
import { Alert, Chip } from "@mui/material";
import firebaseClient from "config/firebase";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setUserInformation } from "slice/userSlice";
import { updateOnlineUser } from "utils/updateOnlineUser";
import { getUserCredentialStorage } from "utils/userCredential";
import Login from "./login";
import "./sign-form.css";
import SignUp from "./signup";

function SignForm() {
  const dispatch = useDispatch();

  // error handler
  const [errorMessage, setErrorMessage] = useState("");

  // reset value
  const resetErrorValue = () => {
    setErrorMessage("");
  };

  const setUserCustomInformation = (userCredential) => {
    const user = {
      name: userCredential.displayName,
      profileSrc: userCredential.photoURL,
      uid: userCredential.uid,
    };

    dispatch(setUserInformation(user));
    updateOnlineUser(user.uid);
  };

  //auto login if exist in local
  useEffect(() => {
    let userCredential = getUserCredentialStorage();
    if (userCredential) {
      setUserCustomInformation(userCredential);
    }
  }, []);

  // login with google
  const handleLoginWithGoogle = () => {
    resetErrorValue();

    firebaseClient
      .signInWithGoogle()
      .then((user) => {
        setUserCustomInformation(user);
      })
      .catch((err) => setErrorMessage(err));
  };

  return (
    <div className="center__form">
      <div className="sign post__wrapper">
        <div className="sign__logo">
          <img
            src="https://logodownload.org/wp-content/uploads/2021/10/meta-logo.png"
            alt="meta logo"
          />
        </div>
        <div className="sign__form">
          <div className="other__login">
            <Chip
              variant="outlined"
              color="error"
              icon={<GoogleIcon />}
              label="Đăng nhập bằng Google"
              clickable
              onClick={handleLoginWithGoogle}
            />
          </div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={SignUp} />
            </Switch>
          </BrowserRouter>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
}

export default SignForm;
