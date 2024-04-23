"use client";
import ModalComponent from "@/components/dashboard/terms/ModalComponent";
import TableComponent from "@/components/dashboard/terms/TableComponent";
import { ErrorToast, SuccessToast } from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const ClientPage = () => {
  const [data, setData] = useState({ terms: [], policy: [] });
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const router = useRouter();
  const [id, setId] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const termsResponse = await fetch(`/api/policy?type=terms`);
      const policyResponse = await fetch(`/api/policy?type=policy`);

      if (!termsResponse.ok || !policyResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const termsData = await termsResponse.json();
      const policyData = await policyResponse.json();

      setData({ terms: termsData.data, policy: policyData.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const data = { long_des: editorValue };
      const options = { method: "PUT", body: JSON.stringify(data) };
      let res = await (await fetch(`/api/policy?id=${id}`, options)).json();

      if (res.status === "success") {
        SuccessToast("Updated successfully");
        fetchData();
        setModalShow(false);
      } else {
        ErrorToast("Failed to update");
      }
    } catch (error) {
      console.error("Error updating policy data:", error);
    }
  };

  const handleEditClick = (longDes, id) => {
    setEditorValue(longDes);
    setId(id);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  if(loading){
    return <div className="d-flex justify-content-center center-screen">
      <h2 className="text-center">Loading.....</h2>
    </div>
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
            <TableComponent
              policy={data["policy"]}
              terms={data["terms"]}
              handleEditClick={handleEditClick}
            />
        </div>
      </div>
      <ModalComponent
        show={modalShow}
        handleClose={handleModalClose}
        editorValue={editorValue}
        handleEditorChange={handleEditorChange}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default ClientPage;
