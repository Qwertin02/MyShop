import React, { useState } from "react";
import "./MyForm.css";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const MyForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [apiErrorMessage, setAPIErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      ...formData,
      [name]: isCheckbox ? event.target.checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST", //sprawdzenie metod http!
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    };

    fetch("https://api.escuelajs.co/api/v1/auth/login", requestOptions) // sprawdzic statusy serwera np.200, 401, 404, 500
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 401) {
          throw new Error("Unauthorized");
        }
      })
      .catch((error) => {
        setAPIErrorMessage(error.message);
      });
  };

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
      rememberMe: false,
    });
  };

  const handleCreateAccount = () => {};

  const handleFetchProduct = () => {
    const requestOptions = {
      method: "GET", //sprawdzenie metod http!
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   email: formData.email,
      //   password: formData.password,
      // }),
    };

    fetch(
      "https://api.escuelajs.co/api/v1/products?limit=10&offset=10",
      requestOptions
    ) // sprawdzic statusy serwera np.200, 401, 404, 500
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="MyForm" align="center">
        <h1>Log In</h1>
        <img src="/images/avatar2.png" width="150" height="150" alt="Avatar" />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
      </div>
      <div className="RM">
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="Rm"
          />
          Remember me
        </label>
      </div>

      <button className="clear" type="button" onClick={handleClear}>
        Clear
      </button>

      <button className="submit" type="submit">
        Submit
      </button>

      {apiErrorMessage.length > 0 && <label>{apiErrorMessage}</label>}

      <button className="create" type="button" onClick={handleCreateAccount}>
        Create account
      </button>

      <button className="create" type="button" onClick={handleFetchProduct}>
        Get products
      </button>
    </form>
  );
};

export default MyForm;
