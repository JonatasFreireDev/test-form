import type { NextPage } from "next";
import { initialValues, useForm } from "../hooks/useFormFormik";
import { FormikProps, FormikBag } from "formik";
import { FormProviderProps } from "react-hook-form";

interface Props {
  useFormHook: FormProviderProps;
}

const FormHook: NextPage<Props> = ({ useFormHook }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, ...formRest },
    ...rest
  } = useFormHook;

  return (
    <div>
      <input {...register("name2")} />
      name2 Erro: {errors.name2?.message}
      <input {...register("lasName2")} />
      lasName2 Erro: {errors.lasName2?.message}
    </div>
  );
};

export default FormHook;
