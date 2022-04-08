import { useEffect, useState } from "react";

type IuseFormHookProps = {
  arrTabs: string[];
  onSubmitFunc?: () => {};
};

export interface IFormChildProp {
  onSubmit: (formName: string) => (data: any) => void;
  onError: (formName: string) => (data: any) => void;
  numberOfErrors: number;
  setFormData: any;
  formData: any;
}

export const useFormHook = <IFormData>({
  arrTabs,
  onSubmitFunc,
}: IuseFormHookProps): IFormChildProp => {
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
    console.log("tem erro ?", hasError);
    if (hasError === true) return;

    alert(JSON.stringify(formData));
    console.log("passei");
    console.log(formData);

    onSubmitFunc && onSubmitFunc();
  }, [tabs]);

  const onError = (formName: string) => (errors: any) => {
    setFormDataErrors({ ...errors });
    setTabs((oldState) => ({ ...oldState, [formName]: true }));
  };

  const onSubmit = (formName: string) => (data: any) => {
    setFormData((oldState: any) => ({
      ...oldState,
      ...data,
    }));
    setTabs((oldState) => ({ ...oldState, [formName]: false }));
  };

  const numberOfErrors = Object.keys(formDataErrors).reduce(
    (acc) => (acc = acc + 1),
    0
  );

  console.log(tabs);

  return {
    formData,
    setFormData,
    numberOfErrors,
    onError,
    onSubmit,
  };
};
