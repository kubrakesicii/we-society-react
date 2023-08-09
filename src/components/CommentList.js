import React, { useEffect, useState } from 'react'
import { GetCommentsByArticle } from '../services/Requests/ArticleComment'
import Comment from './Comment'

const CommentList = (props) => {
    const [commentList, setCommentList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
      var comments = await GetCommentsByArticle(props.articleId)
      setCommentList(comments)
    }
    useEffect(() => {
      setIsLoading(true)
      loadData()

      setIsLoading(false)

      console.log("Comment List : ", commentList);
    }, [])
  return (
    <>
     {isLoading && commentList.length > 0? (
        <div>Is Loading</div>
      ) : (
        <>
         <div className="single-comment comments_wrap mt-5">
            <section id="comments">       
                <div className="comments-inner clr"> 
                  <h4 id="reply-title" className="comment-reply-title mb-2">
                    Comments ({commentList.length})
                  </h4>
                  {commentList.map((c) => <Comment 
                    key={c.id}
                    id={c.id}
                    userProfile={c.userProfile}
                    text={c.text}  />)}
                </div>
            </section>
        </div>
        </>
      )
      }
    </>
  )
}


export default CommentList;