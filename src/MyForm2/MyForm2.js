import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const App = () => {
  const formData = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setValue,
  } = formData;

  // useEffect(() => {
  //   setValue("email", "12321");
  // }, [errors]);

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <br />

      <input {...register("email")} placeholder="email" type="email" />
      <p>{errors.email?.message}</p>
      <br />

      <input {...register("password")} placeholder="password" type="password" />
      <p>{errors.password?.message}</p>
      <br />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default App;
