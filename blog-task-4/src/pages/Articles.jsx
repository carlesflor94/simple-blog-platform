import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const articlesLimit = 3;

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    api
      .get(`/articles?limit=${articlesLimit}&offset=${page * articlesLimit}`)
      .then((data) => {
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      });
  }, [page]);

  const totalPage = Math.ceil(articlesCount / articlesLimit);

  return (
    <div className="articles-page general-container">
      {articles.map((article) => (
        <article key={article.slug}>
          <div className="articles-content">
            <h3 className="articles-title">
              <Link to={`/articles/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="articles-preview">{article.description}</p>
          </div>
        </article>
      ))}

      <div className="articles-pagination">
        {Array.from({ length: totalPage }).map((_, index) => (
          <button key={index} onClick={() => setPage(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
