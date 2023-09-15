import React, { useEffect, useState } from 'react'
import FollowUser from '../components/FollowUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { followRelationshipService } from '../services/followRelationship';

const FollowerList = (props) => {
  const [followerList, setFollowerList] = useState([])
  const { userProfileId } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const activeUser = useSelector(state => state.auth.activeUser)
  useEffect(() => {
      if(activeUser.userProfileId === userProfileId) setIsCurrentUser(true)
  },[])

  const navigate = useNavigate()

  useEffect(() => {
      const loadData = async () => {
            await followRelationshipService.getAllFollowers(userProfileId,1,20).then(({data}) => setFollowerList(data.items))
      }
      loadData()
  },[])


  return (
    <div className="content-widget">
        <div className="container">
            <div className="">
                <div className="col-md-12">
                <h3 className='entry-title'><a onClick={() => navigate(`/user-profile/${userProfileId}/tabs`)}>Profile </a> / Followers</h3>
                    <div className="divider"></div>
                        {followerList.map((f) =>
                            <FollowUser
                                key={f.id}
                                id={f.id}
                                followId={f.userProfileId}
                                image={f.image}
                                fullName={f.fullName}
                                bio={f.bio}  
                            />
                        )}                   
                </div>     
            </div>
        </div>
    </div>    
  )
}


export default FollowerList;