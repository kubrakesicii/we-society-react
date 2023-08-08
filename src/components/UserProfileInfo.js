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
    
    const navigate = useNavigate();
    const activeUser = useSelector(state => state.auth.activeUser)

    // useEffect(() => {
    //     if(activeUser.userProfileId == props.userProfileId) setIsCurrentUser(true)
    // },[])

    const loadData = async() => {
        const user = await GetUserProfile(props.userProfileId)
        setUserInfo(user)
    }

    useEffect(() => {
       
        loadData()
    }, [isFollowing,props.userProfileId])

    const onModalClosedHandler = () => {
        console.log("modal close handler");
        loadData()
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
        <div className="box box-author m_b_2rem">
            <div className="post-author row-flex">
                <div className="author-img">
                    <img alt="author avatar" 
                    src={`${userInfo.image !== null ? `data:image/jpeg;base64,${userInfo.image}` : '/assets/images/default.jpg'}`} className="avatar" />
                </div>
                <div className="author-content">
                <div className="top-author">
                    <h5 className="heading-font"><a href="author.html" title="Ryan" rel="author"> {userInfo.fullName} </a></h5></div>
                    <p className="d-none d-md-block"> {userInfo.bio} </p>

                    <div className="content-social-author">
                        <ul className="heading navbar-nav d-lg-flex align-items-left">
                        <div className="entry-meta align-items-center">
                            <a onClick={() => {navigate(`/follower/${props.userProfileId}`)}}><span className="text-success mr-3"> <b>{userInfo.followersCount}</b> followers </span></a>
                            <a onClick={() => {navigate(`/following/${props.userProfileId}`)}}><span className="text-success"> <b>{userInfo.followingsCount}</b> followings</span></a>              
                        </div>                        
                        </ul>
                    </div>


                    <div className="content-social-author">
                        <ul className="social-network heading navbar-nav d-lg-flex align-items-center">
                            <li><a href="#"><i className="icon-facebook"></i></a></li>
                            <li><a href="#"><i className="icon-instagram"></i></a></li>

                            <EditProfileModal userInfo={userInfo} onModalClosedHandler={onModalClosedHandler}/>

                            {
                                props.isCurrentUser ? (
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