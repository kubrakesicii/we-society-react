import React, { useEffect, useState } from 'react'
import FollowUser from '../components/FollowUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { followRelationshipService } from '../services/followRelationship';

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
        await followRelationshipService.getAllFollowings(userProfileId,1,20).then(({data}) => setFollowingList(data.items))
      }
      loadData()
  },[])

  return (
    <div className="content-widget">
        <div className="container">
                <div className="col-md-12">
                <h3 className='entry-title'><a onClick={() => navigate(`/user-profile/${userProfileId}/tabs`)}>Profile </a> / Followings</h3>
                    <div className="divider"></div>                  
                        {followingList.map((f) => 
                            <a href=''>
                            <FollowUser 
                                key={f.id}
                                id={f.id}
                                image={f.image}
                                followId={f.userProfileId}
                                fullName={f.fullName}
                                bio={f.bio}  />
                            </a>
                         )}       
                </div>          
        </div>
    </div>    
  )
}


export default FollowingList;