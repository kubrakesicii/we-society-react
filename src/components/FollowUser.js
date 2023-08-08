import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GetIsFollowing, UnfollowUser } from '../services/Requests/FollowRelationship'

const FollowUser = (props) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const activeUser = useSelector(state => state.auth.activeUser)

    const navigate = useNavigate()

    const loadData = async() => {
        const isFollowing = await GetIsFollowing(activeUser.userProfileId, props.followId)
        setIsFollowing(isFollowing)
    }

    const followHandler = async () => {
        await FollowUser(activeUser.userProfileId, props.userProfileId)
        setIsFollowing(true)
    }

    const unfollowHandler = async () => {
        await UnfollowUser(activeUser.userProfileId, props.userProfileId)
        setIsFollowing(false)
    }

    useEffect(() => {
        loadData()
    }, [isFollowing,props.userProfileId])

  return (
        <div className='container mb-3 p-3'>    
            <div className='row d-flex justify-content-start'>
                <div className="col-2 align-self-center">
                    <img style={{borderRadius:'50%',height:'64px',width:'64px'}} alt="follow avatar" 
                    src={`${props.image !== null ? `data:image/jpg;base64,${props.image}` : '/assets/images/default.jpg'}`} className="avatar" />
                </div>

                <div className="col-8 align-self-center">
                    <h3 className="entry-title mb-2"><a href="single.html">{props.fullName}</a></h3>
                    <div className="entry-excerpt">
                        <div>{props.bio}</div>
                    </div>
                </div>

                <div className='col-2 align-self-center'>
                    {
                        !isFollowing || activeUser.id === 0 ? (
                            <button className="btn btn-outline-dark ml-3" 
                        onClick={() => {
                            if(activeUser.id == 0 ) navigate('/login')
                            else {
                                followHandler()
                            }
                        }}>Follow</button> 
                        ): 
                        (
                            <button className="btn btn-success ml-3" 
                            onClick={() => {
                                if(activeUser.id == 0 ) navigate('/login')
                                else {
                                    unfollowHandler()
                                }
                            }}>Following</button>
                        )          
                    }
                </div>
            </div>
        </div>
    )
}



export default FollowUser;
