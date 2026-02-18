import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../img/default-logo.png";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, Link } from "react-router-dom";
import userImg from "../img/user-picture.svg";
import Button from "../components/Button";
import { dateFormat } from "../utils/dateFormat";

export default function Profile() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [feedTab, setFeedTab] = useState("feed");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/profiles/${username}`)
      .then((data) => {
        setProfileUser(data.profile);
      })
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (!profileUser) return;

    let articlesFiltered = `/articles?author=${profileUser.username}`;
    if (feedTab === "liked") {
      articlesFiltered = `/articles?favorited=${profileUser.username}`;
    }

    api.get(articlesFiltered).then((data) => {
      setArticles(data.articles);
    });
  }, [profileUser, feedTab]);

  if (loading || !profileUser) return <p>Loading profile...</p>;

  return (
    <div className="profile-page general-container">
      <div className="profile-banner">
        <img
          src={profileUser.image || defaultAvatar}
          className="profile-picture"
          alt="user profile picture"
        />
        <h2 className="profile-title">{profileUser.username}</h2>
        <Button>Follow</Button>
      </div>

      <div className="profile-feed">
        <button
          className={feedTab === "feed" ? "profile-tab-active" : ""}
          onClick={() => setFeedTab("feed")}
        >
          Written Articles
        </button>
        <button
          className={feedTab === "liked" ? "profile-tab-active" : ""}
          onClick={() => setFeedTab("liked")}
        >
          Liked Articles
        </button>
      </div>

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

      <div className="profile-articles">
        {articles.length === 0 && <p>No articles yet</p>}
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
                    {article.author.username}
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
    </div>
  );
}
