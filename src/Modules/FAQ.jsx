import React from "react";
import "./Css/FAQ.css";
import $ from "jquery";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

$(document).on("click", ".faq-q", function (e) {
  $(this).toggleClass("active");
  var faqq = $(this).next();
  $(faqq).slideToggle("slow", function () {});
});

const FAQ = () => {
  return (
    <>
      <div id="FAQ">
        <div className="container">
          <div className="row mt-5">
            <div className="row " id="faqroww" style={{ textAlign: "center" }}>
              <h2>FAQs</h2>
            </div>
            <div
              className="row row-1 offset-2 mt-3 mainnnn"
              style={{ zIndex: "1" }}
            >
              <div className="py-3 lh-base faq-q active ">
                When will the Bastard Penguins' invasion begin?{" "}
                <i className="py-1 fas fa-plus">
                  {" "}
                  <ExpandMoreIcon />{" "}
                </i>
              </div>
              <div className="py-3 lh-base faq-a">
                The sale will start on Monday 27th September.
              </div>
              <div className="py-3 lh-base faq-q">
                How much does a Bastard Penguin cost to mint?{" "}
                <i className="py-1 fas fa-plus">
                  <ExpandMoreIcon />
                </i>
              </div>
              <div className="py-3 lh-base faq-a">
                It only cost 0.02 ETH to mint a Bastard!
              </div>

              <div className="py-3 lh-base faq-q last-child">
                How many Bastard Penguins can I mint during sale?{" "}
                <i className="py-1 fas fa-plus">
                  <ExpandMoreIcon />
                </i>
              </div>
              <div className="py-3 lh-base faq-a last-child">
                A maximun of 20 Bastard Penguins can be minted per transaction.
              </div>

              <div className="py-3 lh-base faq-q last-child">
                How do I get a Bastard?{" "}
                <i className="py-1 fas fa-plus">
                  <ExpandMoreIcon />
                </i>
              </div>
              <div className="py-3 lh-base faq-a last-child">
                During the minting time, you can get a Bastard penguin on this
                website via Metamask web3 extension. If you were not able to get
                one first hand, you can always buy one from our owners on
                secondary markets such as Opensea, Rarible...
              </div>

              <div className="py-3 lh-base faq-q last-child">
                How does the Merging Room work?{" "}
                <i className="py-1 fas fa-plus">
                  <ExpandMoreIcon />
                </i>
              </div>
              <div className="py-3 lh-base faq-a last-child">
                Bastard penguins members will be able to mix 2 Penguins. When 2
                Penguins enter the Merging room, only one Bastard will come out,
                decreasing supply forever!
              </div>

              <div className="py-3 lh-base faq-q last-child">
                Do you charge an Opensea Commission?{" "}
                <i className="py-1 fas fa-plus">
                  <ExpandMoreIcon />
                </i>
              </div>
              <div className="py-3 lh-base faq-a last-child">
                We charge a 7.5% commission on Opensea. Opensea charges 2.5%
                commission on all sales. Please check roadmap below for details.
              </div>

              <div className="py-3 lh-base faq-q last-child">
                When will my Bastard Penguins be revealed?{" "}
                <i className="py-1 fas fa-plus">
                  <ExpandMoreIcon />
                </i>
              </div>
              <div className="py-3 lh-base faq-a last-child">
                In order to ensure the distribution is truly random, a time lag
                is required between the minting and the moment it is revealed.
                All Bastard penguins will be revealed within 7 days.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FAQ;
