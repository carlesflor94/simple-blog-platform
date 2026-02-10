import userImg from "../img/user-picture.svg";

export default function ArticlesDetails() {
  return (
    <div className="article-page">
      <div className="article-banner">
        <div className="article-banner-content general-container">
          <h1 className="article-title">
            If we quantify the alarm, we can get to the FTP pixel through the
            online SSL interface!
          </h1>
          <div className="article-author">
            <div className="article-author-img">
              <img src={userImg} alt="user profile picture" />
            </div>
            <div className="article-author-details">
              <p className="article-author-name">John Lobster</p>
              <p className="article-date">01 January 2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="article-content general-container">
        <div className="article-text">
          <p>
            Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut
            cupiditate est facere omnis possimus. Tenetur similique nemo illo
            soluta molestias facere quo. Ipsam totam facilis delectus nihil
            quidem soluta vel est omnis.
          </p>
        </div>
        <div className="general-tags">
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
          <button>tag</button>
        </div>
        <div className="article-author">
          <div className="article-author-img">
            <img src={userImg} alt="user profile picture" />
          </div>
          <div className="article-author-details">
            <p className="article-author-name">John Lobster</p>
            <p className="article-date">01 January 2023</p>
          </div>
          <button className="general-button">Favorite article</button>
        </div>
      </div>
    </div>
  );
}
