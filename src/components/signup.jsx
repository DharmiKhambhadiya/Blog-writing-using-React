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
  const { register, handleSubmit } = useForm();
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
      // Handle specific error cases
      if (error.code === 409) {
        setErr("An account with this email already exists. Please try logging in instead.");
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
          Already have an account?
          <Link to="/login" className="signup-link">
            Sign In
          </Link>
        </p>
        {err && <p className="signup-error">{err}</p>}
        <form onSubmit={handleSubmit(signin)} className="signup-form">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                "Invalid email address",
            })}
          />

          <Input
            label="Name:"
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

          <Input
            label="Password:"
            type="password"
            placeholder="Enter your strong password"
            {...register("password", {
              required: "Password is required",
              validate: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/.test(
                  value
                ) || "Password must be 8–16 characters and strong",
            })}
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signupcomponent;
