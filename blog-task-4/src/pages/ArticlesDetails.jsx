import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../services/api";
import userImg from "../img/user-picture.svg";
import { useAuth } from "../context/AuthContext";

const dateFormat = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function ArticlesDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isArticleAuthor =
    user && article && user.username === article.author.username;

  useEffect(() => {
    api
      .get(`/articles/${slug}`)
      .then((data) => {
        setArticle(data.article);
      })
      .catch(() => {
        setError("Failed to load article");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  /*delete func */
  const handleDelete = async () => {
    const popUpWindowDelete = window.confirm(
      "The article will be permanently deleted. Are you sure?",
    );

    if (!popUpWindowDelete) return;

    try {
      await api.delete(`/articles/${slug}`);
      navigate("/");
    } catch (err) {
      setError("The article could not be deleted");
    }
  };

  if (loading) {
    return (
      <div className="general-container">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="general-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="article-page">
      <div className="article-banner">
        <div className="article-banner-content general-container">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-author">
            <div className="article-author-img">
              <img
                src={article.author.image || userImg}
                alt="user profile picture"
              />
            </div>
            <div className="article-author-details">
              <p className="article-author-name">
                <Link
                  to={`/profile/${article.author.username}`}
                  className="article-author-link"
                >
                  {article.author.username}
                </Link>
              </p>
              <p className="article-date">{dateFormat(article.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="article-content general-container">
        <div className="article-text">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
        <div className="general-tags">
          {article.tagList.map((tag) => (
            <button key={tag}>{tag}</button>
          ))}
        </div>
        <div className="article-user-actions">
          {isArticleAuthor && (
            <div className="article-user-buttons">
              <Link to={`/editor/${article.slug}`} className="general-button">
                Edit Article
              </Link>
              <button
                onClick={handleDelete}
                className="general-button article-delete-button"
              >
                Delete Article
              </button>
            </div>
          )}
        </div>
        <div className="article-author">
          <div className="article-author-img">
            <img
              src={article.author.image || userImg}
              alt="user profile picture"
            />
          </div>
          <div className="article-author-details">
            <p className="article-author-name">
              <Link
                to={`/profile/${article.author.username}`}
                className="article-author-link"
              >
                {article.author.username}
              </Link>
            </p>
            <p className="article-date">{dateFormat(article.createdAt)}</p>
          </div>
          <button className="general-button">Favorite article</button>
        </div>
      </div>
    </div>
  );
}
