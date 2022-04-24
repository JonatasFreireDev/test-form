import { useEffect, useState } from "react";

type IuseFormHookProps<formData> = {
  arrTabs: string[];
  onSubmitFunc: (data: formData) => void;
};

export interface IFormChildProp<formData> {
  onSubmit: (formName: string) => (data: formData) => void;
  onError: (formName: string) => (data: any) => void;
  numberOfErrors: number;
  setFormData: any;
  formData: formData;
}

export const useFormHook = <IFormData>({
  arrTabs,
  onSubmitFunc,
}: IuseFormHookProps<IFormData>): IFormChildProp<IFormData> => {
  const [formData, setFormData] = useState<IFormData>({} as IFormData);
  const [formDataErrors, setFormDataErrors] = useState<IFormData>(
    {} as IFormData
  );
  const [tabs, setTabs] = useState<{ [key: string]: Boolean }>({ form: true });

  useEffect(() => {
    const formatedTabs = arrTabs.reduce((acc, value) => {
      return {
        ...acc,
        [value]: true,
      };
    }, {});

    setTabs({ ...formatedTabs });
  }, []);

  useEffect(() => {
    const hasError = Object.values(tabs).includes(true);
    if (hasError === true) return;

    onSubmitFunc && onSubmitFunc(formData);
  }, [tabs]);

  const onError = (formName: string) => (errors: any) => {
    setFormDataErrors({ ...errors });
    setTabs((oldState) => ({ ...oldState, [formName]: true }));
  };

  const onSubmit = (formName: string) => (data: IFormData) => {
    setFormData((oldState) => ({
      ...oldState,
      ...data,
    }));
    setTabs((oldState) => ({ ...oldState, [formName]: false }));
  };

  const numberOfErrors = Object.keys(formDataErrors).reduce(
    (acc) => (acc = acc + 1),
    0
  );

  return {
    formData,
    setFormData,
    numberOfErrors,
    onError,
    onSubmit,
  };
};
