import { useState } from "react";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(32).required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unauthorized");
      }

      reset();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="MyForm">
        <h1>Log In</h1>
        <img src="/images/avatar2.png" width="150" height="150" alt="Avatar" />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          {...register("email")}
          placeholder="Enter Email"
          disabled={isLoading}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter Password"
          disabled={isLoading}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button className="submit" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <button
        className="clear"
        type="button"
        onClick={clearForm}
        disabled={isLoading}
      >
        Clear
      </button>
    </form>
  );
};

export default LoginForm;
