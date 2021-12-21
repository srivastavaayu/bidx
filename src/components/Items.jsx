import React, { useState, useEffect } from "react";
import "../styles/Items.scss";
import img from "../static/image2.jpg";
import img2 from "../static/image3.jpg";
import { Link, useLocation } from "react-router-dom";

// Component to show items
const Items = () => {
  const [sdata, setSdata] = useState();
  const location = useLocation();
  const selectedCategory = location.pathname.split("/").at(-1);
  //Backend Connection
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/viewProduct", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
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
  }, []);
  console.log(sdata);
  return (
    <>
      <section className="container">
        <div className="mt-5 pt-3">
          <h2
            className="text-danger my-4 text-capitalize"
            style={{ fontSize: "40px" }}
          >
            {selectedCategory}
          </h2>
        </div>
        <div className="row">
          {sdata
            ? sdata.map((val, index) => {
                console.log(val);
                return (
                  <div class="card card_item card_shadow col-lg-3 my-4">
                    <img src={val.images} class="card-img-top" alt="..." />
                    <div class="card-body card_background">
                      <h5 class="card-title">{val.prodName}</h5>
                      <p class="card-text">{val.description}</p>
                      <div className="d-flex">
                        <Link to={`/product/${val._id}`}>
                          <button href="#" class="btn btn-outline-danger">
                            Place Bid
                          </button>
                        </Link>
                        <p className="my-2 ms-3">
                          <b>Base Price :&nbsp;</b>${val.basePrice}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Items;
