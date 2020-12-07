import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";

export default function PostPage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  console.log("what is posts", posts);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [dispatch]);

  return (
    <div>
      <h1>Post page</h1>
      <li>
        {!posts
          ? "...Loading"
          : posts.map((post) => {
              return (
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p>written by {post.author.name}</p>
                  <h6>Comments:</h6>
                </div>
              );
            })}
      </li>
    </div>
  );
}
