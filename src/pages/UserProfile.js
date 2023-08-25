import { useEffect, useState } from "react"
import { GetAllArticleDraftsByUser, GetAllArticlesByUser, GetAllPopularArticles } from "../services/Requests/Article"
import UserProfileInfo from "../components/UserProfileInfo"
import { useSelector } from "react-redux"
import Pagination from "../components/Pagination"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import PopularArticleList from "../components/PopularArticleList"

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

    const [searchParams, setSearchParams] = useSearchParams()

    console.log("PARAM : ", searchParams.get('page'));

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
                        <Outlet/>



                        {/* {
                            searchParams.get('page') === 'tabs' ? (
                                <ProfileTabContent isCurrentUser={isCurrentUser} userProfileId={userProfileId} />
                            ) : searchParams.get('page') === 'followings' ?  (
                                <FollowingList />
                            ) : searchParams.get('page') === 'followers' ?  (
                                <FollowerList />
                            ) : searchParams.get('page') === 'lists' ?  (
                                <ReadingListArticles />
                            ) :
                            
                            
                            
                            (
                                <></>
                            )
                        } */}

                        {/* <Pagination count={pageCount} pageIndexHandler={pageIndexHandler}  /> */}
                    </div> 

                    <PopularArticleList popularArticles={popularArticles}/>

                </div>
            </div> 
        </div>
    )
}

export default UserProfile;