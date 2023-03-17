import * as yup from "yup";

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .required("Please enter first name")
    .min(2, "Firstname must be minumum of 2 characters")
    .max(25, "Firstname can't be larger than 25 characters"),
  lastName: yup
    .string()
    .required("Please enter lastname name")
    .min(2, "Lastname must be minumum of 2 characters")
    .max(25, "Lastname can't be larger than 25 characters"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Please choose a password")
    .matches(passwordRule, {
      message: "Your password doens't match the policy",
    }),
  confirmPassword: yup
    .string()
    .required("Retype your password")
    .oneOf([yup.ref("password"), null], "Password doesn't match"),
});
