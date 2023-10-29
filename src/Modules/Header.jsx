import React, { useState } from "react";
import Img1 from "../assest/newimg1.png";
import Img2 from "../assest/SZN1.gif";
import Img3 from "../assest/penguin AVENGERS.png";
import Img4 from "../assest/wave1.svg";
import "./Css/Header.css";
import Mint from "./Mint";
import TokenCheck from "./Tokencheck";
import PurchaseSardines from "./PurchaseSardines";

const Header = () => {
  return (
    <section id="header">
      <div className="container">
        {/* ......................Left Part........................ */}
        <div id="first-row" className="row ">
          <img src={Img3} />
          {/* <Mint />
          <TokenCheck />
          <PurchaseSardines /> */}
          <div style={{ marginTop: 12 }}></div>
          <div className="col-lg-8 mt-5" id="hedmian">
            <div className="row">
              <img src={Img1} id="first-left" alt="" />
            </div>
            <div id="leftp" className="row mt-5 ">
              <p id="parap " className="lh-lg">
                Bastard Penguins is a collection of 9,999 Deflationary Penguins
                who have chosen to move from their frozen land to support the
                Penguins' invasion of the Ethereum blockchain. Each Penguins is
                unique and algorithmically generated from over 200 possible
                traits, including: expression, headwear, clothing, and more.{" "}
              </p>
            </div>
          </div>

          {/* .....................Right Part................................... */}

          <div className="col-lg-4" id="hedrimg">
            <div id="dev-right">
              <img src={Img2} id="rightimg" alt="" />
            </div>
            <div className="row">
              <p id="rightp">SOLD OUT IN 2 HOURS</p>
            </div>
          </div>
        </div>{" "}
      </div>
    </section>
  );
};

export default Header;
