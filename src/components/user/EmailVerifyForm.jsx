"use client"
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import { ErrorToast, IsEmail, SetEmail, SuccessToast } from "@/utility/FormHelper";
import { useRouter } from "next/navigation";

const EmailVerifyForm = () => {
  const [data, setData] = useState({ email: "" });
  const [submit, setSubmit] = useState(false);
  const router = useRouter()

  const handleOnChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const formData = async () => {
    if (IsEmail(data.email)) {
      ErrorToast("Please provide a valid email!");
    } 

      setSubmit(true)
      const res = await (await fetch(`/api/user/recover/verifyEmail?email=${data.email}`)).json()

      setSubmit(false)
      
      if(res.status === 'success'){
        setData({ email: "" })
        SetEmail(data.email)
        SuccessToast('Request Success') 
        router.push('/user/otpVerify')
      }else{
        ErrorToast('Invalid Request')
      }
      
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center center-screen">
        <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
          <div className="card animated fadeIn p-5 gradient-bg">
            <h5 className="mb-3">Email Address</h5>
            <label className="form-label">User Email</label>
            <input
              value={data.email}
              onChange={(e) => {
                handleOnChange("email", e.target.value);
              }}
              type="email"
              className="form-control mb-2"
            />
            <SubmitButton
              className="btn btn-danger mt-3"
              submit={submit}
              text="Next"
              onClick={formData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyForm;
