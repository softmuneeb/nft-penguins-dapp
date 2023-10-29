import React, { useEffect, useState } from "react";
import "./Css/Header.css";
import { HashLink as Link } from "react-router-hash-link";
import { Link as RLink } from "react-router-dom";
import { shortAddress, _doThis } from "../libs/utils";
const Navbar = () => {
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");
  const [colorButton, setColorButton] = useState(false);

  useEffect(() => {
    // _doThis(async (account, web3) => {
    //   setConnectButtonText(shortAddress(account));
    //   setStatus({
    //     color: "green",
    //     title: " Connected ",
    //     margin: "-235px",
    //     backgroundColor: "rgb(7, 8, 29)",
    //   });
    // }, false);
    // console.log("window location", window.location.href);
  }, []);

  // ......State............................

  const [status, setStatus] = useState({
    color: "rgb(255, 120, 164)",
    title: " Disconnected ",
    margin: "-244px",
    backgroundColor: "rgb(0, 184, 255)",
  });

  // .....Function.....................

  const change = async () => {
    _doThis(async (account, web3) => {
      setConnectButtonText(shortAddress(account));
      setStatus({
        color: "green",
        title: " Connected ",
        margin: "-235px",
        backgroundColor: "rgb(7, 8, 29)",
      });
    }, false);
    console.log(status);

    setColorButton(true);
  };

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light"
        style={{ zIndex: "1" }}
      >
        <div class="container">
          <a class="navbar-brand d-none" href="#">
            navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  smooth
                  to="#Header"
                  style={{ fontSize: "24px" }}
                  class="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  smooth
                  to="#collection"
                  style={{ fontSize: "24px" }}
                  class="nav-link active"
                  aria-current="page"
                >
                  Collection
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  smooth
                  to="#Roadmap"
                  style={{ fontSize: "24px" }}
                  class="nav-link active"
                  aria-current="page"
                >
                  Roadmap
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  smooth
                  to="#Team"
                  style={{ fontSize: "24px" }}
                  class="nav-link active"
                  aria-current="page"
                >
                  Team
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  smooth
                  to="#FAQ"
                  style={{ fontSize: "24px" }}
                  class="nav-link active"
                  aria-current="page"
                >
                  {/* FAQ */}
                </Link>
              </li>
            </ul>
            <div className="stake-button-alignment">
              <form class="">
                <div className="">
                  <div className="" style={{ position: "relative" }}>
                    <a
                      id="head-button"
                      colorButton={colorButton}
                      className="d-flex align-items-center justify-content-around"
                      //href={`${window.location.origin}/merge`}
                    >
                      Harvest
                    </a>
                  </div>
                </div>
              </form>
              <form class="">
                <div className="">
                  <div className="" style={{ position: "relative" }}>
                    <a
                      id="head-button"
                      colorButton={colorButton}
                      className="d-flex align-items-center justify-content-around"
                      //href={`${window.location.origin}/merge`}
                    >
                      Connect Wallet{" "}
                    </a>
                  </div>
                </div>
              </form>
              {/* <form class="">
                <div className="">
                  <div className="" style={{ position: "relative" }}>
                    <a
                      id="head-button"
                      colorButton={colorButton}
                      className="d-flex align-items-center justify-content-around"
                      //href={`${window.location.origin}/merge`}
                    >
                      Claim
                    </a>
                  </div>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
