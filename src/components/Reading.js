import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Reading = (props) => {
const navigate = useNavigate()    
const { userProfileId } = useParams()

  return (
    <div className="container mb-5"
        onClick={() => {
            navigate(`/user-profile/${userProfileId}/lists/${props.id}/${props.name}`)
        }}>    
       <div className='card p-3'>
            <div className='col-6'>
                <div className='row justify-content-between align-items-center'>
                    <a className="author-avatar mr-3" href="#">
                        <img src='/assets/images/reading.jpg'/>
                    </a>
                    <h3>{props.name} </h3>
                    <p className='entry-meta badge badge-warning'> {props.articleCount} Articles </p>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Reading;