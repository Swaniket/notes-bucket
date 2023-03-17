import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSignInAlt, FaInfoCircle } from "react-icons/fa";
import {
  loginUser,
  setRememberMeState,
  getAuthState,
  resetStateMessages,
} from "../../redux/slice/authSlice";
import "./index.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } =
    useSelector(getAuthState);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [rememberMe, setRememberMe] = useState(false);
  const [failedLoginAttemptCount, setFailedLoginAttempCount] = useState(0);
  const [timeRemain, setTimeRemain] = useState(10);

  useEffect(() => {
    if (isError) {
      setFailedLoginAttempCount(() => failedLoginAttemptCount + 1);

      if (failedLoginAttemptCount >= 4) {
        var myInterval = runCountDown();

        setTimeout(() => {
          setFailedLoginAttempCount(0);
          clearInterval(myInterval);
        }, 10000);
      }
      toast.error(message, { toastId: "failed-login-toast" });
    }

    // Redirect when loggedin
    if (isSuccess || user) {
      setFailedLoginAttempCount(0);
      navigate("/home");
    }

    dispatch(resetStateMessages());

    return () => {
      setTimeRemain(10);
    };
  }, [isError, isSuccess, user, dispatch, message, navigate]);

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

  const navigateToSignup = () => {
    navigate("/sign-up");
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
          <div className="button-group-login-signup">
            <section>
              <Button className="btn btn-light" onClick={navigateToSignup}>
                Create an account
              </Button>
            </section>
            <section className="login-button-group">
              <Button
                className="btn btn-dark"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading…" : "Login"}
              </Button>
            </section>
          </div>
        </Form>
      )}
    </div>
  );
}

export default Login;
