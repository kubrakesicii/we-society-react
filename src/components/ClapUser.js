import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {followRelationshipService} from "../services/followRelationship"
import useFollowStatus from '../customHooks/useFollowStatus'


const ClapUser = (props) => {
    const activeUser = useSelector(state => state.auth.activeUser)
    const navigate = useNavigate()
    const [isFollowing,setIsFollowing] = useFollowStatus(activeUser.userProfileId, props.followId);

    const followHandler = async () => {
        await followRelationshipService.follow({followerId:activeUser.userProfileId,followingId:props.followId})
        setIsFollowing(true)
    }

    const unfollowHandler = async () => {
        await followRelationshipService.unfollow({followerId:activeUser.userProfileId,followingId:props.followId})
        setIsFollowing(false)
    }

  return (
        <div className='container mb-3 p-3'>    
            <div className='row d-flex justify-content-start'>
                <div className="col-2 align-self-center">
                    <img style={{borderRadius:'50%',height:'64px',width:'64px'}} alt="follow avatar" 
                    src={`${props.image !== null ? `data:image/jpg;base64,${props.image}` : '/assets/images/default.jpg'}`} className="avatar" />
                </div>

                <div className="col-8 align-self-center">
                    <h3 className="entry-title mb-2">
                        <a onClick={() => navigate(`/user-profile/${props.followId}/tabs`)}>
                            {props.fullName}
                        </a>
                        <p className='badge badge-success ml-3'>{props.count} claps</p>
                    </h3>
                    <div className="entry-excerpt">
                        <div>{props.bio}</div>
                    </div>
                </div>

                <div className='col-2 align-self-center'>
                    {
                        activeUser.userProfileId === props.followId ? (
                            <div></div>
                        ) : (
                            !isFollowing || activeUser.id === 0 ? (
                                <button className="btn btn-outline-dark ml-3" 
                            onClick={() => {
                                if(activeUser.id === 0 ) {
                                    console.log("follow hand redirect");
                                    window.location = "/login"
                                }
                                else {
                                    followHandler()
                                }
                            }}>Follow</button> 
                            ): 
                            (
                                <button className="btn btn-success ml-3" 
                                onClick={() => {
                                    if(activeUser.id === 0 ) window.location = "/login"
                                    else {
                                        unfollowHandler()
                                    }
                                }}>Following</button>
                            )    
                        )                         
                    }
                </div>
            </div>
        </div>
    )
}


export default ClapUser;