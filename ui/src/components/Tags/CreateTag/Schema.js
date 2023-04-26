import * as yup from "yup";

export const createTagSchema = yup.object({
  tagName: yup.string().required("Tag is required"),
});
