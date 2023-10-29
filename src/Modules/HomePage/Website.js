import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Header from "../Header";
import "../../App.css";
import Collection from "../Collection";
import Team from "../Team";
import Footer from "../footer";
import Roadmap from "../Roadmap";
import Navbar from "../Navbar";

import { BrowserRouter, Route } from "react-router-dom";
import FAQ from "../FAQ";
import Background from "../Css/Background";
import Particles from "react-particles-js";
import ParticleConfig from "../Css/particalConfig";

import Comming from "../Comming";
import Mint from "../Mint";

function Website() {
  return (
    <>
      <div id="particles">
        <Particles params={ParticleConfig} />
      </div>

      <BrowserRouter>
        <Navbar />
        <Header />
        {/* <Mint /> */}
        <Collection />
        <Roadmap />
        <Team />
        {/* <FAQ/> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default Website;
