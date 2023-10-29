import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../Coming.css";
import Particles from "react-particles-js";
import ParticleConfig from "../Modules/Css/particalConfig";
import ComingSoon from "./ComingSoonPage/ComingSoon";

const Comming = ()=>{

  return(
    <>
     <div id="particless">
   <Particles params={ParticleConfig} />

   </div>
  <ComingSoon/>
    </>

  );
}
export default Comming;