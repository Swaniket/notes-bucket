import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FaSignInAlt, FaInfoCircle } from "react-icons/fa";
import {
  loginUser,
  setRememberMeState,
  getUserState,
  resetStateMessages,
} from "../../redux/slice/userSlice";
import { loginSchema } from "./Schema";
import { LoginForm } from "../../components";
import "./index.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [failedLoginAttemptCount, setFailedLoginAttempCount] = useState(0);
  const [timeRemain, setTimeRemain] = useState(10);

  const { user, isLoading, isError, isSuccess, message } =
    useSelector(getUserState);

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

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    dispatch(setRememberMeState(rememberMe));
    dispatch(loginUser(values));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: onSubmit,
    });

  const runCountDown = () => {
    var myIntervalID = setInterval(() => {
      console.log("Called Interval");
      setTimeRemain((timeRemain) => timeRemain - 1);
    }, 1000);
    return myIntervalID;
  };

  const LoginHeader = () => {
    return (
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
    );
  };

  const FailedLoginHeader = () => {
    return (
      <section style={{ padding: "30px" }}>
        <h1 className="heading">
          <FaInfoCircle style={{ margin: "5px" }} /> Please wait {timeRemain}{" "}
          Seconds!
        </h1>
        <p className="heading-sub custom-text-secondary">
          You have entered wrong credentails 5 times
        </p>
      </section>
    );
  };

  const LoginButtons = () => {
    return (
      <>
        <div className="button-group-login-signup">
          <section>
            <Button
              className="btn btn-light"
              onClick={() => navigate("/sign-up")}
            >
              Create an account
            </Button>
          </section>
          <section className="login-button-group">
            <Button className="btn btn-dark" type="submit" disabled={isLoading}>
              {isLoading ? "Loading…" : "Login"}
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <div className="custom-container">
      <LoginHeader />

      {failedLoginAttemptCount >= 5 ? (
        <FailedLoginHeader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <LoginForm
            values={values}
            errors={errors}
            touched={touched}
            rememberMe={rememberMe}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setRememberMe={setRememberMe}
          />

          {/* Buttons */}
          <LoginButtons />
        </Form>
      )}
    </div>
  );
}

export default Login;
