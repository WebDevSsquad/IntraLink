import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing_page/landing_page";
import Register from "./pages/register/register";
import store from "./slices/store";
import { updateTheme } from "./slices/userReducer";
function InnerApp() { 
  const dispatch = useDispatch();
  let theme = useSelector((state) => state.user.theme);
  if (theme !== "dark" && theme !== "light") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    dispatch(updateTheme(theme)); 
  }
  return (
    <Router>
      <div data-theme={theme} className="theme-container">
        <Routes>
          {/* <Route exact path="/" element={<LandingPage />} /> */}
          <Route exact path="/" element={<Home />} />
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
