import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//import useLocalStorage from "use-local-storage";
import "./App.css";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing_page/landing_page";
import Register from "./pages/register/register";
import store from "./slices/store";
function App() {
  // const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ? "dark"
  //   : "light";
  // const [theme, setTheme] = useLocalStorage("theme", defaultTheme);
  // const switchTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<LandingPage />} /> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Register />} />
          <Route exact path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
