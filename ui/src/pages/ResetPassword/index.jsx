import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { ResetPasswordForm } from "../../components";
import { resetPassword, getUserState } from "../../redux/slice/userSlice";
import { resetPasswordSchema } from "./schema";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    passwordSetError,
    passwordSetSuccess,
    passwordSetLoading,
    passwordSetMessage,
  } = useSelector(getUserState);

  useEffect(() => {
    if (passwordSetError) {
      toast.error(passwordSetMessage, {
        toastId: "failed-set-password-toast",
      });
    } else if (passwordSetSuccess) {
      toast.success(passwordSetMessage, {
        toastId: "success-set-email-toast",
      });
    }
  }, [dispatch, passwordSetError, passwordSetSuccess, passwordSetMessage]);

  const initialValues = {
    resetPassword: "",
    confirmResetPassword: "",
  };

  const onSubmit = (values) => {
    dispatch(resetPassword({ token, password: values.resetPassword }));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: onSubmit,
    });

  const ResetPasswordHeader = () => {
    return (
      <section>
        <h1 className="heading">
          <FaSignInAlt style={{ margin: "5px" }} /> Reset Password
        </h1>
        <p className="heading-sub custom-text-secondary">Set a new password</p>
      </section>
    );
  };

  const ResetPasswordButtons = () => {
    return (
      <>
        <div className="button-group-login-signup">
          <section>
            <Button className="btn btn-light" onClick={() => navigate("/")}>
              Login
            </Button>
          </section>
          <section className="login-button-group">
            <Button
              className="btn btn-dark"
              type="submit"
              disabled={passwordSetLoading}
            >
              {passwordSetLoading ? "Loading…" : "Set Password"}
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="custom-container">
        <ResetPasswordHeader />

        {token ? (
          <Form onSubmit={handleSubmit}>
            <ResetPasswordForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <ResetPasswordButtons />
          </Form>
        ) : (
          <h4 style={{ display: "flex", justifyContent: "center" }}>
            No Token Found
          </h4>
        )}
      </div>
    </>
  );
}

export default ResetPassword;
