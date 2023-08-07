import React, { useEffect, useState } from 'react'
import FollowUser from './FollowUser';
import { GetAllFollowers, GetAllFollowings } from '../services/Requests/FollowRelationship';
import UserProfileInfo from './UserProfileInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FollowingList = (props) => {
  const [followingList, setFollowingList] = useState([])
  
  const navigate = useNavigate()

  const { userProfileId } = useParams();
  
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const activeUser = useSelector(state => state.auth.activeUser)
  useEffect(() => {
      if(activeUser.userProfileId == userProfileId) setIsCurrentUser(true)
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
            <div className="row">
                <div className="col-md-8">
                    <UserProfileInfo userProfileId={userProfileId} isCurrentUser={isCurrentUser} />
                    
                    <a href=''> Go back profile</a>
                        {followingList.map((f) => <FollowUser 
                            key={f.id}
                            id={f.id}
                            image={f.image}
                            fullName={f.fullName}
                            bio={f.bio}  />)}                   
                </div>          
            </div>
        </div>
    </div>    
  )
}


export default FollowingList;