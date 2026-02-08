import React from "react";

export default function NewPost() {
  return (
    <div className="newpost-container">
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Short description" />
        <input type="text" placeholder="Input your text" />

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
