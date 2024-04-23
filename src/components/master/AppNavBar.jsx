"use client";
import Link from "next/link";
import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Clock from "./Clock";

const AppNavBar = ({ data, isLogin }) => {
  const [keywords, setKeywords] = useState("");

  return (
    <div>
      <div className="py-2 bg-dark text-white container-fluid">
        <div className="container">
          <div className="row justify-content-between justify-items-center">
            <div className="col-md-4">
              <h6 className="mb-0 lh-3">
                <i className="bi bi-calendar2-check"></i> Today:
                <span>
                  {" "}
                  {new Date().getDate()}/{new Date().getMonth() + 1}/
                  {new Date().getFullYear()}{" "}
                </span>
              </h6>
            </div>
            <div className="col-md-4">
              <Clock />
            </div>
            <div className="col-md-4">
              <span className="float-end">
                {data["socials"][0]["facebook"] && <a
                  target="_blank"
                  className="text-white"
                  href={data["socials"][0]["facebook"]}
                >
                  <i className="mx-2 bi bi-facebook"></i>
                </a>}
                {data["socials"][0]["youtube"] && <a
                  target="_blank"
                  className="text-white"
                  href={data["socials"][0]["youtube"]}
                >
                  <i className="mx-2 bi bi-youtube"></i>
                </a>}
                {data["socials"][0]["twitter"] && <a
                  target="_blank"
                  className="text-white"
                  href={data["socials"][0]["twitter"]}
                >
                  <i className="mx-2 bi bi bi-twitter"></i>
                </a>}
                {data["socials"][0]["linkedin"] && <a
                  target="_blank"
                  className="text-white"
                  href={data["socials"][0]["linkedin"]}
                >
                  <i className="mx-2 bi bi-linkedin"></i>
                </a>}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Navbar expand="lg" className="bg-white sticky-top shadow-sm">
        <div className="container">
          <div className="navbar-brand">
            <Link href={"/"}>
              {" "}
              <img className="nav-logo" src={"/images/logo.svg"} alt="img" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto ms-3 my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="nav-link f-18" href="/">
                Home
              </Link>
              {data["categories"].map((item, i) => {
                return (
                  <Link
                    key={i}
                    className="nav-link f-18"
                    href={`/category?id=${item.id}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </Nav>
            <div className="d-flex ms-3">
              <div className="input-group">
                <input
                  type="text"
                  onChange={(e) => {
                    setKeywords(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Search..."
                />
                <Link
                  href={`/search?keyword=${keywords}`}
                  className="btn btn-danger"
                  type="button"
                >
                  <i className="bi bi-search"></i>
                </Link>
              </div>
            </div>
            {isLogin ? (
              <div className="float-right mx-3 h-auto d-flex">
                <div className="user-dropdown">
                  <img
                    className="icon-nav-img icon-nav"
                    src="/images/profile.png"
                    alt=""
                  />
                  <div className="user-dropdown-content ">
                    <div className="mt-4 text-center">
                      <img
                        className="icon-nav-img"
                        src="/images/profile.png"
                        alt=""
                      />
                      <hr className="user-dropdown-divider p-0" />
                    </div>
                    <Link href="/dashboard" className="side-bar-item">
                      <span className="side-bar-item-caption">Dashboard</span>
                    </Link>
                    <Link href="/profile" className="side-bar-item">
                      <span className="side-bar-item-caption">Profile</span>
                    </Link>
                    <a href="/api/user/login" className="side-bar-item">
                      <span className="side-bar-item-caption">Logout</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/user/login"
                  className="btn ms-3 btn-outline-danger"
                >
                  Login
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
