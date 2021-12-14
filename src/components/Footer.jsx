import React from 'react';
import "../styles/Footer.scss";
const Footer=()=>{

    return(
        <>
        <div className="row bgcolor" >
                    <div className="col-6  mx-auto text-light my-4">
                        <h2 style={{fontSize:"30px"}}>ABOUT US</h2>
                        <p style={{ fontSize:"17px"}}>This is mainly because online auctions break down and remove the physical limitations of traditional auctions such as geography, presence, time, space, and a small target audience.[5] This influx in reachability has also made it easier to commit unlawful actions within an auction.[6] In 2002, online auctions were projected to account for 30% of all online e-commerce due to the rapid expansion of the popularity of the form of electronic commerce.[7] Online auctions include business to business (B2B), business to consumer (B2C), and consumer to consumer (C2C) auctions</p>
                    </div>
                    <div className="col-4 mx-auto my-4 text-center">
                        <h3 className="my-4 text-light">CONTACT US</h3>
                        <p><span className="text-danger">Email Us (suggestions)  -</span> <span className="text-light">contact@Bidx.com</span> </p>
                        <p><span className="text-danger">Email Us (queries) -</span> <span className="text-light">support@Bidx.com</span></p>
                    </div> 
        </div>
        </>
    )
}
export default Footer;