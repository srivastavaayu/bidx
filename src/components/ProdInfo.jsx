import React, { useState, useEffect } from "react"
import '../styles/ProdInfo.scss';
import img1 from "../static/image2.jpg";

// const sdata = {id:"123b",
//                creatorId:"123x",
//                date:"2021-12-13T13:19:09.130Z",
//                creatorName:"Abhishek",
//                prodName:"Headphone",
//                basePrice:1400,
//                biddingPrice:2200,
//                duration:"2021-12-17T13:19:09.130Z",
//                description:"This is a very good headphone, must buy!!",
//                details:["2 years old","black color","sony branded headphone"],
//                images:img1,
//                bids:[],
//                category:"Electronics",
//                __v:0};


    

const ProdInfo=()=>{

    const [sdata,setSdata] = useState();
    //Backend Connection
    useEffect(()=>{
        async function fetchData(){
            try {
                const res = await fetch("/viewParticularProduct", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      "productId":"61b8c98108070571f844b22c"
                  }),
                  credentials: "include",
                });
          
                const data = await res.json();
                //console.log(data);
                setSdata(data);
          
                if (!res.status === 202) {
                  const error = new Error(res.error);
                  throw error;
                }
              } catch (err) {
                console.log(err);
              }
        }

        fetchData();
    },[]);
    console.log(sdata);

    return(
        <>
            {sdata?(
            <section className="container">
                <div className="row my-5 pt-4">
                    <h2 className="">{sdata.prodName}</h2>
                </div>
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card card_item">
                            <img src={img1} className="card-img-top mx-auto" alt="Card1" style={{width:"100%"}}/>
                        </div>
                        <div className="card-body">
                            <p style={{fontSize:"20px"}} className="text-center"><b className="me-lg-5">Base Price : ${sdata.basePrice}</b><b ><span className="text-danger">Current Max Bid : </span>${sdata.biddingPrice}</b></p>
                        </div>
                        <div className="text-center">
                            <span className="buttons me-3" style={{}}><button style={{border:"0px", backgroundColor:"white"}}><b>-</b></button> </span><input className="text-center" type="number" style={{width:'90px', height:"45px", border: '2px solid red',borderRadius: '6px'}} defaultValue={sdata.biddingPrice}/><span className="buttons ms-3"> <button style={{border:"0px", backgroundColor:"white"}}><b>+</b></button></span> <button className="btn btn-danger ms-5">Bid now</button>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="row my-3 ms-lg-5 ms-0">
                            <h4><b><span className="text-danger">Item Name : </span>{sdata.prodName}</b></h4>
                            <h5><span className="text-danger">Item Posted : </span>{sdata.date}</h5>
                            <h5><span className="text-danger">Closing at : </span>{sdata.duration}</h5>
                            <h5><span className="text-danger"> Seller : </span>{sdata.creatorName}</h5>
                            <h5><span className="text-danger">Category : </span>{sdata.category}</h5>
                            <h5><span className="text-danger">Product Information : </span>{sdata.description}</h5>
                            <h5><span className="text-danger">Details :</span><br/>
                            </h5>
                        </div>
                    </div>
                </div>    
            </section>):("")}
        </>
    );
}

export default ProdInfo;