import { useFormik } from "formik";
import * as yup from "yup";

export interface initialValues {
  name: string;
  lastName: string;
  name2: string;
  lasName2: string;
}

const validationSchema = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  name2: yup.string().required(),
  lasName2: yup.string().required(),
});

export const useForm = () => {
  const formik = useFormik<initialValues>({
    initialValues: {
      name: "",
      lastName: "",
      name2: "",
      lasName2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return { formik };
};
