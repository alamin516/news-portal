"use client";
// Frontend code to fetch data and handle pagination

import React, { useState, useEffect } from "react";
import { Pagination, Dropdown } from "react-bootstrap";
import PostList from "@/components/dashboard/posts/PostList";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("desc");
  const [filterBy, setFilterBy] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(0)

  console.log(totalPages)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/news?page=${currentPage}&sortOrder=${sortBy}`
        );
        const data = await response.json();
        setPosts(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, sortBy, filterBy, postsPerPage]);

  const handleSortChange = (eventKey) => {
    setSortBy(eventKey);
  };

  const handleLimit = (eventKey) => {
    setLimit(eventKey);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (postId) => {
    console.log("Edit post:", postId);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">

        <Dropdown onSelect={handleSortChange}>
          <Dropdown.Toggle variant="secondary">
            Sort by: {sortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="title">Title</Dropdown.Item>
            <Dropdown.Item eventKey="createdAt">Date</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={handleLimit}>
          <Dropdown.Toggle variant="secondary">
            limit: {limit}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
            <Dropdown.Item eventKey="30">30</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div>
          <input
            type="text"
            value={filterBy}
            onChange={handleFilterChange}
            placeholder="Filter by keyword"
            className="form-control"
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <PostList posts={posts} handleEditClick={handleEditClick} />
          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default Posts;
