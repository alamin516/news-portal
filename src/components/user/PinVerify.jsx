"use client";
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import {
  ErrorToast,
  GetEmail,
  IsEmpty,
  SetOTP,
  SuccessToast,
} from "@/utility/FormHelper";
import { useRouter } from "next/navigation";

const PinVerify = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: GetEmail(), otp: "" });
  const [submit, setSubmit] = useState(false);

  console.log(data);

  const handleOnChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formData = async () => {
    if (IsEmpty(data.otp)) {
      ErrorToast("Please provide a valid otp code!");
    } else {
      setSubmit(true);
      const options = { method: "POST", body: JSON.stringify(data) };
      let res=await (await fetch(`/api/user/recover/verifyOTP`,options)).json();

      setSubmit(false);

      if(res['status']==="success"){
        SuccessToast("Request Completed");
        SetOTP(data.otp);
        router.push("/user/resetPassword")
    }
    else {
        ErrorToast("Invalid Request")
    }
    }
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center center-screen">
        <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
          <div className="card animated fadeIn p-5 gradient-bg">
            <h5 className="mb-3">Verification PIN</h5>
            <label className="form-label">6 Digit Code</label>
            <input
              onChange={(e) => {
                handleOnChange("otp", e.target.value);
              }}
              type="text"
              className="form-control mb-2"
              placeholder="XXXXXX"
            />
            <SubmitButton
              className="btn btn-danger mt-3"
              submit={submit}
              onClick={formData}
              text="Verify"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinVerify;
