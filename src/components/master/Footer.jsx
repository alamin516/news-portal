import React from "react";
import Subscribe from "../news/Subscribe";
import Link from "next/link";

const Footer = ({data}) => {
  return (
    <div className="section-footer">
      <div className="py-5 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 p-3">
              <h5 className="text-white fw-bold my-3"> ABOUT </h5>
              <p className="text-white f-14"> {data['socials'][0]['about']} </p>
              <div className="d-flex justify-content-center justify-content-sm-start">
                <div className="d-flex align-items-center">
                  {data['socials'][0]['facebook'] &&<a target="_blank" href={data['socials'][0]['facebook']}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className=" h3 text-white bi bi-facebook"></i>
                    </div>
                  </a>}
                  
                  {data['socials'][0]['youtube'] && <a target="_blank" href={data['socials'][0]['youtube']}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="h3 text-white mx-2 bi bi-youtube"></i>
                    </div>
                  </a>}

                  {data['socials'][0]['twitter'] && <a target="_blank" href={data['socials'][0]['twitter']}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className=" h3 text-white mx-2 bi bi-twitter"></i>
                    </div>
                  </a>}

                  {data['socials'][0]['linkedin'] && <a target="_blank" href={data['socials'][0]['linkedin']}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className=" h3 text-white mx-2 bi bi-linkedin"></i>
                    </div>
                  </a>}

                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-3">
              <h5 className="text-white fw-bold my-3">RECOMMENDED</h5>
              {data["categories"].map((item, i) => {
                if(i< 4)
                return (
                  <Link
                    key={i}
                    className="nav-link text-white my-1"
                    href={`/category?id=${item.id}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className=" col-md-3 col-sm-6 p-3">
              <h5 className="text-white fw-bold my-3"> LEGAL </h5>
              <ul className="list-unstyled text-white">
                <li className="my-1">
                  <Link href="/privacy" className="nav-link">
                    Privacy Policy
                  </Link>
                </li>
                <li className="my-1">
                  <Link href="/terms" className="nav-link">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 p-3">
              <Subscribe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
