import type { NextPage } from "next";
import { initialValues, useForm } from "../hooks/useFormFormik";
import { FormikProps, FormikBag } from "formik";

type teste = {
  formik: FormikProps<initialValues>;
};

const Page: NextPage<teste> = ({ formik }) => {
  return (
    <div>
      <input
        id="name2"
        name="name2"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name2}
      />
      name2 Erro: {formik.errors.name2}
      <input
        id="lasName2"
        name="lasName2"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lasName2}
      />
      lasName2 Erro: {formik.errors.lasName2}
    </div>
  );
};

export default Page;
