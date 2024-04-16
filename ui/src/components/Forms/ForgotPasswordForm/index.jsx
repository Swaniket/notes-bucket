import React from "react";
import { Form } from "react-bootstrap";

function ForgotPasswordForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
  return (
    <>
      {/* Email */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Enter Your Email</strong>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="name@domain.com"
          id="forgotPasswordEmail"
          name="forgotPasswordEmail"
          autoComplete="off"
          value={values.forgotPasswordEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={
            touched.forgotPasswordEmail && !!errors.forgotPasswordEmail
          }
          isValid={touched.forgotPasswordEmail && !errors.forgotPasswordEmail}
        />
        <Form.Control.Feedback type="invalid">
          {errors.forgotPasswordEmail}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default ForgotPasswordForm;

//       <Form.Group className="mb-3">
//         <Form.Label className="field-header">
//           <strong>Enter new password</strong>
//         </Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="enter your password"
//           id="password"
//           name="password"
//           autoComplete="off"
//           value={values.password}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           isInvalid={touched.password && !!errors.password}
//           isValid={touched.password && !errors.password}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.password}
//         </Form.Control.Feedback>
//       </Form.Group>

//       {/* Confirm Password */}
//       <Form.Group className="mb-3">
//         <Form.Label className="field-header">
//           <strong>Retype your password</strong>
//         </Form.Label>
//         <Form.Control
//           type="confirmPassword"
//           placeholder="enter your password"
//           id="confirmPassword"
//           name="confirmPassword"
//           autoComplete="off"
//           value={values.confirmPassword}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           isInvalid={touched.confirmPassword && !!errors.confirmPassword}
//           isValid={touched.confirmPassword && !errors.confirmPassword}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.confirmPassword}
//         </Form.Control.Feedback>
//       </Form.Group>
