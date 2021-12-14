import React from "react";
import "../styles/Items.scss";
import img from "../static/image2.jpg";
import img2 from "../static/image3.jpg";


// Component to show items
const Items=()=>{
    const sdata = [{image:img,prod_name:"Headphone",prod_info:"Very sexy headphone must buy!!!",min_bid:200,curr_max_bid:340},
                    {image:img2,prod_name:"Lenovo Ideapad 530s",prod_info:"Very sexy laptop must buy!!! buy it",min_bid:10000,curr_max_bid:10340},
                    {image:img,prod_name:"Redmi note 6 pro",prod_info:"Very sexy phone must buy!!!",min_bid:3000,curr_max_bid:2400},
                    {image:img,prod_name:"Kuch bhi",prod_info:"Very sexy kuch bhi must buy!!!",min_bid:0,curr_max_bid:40},
                    {image:img,prod_name:"Headphone",prod_info:"Very sexy headphone must buy!!!",min_bid:200,curr_max_bid:340},
                    {image:img,prod_name:"Lenovo Ideapad 530s",prod_info:"Very sexy laptop must buy!!! buy it",min_bid:10000,curr_max_bid:10340},
                    {image:img2,prod_name:"Redmi note 6 pro",prod_info:"Very sexy phone must buy!!!",min_bid:3000,curr_max_bid:2400},
                    {image:img,prod_name:"Kuch bhi",prod_info:"Very sexy kuch bhi must buy!!!",min_bid:0,curr_max_bid:40}];
    return(
        <>
            <section  className="container">
                <div className="mt-5 pt-3">
                <h2 className="text-danger my-4" style={{fontSize:'40px'}}>Electronics</h2>
                </div>
                <div className="row">
                    {sdata.map((val,index)=>{
                        return(
                            <div class="card card_item card_shadow col-lg-3 my-4">
                                <img src={val.image} class="card-img-top" alt="..."/>
                                    <div class="card-body card_background">
                                        <h5 class="card-title">{val.prod_name}</h5>
                                        <p class="card-text">{val.prod_info}</p>
                                        <div className="d-flex">
                                            <button href="#" class="btn btn-outline-danger">Place Bid</button>
                                            <p className="my-2 ms-3"><b>Base Price :&nbsp;</b>${val.min_bid}</p>
                                        </div>
                                    </div>
                            </div>

                        );
                    })}
                    
                </div>
            </section>
        </>
    );
}

export default Items;