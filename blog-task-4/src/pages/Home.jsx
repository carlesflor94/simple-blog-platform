import { useEffect, useState } from "react";
import api from "../services/api";

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
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
