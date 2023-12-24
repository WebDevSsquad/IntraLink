import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//import useLocalStorage from "use-local-storage";
import "./App.css";
import Profile from "./pages/profile/profile";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Register />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
