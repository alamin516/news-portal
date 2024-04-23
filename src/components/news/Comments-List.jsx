"use client";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CommentForm from "./Comment-Form";

const CommentsList = ({ data, postID, isLogin }) => {
  const [key, setKey] = useState("Comments");

  return (
    <div className="container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Comments" title="Comments">
          {!data ? <div className="text-center p-5">
              <div>
                No comment.
              </div>
            </div>:<ul className="list-group bg-transparent list-group-flush">
            {data?.map((item, i) => {
              return (
                <li key={i} className="list-group-item bg-transparent">
                  <h6 className="text-dark">
                    <i className="bi bi-person-circle"></i>{" "}
                    {item["users"]["firstName"]} {item["users"]["lastName"]}
                  </h6>
                  <p className="text-secondary">{item["descriptions"]}</p>
                </li>
              );
            })}
          </ul>}
        </Tab>
        <Tab eventKey="Create" title="Create">
          {isLogin ? (
            <CommentForm postID={postID} />
          ) : (
            <div className="text-center p-5">
              <div className="login-message">
                Please login to leave a comment.
              </div>
                <a href="/user/login">Login</a>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default CommentsList;
