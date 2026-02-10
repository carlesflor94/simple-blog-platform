import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles").then((data) => {
      setArticles(data.articles);
    });
  }, []);

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

        <div>
          {articles.map((article) => (
            <article key={article.slug}>
              <h3>
                <Link to={`/article/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
