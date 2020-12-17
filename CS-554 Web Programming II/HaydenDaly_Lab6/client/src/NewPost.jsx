import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import queries from "./queries";

const NewPost = () => {
  const [description, setDescription] = useState("");
  const [posterName, setPosterName] = useState("");
  const [url, setUrl] = useState("");
  const [created, setCreated] = useState(false);

  const [createPost] = useMutation(queries.CREATE_POST);

  const submit = () => {
    createPost({
      variables: {
        posterName,
        description,
        url,
      },
    });
    console.log(posterName, description, url)
    setCreated(true);
  };

  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          padding: 40,
        }}
      >
        <div
          style={{
            width: 300,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <label>Name</label>
          <input
            value={posterName}
            onChange={(e) => setPosterName(e.target.value)}
          />
        </div>
        <div
          style={{
            width: 300,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div
          style={{
            width: 300,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <label>Image URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button
          style={{
            backgroundColor: "#e35b5b",
            height: 30,
            width: 140,
            marginLeft: 80,
            marginTop: 10,
            fontSize: 16,
            color: "white",
            alignSelf: "center",
          }}
          onClick={submit}
        >
          Create
        </button>
        {created && (
          <p>
            Post Created--<a href="/my-posts">See Posts!</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default NewPost;
