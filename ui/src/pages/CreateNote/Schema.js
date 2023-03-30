import * as yup from "yup";

export const createNoteSchema = yup.object({
  title: yup.string().required("Title a required"),
  body: yup.string().required("Body is required"),
});
