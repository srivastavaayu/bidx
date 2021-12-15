import React from 'react';
import "../styles/Dashboard.scss";


const user = {
                username: 'Abhi098',
                firstName: 'Abhishek',
                lastName: 'Chauhan',
                email: 'chauhanabhi0098@gmail.com',
                phone:'9140916702'
                };

const yourbids = [{
                    creatorName: 'Suyansh Singh',
                    basePrice: 200,
                    biddingPrice:400,
                    prodName:"Headphone",
                    bids:[{
                            bidPrice:320,
                            date:"2021-12-14",
                            username:"abhi"
                        },
                        {
                            bidPrice:380,
                            date:"2021-12-15",
                            username:"abhi"
                        }]
                    

                    },
                    {
                        creatorName: 'Pankaj Singh',
                        basePrice: 340,
                        biddingPrice:490,
                        prodName:"Laptop",
                        bids:[{
                                bidPrice:380,
                                date:"2021-12-24",
                                username:"abhi"
                            }]
                        
    
                        }]
const items =[{
                creatorName:"Abhishek Chauhan",
                prodName:"Headphone",
                category:"Electronics",
                basePrice:2400,
                biddingPrice:3200,
                bids:[{username:"abhi",
                        bidPrice:2500},
                        {username:"pnkj",
                        bidPrice:2800},
                        {username:"Vibhu",
                        bidPrice:3200}]

            },
            {
                creatorName:"Abhishek Chauhan",
                prodName:"Laptop",
                category:"Electronics",
                basePrice:34000,
                biddingPrice:42000,
                bids:[{username:"abhi",
                        bidPrice:42000}]

            }] 

const Dashboard = ()=>{
    return(<>
            <section className= "container">
                <div className="row mt-5 pt-5">
                    <h2  className="text-danger" style={{fontSize:'40px'}}>Your Dashboard</h2>
                </div>
                <div className= "row mt-5 setbg">
                        <div className= "col-lg-6 col-10 p-4">
                            <h3 className= "text-danger"><b>{user.firstName} {user.lastName}</b></h3>
                            <h5><b>{user.username}</b></h5>
                            <h5><span className= "text-danger">Email Id : </span>{user.email}</h5>
                            <h5><span className= "text-danger">Phone : </span>{user.phone}</h5>
                        </div>
                </div>
                {/* Items on which user placed bid */}
                <div className="row">
                    <h3 className="my-5 text-center">Your Bidding  History</h3>
                    <div className="row">
                        {yourbids.map((val,index)=>{
                            return(<>
                                <div class="card my-3">
                                    <div class="card-header">
                                        <b>{val.prodName}</b> (Sold by : {val.creatorName})
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">Base Price : {val.basePrice} <b className="text-danger ms-lg-5 ms-1">Bidding Closed : </b>{val.biddingPrice}</h5>
                                        <h6 class="card-text">Your Bids </h6>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">bidding Price</th>
                                                <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                        {val.bids.map((vall,indexx)=>{
                                            return(<>
                                                <tr>
                                                    <td>{vall.bidPrice}</td>
                                                    <td>23-12-1999</td>
                                                </tr> 
                                            </>)
                                        })}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>

                            </>)
                        })}
                    </div>


                </div>
                {/* Items you put for bidding */}
                <div className="row">
                    <h3 className="my-5 text-center">Your Products History</h3>
                    <div className="row">
                        {items.map((val,index)=>{
                            return(<>
                                <div class="card my-3">
                                    <div class="card-header">
                                        <b>{val.prodName}</b> ({val.category})
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">Base Price : {val.basePrice} <b className="text-danger ms-lg-5 ms-1">Bidding Closed : </b>{val.biddingPrice}</h5>
                                        <h6 class="card-text">Bids Placed </h6>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">UserName</th>
                                                <th scope="col">bidding Price</th>
                                                <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                        {val.bids.map((vall,indexx)=>{
                                            return(<>
                                                <tr>
                                                    <td>{vall.username}</td>
                                                    <td>{vall.bidPrice}</td>
                                                    <td>23-12-1999</td>
                                                </tr> 
                                            </>)
                                        })}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>

                            </>)
                        })}
                        
                    </div>
                </div>
            </section>
    </>);
}

export default Dashboard;