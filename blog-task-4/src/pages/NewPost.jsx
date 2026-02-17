import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NewPost() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [formCreateArticle, setFormCreateArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormCreateArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.post("/articles", {
        article: {
          title: formCreateArticle.title,
          description: formCreateArticle.description,
          body: formCreateArticle.body,
          tagList: formCreateArticle.tagList,
        },
      });
      navigate(`/articles/${data.article.slug}`);
    } catch (err) {
      setErrors(err.errors);
    }
  };

  const handleTagClick = (tag) => {
    setFormCreateArticle((prev) => {
      if (prev.tagList.includes(tag)) {
        return {
          ...prev,
          tagList: prev.tagList.filter((t) => t !== tag),
        };
      } else {
        return {
          ...prev,
          tagList: [...prev.tagList, tag],
        };
      }
    });
  };

  return (
    <div className="newpost-container general-container">
      <form onSubmit={handleSubmit} className="newpost-form general-form">
        <input
          type="text"
          className="general-user-input"
          placeholder="Title"
          required
          name="title"
          value={formCreateArticle.title}
          onChange={handleChange}
        />
        <input
          type="text"
          className="general-user-input"
          placeholder="Short description"
          required
          name="description"
          value={formCreateArticle.description}
          onChange={handleChange}
        />
        <textarea
          type="text"
          className="newpost-user-input-text"
          placeholder="Input your text"
          required
          name="body"
          value={formCreateArticle.body}
          onChange={handleChange}
        />

        <div className="general-tags">
          {["one", "something", "chinese", "english", "spanish"].map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={
                formCreateArticle.tagList.includes(tag)
                  ? "newpost-tag-selected"
                  : "newpost-tag-unselected"
              }
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="newpost-publish-container">
          <button className="general-button">Publish Article</button>
        </div>
      </form>
    </div>
  );
}
