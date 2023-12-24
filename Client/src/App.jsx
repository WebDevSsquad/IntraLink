import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  updateAbout,
  updateEmail,
  updateExpires,
  updateFirstName,
  updateIsAvailable_Con,
  updateIsAvailable_Tm,
  updateLastName,
  updateLocation,
  updateLoggedIn,
  updatePhone,
  updatePicture,
  updateSkills,
  updateUserID,
  updateUserName,
  updateFetch,
  updateTheme,
} from "./slices/userReducer";
import "./App.css";
import { ResetData } from "./components/resetdata/resetdata";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing_page/landing_page";
import Register from "./pages/register/register";
import store from "./slices/store";



function InnerApp() {
  const dispatch = useDispatch();
  let theme = useSelector((state) => state.user.theme);
  if (theme !== "dark" && theme !== "light") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    dispatch(updateTheme(theme));
  }

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const expires = useSelector((state) => state.user.expires);

  useEffect(() => {
    if (expires) {
      dispatch(updatePicture(`/assets/${theme}User.svg`));
      dispatch(updateLoggedIn(false));
      dispatch(updateExpires(false));
    }
  }, [expires, dispatch]);

  const stillLoggedIn = () => {
    fetch("http://localhost:8080/auth/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        if (res.ok) {
          dispatch(updateLoggedIn(true));
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.user);
        if (data.user.picture !== undefined)
          dispatch(updatePicture(data.user.picture));
        if (data.user.firstname !== undefined)
          dispatch(updateFirstName(data.user.firstname));
        if (data.user.secondname !== undefined)
          dispatch(updateLastName(data.user.secondname));
        if (data.user.user_id !== undefined)
          dispatch(updateUserID(data.user.user_id));
        if (data.user.username !== undefined)
          dispatch(updateUserName(data.user.username));
        if (data.user.email !== undefined)
          dispatch(updateEmail(data.user.email));
        if (data.user.available_con !== undefined)
          dispatch(updateIsAvailable_Con(data.user.available_con));
        if (data.user.available_tm !== undefined)
          dispatch(updateIsAvailable_Tm(data.user.available_tm));
        if (data.user.location !== undefined)
          dispatch(updateLocation(data.user.location));
        if (data.user.phone !== undefined)
          dispatch(updatePhone(data.user.phone));
        if (data.user.about !== undefined)
          dispatch(updateAbout(data.user.about));
        if (data.user.skills !== undefined)
          dispatch(updateSkills(data.user.skills));
        dispatch(updateFetch(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (
    !loggedIn &&
    localStorage.getItem("token") !== "" &&
    localStorage.getItem("token") !== null &&
    localStorage.getItem("token") !== undefined
  ) {
    stillLoggedIn();
  }
  // const logOut = () => {
  //   ResetData(dispatch);
  //   dispatch(updateLoggedIn(false));
  //   dispatch(updateExpires(true));
  //   localStorage.setItem("token", "");
  // };
  return (
    <Router>
      <div data-theme={theme} className="theme-container">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Register />} />
          <Route exact path="/signup" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}

export default App;
