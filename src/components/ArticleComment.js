import React from 'react'
import NewComment from './NewComment'
import CommentList from './CommentList'

const ArticleComment = (props) => {
  return (
    <>
        <NewComment articleId={props.articleId} />
        <div className="divider"></div>
        <CommentList articleId={props.articleId} />
    </>
  )
}

export default ArticleComment;
