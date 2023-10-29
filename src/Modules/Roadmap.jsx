import React from "react";
import "./Css/Header.css";
import Img2 from "../assest/roadmap/Roman.png";
import Img3 from "../assest/roadmap/Terminator.png";
import Img4 from "../assest/roadmap/Olympus.png";

const Roadmap = () => {
  return (
    <section id="Roadmap">
      <div className="container ">
        <div className="row ">
          <h2 id="roadmap-heading">Roadmap 2.0</h2>
        </div>

        {/* ....................Left Part....................................... */}

        <div id="first-rowroad" className="row mt-5">
          <div className="col-lg-9 mb-5 mb-lg-0" id="roadmapTeaxt">
            <div className="row lh-lg">
              <p style={{ fontSize: "18px" }}>
                <span style={{ marginRight: "3%", color: "rgb(0, 184, 255)" }}>
                  <b>PHASE I</b>
                </span>
                <span style={{ color: "rgb(0, 184, 255)" }}>
                  (November & December) DONE!
                </span>
                <br /> 10,000 SARDINES incoming&nbsp;
                <br />
                <span id="spp" style={{}}>
                  1ST IGLOO MERGING SZNs
                </span>
                <br />
                <span id="secspan" style={{}}>
                  {" "}
                  DAO
                </span>
              </p>
            </div>
            <div className="row lh-lg">
              <p style={{ fontSize: "18px" }}>
                <span style={{ marginRight: "3%", color: "rgb(0, 184, 255)" }}>
                  <b>PHASE II</b>
                </span>
                <span style={{ color: "rgb(0, 184, 255)" }}>(January)</span>
                <br /> COMICS: 6 STRIPS OUT (1st step)&nbsp;
                <br />
                <span id="spp" style={{}}>
                  $IGLOO TOKEN (phase1)
                </span>
                <br />
                {/* <span id="secspan" style={{}}>
                  {" "}
                  BIG PARTNERSHIP TBA
                </span>
                <br /> */}
                <span id="secspan" style={{}}>
                  {" "}
                  NFTs STAKING
                </span>
                <br />
                {/* <span id="secspan" style={{}}>
                  {" "}
                  DAO starts
                </span>
                <br /> */}
                <span id="secspan" style={{}}>
                  {" "}
                  MERCH SHOP OPENING
                </span>
              </p>
            </div>
            <div className="row lh-lg">
              <p style={{ fontSize: "18px" }}>
                <span style={{ marginRight: "3%", color: "rgb(0, 184, 255)" }}>
                  <b>PHASE III</b>
                </span>
                <span style={{ color: "rgb(0, 184, 255)" }}>(Q1 2022)</span>
                <br /> $IGLOO TOKEN (phase2)&nbsp;
                <br />
                {/* <span id="spp" style={{}}>
                  $IGLOO TOKEN (phase2)
                </span>
                <br /> */}
                <span id="secspan" style={{}}>
                  {" "}
                  10,000 BASTARD PENGUINS VX
                </span>
                <br />
                <span id="secspan" style={{}}>
                  {" "}
                  BUILD A BASTARD LAND IN SANDBOX
                </span>
                <br />
                <span id="secspan" style={{}}>
                  {" "}
                  BIG PARTNERSHIP TBA
                </span>
                <br />
              </p>
            </div>
            <div className="row lh-lg">
              <p style={{ fontSize: "18px" }}>
                <span style={{ marginRight: "3%", color: "rgb(0, 184, 255)" }}>
                  <b>MV INVASION CAN START</b>
                </span>
                <span style={{ color: "rgb(0, 184, 255)" }}>(Q1 2022)</span>
                <br /> This road-map can be updated with new events still under
                development, the team is always looking for more benefits and
                new utilities for the Bastard Gang. &nbsp;
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            {/* ..................................RightPart.................................. */}

            <div
              className="d-flex flex-column justify-content-between h-100"
              id="dev-right"
              style={{}}
            >
              <div className="row" style={{}}>
                <img src={Img2} id="rightimg-roadmap" alt="" />
              </div>
              <div className="row" id="roteam" style={{}}>
                <img src={Img3} id="rightimg-roadmap1" alt="" />
              </div>
              <div className="row" id="roteam" style={{}}>
                <img src={Img4} id="rightimg-roadmap1" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
