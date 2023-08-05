import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetUserProfile } from "../services/Requests/UserProfile";
import { Link, useNavigate } from "react-router-dom";
import { FollowUser, UnfollowUser } from "../services/Requests/FollowRelationship";
import EditProfileModal from "./EditProfileModal";


const UserProfileInfo = (props) => {
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [isFollowing, setIsFollowing] = useState(true)
    const [userInfo, setUserInfo] = useState({})
    const [isModal, setIsModal] = useState(false)
    
    const navigate = useNavigate();

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
    }, [isFollowing,props.userProfileId])

    const onModalClosedHandler = async () => {
        console.log("modal close handler");
        setIsModal(true)
    }

    const followHandler = async () => {
        await FollowUser(activeUser.userProfileId, props.userProfileId)
        setIsFollowing(true)
    }

    const unfollowHandler = async () => {
        console.log("Un Follow handler");
        await UnfollowUser(activeUser.userProfileId, props.userProfileId)
        setIsFollowing(false)
    }


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


                            <EditProfileModal userInfo={userInfo} onModalClosed={onModalClosedHandler}/>

                            {
                                isCurrentUser ? (
                                    <li><button className="btn btn-outline-dark ml-3"
                                    data-toggle="modal" data-target="#edit-modal">Edit Profile</button></li>
                                ) : 
                                (
                                    !isFollowing ? (
                                        <li><button className="btn btn-outline-dark ml-3" 
                                    onClick={() => {
                                        if(activeUser.id == 0 ) navigate('/login')
                                        else {
                                            followHandler()
                                        }
                                    }}>Follow</button></li>  
                                    ): 
                                    (
                                        <li><button className="btn btn-success ml-3" 
                                        onClick={() => {
                                            if(activeUser.id == 0 ) navigate('/login')
                                            else {
                                                unfollowHandler()
                                            }
                                        }}>Following</button></li>
                                    )                      
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