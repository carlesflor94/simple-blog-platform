import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function NewPost() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [formCreateArticle, setFormCreateArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const { user } = useAuth();

  const { slug } = useParams();
  const isEditing = !!slug;

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
      let data;
      if (isEditing) {
        data = await api.put(`/articles/${slug}`, {
          article: formCreateArticle,
        });
      } else {
        data = await api.post("/articles", {
          article: formCreateArticle,
        });
      }
      navigate(`/articles/${data.article.slug}`);
    } catch (err) {
      setErrors(
        err.response?.data?.errors || {
          general: ["Something went wrong."],
        },
      );
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

  /*editing view*/

  useEffect(() => {
    if (isEditing) {
      api.get(`/articles/${slug}`).then((data) => {
        setFormCreateArticle({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tagList: data.article.tagList,
        });
      });
    }
  }, [slug, isEditing, user, navigate]);

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
          <Button type="submit">Publish Article</Button>
        </div>
      </form>
    </div>
  );
}
