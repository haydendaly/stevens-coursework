import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import queries from "./queries";
import _ from "lodash";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  const { loading, data } = useQuery(queries.GET_USER_POSTED_IMAGES, {
    fetchPolicy: "cache-and-network",
  });
  const [editPost] = useMutation(queries.EDIT_POST);

  useEffect(() => {
    if (data) {
      let newData = posts.concat(data.userPostedImages);
      newData = _.uniqBy(newData, "id");
      setPosts(newData);
    }
  }, [data]);

  return (
    <div>
      <a
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "blue",
          height: 50,
          width: 50,
          borderRadius: 25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 50,
          color: "white",
          fontWeight: 600,
          textDecoration: "none",
        }}
        href="/new-post"
      >
        +
      </a>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 60,
          justifyContent: "center",
          whiteSpace: "pre-wrap",
        }}
      >
        <a href="/my-bin">my bin</a> | <a href="/">images</a> |{" "}
        <a href="/my-posts" style={{ color: "blue" }}>
          my posts
        </a>
      </span>
      <ul
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div
              style={{
                width: 550,
                marginBottom: 15,
                backgroundColor: "white",
                padding: 15,
                display: "flex",
                flexDirection: "column",
              }}
              key={post.id}
            >
              {post.description !== "" && (
                <h2 style={{ fontSize: 18, marginBottom: 20 }}>
                  {post.description}
                </h2>
              )}
              <p style={{ fontSize: 18 }}>an image by: {post.posterName}</p>
              <div
                style={{
                  alignSelf: "center",
                }}
              >
                <img
                  src={post.url}
                  alt={post.description}
                  style={{ maxWidth: "100%" }}
                />
              </div>
              <button
                style={{
                  backgroundColor: "#e35b5b",
                  height: 30,
                  width: 140,
                  marginTop: 10,
                  fontSize: 16,
                  color: "white",
                  alignSelf: "center",
                }}
                onClick={() => {
                  editPost({
                    variables: {
                      id: post.id,
                      binned: !post.binned,
                    },
                  });
                  let tempPosts = posts;
                  for (var i = 0; i < tempPosts.length; i++) {
                    if (tempPosts[i].id === post.id) {
                      tempPosts[i] = {
                        ...post,
                        binned: !post.binned,
                      };
                    }
                  }
                  setPosts(tempPosts);
                }}
              >
                {post.binned ? "remove from bin" : "add to bin"}
              </button>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default MyPosts;
