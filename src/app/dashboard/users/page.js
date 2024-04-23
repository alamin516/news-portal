"use client"
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const termsResponse = await fetch(`/api/user`);

        const socialData = await termsResponse.json();

        setData(socialData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  }, []);

  if(loading){
      return <div className="d-flex justify-content-center center-screen">
        <h2 className="text-center">Loading.....</h2>
      </div>
  }
  return (
    <div>{data.length}</div>
  )
}

export default Users