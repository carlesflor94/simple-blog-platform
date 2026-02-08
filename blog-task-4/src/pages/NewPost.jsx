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

        <div className="newpost-tags">
          <button className="tags-button">one</button>
          <button className="tags-button">something</button>
          <button className="tags-button">chinese</button>
          <button className="tags-button">english</button>
          <button className="tags-button">spanish</button>
        </div>
        <button>Publish Article</button>
      </form>
    </div>
  );
}
