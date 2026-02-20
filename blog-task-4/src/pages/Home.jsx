import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import userImg from "../img/user-picture.svg";
import { dateFormat } from "../utils/dateFormat";
import Banner from "../components/Banner";
import Pagination from "../components/Pagination";

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

  return (
    <div className="home-page">
      <Banner background="#61bb61">
        <h1 className="home-title">Realworld Blog</h1>
        <h2 className="home-subtitle">A place to share your knowledge</h2>
      </Banner>

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
          {articles.map((article) => {
            const validTags = (article.tagList || [])
              .filter((tag) => typeof tag === "string")
              .map((tag) => tag.trim())
              .filter(Boolean);

            return (
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
                  <Link
                    to={`/articles/${article.slug}`}
                    className="article-link"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="home-article-text">{article.description}</p>
                {validTags?.length > 0 && (
                  <div className="general-tags">
                    {validTags.map((tag) => (
                      <button key={tag}>{tag}</button>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
