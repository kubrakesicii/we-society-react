import React, { useEffect, useState } from 'react'
import FollowUser from './FollowUser';
import { GetAllFollowers, GetIsFollowing } from '../services/Requests/FollowRelationship';
import UserProfileInfo from './UserProfileInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FollowerList = (props) => {
  const [followerList, setFollowerList] = useState([])

  const { userProfileId } = useParams();
  
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const activeUser = useSelector(state => state.auth.activeUser)
  useEffect(() => {
      if(activeUser.userProfileId == userProfileId) setIsCurrentUser(true)
  },[])


  useEffect(() => {
      const loadData = async () => {
          let users =  await GetAllFollowers(userProfileId,1,20)
          setFollowerList(users)
      }
      loadData()
  },[])


  return (
    <div className="content-widget">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <UserProfileInfo userProfileId={userProfileId} isCurrentUser={isCurrentUser} />
                    
                    <a href=''> Go back profile</a>
                        {followerList.map((f) => <FollowUser 
                            key={f.id}
                            id={f.id}
                            followId={f.userProfileId}
                            image={f.image}
                            fullName={f.fullName}
                            bio={f.bio}  
                            />)}                   
                </div>     
            </div>
        </div>
    </div>    
  )
}


export default FollowerList;