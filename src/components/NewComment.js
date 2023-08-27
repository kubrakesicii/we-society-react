import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { InsertComment } from '../services/Requests/ArticleComment';

const NewComment = (props) => {
    const activeUser = useSelector(state => state.auth.activeUser);
    const ref = useRef('')

    const [form, setForm] = useState({
        userProfileId:activeUser.userProfileId,
        articleId:props.articleId,
        text:''
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        await InsertComment(form)
        ref.current.value = '';
        props.loadComments()
    }

    return (
        <>
            {
                activeUser.id === 0 ? (
                    <p></p>
                ) : (
                    <div className="single-comment comments_wrap">
                        <section id="comments">       
                            <div className="comments-inner clr">
                                <div id="respond" className="comment-respond">
                                    <h4 id="reply-title" className="comment-reply-title mb-2">
                                        Leave a Reply
                                    </h4>
                           
                                    <div>
                                        <form
                                            id="commentform"
                                            className="comment-form"
                                            noValidate=""
                                            onSubmit={submitHandler}
                                        >
                                            <div className="row">
                                                <div className="comment-form-author col-sm-12 col-md-6">
                                                    <p className="comment-form-comment">
                                                    <label htmlFor="author">Name*</label>
                                                    <input
                                                        id="author"
                                                        disabled
                                                        style={{backgroundColor:'#dddf'}}
                                                        name="author"
                                                        type="text"
                                                        value={activeUser.fullName}
                                                        size="30"
                                                        aria-required="true"
                                                    />
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="comment-form-comment">
                                            <label htmlFor="comment">Comment *</label>
                                            <textarea
                                                ref={ref}
                                                id="comment"
                                                name="comment"
                                                cols="40"
                                                rows="5"
                                                maxLength="65525"
                                                required="required"
                                                onChange={(e) => {setForm({...form, text : e.target.value})}}
                                            ></textarea>
                                            </p>
    
                                            <p className="form-submit">
                                            <input
                                                name="submit"
                                                type="submit"
                                                id="submit"
                                                className="submit btn btn-success btn-block"
                                                value="Post Comment"
                                            />
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )  
            }
        </>
    )
}


export default NewComment;
