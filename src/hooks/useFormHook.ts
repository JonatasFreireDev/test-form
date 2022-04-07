import { useEffect, useState } from "react";

export const useFormHook = () => {
  const [formData, setFormData] = useState<any>();
  const [tabs, setTabs] = useState<{ [key: string]: Boolean }>({
    form: true,
    form1: true,
    form2: false,
  });

  useEffect(() => {
    const hasError = Object.values(tabs).includes(true);
    console.log("tem erro ?", hasError);
    if (hasError === true) return;

    alert(formData);
    console.log("passei");
  }, [tabs]);

  const onError = (formName: string) => (errors: any) => {
    setTabs({ ...tabs, [formName]: true });
  };

  const onSubmit = (formName: string) => (data: any) => {
    setTabs({ ...tabs, [formName]: false });
    setFormData({
      ...formData,
      ...data,
    });
  };

  console.log(tabs);

  return {
    formData,
    onError,
    onSubmit,
  };
};
