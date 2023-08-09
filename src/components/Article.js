import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

function Article(props){
    const navigate = useNavigate();

    const activeUser = useSelector(state => state.auth.activeUser)
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    useEffect(() => {
        if(activeUser.userProfileId === props.userProfileId) setIsCurrentUser(true)
    },[])

    return(
        <>
        <div className="container mb-5">
            <div className="row mb-3">
                <div className="entry-meta align-items-center">
                    <a onClick={() => {
                        console.log("user prof id : ",props.userProfile.id);
                        navigate(`/user-profile/${props.userProfile.id}`)
                        }}>
                        {props.userProfile.fullName}</a> in <a href="archive.html">{props.category.name}</a><br/>                  
                </div>
            </div>
            <div className="row mb-0"
                id="article-row"
                onClick={() => {
                    navigate(`/article-detail/${props.id}`)
                }}>                                
                <article className="justify-content-between mr-0">
                    <div className="col-md-12 ">
                        <div className="mb-1 d-flex row">
                            <div className="entry-content col-md-8 pl-md-0">
                                <h3 className="entry-title mb-3">{props.title}</h3>
                                <div className="entry-excerpt">
                                    <div dangerouslySetInnerHTML={{__html:props.content.substr(0,256).substr(0, Math.min(props.content.substr(0,256).length, props.content.substr(0,256).lastIndexOf(" ")))}}>
                                    </div>
                                </div>
                            </div>

                            <figure className="col-md-4"><a href="#">
                                {/* <img src="/assets/images/article.jpg" alt="post-title" /></a> */}
                                {/* <img src={`${props.mainImage !== null ? `data:image/jpeg;base64,${props.image}` : '/assets/images/article.jpg'}`} alt="post-title" /></a> */}
                                <img src={`${props.mainImage !== null ? `data:image/jpeg;base64,${props.mainImage}` : '/assets/images/article.jpg'}`} alt="post-title" /></a>
                            </figure>
                        </div>
                    </div>
                </article>
            </div>
            <div className="row mb-5 justify-content-between align-items-center">
                <div className="entry-meta">
                    <span>{moment().format('ll',props.createdTime)}</span>
                    <span className="middotDivider"></span>
                    <span className="readingTime" title="3 min read">5 min read</span>
                    <span className="svgIcon svgIcon--star">
                        <svg className="svgIcon-use" width="15" height="15">
                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                        </svg>
                    </span>
                </div>

                {
                     <div className="entry-meta">
                        <span className="">
                            <Link to={`/new-article?action=update&updateId=${props.id}`}>Edit Article</Link>
                        </span>       
                     </div>
                    //console.log("Current user? : ", isCurrentUser)
                    //console.log("active user? : ", activeUser.userProfileId)
                    //console.log("Article user? : ", props.userProfile.id)
                    // isCurrentUser ? (
                    //     <div className="entry-meta">
                    //         <span className="">
                    //             <Link to={`/new-article?action=update&updateId=${props.id}`}>Edit Article</Link>
                    //         </span>       
                    //     </div>
                    // ) : (<></>)
                }
                
            </div>
        </div>
        </>
    )
}



export default Article;