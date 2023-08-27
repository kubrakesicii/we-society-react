import React from 'react'

const Comment = (props) => {
  return (
    <div className='container mb-3 p-3'>    
        <div className='row d-flex justify-content-start'>
            <div className="col-2 align-self-center">
                <img style={{borderRadius:'50%',height:'64px',width:'64px'}} 
                src={`${props.userProfile.image !== null ? `data:image/jpg;base64,${props.userProfile.image}` : '/assets/images/default.jpg'}`} className="avatar" />
            </div>

            <div className="col-8 align-self-center">
                <h3 className="entry-title mb-2"><a href="single.html">{props.userProfile.fullName}</a></h3>
                <div className="entry-excerpt">
                    <div>{props.text}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comment;