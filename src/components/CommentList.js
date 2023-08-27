import React, { useEffect, useState } from 'react'
import { GetCommentsByArticle } from '../services/Requests/ArticleComment'
import Comment from './Comment'

const CommentList = (props) => {
console.log("Comment List : ", props.commentList);
  return (
    <div className="single-comment comments_wrap mt-5">
            <section id="comments">       
                <div className="comments-inner clr"> 
                  <h4 id="reply-title" className="comment-reply-title mb-2">
                    Comments ({props.commentList.length})
                  </h4>
                  {props.commentList.map((c) => <Comment 
                    key={c.id}
                    id={c.id}
                    userProfile={c.userProfile}
                    text={c.text}  />)}
                </div>
            </section>
    </div>
  )
}


export default CommentList;