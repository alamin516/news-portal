"use client"
import React, { useState } from "react";
import SubmitButton from "../master/SubmitButton";
import Link from "next/link";
import { ErrorToast, IsEmail, IsEmpty, SuccessToast } from "@/utility/FormHelper";

const LoginForm = () => {
  const [data, setData]= useState({email: "", password: ""})
  const [submit, setSubmit] = useState(false);

  const handleOnChange=(name, value)=>{
    setData((data)=>({
      ...data,
      [name]: value
  }))
  }

  const formData = async()=>{
    if(IsEmail(data.email)){
      ErrorToast('Valid Email Address Is Required!')
    }else if(IsEmpty(data.password)){
      ErrorToast('Valid Password Is Required!')
    }else{
      setSubmit(true)
      const options={method:'POST', body:JSON.stringify(data)}
      let res=await (await fetch("/api/user/login",options)).json();

      setSubmit(false)
      
      if(res['status'] === 'success'){
        SuccessToast('Login success')
        window.location.href="/"
        setData({email: "", password: ""})
      }
      {res.status === 'failed' && ErrorToast('Credential Fail')}

    }
  }


  return (
    <div className="row h-100 justify-content-center center-screen">
      <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
        <div className="card animated fadeIn p-5 gradient-bg">
          <h5 className="mb-3">User Login</h5>
          <label className="form-label">User Email</label>
          <input
            value={data.email}
            onChange={(e)=> {handleOnChange('email', e.target.value)}}
            type="email"
            className="form-control mb-2"
          />
          <label className="form-label">User Password</label>
          <input
            value={data.password}
            onChange={(e)=> {handleOnChange('password', e.target.value)}}
            type="password"
            className="form-control mb-1"
          />
          <SubmitButton
            className="btn btn-danger mt-3"
            submit={submit}
            text="Login"
            onClick={formData}
          />
          <div className="my-3 d-flex">
            <Link href="/user/registration" className="nav-link mx-2">
              Sign Up |
            </Link>
            <Link href="/user/emailVerify" className="nav-link">
              Forget Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
