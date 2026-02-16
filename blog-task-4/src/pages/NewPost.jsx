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
      navigate(`/article/${data.article.slug}`);
    } catch (err) {
      setErrors(err.errors);
    }
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
        <input
          type="text"
          className="newpost-user-input-text"
          placeholder="Input your text"
          required
          name="body"
          value={formCreateArticle.body}
          onChange={handleChange}
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
