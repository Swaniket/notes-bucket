import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setRememberMeState } from "../../redux/slice/authSlice";

import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSignInAlt, FaInfoCircle } from "react-icons/fa";
import "./index.css";

function Login() {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [failedLoginAttemptCount, setFailedLoginAttempCount] = useState(0);
  const [timeRemain, setTimeRemain] = useState(10);

  const { email, password } = formData;

  const runCountDown = () => {
    var myIntervalID = setInterval(() => {
      console.log("Called Interval");
      setTimeRemain((timeRemain) => timeRemain - 1);
    }, 1000);
    return myIntervalID;
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(setRememberMeState(rememberMe));
    dispatch(loginUser(userData));
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    // dispatch(resetStateMessages());
  };

  return (
    <div className="custom-container">
      <section>
        <h1 className="heading">
          <FaSignInAlt style={{ margin: "5px" }} /> Login
        </h1>
        {failedLoginAttemptCount < 5 && (
          <p className="heading-sub custom-text-secondary">
            Enter your credentials to login
          </p>
        )}
      </section>

      {failedLoginAttemptCount >= 5 ? (
        <section style={{ padding: "30px" }}>
          <h1 className="heading">
            <FaInfoCircle style={{ margin: "5px" }} /> Please wait {timeRemain}{" "}
            Seconds!
          </h1>
          <p className="heading-sub custom-text-secondary">
            You have entered wrong credentails 5 times
          </p>
        </section>
      ) : (
        <Form onSubmit={onSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Enter Your Email</strong>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="name@domain.com"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Enter Your Password</strong>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="enter your password"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              required
            />
          </Form.Group>

          {/* Remember Me */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              id="rememberMe"
              value={rememberMe}
              name="rememberMe"
              className="remember-me"
              onChange={() => {
                setRememberMe(!rememberMe);
              }}
            />
          </Form.Group>

          {/* Buttons */}
          <div className="button-group">
            <Button
              className="btn btn-light"
              style={{ marginRight: "10px" }}
              onClick={clearForm}
            >
              Clear
            </Button>
            <Button
              className="btn btn-dark"
              type="submit"
              // disabled={isLoading}
            >
              {/* {isLoading ? "Loading…" : "Login"} */}
              Login
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default Login;
