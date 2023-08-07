import { useEffect, useState } from "react"
import { GetAllArticleDraftsByUser, GetAllArticlesByUser, GetAllPopularArticles } from "../services/Requests/Article"
import ArticleList from "./ArticleList"
import { GetUserProfile } from "../services/Requests/UserProfile"
import UserProfileInfo from "./UserProfileInfo"
import { useSelector } from "react-redux"
import Pagination from "./Pagination"
import { useParams } from "react-router-dom"
import PopularArticleList from "./PopularArticleList"
import ProfileTabContent from "./ProfileTabContent"

const UserProfile = () => {
    const [popularArticles,setPopularArticles]  = useState([])
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [viewComponent, setViewComponent] = useState('tabs')

    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const pageIndexHandler = (pageInd) => setPageIndex(pageInd)

    const activeUser = useSelector(state => state.auth.activeUser)
    const { userProfileId } = useParams();

    const viewComponentHandler = (viewingComp) =>{
        setViewComponent(viewingComp)
    }

    useEffect(() => {
        if(activeUser.userProfileId == userProfileId) setIsCurrentUser(true)
    },[])

    useEffect(() => {
        console.log("VİEW COMP : ",viewComponent);
        const loadData = async() => {
            console.log("user params id : ", userProfileId)

                const [articles, userDrafts,popularArticles,userReadingLists] = await Promise.all([
                    GetAllArticlesByUser(userProfileId,pageIndex,pageSize),
                    GetAllArticleDraftsByUser(userProfileId,pageIndex,pageSize),
                    GetAllPopularArticles(0)
                ])
                setPageCount(Math.ceil(articles.count/pageSize))
                // setArticles(articles.items)
                // setUserDrafts(userDrafts.items)
                setPopularArticles(popularArticles)
        }
        loadData()
    }, [pageIndex,userProfileId])

    return(
        <div className="content-widget">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <UserProfileInfo userProfileId={userProfileId} isCurrentUser={isCurrentUser} />

                        <ProfileTabContent isCurrentUser={isCurrentUser} userProfileId={userProfileId} />
                        {/* <Pagination count={pageCount} pageIndexHandler={pageIndexHandler}  /> */}
                    </div> 

                    <PopularArticleList popularArticles={popularArticles}/>

                </div>
            </div> 
        </div>
    )
}

export default UserProfile;