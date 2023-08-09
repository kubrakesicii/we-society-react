import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAllArticles, GetArticleDetail } from "../services/Requests/Article";
import UserProfileInfo from "./UserProfileInfo";
import RelatedArticleList from "./RelatedArticleList";
import moment from "moment";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setcomments] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  console.log("HERE DETAIL : ", id);

  const loadData = async () => {
    setIsLoading(true);
    const article = await GetArticleDetail(id);
    const relatedArticles = await GetAllArticles(1, 3, article.category.id);
    setArticle(article);
    setRelatedArticles(relatedArticles.items);

    console.log("ARTICLE DETAIL : ", article);
    console.log("related : ", relatedArticles);

    setIsLoading(false);
  };

  useEffect(() => {
    console.log("HERE DETAIL2 : ", id);
    loadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Is Loading</div>
      ) : (
        <div className="container">
          {/* User and article info  */}
          <div className="entry-header">
            <div className="mb-5">
              <h1 className="entry-title m_b_2rem">{article.title}</h1>
              <div className="entry-meta align-items-center">
                <a className="author-avatar" href="#">
                  <img
                    src={`${
                      article.userProfile.image !== null
                        ? `data:image/jpeg;base64,${article.userProfile.image}`
                        : "/assets/images/default.jpg"
                    }`}
                    alt=""
                  />
                </a>
                <a href="author.html"> {article.userProfile.fullName} </a> in{" "}
                <a href="archive.html"> {article.category.name} </a>
                <br />
                <span>{moment().format('ll',article.createdTime)} </span>
                <span className="middotDivider"></span>
                <span className="readingTime" title="3 min read">
                  3 min read
                </span>
                <span className="svgIcon svgIcon--star">
                  <svg className="svgIcon-use" width="15" height="15">
                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Main image */}
          <figure className="image zoom mb-5 d-flex bd-highlight">
             <img className="p-2 flex-grow-1 bd-highlight"
             src={`${article.mainImage !== null ? `data:image/jpg;base64,${article.mainImage}` : '/assets/images/default.jpg'}`} />    
          </figure>

          <article className="entry-wraper mb-5">
            {/* Article Actions -- Like, Clap, Save */}
            <div className="entry-left-col">
              <div className="social-sticky">
                <a href="#">
                  <i className="icon-facebook"></i>
                </a>
                <a href="#">
                  <i className="icon-twitter"></i>
                </a>
                <a href="#">
                  <i className="icon-heart"></i>
                </a>
                <a href="#">
                  <i className="icon-paper-plane"></i>
                </a>
              </div>
            </div>

            {/* ARTICLE CONTENT */}
            <div className="entry-main-content dropcap">
              <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
            </div>

            {/* ARTICLE TAGS */}
            <div className="entry-bottom">
              <div className="tags-wrap heading">
                <span className="tags">
                  <a href="#" rel="tag">
                    fashion
                  </a>
                  <a href="#" rel="tag">
                    lifestyle
                  </a>
                  <a href="#" rel="tag">
                    news
                  </a>
                  <a href="#" rel="tag">
                    style
                  </a>
                </span>
              </div>
            </div>

            {/* AUTHOR BOX */}
            {/* {
            article.userProfile !== undefined && (
                <UserProfileInfo userProfileId={article.userProfile.id}/>
            )
        } */}
            {/* <div className="box box-author m_b_2rem">
            <div className="post-author row-flex">
                <div className="author-img">
                    <img alt="author avatar" src="assets/images/author-avata-1.jpg" className="avatar"/>
                </div>
                <div className="author-content">
                <div className="top-author">
                    <h5 className="heading-font"><a href="author.html" title="Ryan" rel="author">Ryan Mark</a></h5></div>
                    <p className="d-none d-md-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet ut ligula et semper. Aenean consectetur, est id gravida venenatis.</p>
                    <div className="content-social-author">
                        <a target="_blank" className="author-social" href="#">Facebook </a>
                        <a target="_blank" className="author-social" href="#">Twitter </a>
                        <a target="_blank" className="author-social" href="#"> Google + </a>
                    </div>
                </div>
            </div>
        </div> */}
          </article>

          {/* <!--Begin post related--> */}
          <RelatedArticleList relatedArticles={relatedArticles} />
          <NewComment articleId={article.id} />
          <div class="divider"></div>
          <CommentList articleId={article.id} />
        </div>
      )}
    </>
  );
};

export default ArticleDetail;
