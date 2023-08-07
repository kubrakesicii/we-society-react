import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserProfileInfo from './UserProfileInfo'
import { useSelector } from 'react-redux'

const FollowUser = (props) => {
  return (
        <div className='container mb-4'>    
            <div className='card p-2'>
                    <div className='row d-flex justify-content-start'>
                        <div className="col-2 align-self-center">
                            <img style={{borderRadius:'50%',height:'64px',width:'64px'}} alt="follow avatar" 
                            src={`${props.image !== null ? `data:image/jpg;base64,${props.image}` : '/assets/images/default.jpg'}`} className="avatar" />
                        </div>

                        <div className="col-10 align-self-center">
                            <h3 className="entry-title mb-2"><a href="single.html">{props.fullName}</a></h3>
                            <div className="entry-excerpt">
                                <div>{props.bio}</div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
  )
}



export default FollowUser;
