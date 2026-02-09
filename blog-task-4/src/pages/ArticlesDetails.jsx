import userImg from "../img/user-picture.svg";

export default function ArticlesDetails() {
  return (
    <div className="article-page">
      <div className="article-banner">
        <div className="article-banner-content">
          <h1 className="article-title">
            If we quantify the alarm, we can get to the FTP pixel through the
            online SSL interface!
          </h1>
          <div className="article-author">
            <div className="article-author-img">
              <img src={userImg} alt="user profile picture" />
              <div className="article-author-details">
                <p className="article-author-name">John Lobster</p>
                <p className="article-date">01 January 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="article-content">
        <div className="article-text"></div>
        <div className="article-tags">
          <button>one</button>
          <button>something</button>
          <button>chinese</button>
          <button>english</button>
          <button>spanish</button>
        </div>
        <div className="article-author">
          <div className="article-author-img">
            <img src={userImg} alt="user profile picture" />
            <div className="article-author-details">
              <p className="article-author-name">John Lobster</p>
              <p className="article-date">01 January 2023</p>
            </div>
            <button className="article-button-favorite">
              Favorite article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
