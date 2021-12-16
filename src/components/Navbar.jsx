import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBaseBidPrice, setProductBaseBidPrice] = useState("");
  const [productDuration, setProductDuration] = useState("");
  const [productCategory, setProductCategory] = useState("1");
  const [productPhoto, setProductPhoto] = useState("");
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
                  placeholder="Product Bidding Duration (in days)"
                  value={productBaseBidPrice}
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
                  value={productCategory}
                  onChange={(event) => {
                    setProductCategory(event.target.value);
                  }}
                >
                  <option selected disabled>
                    Select Product Category
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label for="productCategory">Product Category</label>
              </div>
              <div class="mb-3">
                <label for="productPhoto" class="form-label">
                  Upload Product Photo
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="productPhoto"
                  value={productPhoto}
                  onChange={(event) => {
                    setProductPhoto(event.target.value);
                  }}
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
              <button type="button" class="btn btn-primary">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
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
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addProductModal"
              >
                Launch demo modal
              </button>
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
                to="/auth"
              >
                Login
              </NavLink>
              {/* <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/contactus'>Contact Us</NavLink>
                            <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/career'>Careers</NavLink>
                            <NavLink exact activeClassName ="menu_active"  className="nav-link mx-1" to ='/about'>About Us</NavLink> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;