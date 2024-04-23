import Link from "next/link";
import React from "react";
import Subscribe from "./Subscribe";

const PopularList = (props) => {
  return (
    <div className="row">
      <div className="bg-dark mt-2 rounded-1 text-white p-2">
        <span className="p-1">POPULAR</span>
      </div>
      <div className="col-12 py-1 px-0">
        {
          props.popular?.map((item, i)=>{
            return <Link key={i} href={`/details?id=${item.id}`} className="mb-1 card bg-white shadow-sm">
            <div className="row">
              <div className="col-md-5">
                <img
                  className=" rounded-start-1 w-100 h-100"
                  src={item['img3']}
                  alt={item['title']}
                />
              </div>
              <div className="col-md-7 p-3">
                <h6>{item['title']}</h6>
              </div>
            </div>
          </Link>
          })
        }
      </div>
      <div className="bg-dark mt-2 rounded-1 text-white p-2">
        <span className="p-1">SUBSCRIBE</span>
      </div>
      <div className="col-12 py-1 px-0">
        <Subscribe />
      </div>
    </div>
  );
};

export default PopularList;
