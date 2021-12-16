import React from "react";

// let authenticationLoginSchema = yup.object().shape({
//   email: yup.string().trim().email().required(),
//   password: yup.string().trim().min(8).required(),
// });

// let authenticationRegisterSchema = yup.object().shape({
//   name: yup.string().trim().required(),
//   email: yup.string().trim().email(),
//   password: yup.string().trim().min(8).required(),
//   confirmPassword: yup.string().trim().required(),
// });

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticationMode: "login",
      username:"",
      email: "",
      phone:"",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.validateandAuthenticate = this.validateandAuthenticate.bind(this);
    this.changeAuthenticationMode = this.changeAuthenticationMode.bind(this);
  }

  handleInput(event) {
    this.setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim(),
    }));
    document.getElementById(event.target.id).classList.remove("is-invalid");
  }

 //register function (backend)
 async registerUser() {
  try {
    const res = await fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'userName':this.state.username,
        'firstName':this.state.firstName,
        'lastName':this.state.lastName,
        'email':this.state.email,
        'password':this.state.password,
        'phone':this.state.phone
      }),
    });

    const data = await res.json();

    if (res.status === 202) {
      console.log(data.message);
      window.alert(data.message);
    } else {
      console.log(data.message);
      window.alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};


async loginUser() {
  try {
    const res = await fetch("/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'userName':this.state.username,
        'password':this.state.password,
      }),
    });

    const data = await res.json();
    console.log(data);
    //TODO: Redirect to Home Page
    if (res.status === 202) {
      console.log(data.message.userName);
      window.alert(data.message.userName);
    } else {
      console.log(data.message);
      window.alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

  validateandAuthenticate(event) {
    event.preventDefault();
    if (this.state.authenticationMode === "login") {
      this.loginUser();
    } else if (this.state.authenticationMode === "register") {
      if (this.state.firstName.length === 0) {
        document
          .getElementById("authenticationRegisterDiv__firstNameInput")
          .classList.add("is-invalid");
        document.getElementById(
          "authenticationRegisterDiv__firstNameInput__invalidFeedback"
        ).innerText = "Please enter the first name!";
      }
      if (this.state.lastName.length === 0) {
        document
          .getElementById("authenticationRegisterDiv__lastNameInput")
          .classList.add("is-invalid");
        document.getElementById(
          "authenticationRegisterDiv__lastNameInput__invalidFeedback"
        ).innerText = "Please enter the last name!";
      }
      if (!this.state.email.match(/[a-z0-9._]+@[a-z]+\.[a-z]+/g)) {
        document
          .getElementById("authenticationRegisterDiv__emailInput")
          .classList.add("is-invalid");
        document.getElementById(
          "authenticationRegisterDiv__emailInput__invalidFeedback"
        ).innerText = "Please enter a valid e-mail address!";
      }
      if (this.state.password.length < 8) {
        document
          .getElementById("authenticationRegisterDiv__passwordInput")
          .classList.add("is-invalid");
        document.getElementById(
          "authenticationRegisterDiv__passwordInput__invalidFeedback"
        ).innerText =
          "Please enter a conforming password! A valid password must contain atleast 8 characters!";
      }
      if (this.state.password !== this.state.confirmPassword) {
        document
          .getElementById("authenticationRegisterDiv__confirmPasswordInput")
          .classList.add("is-invalid");
        document.getElementById(
          "authenticationRegisterDiv__confirmPasswordInput__invalidFeedback"
        ).innerText = "Please re-enter the same password entered above!";
      }
      this.registerUser();
    }
  }

  changeAuthenticationMode(event) {
    event.preventDefault();
    if (this.state.authenticationMode === "login") {
      this.setState((prevState) => ({
        ...prevState,
        authenticationMode: "register",
      }));
    } else {
      let elementsToRemoveClassFrom =
        document.getElementsByClassName("form-control");
      for (let i = 0; i < elementsToRemoveClassFrom.length; i++) {
        elementsToRemoveClassFrom[i].classList.remove("is-invalid");
      }
      this.setState((prevState) => ({
        ...prevState,
        authenticationMode: "login",
      }));
    }
  }


  //Back End Connect

  render() {
    if (this.state.authenticationMode === "login") {
      return (
        <>
          <div className="container-fluid authenticationDiv authenticationLoginDiv">
            <h2>Login to BidX</h2>
            <div className="form-floating mb-3 mt-4">
              <input
                id="authenticationLoginDiv__emailInput"
                className="form-control"
                name="username"
                value={this.state.username}
                type="text"
                placeholder="Username"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationLoginDiv__emailInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationLoginDiv__emailInput">
                Username
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationLoginDiv__passwordInput"
                className="form-control"
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Password"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationLoginDiv__passwordInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationLoginDiv__passwordInput">
                Password
              </label>
            </div>
            <div className="authenticationButtonDiv">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={(event) => this.changeAuthenticationMode(event)}
              >
                New to BidX? Register here!
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => this.validateandAuthenticate(event)}
              >
                Login to BidX
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="container-fluid authenticationDiv authenticationRegisterDiv">
            <h2>Register on BidX</h2>
            <div className="form-floating mb-3 mt-4">
              <input
                id="authenticationRegisterDiv__firstNameInput"
                className="form-control"
                name="firstName"
                value={this.state.firstName}
                type="text"
                placeholder="First Name"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__firstNameInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__firstNameInput">
                First Name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationRegisterDiv__lastNameInput"
                className="form-control"
                name="lastName"
                value={this.state.lastName}
                type="text"
                placeholder="Last Name"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__lastNameInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__lastNameInput">
                Last Name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationRegisterDiv__emailInput"
                className="form-control"
                name="email"
                value={this.state.email}
                type="text"
                placeholder="E-mail Address"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__emailInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__emailInput">
                E-mail Address
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationRegisterDiv__phoneInput"
                className="form-control"
                name="phone"
                value={this.state.phone}
                type="tel"
                placeholder="Phone Number"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__phoneInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__phoneInput">
                Phone Number
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationRegisterDiv__usernameInput"
                className="form-control"
                name="username"
                value={this.state.username}
                type="text"
                placeholder="Username"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__usernameInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__usernameInput">
                Username
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationRegisterDiv__passwordInput"
                className="form-control"
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Password"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__passwordInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__passwordInput">
                Password
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="authenticationRegisterDiv__confirmPasswordInput"
                className="form-control"
                name="confirmPassword"
                value={this.state.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={(event) => this.handleInput(event)}
              />
              <div
                id="authenticationRegisterDiv__confirmPasswordInput__invalidFeedback"
                className="invalid-feedback"
              ></div>
              <label htmlFor="authenticationRegisterDiv__confirmPasswordInput">
                Confirm Password
              </label>
            </div>
            <div className="authenticationButtonDiv">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={(event) => this.changeAuthenticationMode(event)}
              >
                Already have an account? Login here!
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => this.validateandAuthenticate(event)}
              >
                Register on BidX
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Authentication;
