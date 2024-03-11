import { useState } from "react";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Button from "../../components/Button";

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().min(1).max(32).required(),
  email: yup.string().min(4).max(32).required().email(),
  password: yup.string().min(4).max(32).required(),
  repeatpassword: yup
    .string()
    .min(4)
    .max(32)
    .required()
    .oneOf([yup.ref("password"), null], "Passwords need to be the same"),
});

const SignUp = () => {
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
      body: JSON.stringify(data), // 'data' to obiekt zawierający dane formularza
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
        <h1>Sign Up</h1>
        <img src="/images/avatar2.png" width="150" height="150" alt="Avatar" />
      </div>
      <div>
        <label>First Name</label>
        {/* <Button /> */}
        <input
          type="text"
          {...register("firstName")}
          placeholder="Enter First Name"
          disabled={isLoading}
        />
        {errors.firstname && <p>{errors.firstname.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          {...register("lastName")}
          placeholder="Enter Last Name"
          disabled={isLoading}
        />
        {errors.lastname && <p>{errors.lastname.message}</p>}
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
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          {...register("repeatPassword")}
          placeholder="Enter Password"
          disabled={isLoading}
        />
        {errors.repeatpassword && <p>{errors.repeatpassword.message}</p>}
      </div>
      <button className="signup" type="Sign Up" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign Up"}
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

export default SignUp;
