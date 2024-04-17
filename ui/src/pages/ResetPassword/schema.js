import * as yup from "yup";

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const resetPasswordSchema = yup.object({
  resetPassword: yup
    .string()
    .required("Please choose a password")
    .matches(passwordRule, {
      message: "Your password doens't match the policy",
    }),
  confirmResetPassword: yup
    .string()
    .required("Retype your password")
    .oneOf([yup.ref("resetPassword"), null], "Password doesn't match"),
});
