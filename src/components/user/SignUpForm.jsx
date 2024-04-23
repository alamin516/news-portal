"use client";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
  SuccessToast,
} from "@/utility/FormHelper";
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import Link from "next/link";
import { Button } from "react-bootstrap";

const SignUpForm = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  const handleOnChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formData = async () => {
    if (IsEmpty(data.firstName)) {
      ErrorToast("First Name Is Required!");
    } else if (IsEmpty(data.lastName)) {
      ErrorToast("Last Name Is Required!");
    } else if (IsEmpty(data.password)) {
      ErrorToast("Valid Password Is Required!");
    } else if (IsMobile(data.mobile)) {
      ErrorToast("Mobile Number Is Required!");
    } else if (IsEmail(data.email)) {
      ErrorToast("Valid Email Address Is Required!");
    } else if (IsEmpty(data.password)) {
      ErrorToast("Valid Password Is Required!");
    } else {
      try {
        setSubmit(true);
        const options = { method: "POST", body: JSON.stringify(data) };
        let res = await (await fetch("/api/user/registration", options)).json();

        setSubmit(false);
        setData({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          password: "",
        });
        if (res.status === "success") {
          SuccessToast("User Created successfully");
          window.location.href="/user/login"
        }
        {
          res.status === "failed" && ErrorToast("Credential Fail");
        }
      } catch (error) {
        ErrorToast(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center center-screen">
        <div className="col-md-6 col-lg-6 col-sm-12 col-12 ">
          <div className="card container-fluid animated fadeIn p-5 gradient-bg">
            <div className="row ">
              <h5 className="mb-1 mx-0 px-0">User Registration</h5>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">First Name</label>
                <input
                  value={data.firstName}
                  onChange={(e) => {
                    handleOnChange("firstName", e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Last Name</label>
                <input
                  value={data.lastName}
                  onChange={(e) => {
                    handleOnChange("lastName", e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Mobile</label>
                <input
                  value={data.mobile}
                  onChange={(e) => {
                    handleOnChange("mobile", e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => {
                    handleOnChange("email", e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Password</label>
                <input
                  value={data.password}
                  onChange={(e) => {
                    handleOnChange("password", e.target.value);
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12 text-center">
                <SubmitButton
                  className="btn btn-danger w-100 mt-3"
                  submit={submit}
                  onClick={formData}
                  text="SignUp"
                />
              </div>
            </div>
            <div className="my-3 d-flex justify-content-center">
              <Button variant="outline-dark">
                <Link href="/user/login" className="nav-link mx-2 ">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
