import { useForm as useFormHookImport } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type initialValues = {
  name: string;
  lastName: string;
  name2: string;
  lasName2: string;
};

const schema = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  name2: yup.string().required(),
  lasName2: yup.string().required(),
});

export const useFormHook = () => {
  const useForm = useFormHookImport<initialValues>({
    resolver: yupResolver(schema),
  });

  return { ...useForm };
};
