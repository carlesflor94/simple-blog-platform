import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import userImg from "../img/user-picture.svg";

const dateFormat = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const articlesLimit = 3;

  useEffect(() => {
    const offset = (page - 1) * articlesLimit;

    api
      .get(`/articles?limit=${articlesLimit}&offset=${offset}`)
      .then((data) => {
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      });
  }, [page]);

  const totalPages = Math.ceil(articlesCount / articlesLimit);

  const visiblePages = 7;
  let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <div className="home-page">
      <div className="home-banner general-container">
        <h1 className="home-title">Realworld Blog</h1>
        <h2 className="home-subtitle">A place to share your knowledge</h2>
      </div>

      <div className="home-content">
        <div className="home-tags general-container">
          <p>Popular tags</p>
          <div className="general-tags">
            <button>one</button>
            <button>something</button>
            <button>chinese</button>
            <button>english</button>
            <button>spanish</button>
          </div>
        </div>

        <div className="home-articles">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="home-article-container general-container"
            >
              <div className="home-preview-header">
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
                    <p className="article-date">
                      {dateFormat(article.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="preview-likes-container">
                  <div className="preview-likes-heart">♥</div>
                  <div className="preview-likes-counter">
                    {article.favoritesCount}
                  </div>
                </div>
              </div>
              <h2 className="home-article-title">
                <Link to={`/articles/${article.slug}`} className="article-link">
                  {article.title}
                </Link>
              </h2>
              <p className="home-article-text">{article.description}</p>
              <div className="general-tags">
                {article.tagList.map((tag) => (
                  <button key={tag}>{tag}</button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="home-pagination-container general-container">
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
              <button
                key={pageNumber}
                className={
                  page === pageNumber ? "page-button active" : "page-button"
                }
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
