import React from 'react'
import { useNavigate } from 'react-router-dom';

const Reading = (props) => {

    const navigate = useNavigate()

  return (
    <div className="container mb-5"
        onClick={() => {
            navigate(`/user-profile/${props.userProfileId}?listId=${props.id}&name=${props.name}&page=lists`)
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