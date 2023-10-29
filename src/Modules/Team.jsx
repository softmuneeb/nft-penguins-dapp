import React from 'react';
import bor from '../assest/border1.svg';
import t1 from '../assest/team/8608.png';
import t2 from '../assest/team/6696.png';
import t3 from '../assest/team/black_bastardA.png';
import t4 from '../assest/team/8615.png';
import t5 from '../assest/t5.png';
import t6 from '../assest/t6.png';
import t7 from '../assest/t7.png';
import t8 from '../assest/t8.png';
import TwitterIcon from '@material-ui/icons/Twitter';

import './Css/Header.css';

const Team = () => {
  return (
    <section id="Team">
      <div id="teamContainer" className="container">
        <div className="row ">
          <h2 id="team-heading">TEAM</h2>
        </div>

        <div
          className="row mt-2"
          id="teammrespon"
          style={{ justifyContent: 'space-between' }}
        >
          {/* ................Image 1.......................................................... */}

          <div id="member" className="col-md-6 col-lg-3  teamfirstimg">
            <div className="Team-member mx-lg-4 d-flex flex-column align-items-center">
              <div id="dev-right">
                <a href="https://twitter.com/">
                  <img src={t1} id="collimg-team" alt="" />
                </a>
                {/* <div id="team-border">
  <img src={bor} alt="" />
  </div> */}
              </div>
              <div className="d-flex mt-4 textteam">
                <div
                  className="me-1"
                  id="temtwiter"
                  style={{
                    color: 'rgb(0, 184, 255)',
                    marginTop: '-3px',
                    zIndex: '1',
                  }}
                >
                  <a href="https://twitter.com/BSTRD_Penguin">
                    {' '}
                    <TwitterIcon />{' '}
                  </a>
                </div>
                <div className=" mt-3">
                  <h4 className="name">Techno Penguin</h4>
                </div>
              </div>
            </div>
          </div>

          {/* ................Image 2.......................................................... */}

          <div id="member" className="col-md-6  col-lg-3  ">
            <div className="Team-member mx-lg-4 d-flex flex-column align-items-center">
              <div id="dev-right">
                <img src={t2} id="collimg-team" alt="" />
                {/* <div id="team-border">
 <img src={bor} alt="" />
 </div> */}
              </div>
              <div className="d-flex mt-4 textteam">
                <div
                  className="me-1"
                  style={{
                    color: 'rgb(0, 184, 255)',
                    zIndex: '1',
                    display: 'block',
                    marginTop: '-4px',
                  }}
                >
                  <a href="https://twitter.com/plutoblockstar">
                    {' '}
                    <TwitterIcon />{' '}
                  </a>
                </div>
                <div className="mt-3">
                  <h4 className="name">Penguin Dad</h4>
                </div>
              </div>
            </div>
          </div>
          {/* ................Image 3.......................................................... */}

          <div id="member" className="col-md-6  col-lg-3">
            <div className="Team-member mx-lg-4 d-flex flex-column align-items-center">
              <div id="dev-right">
                <img src={t3} id="collimg-team" alt="" />
                {/* <div id="team-border">
        <img src={bor} alt="" />
          </div> */}
              </div>
              <div className="d-flex mt-4 textteam">
                <div
                  id="twtteam"
                  className="me-1"
                  style={{
                    color: 'rgb(0, 184, 255)',
                    zIndex: '1',
                    marginTop: '-4px',
                  }}
                >
                  <a href="https://twitter.com/matrix_mute">
                    {' '}
                    <TwitterIcon />{' '}
                  </a>
                </div>
                <div className="mt-3">
                  <h4 id="name-team" className="name">
                    Black Bastard
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* ................Image 4.......................................................... */}

          <div id="member" className="col-md-6 col-lg-3 ">
            <div className="Team-member mx-lg-4 d-flex flex-column align-items-center">
              <div id="dev-right">
                <img src={t4} id="collimg-team" alt="" />
                {/* <div id="team-border">
<img src={bor} alt="" />
   </div> */}
              </div>
              <div className="d-flex mt-4 textteam">
                <div
                  id="twtteam"
                  className="me-1"
                  style={{
                    color: 'rgb(0, 184, 255)',
                    zIndex: '1',
                    marginTop: '-4px',
                  }}
                >
                  <a href="https://twitter.com/JJ_Shangai">
                    {' '}
                    <TwitterIcon />{' '}
                  </a>
                </div>
                <div className="mt-3">
                  <h4 id="name-team" className="name">
                    Penguin Don
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* ................Image 5.......................................................... */}
          {/* </div>

              <div className="row ">
                  <div  id="member"  className="col-lg-2">
                  <div className="Team-member d-flex flex-column align-items-center" >

                  <div id="dev-right">
                <img src={t5} id="collimg-team"  alt="" />

              
                </div>
                <div className="row mt-4">
                  <div id="twtteam" className="col-2 offset-2 "  style={{color:"rgb(0, 184, 255)" ,marginTop:"-1%"}} >
                  <TwitterIcon/>
                  
                    
                  </div>
                  <div className="col mt-3">
                    <h4 id="name-team" className="name" >Wybo</h4>
                  </div>

                </div>
                </div> */}
          {/* </div> */}
          {/* ................Image 6.......................................................... */}
          {/* <div  id="member" className="col-lg-2">
                  <div className="Team-member d-flex flex-column align-items-center" >

                  <div id="dev-right">
                <img src={t6} id="collimg-team"  alt="" />

                </div>
                <div className="row mt-4">
                  <div id="twtteam" className="col-2 offset-2 "  style={{color:"rgb(0, 184, 255)" ,marginTop:"-1%"}} >
                  <TwitterIcon/>
                  
                    
                  </div>
                  <div className="col mt-3">
                    <h4 id="name-team" className="name" >Hiro</h4>
                  </div>

                </div>
                  </div>
                  </div> */}
          {/* ................Image 7.......................................................... */}
          {/* <div  id="member" className="col-lg-2">
                  <div className="Team-member d-flex flex-column align-items-center" >

                  <div id="dev-right">
                <img src={t7} id="collimg-team"  alt="" />

                </div>
                <div className="row mt-4">
                  <div id="twtteam" className="col-2 offset-2 "  style={{color:"rgb(0, 184, 255)" ,marginTop:"-1%"}} >
                  <TwitterIcon/>
                 </div>
                  <div  className="col mt-3">
                    <h4 id="name-team" className="name"  >Starker</h4>
                  </div>

                </div>
                  </div>
                  </div> */}
          {/* ................Image 8.......................................................... */}
          {/* <div  id="member" className="col-lg-2">
                  <div className="Team-member d-flex flex-column align-items-center" >

                  <div id="dev-right">
                <img src={t8} id="collimg-team"  alt="" />

               
                </div>
                <div className="row mt-4">
                  <div id="twtteam" className="col-2 offset-2 "  style={{color:"rgb(0, 184, 255)" ,marginTop:"-1%"}} >
                  <TwitterIcon/>
                </div>
                  <div  className="col mt-3">
                    <h4 id="name-team"  className="name" >Ecko</h4>
                  </div>

                </div>
                  </div>

              </div> */}
        </div>
      </div>
    </section>
  );
};

export default Team;
