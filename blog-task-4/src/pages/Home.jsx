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
    <section>
      <header>
        <h1>Realworld Blog</h1>
        <h2>A place to share your knowledge</h2>
      </header>

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
    </section>
  );
}
