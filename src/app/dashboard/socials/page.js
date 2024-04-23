"use client"
import SubmitButton from "@/components/master/SubmitButton";
import { ErrorToast, SuccessToast } from "@/utility/FormHelper";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [social, setSocial] = useState({
    about: "",
    address: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const termsResponse = await fetch(`/api/social`);
        const socialData = await termsResponse.json();
        setSocial(socialData.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (name, value) => {
    setSocial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formData = async() => {
    try{
      const { id, ...data } = social;
      const options = { method: "PUT", body: JSON.stringify(data) };
      let res = await (await fetch(`/api/social?id=${social.id}`, options)).json();

      console.log(res)

      if (res.status === "success") {
        SuccessToast("Updated successfully");
      } else {
        ErrorToast("Failed to update");
      }

    }catch(e){
      console.log(e)
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center center-screen">
        <h2 className="text-center">Loading.....</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row h-100 justify-content-center center-screen">
        <div className="col-md-6 col-lg-6 col-sm-12 col-12 ">
          <div className="card container-fluid animated fadeIn p-5 gradient-bg">
            <div className="row ">
              <h5 className="mb-1 mx-0 px-0">Social Links and About Us</h5>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">About Us</label>
                <textarea
                  value={social.about}
                  onChange={(e) => handleOnChange("about", e.target.value)}
                  placeholder="About"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Address</label>
                <input
                  value={social.address}
                  onChange={(e) => handleOnChange("address", e.target.value)}
                  placeholder="Address"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Facebook</label>
                <input
                  value={social.facebook}
                  onChange={(e) => handleOnChange("facebook", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Facebook URL"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">Twitter</label>
                <input
                  value={social.twitter}
                  onChange={(e) => handleOnChange("twitter", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Twitter URL"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">LinkedIn</label>
                <input
                  value={social.linkedin}
                  onChange={(e) => handleOnChange("linkedin", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12">
                <label className="form-label">YouTube</label>
                <input
                  value={social.youtube}
                  onChange={(e) => handleOnChange("youtube", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="YouTube URL"
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-12 col-sm-12 p-1 col-12 text-center">
              <SubmitButton
                className="btn btn-danger w-100 mt-3"
                submit={submit}
                onClick={formData}
                text="Update"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
