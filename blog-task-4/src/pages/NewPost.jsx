import React from "react";

export default function NewPost() {
  return (
    <div className="newpost-container">
      <form>
        <textarea
          type="text"
          className="newpost-user-input"
          placeholder="Title"
        />
        <textarea
          type="text"
          className="newpost-user-input"
          placeholder="Short description"
        />
        <textarea
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
        <div className="publish-wrapper">
          <button className="general-button">Publish Article</button>
        </div>
      </form>
    </div>
  );
}
