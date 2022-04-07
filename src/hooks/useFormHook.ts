import { useEffect, useState } from "react";

type IuseFormHookProps = {
  arrTabs: string[];
  onSubmitFunc?: () => {};
};

export const useFormHook = ({ arrTabs, onSubmitFunc }: IuseFormHookProps) => {
  const [formData, setFormData] = useState<any>();
  const [tabs, setTabs] = useState<{ [key: string]: Boolean }>({ form: true });

  useEffect(() => {
    const teste = arrTabs.reduce((acc, value) => {
      return {
        ...acc,
        [value]: true,
      };
    }, {});

    setTabs({ ...teste });
  }, []);

  useEffect(() => {
    const hasError = Object.values(tabs).includes(true);
    console.log("tem erro ?", hasError);
    if (hasError === true) return;

    alert(JSON.stringify(formData));
    console.log("passei");
    console.log(formData);
  }, [tabs, formData]);

  const onError = (formName: string) => (errors: any) => {
    setTabs((oldState) => ({ ...oldState, [formName]: true }));
  };

  const onSubmit = (formName: string) => (data: any) => {
    setTabs((oldState) => ({ ...oldState, [formName]: false }));
    setFormData((oldState: any) => ({
      ...oldState,
      ...data,
    }));
  };

  console.log(tabs);

  return {
    formData,
    onError,
    onSubmit,
  };
};
