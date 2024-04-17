import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  forgotPasswordEmail: yup
    .string()
    .required("Please enter your email")
    .email("Invalid email format"),
});
