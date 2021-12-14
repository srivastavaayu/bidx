import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import Header from "./components/Header";
import Authentication from "./components/Authentication";
import Homepage from "./components/Homepage";
import Items from "./components/Items";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
          <Route exact path="/home" component={Items} />
          <Route exact path="/UserLogin" component={Authentication} />
      </Switch>
      {/* <Header /> */}
      {/* <Authentication /> */}
      {/* <Homepage/> */}
      {/* <Items/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
