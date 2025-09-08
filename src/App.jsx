import { useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Menu from "./components/Menu";

function App() {
  /* const userData = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("token", data.token);
  const [info, setInfo] = useState(false);*/

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-screen min-h-screen justify-center items-center text-center bg-[url(https://i.imgur.com/2bLqJdx.jpeg)]">
            {" "}
            <p className="text-[4vw] font-bruno sm-custom:text-[12vw] text-white mb-3">
              To-Do-List
            </p>
            <Menu />{" "}
          </div>
        }
      />
    </Routes>
  );
}

export default App;
