import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../loginContext";
const Posts = () => {
  const history = useHistory();
  const [loginState] = useContext(LoginContext);
  const title = useRef();
  const content = useRef();

  const [posts, setPosts] = useState([]);
  const reverseList = [...posts].reverse();

  useEffect(() => {
    fetch("https://5f9e4da86ee5fa00168aba33.mockapi.io/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data));
  }, []);

  const addHandler = () => {
    let post = {
      title: title.current.value,
      content: content.current.value,
      likes: 0,
    };

    fetch("https://5f9e4da86ee5fa00168aba33.mockapi.io/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((data) => data.json())
      .then((data) => setPosts((previousPost) => [...previousPost, data]));
  };

  const likeHandler = (id, action) => {
    let newLikes = 0;
    posts.every((post) => {
      if (post.id === id) {
        newLikes = post.likes;
        return false;
      }
      return true;
    });

    if (action === "like") {
      newLikes += 1;
    } else {
      newLikes -= 1;
    }
    const data = {
      likes: newLikes,
    };
    fetch(`https://5f9e4da86ee5fa00168aba33.mockapi.io/posts/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        let tempPosts = [...posts];
        let updatedPosts = tempPosts.map((post) => {
          if (post.id === data.id) {
            post.likes = data.likes;
          }
          return post;
        });
        setPosts(updatedPosts);
      });
  };

  const deleteHandler = (id) => {
    fetch(`https://5f9e4da86ee5fa00168aba33.mockapi.io/posts/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => {
        setPosts((oldPosts) => oldPosts.filter((post) => post.id !== data.id));
      });
  };



  useEffect(() => {
    if (!loginState.authenticated) {
      history.push("/login");
    }
  }, [history, loginState]);

  return (
    <div className="App">
      <h1>POSTS!!!</h1>
      <div>
        <input type="text" placeholder="title" ref={title} />
        <input type="text" placeholder="content" ref={content} />
        <button onClick={addHandler}>ADD</button>
      </div>
      <div>
        {reverseList.map((post) => {
          return (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <h6>{post.likes} likes</h6>
              <button
                onClick={() => {
                  likeHandler(post.id, "like");
                }}
              >
                LIKE
              </button>
              <button
                onClick={() => {
                  likeHandler(post.id, "dislike");
                }}
              >
                DISLIKE
              </button>
              <button
                onClick={() => {
                  deleteHandler(post.id);
                }}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
