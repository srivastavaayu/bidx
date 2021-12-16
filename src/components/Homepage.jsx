import React from "react";
import {animated } from 'react-spring'
import { Spring } from 'react-spring';
import Typewriter from "typewriter-effect";
import '../styles/Homepage.scss';
import video from "../static/Line1.mp4";
import img1 from "../static/image3.jpg";
import img2 from "../static/image2.jpg";



// sample API


const data = [{image:img1,title:"Vehicles",},
              {image:img2,title:"Electronics",}
            ]

const Homepage=()=>{
    return(
        <div className="home">
            <section className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                    <video className="videos" autoPlay = "autoplay" muted loop = "loop" id="myVideo">
                        <source src={video} type="video/mp4" />
                    </video>
                    </div>
                </div>
      
                <div className="row heading_top">
                    <div className=" col-lg-7 col-12 heading_top_container text-light mx-auto text-center">
                    <Spring
                        from ={{ opacity:0, marginTop:-300}}
                        to = {{ opacity:1,marginTop:40 }}
                        config = {{delay:100,duration:1000}} 
                        >
                        {styles => (
                            <animated.div style={styles}>
                            <h1 className="Main_heading">BidX</h1>
                            </animated.div>

                        )}   
                        </Spring>
                    
                    <p className="Main_tagline my-3">
                    <Typewriter 
                        options={{
                        autoStart: true,
                        loop: true,
                        }}
                        onInit ={(typewriter)=>{
                        typewriter.typeString("“A place to buy second-hand things at best price”").pauseFor(1500).deleteAll().pauseFor(1000).start()
                        }}
                    /></p>
                    </div>
                    
                </div>
            </section>
            {/* About us */}
            <section className="container">
                    <div className="row my-5">
                        <div className="col-lg-10 col-11 mx-auto">
                            <h2 style={{color:"red",fontSize:"30px"}} className="my-2">What we do ?</h2>
                            <p style={{ fontSize:"17px"}}>The scope and reach of these auctions have been propelled by the Internet to a level beyond what the initial purveyors had anticipated.[5] This is mainly because online auctions break down and remove the physical limitations of traditional auctions such as geography, presence, time, space, and a small target audience.[5] This influx in reachability has also made it easier to commit unlawful actions within an auction.[6] In 2002, online auctions were projected to account for 30% of all online e-commerce due to the rapid expansion of the popularity of the form of electronic commerce.[7] Online auctions include business to business (B2B), business to consumer (B2C), and consumer to consumer (C2C) auctions</p>
                        </div>
                    </div>
            {/* categories */}
                <div className="row my-5">
                    <div className="col-lg-10 col-12 mx-auto">
                        <h2 className="text-center" style={{color:"red",fontSize:"40px"}}>CATEGORIES</h2>
                        <div className="d-flex my-5">
                            { data.map((val,index)=>{
                                return(
                                <div className="col-lg-5 col-6 mx-lg-auto mx-0 my-lg-3 my-1" key={index}>
                                    <div className="card card_item py-1 mx-lg-2 mx-0">
                                    <img src={val.image} className="card-img-top mx-auto" alt="Card1" style={{width:"70%"}}/>
                                    </div>
                                    <div className="card-body text-center">
                                        <button type="button" class="btn btn-outline-danger">{val.title}</button>
                                    </div>
                                </div>
                                )
                            })} 
                        </div>
                    </div>
                </div>
            </section> 
        </div>
    );
}


export default Homepage;