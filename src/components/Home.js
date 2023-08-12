import { useLoaderData, useSearchParams } from "react-router-dom";
import ArticleList from "./ArticleList";
import {GetAllArticles, GetAllPopularArticles} from '../services/Requests/Article'
import { GetAllCategories } from "../services/Requests/Category";
import Category from "./Category";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import CategoryList from "./CategoryList";
import Pagination from "./Pagination";
import PopularArticle from "./PopularArticleList";
import PopularArticleList from "./PopularArticleList";

const Home = () => {
    const [articles,setArticles]  = useState([])
    const [categories,setCategories]  = useState([])
    const [popularArticles,setPopularArticles]  = useState([])

    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [pageIndex, setPageIndex] = useState(1)

    const [selectedCategoryId, setSelectedCategoryId] = useState(0)
    const [searchKey, setSearchKey] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setError] = useState(null)  //try catch ile err yakala ve set et
    const [searchParams, setSearchParams] = useSearchParams()

    const pageIndexHandler = (pageInd) => setPageIndex(pageInd)
    const selectedCategoryHandler = (categoryId) => setSelectedCategoryId(categoryId)

    useEffect(() => {
        if(searchParams.get('categoryId') != null) setSelectedCategoryId(searchParams.get('categoryId'))

        const loadData = async() => {
                setIsLoading(true)
                const [articles,categories, popularArticles] = await Promise.all([
                    GetAllArticles(pageIndex,pageSize,selectedCategoryId,searchKey),
                    GetAllCategories(),
                    GetAllPopularArticles(selectedCategoryId)
                ]);
                setPageCount(Math.ceil(articles.count/pageSize))
                setArticles(articles.items)
                setCategories(categories)
                setPopularArticles(popularArticles)
                setIsLoading(false)           
        }

        loadData()
    }, [pageIndex,selectedCategoryId])

    return(
        <>          
            <div className="section-featured featured-style-1">
                <div className="content-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                            <CategoryList categories={categories} selectedCategoryHandler={selectedCategoryHandler} />

                                <h2 className="spanborder h4">
                                    <span>Most Recent</span>
                                </h2>
 
                                <ArticleList articles={articles}/> 
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

                                <Pagination count={pageCount} pageIndexHandler={pageIndexHandler}  />

                            </div>

                            <PopularArticleList popularArticles={popularArticles}/>
                            
                        </div>
                    </div>
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