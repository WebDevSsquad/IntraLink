import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ResetData } from "./components/resetdata/resetdata";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing_page/landing_page";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import store from "./slices/store";
import {
  updateAbout,
  updateEmail,
  updateExpires,
  updateFetch,
  updateFirstName,
  updateIsAvailable_Con,
  updateIsAvailable_Tm,
  updateLastName,
  updateLocation,
  updateLoggedIn,
  updatePhone,
  updatePicture,
  updateSkills,
  updateTheme,
  updateUserID,
  updateUserName,
} from "./slices/userReducer";

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
        if (data.user.lastname !== undefined)
          dispatch(updateLastName(data.user.lastname));
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
        if (data.user.skills !== undefined && data.user.skills !== null)
          dispatch(updateSkills(data.user.skills));
        dispatch(updateFetch(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logOut = () => {
    console.log("Still Logged In");
    ResetData(dispatch);
    dispatch(updateLoggedIn(false));
    dispatch(updateExpires(true));
    localStorage.setItem("token", "");
  };

  if (
    !loggedIn &&
    localStorage.getItem("token") !== "" &&
    localStorage.getItem("token") !== null &&
    localStorage.getItem("token") !== undefined
  ) {
    console.log("Still Logged Injhggjkhgjkjh");
    stillLoggedIn();
  }

  return (
    <Router>
      <div data-theme={theme} className="theme-container">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Register />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="userduties/:user_id" element={<UserDuties />} />
        </Routes>
      </div>
    </Router>
  );
}
import Chat from "./pages/realtime-chat/Chat";
import UserDuties from "./pages/user-duties/UserDuties";

function App() {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}

export default App;
