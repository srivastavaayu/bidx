import React, { useState } from "react";

const Forgotpass = () => {
  const [email, setEmail] = useState({ Email: "" });
  const [otp, setOtp] = useState({ Otp: "", pass1: "", pass2: "" });
  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendDetails = (values) => {
    const data = values.target.value;
    setEmail((prev) => {
      return {
        Email: data,
      };
    });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      if (email.Email !== "") {
        const res = await fetch("/send-otp", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reciverEmail: email.Email,
          }),
        });

        const data = await res.json();
        if (res.status === 202) {
          window.alert(data.message);
          setIsOtpSent(true);
        } else {
          window.alert(data.message);
        }
      } else {
        alert("Pleas Enter the Email !!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const subotp = (values) => {
    const data = values.target.value;
    const type = values.target.name;
    setOtp((prev) => {
      if (type === "otp") {
        return {
          Otp: data,
          pass1: prev.pass1,
          pass2: prev.pass2,
        };
      } else if (type === "password1") {
        return {
          Otp: prev.Otp,
          pass1: data,
          pass2: prev.pass2,
        };
      } else {
        return {
          Otp: prev.Otp,
          pass1: prev.pass1,
          pass2: data,
        };
      }
    });
  };
  const submitOTP = async (e) => {
    try {
      e.preventDefault();

      if (otp.pass1 !== otp.pass2) {
        alert("Passwords did'nt match !!");
      } else {
        const res = await fetch("/verify-Reset", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reciverEmail: email.Email,
            otp: otp.Otp,
            password: otp.pass1,
          }),
        });

        const data = await res.json();
        if (res.status === 202) {
          window.alert(data.message);
        } else {
          window.alert(data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!isOtpSent ? (
        <section class="container">
          <div class="mt-5 pt-3">
            <h2>Forgot Password</h2>
          </div>
          <form onSubmit={sendOTP}>
            <div class="form-floating mb-3 mt-5">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={sendDetails}
                name="email"
                value={email.Email}
              />
              <label for="floatingInput">Enter Your Email address</label>
              <button type="submit" className="btn btn-primary mt-3">
                Send Otp
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section class="container">
          <div class="mt-5 pt-3">
            <h2>Enter OTP</h2>
          </div>
          <form onSubmit={submitOTP}>
            <div class="form-floating mb-3 mt-5">
              <input
                type="number"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={subotp}
                name="otp"
                value={otp.Otp}
              />
              <label for="floatingInput">Enter Your OTP</label>
            </div>
            <div class="form-floating mb-3 mt-5">
              <input
                type="password"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={subotp}
                name="password1"
                value={otp.pass1}
              />
              <label for="floatingInput">Enter New Password</label>
            </div>
            <div class="form-floating mb-3 mt-5">
              <input
                type="password"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={subotp}
                name="password2"
                value={otp.pass2}
              />
              <label for="floatingInput">Re-Enter New Password</label>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Forgotpass;
