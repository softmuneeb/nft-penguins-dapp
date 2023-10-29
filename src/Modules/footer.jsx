import React from "react";
import bor from "../assest/border1.svg";
import t1 from "../assest/t1.png";
import f2 from "../assest/f2.svg";
import f3 from "../assest/f3.svg";

import TwitterIcon from "@material-ui/icons/Twitter";

import "./Css/Header.css";

const Footer = () => {
  return (
    <section id="Footer">
      <div className="container mt-5">
        <div className="d-flex justify-content-center mt-5">
          <div className=" " style={{ zIndex: "1" }}>
            <div className="social" style={{ zIndex: "1" }}>
              <a
                style={{ textDecoration: "none", color: "black", zIndex: "1" }}
                href="https://twitter.com/BastardPenguins"
              >
                {" "}
                <TwitterIcon />{" "}
              </a>
            </div>
          </div>
          <div id="socl2" style={{ zIndex: "1" }} className=" mx-5">
            <div className="social">
              <a
                href="https://opensea.io/collection/bastard-penguins"
                style={{ textDecoration: "none", color: "black", zIndex: "1" }}
              >
                <img
                  style={{ textDecoration: "none", color: "black" }}
                  src={f2}
                />
              </a>
            </div>
          </div>
          <div id="socl2" className="" style={{ zIndex: "1" }}>
            <div className="social">
              <a
                href="https://discord.com/invite/nVykvyA6TY"
                style={{ textDecoration: "none", color: "black", zIndex: "1" }}
              >
                <img
                  style={{
                    textDecoration: "none",
                    color: "black",
                    cursor: "pointer",
                  }}
                  src={f3}
                  alt=""
                />{" "}
              </a>
            </div>
          </div>
        </div>
        <din className="row mt-4">
          <a
            id="botom"
            style={{
              textAlign: "center",
              color: "rgb(0, 184, 255)",
              fontSize: "18px",
              fontFamily: "Lato",
              fontWeight: "400",
              zIndex: "1",
            }}
            href="https://etherscan.io/address/0x350b4cdd07cc5836e30086b993d27983465ec014#code"
          >
            Smart Contract
          </a>
        </din>
      </div>
    </section>
  );
};

export default Footer;
