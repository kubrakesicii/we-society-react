import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllArticles, GetArticleDetail } from "../services/Requests/Article";
import UserProfileInfo from "../components/UserProfileInfo";
import RelatedArticleList from "../components/RelatedArticleList";
import moment from "moment";
import NewComment from "../components/NewComment";
import CommentList from "../components/CommentList";
import { GetCommentsByArticle } from "../services/Requests/ArticleComment";
import { GetAllClappingUsers, InsertArticleClap } from "../services/Requests/ArticleClap";
import { useSelector } from "react-redux";
import ClapListModal from "../components/ClapListModal";
import Loader from "../components/Loader";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClapUserModal, setShowClapUserModal] = useState(false)

  const navigate = useNavigate()
  const activeUser = useSelector(state => state.auth.activeUser)

  console.log("HERE DETAIL : ", id);

  const loadComments = async () => {
    console.log("comments loaded");
    var comments = await GetCommentsByArticle(id)
    setComments(comments)
  }

  const loadData = async () => {
    setIsLoading(true);
    const article = await GetArticleDetail(id);
    const relatedArticles = await GetAllArticles(1, 3, article.category.id);
    loadComments()
    setArticle(article);
    setRelatedArticles(relatedArticles.items);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);


  const clapHandler = async () => {
    if(activeUser.userProfileId === 0) navigate("/login")
    else {
      await InsertArticleClap({userProfileId:activeUser.userProfileId,articleId:id})
      var c = document.getElementById('clap-cnt');
      c.textContent = parseInt(c.textContent)+1;
      //clap ve comment counts ayrı cekilsin de refreslensin mi?
      // yoksa anlık ++ mı yapılsın?
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
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
                <a onClick={() => {
                    navigate(`/user-profile/${article.userProfile.id}/tabs`)
                    }}> {article.userProfile.fullName} </a> in{" "}
                <a onClick={() => {
                    navigate(`/home?categoryId=${article.category.id}&categoryName=${article.category.name}`)
                }}> {article.category.name} </a>
                <br />
                <span>{moment().format('ll',article.createdTime)} </span>
                <span className="middotDivider"></span>
    
                <span className="svgIcon svgIcon--star">
                  <svg className="svgIcon-use" width="15" height="15">
                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                  </svg>
                </span>


                {/* Clap and comment count */}
                <div className="divider-small mt-4"></div>
                <div className="">                 
                  <a onClick={clapHandler} data-toggle="tooltip" data-placement="top" title="Clap">
                    <span className="mr-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-label="clap">
                      <path fillRule="evenodd" clipRule="evenodd" 
                      d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z">
                        </path>
                      </svg>
                    </span>
                  </a>
                  <a data-toggle="modal" data-target="#clap-list-modal" onClick={() => setShowClapUserModal(true)}>
                    <span data-toggle="tooltip" data-placement="top" title="View claps" className="mr-4" id="clap-cnt"> {article.clapCount} </span>
                    </a>

                  <ClapListModal title={article.title} articleId={article.id} showClapUserModal={showClapUserModal}/>

                  <a href="#comment_section">
                  <span className="">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="hp">
                        <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z">
                      </path>
                      </svg>
                    </span>
                  </a>
                  <a><span className="mr-5"> {article.commentCount} </span></a>
                </div>
                <div className="divider-small mb-3"></div>


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

          <div id="comment_section">
            <NewComment articleId={article.id} loadComments={loadComments} />
            <div className="divider"></div>
            <CommentList commentList={comments} />
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleDetail;