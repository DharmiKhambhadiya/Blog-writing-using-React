import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { login as authlogin } from "../store/authslice";
import { Input } from "./input";
import { Link } from "react-router-dom";
import "./css/signup.css";

function Signupcomponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState("");

  const signin = async (data) => {
    setErr("");
    try {
      const newUser = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (newUser) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(authlogin(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      if (error.code === 409) {
        setErr(
          "An account with this email already exists. Please try logging in instead."
        );
      } else if (error.code === 400) {
        setErr("Invalid email or password format. Please check your input.");
      } else {
        setErr(error.message || "An error occurred during registration.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtext">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Sign In
          </Link>
        </p>

        {err && <p className="signup-error">{err}</p>}

        <form onSubmit={handleSubmit(signin)} className="signup-form">
          <Input
            type="text"
            placeholder="Enter Your Full Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && <p className="field-error">{errors.name.message}</p>}

          <Input
            type="email"
            placeholder="Enter Your Email Address"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                "Invalid email address",
            })}
          />
          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Enter Your Strong Password"
            {...register("password", {
              required: "Password is required",
              validate: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/.test(
                  value
                ) ||
                "Password must be 8–16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            })}
          />
          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signupcomponent;
