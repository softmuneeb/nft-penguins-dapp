import React, { useState } from "react"
import Img1 from "../../assest/newimg1.png";
import Img2 from "../../assest/BastardGif1B.gif";

import "../Css/Header.css";











const ComsingSoon = ()=>{


    // Set the date we're counting down to
var countDownDate = new Date("Sept 12, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + " Days  : " + hours + "hours : "
  + minutes + "mint : " + seconds + "sec";
  document.getElementById("demo1").innerHTML = days + " Days  : " + hours + "hours ";
  document.getElementById("demo2").innerHTML =  minutes + "mint : " + seconds + "sec";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);








 return(
        <section id="header">
            <div className="container">


                                        {/* ......................Left Part........................ */}

              <div id="first-roww" className="row ">
            <div className="col-lg-8 mt-5">
                <div className="row">
                <img src={Img1} id="first-left"  alt="" />
                </div>
               
               
                </div>
           
                                         {/* .....................  GIF Right Part................................... */}
            
            
             <div className="col-lg-4">
                <div id="dev-right">
                <img src={Img2} id="rightimg"  alt="" />
           
                    </div>
                   <div className="row">
                    
                </div>
                 </div>
                  </div>
                  <div className="row" id="resprow">
                      <div className="container">
                      <div className="col-12 ">
                      <p   style={{color:"rgb(0, 194, 255)" , fontSize:"30px " , fontFamily:"Press Start 2P"}} id="demo"  ></p>
                      </div>
                      </div>
                      </div>
                      <div className="row" id="resprow1">
                      <div className="container">
                      <p   style={{color:"rgb(0, 194, 255)" , fontSize:"30px " , fontFamily:"Press Start 2P"}} id="demo1"  ></p>
                      <p   style={{color:"rgb(0, 194, 255)" , fontSize:"30px " , fontFamily:"Press Start 2P"}} id="demo2"  ></p>
                       </div>
                      </div>

                      
                 
                  
        
        
        
        
        
        </div>
        </section>
        

    );
}

export default ComsingSoon;