import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import Header from "./components/Header";
import Authentication from "./components/Authentication";
import Homepage from "./components/Homepage";
import Items from "./components/Items";
import Footer from "./components/Footer";
import ProdInfo from "./components/ProdInfo";
import Dashboard from "./components/Dashboard";
import Forgotpass from "./components/Forgotpass";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/home/vehicles" component={Items} />
        <Route exact path="/home/electronics" component={Items} />
        <Route exact path="/authentication" component={Authentication} />
        <Route exact path="/user" component={Dashboard} />
        <Route path="/product" component={ProdInfo} />
      </Switch>
    </div>
  );
}

export default App;
