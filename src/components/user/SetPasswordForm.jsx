"use client";
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import {
  ErrorToast,
  GetEmail,
  GetOTP,
  IsEmpty,
  SuccessToast,
} from "@/utility/FormHelper";
import { useRouter } from "next/navigation";

const SetPasswordForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: GetEmail(),
    otp: GetOTP(),
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);

  const handlePassword = () => {
    setShow(!show);
  };

  const handleOnChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formData = async () => {
    if (IsEmpty(data.password)) {
      ErrorToast("Please enter a password");
    } else {
      setSubmit(true);
      const options = { method: "POST", body: JSON.stringify(data) };
      let res = await (
        await fetch(`/api/user/recover/resetPassword`, options)
      ).json();

      setSubmit(false);

      if (res["status"] === "success") {
        SuccessToast("Request Completed");
        sessionStorage.clear();
        router.push("/user/login");
      } else {
        ErrorToast("Invalid Request");
      }
    }
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center center-screen">
        <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
          <div className="card animated fadeIn p-5 gradient-bg">
            <h5 className="mb-3">New Password</h5>
            <label className="form-label">Enter your new password</label>
            <div className="input-group mb-3 border-secondary">
              <input
                type={show ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                onChange={(e) => handleOnChange("password", e.target.value)}
              />
              <div className="input-group-append ml-1">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handlePassword()}
                >
                  {show ? (
                    <i className="bi bi bi-eye"></i>
                  ) : (
                    <i className="bi bi bi-eye-slash"></i>
                  )}
                </button>
              </div>
            </div>

            <SubmitButton
              className="btn btn-danger mt-3"
              submit={submit}
              onClick={formData}
              text="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordForm;
