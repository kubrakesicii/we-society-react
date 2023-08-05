import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetArticleDetail } from '../services/Requests/Article';
import UserProfileInfo from './UserProfileInfo';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({})

    useEffect(() => {
        const loadData = async() => {     
            const article = await GetArticleDetail(id);
            setArticle(article)

            console.log("ARTICLE DETAIL : ",article);
            console.log("ARTICLE DETAIL user : ",article.userProfile.fullName);
            console.log("ARTICLE DETAIL id : ",article.userProfile.id);
        }
        loadData();
    },[id])

  return (
  <div className="container">

    {/* User and article info */}
    <div className="entry-header">
        <div className="mb-5">
            <h1 className="entry-title m_b_2rem">
            {article.title}
            </h1>
            <div className="entry-meta align-items-center">
                <a className="author-avatar" href="#">
                  {/* <img src={`${article.userProfile.image != "" ? `data:image/jpeg;base64,${article.userProfile.image}` : '/assets/images/default.jpg'}`} alt="" /> */}
                  </a>
                <a href="author.html"> {article.userProfile.fullName} </a> in <a href="archive.html"> {article.category.name} </a><br/>
                <span>{article.createdTime} </span>
                <span className="middotDivider"></span>
                <span className="readingTime" title="3 min read">3 min read</span>
                <span className="svgIcon svgIcon--star">
                    <svg className="svgIcon-use" width="15" height="15">
                        <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                    </svg>
                </span>
            </div>
        </div>
    </div> 

    {/* Main image */}
    <figure className="image zoom mb-5">
        <img src={`${article.mainImage != "" ? `data:image/jpeg;base64,${article.mainImage}` : '/assets/images/default.jpg'}`} alt="post-title" />
        {/* <img src="assets/images/thumb/thumb-1240x700.jpg" alt="post-title" /> */}
    </figure>  
    
    <article className="entry-wraper mb-5">

        {/* Article Actions -- Like, Clap, Save */}
        <div className="entry-left-col">
            <div className="social-sticky">
                <a href="#"><i className="icon-facebook"></i></a>
                <a href="#"><i className="icon-twitter"></i></a>
                <a href="#"><i className="icon-heart"></i></a>
                <a href="#"><i className="icon-paper-plane"></i></a>
            </div>
        </div>

        {/* ARTICLE CONTENT */}
        {/* <div className="excerpt mb-4">
            <p>Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far bald that roadrunner python inside held shrewdly the manatee.</p>
        </div> */}
        <div className="entry-main-content dropcap">
            <p dangerouslySetInnerHTML={{__html:article.content}}>
            </p>           
        </div>

        {/* ARTICLE TAGS */}
        <div className="entry-bottom">
            <div className="tags-wrap heading">
                <span className="tags">
                    <a href="#" rel="tag">fashion</a>
                    <a href="#" rel="tag">lifestyle</a>
                    <a href="#" rel="tag">news</a>
                    <a href="#" rel="tag">style</a>
                </span>
            </div>
        </div>

        {/* AUTHOR BOX */}
        <UserProfileInfo userProfileId={article.userProfile.id}/>
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
    <div className="related-posts mb-5">
        <h4 className="spanborder text-center">
            <span>Related Posts</span>
        </h4>
        <div className="row justify-content-between">
             <div className="divider-2"></div>
            <article className="col-md-4">
                <div className="mb-3 d-flex row">
                    <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-2.jpg" alt="post-title" /></a></figure>
                    <div className="entry-content col-md-7 pl-md-0">
                        <h5 className="entry-title mb-3"><a href="single.html">Is ‘Interactive Storytelling’ the Future of Media?</a></h5>
                        <div className="entry-meta align-items-center">
                            <a href="author.html">Furukawa</a> in <a href="archive.html">Programing</a><br/>
                            <span>March 14</span>
                            <span className="middotDivider"></span>
                            <span className="readingTime" title="3 min read">6 min read</span>
                            <span className="svgIcon svgIcon--star">
                                <svg className="svgIcon-use" width="15" height="15">
                                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
            <article className="col-md-4">
                <div className="mb-3 d-flex row">
                    <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-3.jpg" alt="post-title" /></a></figure>
                    <div className="entry-content col-md-7 pl-md-0">
                        <h5 className="entry-title mb-3"><a href="single.html">How NOT to get a $30k bill from Firebase</a></h5>
                        <div className="entry-meta align-items-center">
                            <a href="author.html">Glorida</a> in <a href="archive.html">Living</a><br/>
                            <span>April 14</span>
                            <span className="middotDivider"></span>
                            <span className="readingTime" title="3 min read">7 min read</span>
                            <span className="svgIcon svgIcon--star">
                                <svg className="svgIcon-use" width="15" height="15">
                                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
            <article className="col-md-4">
                <div className="mb-3 d-flex row">
                    <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-4.jpg" alt="post-title"/></a></figure>
                    <div className="entry-content col-md-7 pl-md-0">
                        <h5 className="entry-title mb-3"><a href="single.html">Google Can’t Figure Out What YouTube Is</a></h5>
                        <div className="entry-meta align-items-center">
                            <a href="author.html">Rayan Mark</a> in <a href="archive.html">GEN</a><br/>
                            <span>Jun 14</span>
                            <span className="middotDivider"></span>
                            <span className="readingTime" title="3 min read">8 min read</span>
                            <span className="svgIcon svgIcon--star">
                                <svg className="svgIcon-use" width="15" height="15">
                                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>


{/* COMMENT PART */}
    <div className="single-comment comments_wrap">
        <section id="comments">
           <div className="comments-inner clr">
              <div id="respond" className="comment-respond">
                 <h3 id="reply-title" className="comment-reply-title">Leave a Reply</h3>
                 <form action="#" method="post" id="commentform" className="comment-form" noValidate="">
                    <p className="comment-notes">
                        <span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
                    </p>
                    <p className="comment-form-comment">
                        <label htmlFor="comment">Comment</label>
                        <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" required="required"></textarea>
                    </p>
                    <div className="row">
                       <div className="comment-form-author col-sm-12 col-md-6">
                          <p>
                             <label htmlFor="author">Name*</label>
                             <input id="author" name="author" type="text" value="" size="30" aria-required="true"/>
                          </p>
                       </div>
                       <div className="comment-form-email col-sm-12 col-md-6">
                          <p>
                             <label htmlFor="email">Email*</label>
                             <input id="email" name="email" type="email" value="" size="30" aria-required="true"/>
                          </p>
                       </div>
                    </div>
                    <p className="form-submit">
                        <input name="submit" type="submit" id="submit" className="submit btn btn-success btn-block" value="Post Comment"/>
                    </p>
                 </form>
              </div>
           </div>
        </section>
    </div>
    </div> 
  )
}

export default ArticleDetail;