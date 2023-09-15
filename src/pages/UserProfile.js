import { useEffect, useState } from "react"
import UserProfileInfo from "../components/UserProfileInfo"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import PopularArticleList from "../components/PopularArticleList"
import {articleService} from "../services/article"

const UserProfile = () => {
    const [popularArticles,setPopularArticles]  = useState([])
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const activeUser = useSelector(state => state.auth.activeUser)
    const { userProfileId } = useParams();

    useEffect(() => {
        if(activeUser.userProfileId == userProfileId) setIsCurrentUser(true)
    },[])

    useEffect(() => {
        const loadData = async() => {
            await articleService.getAllPopulars(0).then(({data}) => setPopularArticles(data))
        }
        loadData()
    }, [userProfileId])

    return(
        <div className="content-widget">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <UserProfileInfo userProfileId={userProfileId} isCurrentUser={isCurrentUser} />
                        <Outlet/>                 
                    </div> 

                    <PopularArticleList popularArticles={popularArticles}/>

                </div>
            </div> 
        </div>
    )
}

export default UserProfile;