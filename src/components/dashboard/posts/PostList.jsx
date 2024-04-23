import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostList = ({ posts, handleEditClick }) => {
  return (
    <div>
      {posts?.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Button variant="primary" onClick={() => handleEditClick(post.id)}>
              Edit
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
