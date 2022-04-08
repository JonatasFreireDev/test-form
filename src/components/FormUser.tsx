import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IFormChildProp } from "../hooks/useFormHook";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const FormUser = ({
  onSubmit,
  onError,
  setFormData,
  formData,
}: IFormChildProp) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(getValues());
  }, [getValues()]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit("form"), onError("form"))}
    >
      <TextField
        {...register("name")}
        label="Name"
        variant="standard"
        error={!!errors?.name?.message}
        helperText={errors?.name?.message}
        required
      />
      <Grid container spacing={2} p={2} margin="auto">
        <Grid item sm={2}>
          <Button
            onClick={() => {
              setFormData();
              clearErrors();
            }}
            variant="outlined"
          >
            Reset
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
