import { useEffect, useState } from "react";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";
import Banner from "../components/Banner";
import Pagination from "../components/Pagination";
import Feed from "../components/Feed";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

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

        <Feed articles={articles} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          setPage={(newPage) => setSearchParams({ page: newPage })}
        />
      </div>
    </div>
  );
}
