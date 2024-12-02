import React, { useState } from "react";
import * as styles from "./Register.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password, firstName, lastName } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (firstName.trim().length < 3) {
      toast.error("First name must be more than 3 characters");
      return false;
    }

    if (lastName.trim().length < 3) {
      toast.error("Last name must be more than 3 characters");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!passRegex.test(password)) {
      toast.error(
        "Use a password 8-15 characters long with uppercase, lowercase, a number, and a special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5001"}/api/auth/signup`,
        trimmedData
      );

      if (response.status === 201) {
        toast.success(response.data.data);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      const errorMessages =
        error?.response?.data?.errors || ["Registration failed. Please try again."];
      errorMessages.forEach((msg) => toast.error(msg));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formSection}>
        <p>START FOR FREE</p>
        <h1>Create your account</h1>
        <p>
          Already a member? <a href="/login">Log in</a>
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <InputField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <InputField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <InputField
            name="email"
            type="email"
            label="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.btnRegister} disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>

      <div className={styles.imageSection}>
        {/* <img
          src={registrationImage}
          alt="Person registering on a platform with a form"
        /> */}
      </div>
    </div>
  );
};

const InputField = ({ name, label, value, onChange, type = "text" }) => (
  <div className={styles.formGroup}>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder=" "
      aria-label={label}
    />
    <label htmlFor={name}>{label}</label>
  </div>
);

export default Register;