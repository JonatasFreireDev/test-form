import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IFormChildProp = {
  onSubmit: (data: any) => any;
  onError: (data: any) => any;
  store: any;
};

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const FormUser = ({ onSubmit, onError, store }: IFormChildProp) => {
  const { register, handleSubmit, clearErrors, reset } = useForm({
    defaultValues: store,
    resolver: yupResolver(schema),
  });

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
        required
      />
      <Grid container spacing={2} p={2} margin="auto">
        <Grid item sm={2}>
          <Button
            onClick={() => {
              clearErrors();
              reset();
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
