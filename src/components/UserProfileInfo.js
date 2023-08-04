import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetUserProfile } from "../services/Requests/UserProfile";
import { Link } from "react-router-dom";


const UserProfileInfo = (props) => {
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    const activeUser = useSelector(state => state.auth.activeUser)

    useEffect(() => {
        if(activeUser.userProfileId == props.userProfileId) setIsCurrentUser(true)
        console.log("Is current : ",isCurrentUser);
        console.log("active : ",activeUser);
        console.log("param : ",props.userProfileId);
    },[])

    useEffect(() => {
        const loadData = async() => {
            console.log("user id : ", props.userProfileId);

                const userInfo = await GetUserProfile(props.userProfileId)
                console.log("user inf : ", userInfo);
                setUserInfo(userInfo)
        }
        loadData()
    }, [])

    return(
        <div class="box box-author m_b_2rem">
            <div class="post-author row-flex">
                <div class="author-img">
                    <img alt="author avatar" src={`${userInfo.image != "" ? `data:image/jpeg;base64,${userInfo.image}` : '/assets/images/default.jpg'}`} class="avatar" />
                </div>
                <div class="author-content">
                <div class="top-author">
                    <h5 class="heading-font"><a href="author.html" title="Ryan" rel="author"> {userInfo.fullName} </a></h5></div>
                    <p class="d-none d-md-block"> {userInfo.bio} </p>

                    <div class="content-social-author">
                        <ul className="heading navbar-nav d-lg-flex align-items-left">
                        <div className="entry-meta align-items-center">
                            <span className="text-success mr-3"> <b>{userInfo.followersCount}</b> followers </span>
                            <span className="text-success"> <b>{userInfo.followingsCount}</b> followings</span>
                        </div>                        
                        </ul>
                    </div>


                    <div class="content-social-author">
                        <ul className="social-network heading navbar-nav d-lg-flex align-items-center">
                            <li><a href="#"><i className="icon-facebook"></i></a></li>
                            <li><a href="#"><i className="icon-instagram"></i></a></li>

                            {
                                isCurrentUser && (
                                    <li><button className="btn btn-outline-dark ml-3">Edit Profile</button></li>
                                )
                            }
                            {
                                !isCurrentUser && (
                                    <li><button className="btn btn-outline-dark ml-3">Follow</button></li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileInfo;