import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../img/default-logo.png";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Banner from "../components/Banner";
import Feed from "../components/Feed";

export default function Profile() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [feedTab, setFeedTab] = useState("feed");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin", { replace: true });
  }, [user, navigate]);

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
    <div className="profile-page">
      <Banner>
        <img
          src={profileUser.image || defaultAvatar}
          className="profile-picture"
          alt="user profile picture"
        />
        <h2 className="profile-title">{profileUser.username}</h2>
        <Button>Follow</Button>
      </Banner>

      <div className="profile-feed general-container">
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

      <Feed articles={articles} />
    </div>
  );
}
