import { useLoaderData } from "react-router-dom";
import ArticleList from "./ArticleList";
import {GetAllArticles} from '../services/Requests/Article'
import { GetAllCategories } from "../services/Requests/Category";
import Category from "./Category";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import CategoryList from "./CategoryList";

const Home = () => {
    const [articleList,setArticles]  = useState([])
    const [categoryList,setCategories]  = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setError] = useState(null)  //try catch ile err yakala ve set et

    //const {articles,categories} = useLoaderData()


    useEffect(() => {
        const loadData = async() => {
                setIsLoading(true)
                const [articles,categories] = await Promise.all([
                    GetAllArticles(),
                    GetAllCategories()
                ]);
        
                setArticles(articles)
                setCategories(categories)
                setIsLoading(false)           
        }

        loadData()
    }, [])

    console.log("Home- laoder data : ", articleList);
    return(
        <>
        {/* <br/><br/><br/>        <br/><br/><br/>
        <br/><br/><br/>
        <br/><br/><br/>

            <h3>hello from home</h3>
            <ul>
            <h3>{categoryList.map((a) => <Category key={a.id} id={a.id} name={a.name}/>)}</h3>
            </ul>
            <hr/>
            <ArticleList articles={articleList}/> */}

            
            <main id="content">
                <div className="section-featured featured-style-1">

                <div className="content-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                            <CategoryList categories={categoryList} />

                                <h2 className="spanborder h4">
                                    <span>Most Recent</span>
                                </h2>
 
                                <ArticleList articles={articleList}/> 
{/* 
                                <div className="row justify-content-between">
                                    <div className="divider-2"></div>
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512.jpg" alt="post-title"/></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">I Learned How to Die Before I Knew How to Live</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Anna Goldfarb</a> in <a href="archive.html">Fashion</a><br/>
                                                    <span>March 12</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">4 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-2.jpg" alt="post-title"/></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">Is 'Interactive Storytelling' the Future of Media?</a></h5>
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
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-3.jpg" alt="post-title"/></a></figure>
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
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-4.jpg" alt="post-title"/></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">Google Can't Figure Out What YouTube Is</a></h5>
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
                                </div> */}

                                <ul className="page-numbers heading">
                                    <li><span aria-current="page" className="page-numbers current">1</span></li>
                                    <li><a className="page-numbers" href="#">2</a></li>
                                    <li><a className="page-numbers" href="#">3</a></li>
                                    <li><a className="page-numbers" href="#">4</a></li>
                                    <li><a className="page-numbers" href="#">5</a></li>
                                    <li><a className="page-numbers" href="#">...</a></li>
                                    <li><a className="page-numbers" href="#">98</a></li>
                                    <li><a className="next page-numbers" href="#"><i className="icon-right-open-big"></i></a></li>
                                </ul>

                            </div>
                            <div className="col-md-4 pl-md-5 sticky-sidebar">
                                <div className="sidebar-widget latest-tpl-4">
                                    <h4 className="spanborder">
                                        <span>Popular</span>
                                    </h4>
                                    <ol>
                                        <li className="d-flex">
                                            <div className="post-count">01</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">President and the emails. Who will guard the guards?</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>May 14</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">3 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="post-count">02</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">How to Silence the Persistent Ding of Modern Life</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>Jun 12</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">4 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="post-count">03</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">Why We Love to Watch</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>May 15</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">5 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="post-count">04</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">How Health Apps Let</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>April 27</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">6 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-9 col-xl-9">
                                <h2 className="spanborder h4">
                                    <span>Editor's Picks</span>
                                 </h2>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <article className="first mb-3">
                                            <figure><a href="single.html"><img src="assets/images/thumb/thumb-1240x700.jpg" alt="post-title" /></a></figure>
                                            <h3 className="entry-title mb-3"><a href="single.html">Home Internet Is Becoming a Luxury for the Wealthy</a></h3>
                                            <div className="entry-excerpt">
                                                <p>
                                                   And black on meretriciously regardless well fearless irksomely as about hideous wistful bat less oh much and occasional useful rat darn jeepers far.
                                                </p>
                                            </div>
                                            <div className="entry-meta align-items-center">
                                                <a href="author.html">Dave Gershgorn</a> in <a href="archive.html">OneZero</a><br/>
                                                <span>Jun 14</span>
                                                <span className="middotDivider"></span>
                                                <span className="readingTime" title="3 min read">3 min read</span>
                                                <span className="svgIcon svgIcon--star">
                                                    <svg className="svgIcon-use" width="15" height="15">
                                                        <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </article>
                                        <a className="btn btn-green d-inline-block mb-4 mb-md-0" href="archive.html">All Featured</a>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <article className="post-has-bg">
                                            <div className="mb-3 d-flex row">
                                                <figure className="col-4 col-md-4"><a href="single.html"><img src="assets/images/thumb/thumb-700x512.jpg" alt="post-title"/></a></figure>
                                                <div className="entry-content col-8 col-md-8 pl-md-0">
                                                    <h5 className="entry-title mb-3"><a href="single.html">The Night My Doorbell Camera Captured a Shooting</a></h5>
                                                    <div className="entry-meta align-items-center">
                                                        <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                        <span>Jun 16</span>
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
                                        <article>
                                            <div className="mb-3 d-flex row">
                                                <figure className="col-4 col-md-4"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-2.jpg" alt="post-title"/></a></figure>
                                                <div className="entry-content col-8 col-md-8 pl-md-0">
                                                    <h5 className="entry-title mb-3"><a href="single.html">Privacy Is Just the Beginning of the Debate Over Tech</a></h5>
                                                    <div className="entry-meta align-items-center">
                                                        <a href="author.html">Otimus</a> in <a href="archive.html">Startup</a><br/>
                                                        <span>May 15</span>
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
                                        <article>
                                            <div className="mb-3 d-flex row">
                                                <figure className="col-4 col-md-4"><a href="single.html"><img src="assets/images/thumb/thumb-700x512-2.jpg" alt="post-title"/></a></figure>
                                                <div className="entry-content col-8 col-md-8 pl-md-0">
                                                   <div className="capsSubtle mb-2">based on your reading history</div>
                                                    <h5 className="entry-title mb-3"><a href="single.html">Want To Make Millions? Then Act Like a Millionaire</a></h5>
                                                    <div className="entry-meta align-items-center">
                                                        <a href="author.html">Mark Harris</a> in <a href="archive.html">Heated</a><br/>
                                                        <span>May 13</span>
                                                        <span className="middotDivider"></span>
                                                        <span className="readingTime" title="3 min read">12 min read</span>
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
                            </div>

                            <div className="col-sm-12 col-md-3 col-xl-3">
                                <div className="sidebar-widget latest-tpl-4">
                                    <h4 className="spanborder">
                                        <span>Trending</span>
                                    </h4>
                                    <ol>
                                        <li className="d-flex">
                                            <div className="post-count">01</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">President and the emails. Who will guard the guards?</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Adam Philip</a> in <a href="archive.html">Elemental</a><br/>
                                                    <span>Jan 12</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">7 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="post-count">02</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">How to Silence the Persistent Ding of Modern Life</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Aaron Gell</a> in <a href="archive.html">Design</a><br/>
                                                    <span>Feb 18</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">9 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="post-count">03</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">Why We Love to Watch</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Atlantic</a> in <a href="archive.html">Zora</a><br/>
                                                    <span>March 17</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">6 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="post-count">04</div>
                                            <div className="post-content">
                                                <h5 className="entry-title mb-3"><a href="single.html">How Health Apps Let</a></h5>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>Jun 14</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">3 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                <a className="link-green" href="archive.html">See all trending<svg className="svgIcon-use" width="19" height="19"><path d="M7.6 5.138L12.03 9.5 7.6 13.862l-.554-.554L10.854 9.5 7.046 5.692" fillRule="evenodd"></path></svg></a>

                            </div> 
                        </div> 
                        <div className="divider"></div>
                    </div> 
                </div>

              
                <div className="content-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="row justify-content-between">
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512.jpg" alt="post-title" /></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">I Learned How to Die Before I Knew How to Live</a></h5>
                                                <div className="entry-excerpt">
                                                    <p>
                                                       Tech companies need more than advisory boards if they want.
                                                    </p>
                                                </div>
                                                <div className="entry-meta align-items-center">
                                                    <a href="author.html">Anna Goldfarb</a> in <a href="archive.html">Fashion</a><br/>
                                                    <span>March 12</span>
                                                    <span className="middotDivider"></span>
                                                    <span className="readingTime" title="3 min read">4 min read</span>
                                                    <span className="svgIcon svgIcon--star">
                                                        <svg className="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-2.jpg" alt="post-title"/></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">Is 'Interactive Storytelling' the Future of Media?</a></h5>
                                                <div className="entry-excerpt">
                                                    <p>
                                                       Or does passive and active content serve different purposes?.
                                                    </p>
                                                </div>
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
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-3.jpg" alt="post-title" /></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">How NOT to get a $30k bill from Firebase</a></h5>
                                                <div className="entry-excerpt">
                                                    <p>
                                                       Why the dark forests of the internet'''podcasts, newsletters.
                                                    </p>
                                                </div>
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
                                    <article className="col-md-6">
                                        <div className="mb-3 d-flex row">
                                            <figure className="col-md-5"><a href="single.html"><img src="assets/images/thumb/thumb-512x512-4.jpg" alt="post-title" /></a></figure>
                                            <div className="entry-content col-md-7 pl-md-0">
                                                <h5 className="entry-title mb-3"><a href="single.html">Google Can't Figure Out What YouTube Is</a></h5>
                                                <div className="entry-excerpt">
                                                    <p>
                                                       But Apple still has some A.I. tricks up its sleeve.
                                                    </p>
                                                </div>
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
                            <div className="col-md-2">
                                <div className="sidebar-widget ads">
                                    <a href="#"><img src="assets/images/ads/ads-1.png" alt="ads"/></a>
                                </div>
                            </div>
                        </div>
                        <div className="divider-2"></div>
                    </div>
                </div> 

{/* ------ */}

                <div className="content-widget">
                    <div className="container">
                        <div className="sidebar-widget ads">
                            <a href="#"><img src="assets/images/ads/ads-2.png" alt="ads"/></a>
                        </div>
                        <div className="hr"></div>
                    </div>
                </div> 
            </main>

            <Footer/>
        </>
    )
}


export default Home;

// export const loadArticles = async () => {
//     console.log("Loader running");
//     setIsLoading(true)

//     const [articles,categories] = await Promise.all([
//         GetAllArticles(),
//         GetAllCategories()
//     ]);

//     console.log("Loader done");
//     console.log("Loader articles returnin: ",articles);
//     console.log("Loader cates returnin: ",categories);

//     setIsLoading(false)
    
//     return ({articles, categories})
// }