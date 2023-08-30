
import { useSelector } from 'react-redux'
import { GetIsFollowing, UnfollowUserRequest,FollowUserRequest } from '../services/Requests/FollowRelationship'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FollowUser = (props) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const activeUser = useSelector(state => state.auth.activeUser)
    const navigate = useNavigate()

    const loadData = async() => {
        const isFollowing = await GetIsFollowing(activeUser.userProfileId, props.followId)
        console.log(`IsFollowing : ${isFollowing} : ${activeUser.userProfileId} to ${props.followId}`);
        setIsFollowing(isFollowing)
    }

    useEffect(() => {
        loadData()
    }, [isFollowing,props.userProfileId])

    const followHandler = async () => {
        await FollowUserRequest(activeUser.userProfileId, props.followId)
        setIsFollowing(true)
    }

    const unfollowHandler = async () => {
        await UnfollowUserRequest(activeUser.userProfileId, props.followId)
        setIsFollowing(false)
    }

  return (
        <div className='container mb-3 p-3'>
            <div className='d-flex justify-content-start'>
                <div className="col-2 align-self-center" 
                onClick={() => navigate(`/user-profile/${props.followId}/tabs`)}>
                    <img style={{borderRadius:'50%',height:'64px',width:'64px'}} alt="follow avatar" 
                    src={`${props.image !== null ? `data:image/jpg;base64,${props.image}` : '/assets/images/person.png'}`} className="avatar" />
                </div>

                <div className="col-8 align-self-center"
                onClick={() => navigate(`/user-profile/${props.followId}/tabs`)}>
                <h3 className="entry-title mb-2"><a onClick={() => navigate(`/user-profile/${props.followId}/tabs`)}>{props.fullName}</a></h3>
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
                                if(activeUser.id === 0 ) navigate('/login')
                                else {
                                    followHandler()
                                }
                            }}>Follow</button> 
                            ): 
                            (
                                <button className="btn btn-success ml-3" 
                                onClick={() => {
                                    if(activeUser.id === 0 ) navigate('/login')
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



export default FollowUser;
