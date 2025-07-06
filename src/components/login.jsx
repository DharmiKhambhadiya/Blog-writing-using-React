import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authlogin } from "../store/authslice";
import "./css/login.css";

function Logincomponent() {
  const [err, seterr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    seterr("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) {
          dispatch(authlogin(userdata));
        }
        navigate("/");
      }
    } catch (error) {
      seterr(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">
          Don't have an account?
          <Link to="/signup" className="login-link">
            Sign Up
          </Link>
        </p>
        {err && <p className="login-error">{err}</p>}
        <form onSubmit={handleSubmit(login)} className="login-form">
          <Input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                "Invalid email address",
            })}
          />
          <Input
            type="password"
            placeholder="Enter Strong Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Logincomponent;
