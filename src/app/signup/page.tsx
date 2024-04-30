"use client";

import usersArray from "@/helpers/users";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use } from "react";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const SignUp: React.FC = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  const router = useRouter();
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("/api/users/signup", user);

        if (response) {
          console.log("res pose data", response.data);
          router.push("/login");
        }
      } catch (error) {
        console.error("Sign up error:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Trigger validation for the changed input
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = "";
    switch (fieldName) {
      case "email":
        if (!value) {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Email is invalid";
        }
        break;
      case "password":
        if (!value) {
          errorMessage = "Password is required";
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters long";
        } else if (!/\d/.test(value)) {
          errorMessage = "Password must contain at least one number";
        } else if (!/[!@#$%^&*]/.test(value)) {
          errorMessage = "Password must contain at least one special character";
        }
        break;
      case "confirmPassword":
        if (value !== user.password) {
          errorMessage = "Passwords do not match";
        }
        break;
      case "username":
        if (!value) {
          errorMessage = "Username is required";
        }
        break;
      case "firstName":
        if (!value) {
          errorMessage = "First Name is required";
        }
        break;
      case "lastName":
        if (!value) {
          errorMessage = "Last Name is required";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex flex-row gap-4">
          <Input
            name="firstName"
            placeholder="FirstName"
            value={user.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Input
            name="lastName"
            placeholder="LastName"
            value={user.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>

        <div className="flex flex-row gap-4">
          <Input
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
            error={errors.username}
          />
        </div>
        <Input
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Input
          name="confirmPassword"
          placeholder="Confirm password"
          value={user.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-6">
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};
