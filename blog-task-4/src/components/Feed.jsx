import userImg from "../img/user-picture.svg";
import { dateFormat } from "../utils/dateFormat";
import { Link } from "react-router-dom";

export default function Feed({ articles }) {
  return (
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
              <Link to={`/articles/${article.slug}`} className="article-link">
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
  );
}
