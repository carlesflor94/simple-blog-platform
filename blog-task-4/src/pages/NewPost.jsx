import React from "react";

export default function NewPost() {
  return (
    <div className="newpost-container general-container">
      <form className="newpost-form general-form">
        <input type="text" className="general-user-input" placeholder="Title" />
        <input
          type="text"
          className="general-user-input"
          placeholder="Short description"
        />
        <input
          type="text"
          className="newpost-user-input-text"
          placeholder="Input your text"
        />

        <div className="general-tags">
          <button>one</button>
          <button>something</button>
          <button>chinese</button>
          <button>english</button>
          <button>spanish</button>
        </div>
        <div className="newpost-publish-container">
          <button className="general-button">Publish Article</button>
        </div>
      </form>
    </div>
  );
}
