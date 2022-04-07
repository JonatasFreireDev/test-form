import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormUser } from "../../components/FormUser";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type IFormDataProps = {
  name: string;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Test: NextPage = () => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState<IFormDataProps>();

  const tabs = new Map([
    ["form", { hasError: true }],
    ["form1", { hasError: false }],
    ["form2", { hasError: false }],
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onError = (formName: string) => (errors: IFormDataProps) => {
    tabs.set(formName, { hasError: true });
  };

  const onSubmit = (formName: string) => (data: any) => {
    tabs.set(formName, { hasError: false });
    setFormData({
      ...formData,
      ...data,
    });

    const hasError: Boolean[] = [];

    tabs.forEach((value) =>
      value.hasError === true ? hasError.push(true) : null
    );

    if (hasError.includes(false)) {
      console.log("aeew");
    }
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FormUser store={formData} onSubmit={onSubmit} onError={onError} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default Test;
