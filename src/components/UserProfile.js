import { useEffect, useState } from "react"
import { GetAllArticleDraftsByUser, GetAllArticlesByUser, GetAllPopularArticles } from "../services/Requests/Article"
import ArticleList from "./ArticleList"
import { GetUserProfile } from "../services/Requests/UserProfile"
import UserProfileInfo from "./UserProfileInfo"
import { useSelector } from "react-redux"
import Pagination from "./Pagination"
import { useParams } from "react-router-dom"
import PopularArticleList from "./PopularArticleList"

const UserProfile = () => {
    const [articlesByUser,setArticles]  = useState([])
    const [userDrafts,setUserDrafts]  = useState([])
    const [userReadingLists,setUserReadingLists]  = useState([])
    const [popularArticles,setPopularArticles]  = useState([])


    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const pageIndexHandler = (pageInd) => setPageIndex(pageInd)

    const activeUser = useSelector(state => state.auth.activeUser)
    const { userProfileId } = useParams();

    const [selectedTab, setSelectedTab] = useState(1)


    useEffect(() => {
        const loadData = async() => {
            console.log("user params id : ", userProfileId)

                const [articles, userDrafts,popularArticles,userReadingLists] = await Promise.all([
                    GetAllArticlesByUser(userProfileId,pageIndex,pageSize),
                    GetAllArticleDraftsByUser(userProfileId,pageIndex,pageSize),
                    GetAllPopularArticles(0)
                ])
                setPageCount(Math.ceil(articles.count/pageSize))
                setArticles(articles.items)
                setUserDrafts(userDrafts.items)
                setPopularArticles(popularArticles)
        }
        loadData()
    }, [pageIndex])

    return(
        <>
            <main id="content">
                <div className="content-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <UserProfileInfo userProfileId={userProfileId}/>

                                {/* PROFILE TABS */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a onClick={() => {setSelectedTab(1);}} 
                                        className={`nav-link ${selectedTab === 1 ? 'active' : ''}`} id="latest-tab" data-bs-toggle="tab" data-bs-target="#latest" type="button" role="tab" aria-controls="latest" aria-selected="true">Latest Posts</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a onClick={() => {setSelectedTab(2)}} 
                                        className={`nav-link ${selectedTab === 2 ? 'active' : ''}`} id="drafts-tab" data-bs-toggle="tab" data-bs-target="#draft" type="button" role="tab" aria-controls="draft" aria-selected="false">Drafts</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a onClick={() => {setSelectedTab(3)}} 
                                        className={`nav-link ${selectedTab === 3 ? 'active' : ''}`} id="reading-tab" data-bs-toggle="tab" data-bs-target="#reading" type="button" role="tab" aria-controls="reading" aria-selected="false">Reading List</a>
                                    </li>
                                </ul>

                                {
                                    selectedTab === 1 && (
                                        <ArticleList articles={articlesByUser}/>
                                    )
                                }
                                {
                                    selectedTab === 2 && (
                                        <ArticleList articles={userDrafts}/>
                                    )
                                }
                                {
                                    selectedTab === 3 && (
                                        <ArticleList articles={articlesByUser}/>
                                    )
                                }

                                <Pagination count={pageCount} pageIndexHandler={pageIndexHandler}  />
                            </div> 

                            <PopularArticleList popularArticles={popularArticles}/>
 
                        </div>
                    </div> 
                </div>
            </main>
        </>
    )
}

export default UserProfile;