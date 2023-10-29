import React from "react";
import bor from "../assest/border1.svg";
import col1 from "../assest/collection/gif1_slow.gif";
import col2 from "../assest/collection/gif2_slow.gif";
import col3 from "../assest/collection/gif3_slow.gif";
import col4 from "../assest/collection/gif4_slow.gif";
import col5 from "../assest/collection/gif5_slow.gif";
import col6 from "../assest/collection/gif6_slow.gif";

import "./Css/Header.css";

const Collection = () => {
  return (
    <section id="collection" style={{ marginTop: "10%" }}>
      <div className="container">
        <div
          id="first-rowcoll"
          className="d-flex flex-column flex-lg-row align-items-center justify-content-between"
        >
          <div className="" id="collection-flex-1">
            <h2 id="collection-heading" className="lh-lg">
              The collection
            </h2>
          </div>
          <div
            id="buttn"
            className="mt-3 mt-lg-0"
            style={{ marginTop: "", zIndex: "1" }}
          >
            <a id="collection-button">
              {" "}
              <span
                style={{ backgroundColor: "rgb(0, 188, 255)" }}
                id="dot"
              ></span>{" "}
              See more{" "}
            </a>
          </div>
        </div>
        <div id="second-rowcoll" className="row" style={{}}>
          {/* .....First image...................................................... */}

          <div className="col-lg-4">
            <div id="dev-right">
              <img className="firstcolimg" src={col1} id="collimg" alt="" />
            </div>
          </div>

          {/* .....Second image...................................................... */}

          <div className="col-lg-4">
            <div id="dev-right">
              <img src={col2} id="collimg" alt="" />
            </div>
          </div>

          {/* .....Third image...................................................... */}

          <div className="col-lg-4">
            <div id="dev-right">
              <img src={col3} id="collimg" alt="" />
            </div>
          </div>
        </div>

        {/* .....Four image...................................................... */}

        <div id="second-rowcoll" className="row mt-2" style={{}}>
          <div className="col-lg-4">
            <div id="dev-right">
              <img src={col4} id="collimg" alt="" />
            </div>
          </div>

          {/* .....Five image...................................................... */}

          <div className="col-lg-4">
            <div id="dev-right">
              <img src={col5} id="collimg" alt="" />
            </div>
          </div>

          {/* .....Six image...................................................... */}

          <div className="col-lg-4">
            <div id="dev-right">
              <img src={col6} id="collimg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
