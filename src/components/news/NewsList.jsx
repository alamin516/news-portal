import Link from "next/link";
import React from "react";
import DateDisplay from "./Date";

const NewsList = (props) => {
  return (
    <div className="row">
      {
      props.latest?.map((item, i) => {
        return (
          <div key={i} className="p-2 col-md-4">
            <div className="card bg-white shadow-sm">
              <img className="card-img-top" src={item.img3} alt={item.title} />
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p>{item["short_des"]}</p>
                <p className="my-2 fw-bold p-0">
                  <i className="bi bi-clock"></i>{" "}
                  <DateDisplay createdAt={item["createdAt"]} />
                </p>
                <Link
                  href={`/details?id=${item["id"]}`}
                  className="btn mt-2 btn-sm btn-outline-danger"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        );
      })
      }
    </div>
  );
};

export default NewsList;
