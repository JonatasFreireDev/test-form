import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IFormChildProp } from "../hooks/useFormHook";

type IFormAddress = {
  address: string;
};

const schema = yup.object().shape({
  address: yup.string().required(),
});

export const FormAddress = ({
  onSubmit,
  onError,
  setFormData,
  formData,
}: IFormChildProp<IFormAddress>) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit("form1"), onError("form1"))}
    >
      <TextField
        {...register("address")}
        label="Address"
        variant="standard"
        error={!!errors?.address?.message}
        helperText={errors?.address?.message}
        required
      />
      <Grid container spacing={2} p={2} margin="auto">
        <Grid item sm={2}>
          <Button
            onClick={() => {
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
