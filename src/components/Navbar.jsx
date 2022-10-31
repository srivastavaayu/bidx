import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBaseBidPrice, setProductBaseBidPrice] = useState("");
  const [productDuration, setProductDuration] = useState("");
  const [productCategory, setProductCategory] = useState("electronics");
  const [productPhoto, setProductPhoto] = useState("");
  const [islogin, setIsLogin] = useState(false);

  async function userLogin() {
    try {
      const res = await fetch("/viewUserProfile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status == 202) {
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  userLogin();

  function addProduct() {
    try {
      let reader = new FileReader();
      let file = document.getElementsByClassName("productImageFileUpload")[0]
        .files[0];
      reader.readAsDataURL(file);
      reader.onload = async function () {
        const res = await fetch("/addProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prodName: productName,
            description: productDescription,
            basePrice: productBaseBidPrice,
            duration: productDuration,
            category: productCategory,
            imageBase: reader.result,
          }),
        });

        const data = await res.json();

        if (res.status === 202) {
          window.alert(data.message);
        } else {
          window.alert(data.message);
        }
      };
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        class="modal fade"
        id="addProductModal"
        tabindex="-1"
        aria-labelledby="addProductModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="addProductModal-title" id="addProductModal">
                Add a product
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="productNameInput"
                  name="prodName"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(event) => {
                    setProductName(event.target.value);
                  }}
                />
                <label for="productNameInput">Product Name</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  id="productDescriptionInput"
                  name="description"
                  placeholder="Product Description"
                  style={{ height: "100px" }}
                  value={productDescription}
                  onChange={(event) => {
                    setProductDescription(event.target.value);
                  }}
                ></textarea>
                <label for="productDescriptionInput">Product Description</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="productBaseBidPriceInput"
                  name="basePrice"
                  placeholder="Base Bid Price"
                  value={productBaseBidPrice}
                  onChange={(event) => {
                    setProductBaseBidPrice(event.target.value);
                  }}
                />
                <label for="productBaseBidPriceInput">Base Bid Price</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="productDurationInput"
                  name="duration"
                  placeholder="Product Bidding Duration (in days)"
                  value={productDuration}
                  onChange={(event) => {
                    setProductDuration(event.target.value);
                  }}
                />
                <label for="productDurationInput">
                  Product Bidding Duration (in days)
                </label>
              </div>
              <div class="form-floating">
                <select
                  class="form-select"
                  id="productCategory"
                  name="category"
                  value={productCategory}
                  onChange={(event) => {
                    setProductCategory(event.target.value);
                  }}
                >
                  <option selected disabled>
                    Select Product Category
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="vehicles">Vehicles</option>
                </select>
                <label for="productCategory">Product Category</label>
              </div>
              <div class="mb-3">
                <label for="productPhoto" class="form-label">
                  Upload Product Photo
                </label>
                <input
                  class="form-control productImageFileUpload"
                  type="file"
                  id="productPhoto"
                  name="product-images"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => {
                  addProduct();
                }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
      {!islogin ? (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark shadow">
          <div className="container-fluid">
            <NavLink className="navbar-brand ms-3" to="/home">
              BidX
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <div className="navbar-nav">
                <NavLink
                  exact
                  activeClassName="menu_active"
                  className="nav-link mx-1"
                  to="/home"
                >
                  Home
                </NavLink>
                <NavLink
                  exact
                  activeClassName="menu_active"
                  className="nav-link mx-1"
                  to="/authentication"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark shadow">
          <div className="container-fluid">
            <NavLink className="navbar-brand ms-3" to="/home">
              BidX
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <div className="navbar-nav">
                <NavLink
                  exact
                  activeClassName="menu_active"
                  className="nav-link mx-1"
                  to="/home"
                >
                  Home
                </NavLink>
                <NavLink
                  exact
                  activeClassName="menu_active"
                  className="nav-link mx-1"
                  to=""
                  data-bs-toggle="modal"
                  data-bs-target="#addProductModal"
                >
                  Add Product
                </NavLink>
                <NavLink
                  exact
                  activeClassName="menu_active"
                  className="nav-link mx-1"
                  to="/user"
                >
                  Your Dashboard
                </NavLink>
                {/* <NavLink
                  exact
                  activeClassName="menu_active"
                  className="nav-link mx-1"
                  to="/authentication"
                  onClick={logout}
                >
                  Logout
                </NavLink> */}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
