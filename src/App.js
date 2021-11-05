import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import Header from "./components/Header";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="App">
      <Header />
      <Authentication />
    </div>
  );
}

export default App;
