import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalComponent = ({
  show,
  handleClose,
  editorValue,
  handleEditorChange,
  handleSaveChanges,
}) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];


  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Edit Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
