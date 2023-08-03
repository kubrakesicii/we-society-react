import { useEffect, useState } from "react"
import { GetAllArticlesByUser } from "../services/Requests/Article"
import ArticleList from "./ArticleList"
import { GetUserProfile } from "../services/Requests/UserProfile"
import UserProfileInfo from "./UserProfileInfo"

const UserProfile = () => {
    const [articlesByUser,setArticles]  = useState([])
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const loadData = async() => {
                const [articles, userInfo] = await Promise.all([
                    GetAllArticlesByUser(1),
                    GetUserProfile(3)
                ])
                setArticles(articles)
                setUserInfo(userInfo)
        }
        loadData()
    }, [])

    return(
        <>
            <main id="content">
                <div class="content-widget">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8">
                                <UserProfileInfo info={userInfo}/>

                                <h4 class="spanborder"><span>Latest Posts</span></h4>
                                <ArticleList articles={articlesByUser}/>

                                <ul class="page-numbers heading">
                                    <li><span aria-current="page" class="page-numbers current">1</span></li>
                                    <li><a class="page-numbers" href="#">2</a></li>
                                    <li><a class="page-numbers" href="#">3</a></li>
                                    <li><a class="page-numbers" href="#">4</a></li>
                                    <li><a class="page-numbers" href="#">5</a></li>
                                    <li><a class="page-numbers" href="#">...</a></li>
                                    <li><a class="page-numbers" href="#">98</a></li>
                                    <li><a class="next page-numbers" href="#"><i class="icon-right-open-big"></i></a></li>
                                </ul>

                            </div> 



                            <div class="col-md-4 pl-md-5 sticky-sidebar">
                                <div class="sidebar-widget latest-tpl-4">
                                    <h5 class="spanborder widget-title">
                                        <span>Hightlight posts</span>
                                    </h5>
                                    <ol>
                                        <li class="d-flex">
                                            <div class="post-count">01</div>
                                            <div class="post-content">
                                                <h5 class="entry-title mb-3"><a href="single.html">President and the emails. Who will guard the guards?</a></h5>
                                                <div class="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>May 14</span>
                                                    <span class="middotDivider"></span>
                                                    <span class="readingTime" title="3 min read">3 min read</span>
                                                    <span class="svgIcon svgIcon--star">
                                                        <svg class="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex">
                                            <div class="post-count">02</div>
                                            <div class="post-content">
                                                <h5 class="entry-title mb-3"><a href="single.html">How to Silence the Persistent Ding of Modern Life</a></h5>
                                                <div class="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>Jun 12</span>
                                                    <span class="middotDivider"></span>
                                                    <span class="readingTime" title="3 min read">4 min read</span>
                                                    <span class="svgIcon svgIcon--star">
                                                        <svg class="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex">
                                            <div class="post-count">03</div>
                                            <div class="post-content">
                                                <h5 class="entry-title mb-3"><a href="single.html">Why We Love to Watch</a></h5>
                                                <div class="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>May 15</span>
                                                    <span class="middotDivider"></span>
                                                    <span class="readingTime" title="3 min read">5 min read</span>
                                                    <span class="svgIcon svgIcon--star">
                                                        <svg class="svgIcon-use" width="15" height="15">
                                                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex">
                                            <div class="post-count">04</div>
                                            <div class="post-content">
                                                <h5 class="entry-title mb-3"><a href="single.html">How Health Apps Let</a></h5>
                                                <div class="entry-meta align-items-center">
                                                    <a href="author.html">Alentica</a> in <a href="archive.html">Police</a><br/>
                                                    <span>April 27</span>
                                                    <span class="middotDivider"></span>
                                                    <span class="readingTime" title="3 min read">6 min read</span>
                                                    <span class="svgIcon svgIcon--star">
                                                        <svg class="svgIcon-use" width="15" height="15">
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
            </main>
        </>
    )
}

export default UserProfile;