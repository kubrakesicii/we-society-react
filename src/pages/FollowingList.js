import React, { useEffect, useState } from 'react'
import FollowUser from '../components/FollowUser';
import { GetAllFollowers, GetAllFollowings } from '../services/Requests/FollowRelationship';
import UserProfileInfo from '../components/UserProfileInfo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FollowingList = (props) => {
  const [followingList, setFollowingList] = useState([])
  
  const navigate = useNavigate()

  const { userProfileId } = useParams();
  
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const activeUser = useSelector(state => state.auth.activeUser)
  useEffect(() => {
      if(activeUser.userProfileId === userProfileId) setIsCurrentUser(true)
  },[])


  useEffect(() => {
      const loadData = async () => {
          let users =  await GetAllFollowings(userProfileId,1,20)
          setFollowingList(users)
      }
      loadData()
  },[])

  return (
    <div className="content-widget">
        <div className="container">
                <div className="col-md-12">
                <h3 className='entry-title'><a onClick={() => navigate(`/user-profile/${userProfileId}/tabs`)}>Profile </a> / Followings</h3>
                    <div className="divider"></div>                  
                        {followingList.map((f) => <FollowUser 
                            key={f.id}
                            id={f.id}
                            image={f.image}
                            followId={f.userProfileId}
                            fullName={f.fullName}
                            bio={f.bio}  />)}       
                </div>          
        </div>
    </div>    
  )
}


export default FollowingList;