import React from "react";
import postsData from "./posts.json"; // Adjust path based on your folder setup

function PostList() {
  return (
    <div className="container mt-4">
      <h2>Post List</h2>
      {postsData.map((post) => (
        <div key={post.id} className="mb-4">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
