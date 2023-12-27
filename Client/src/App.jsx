import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//import useLocalStorage from "use-local-storage";
import "./App.css";
import Register from "./pages/register/register";
import store from "./slices/store";
import Part from "./pages/Part/part";
import Task from "./pages/Task/task";
import AvailabilityBoard from "./pages/Availabilityboard/availabilityboard";

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
          <Route exact path="/login" element={<Register />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/availabilityboard" element={<AvailabilityBoard />} />
          <Route exact path="/parts/:id" element={<Part />} />
          <Route exact path="/Tasks/:project_id/:part_id" element={<Task />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
