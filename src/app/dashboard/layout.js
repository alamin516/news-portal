"use client";
import UserDropDown from "@/components/master/UserDropDown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useRef } from "react";
import { Navbar } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  let contentRef,
    sideNavRef = useRef();
  let current = usePathname();
  let currentPath = usePathname();
  let title = "DASHBOARD";
  if (currentPath === "/") {
    title = "HOME";
  }
  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
    }
  };
  return (
    <Fragment>
      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open"
      >
        <img className="side-nav-logo" src="/images/logo_white1.svg" />
        <Link
          className={
            current === "/"
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          href="/"
        >
          <img className="w-8" src="/images/house.svg" alt="" />
          <span className="mx-2 side-bar-item-caption">Home</span>
        </Link>
        <Link
          className={
            current === "/dashboard/posts"
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          href="/dashboard/posts"
        >
          <img className="w-8" src="/public/images/body.svg" alt="" />
          <span className="mx-2 side-bar-item-caption">Posts</span>
        </Link>
        <Link
          className={
            current === "/dashboard/users"
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          href="/dashboard/users"
        >
          <img className="w-8" src="/public/images/body.svg" alt="" />
          <span className="mx-2 side-bar-item-caption">Users</span>
        </Link>
        <Link
          className={
            current === "/dashboard/socials"
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          href="/dashboard/socials"
        >
          <img className="w-8" src="/public/images/body.svg" alt="" />
          <span className="mx-2 side-bar-item-caption">Socials</span>
        </Link>
        <Link
          className={
            current === "/dashboard/terms"
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          href="/dashboard/terms"
        >
          <img className="w-8" src="/public/images/body.svg" alt="" />
          <span className="mx-2 side-bar-item-caption">Terms and Policy</span>
        </Link>
      </div>
      <div ref={(div) => (contentRef = div)} className="content">
        <Navbar className="px-0 bg-white shadow-sm sticky-top">
          <div className="container-fluid">
            <Navbar.Brand>
              <span className="icon-nav m-0 h5" onClick={MenuBarClickHandler}>
                <i className="bi bi-list"></i>
              </span>
              <span className="mx-2 f-16">{title}</span>
            </Navbar.Brand>
            <UserDropDown/>
          </div>
        </Navbar>
        <div className="p-3">{children}</div>
      </div>
      <Toaster/>
    </Fragment>
  );
}
