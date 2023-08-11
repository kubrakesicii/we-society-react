import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import SaveArticleModal from "./SaveArticleModal";

function Article(props){
    const navigate = useNavigate();

    const activeUser = useSelector(state => state.auth.activeUser)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        if(activeUser.userProfileId === props.userProfile.id) setIsOwner(true)
    },[])

    return(
        <>
        <div className="container mb-5">
            <div className="row mb-3">
                <div className="entry-meta align-items-center">
                    <a onClick={() => {
                        console.log("user prof id : ",props.userProfile.id);
                        navigate(`/user-profile/${props.userProfile.id}/tabs`)
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
                        <div className="mb-1 d-flex row justify-content-between">
                            <div className="col-md-8 pl-md-0">
                                <h3 className="entry-title mb-3">{props.title}</h3>
                                <div className="entry-excerpt">
                                    <div dangerouslySetInnerHTML={{__html:props.content.substr(0,256).substr(0, Math.min(props.content.substr(0,256).length, props.content.substr(0,256).lastIndexOf(" ")))}}>
                                    </div>
                                </div>
                            </div>

                           <div className="col-md-4">
                                <figure className="align-self-center"><a href="#">
                                    {/* <img src="/assets/images/article.jpg" alt="post-title" /></a> */}
                                    {/* <img src={`${props.mainImage !== null ? `data:image/jpeg;base64,${props.image}` : '/assets/images/article.jpg'}`} alt="post-title" /></a> */}
                                    <img src={`${props.mainImage !== null ? `data:image/jpeg;base64,${props.mainImage}` : '/assets/images/article.jpg'}`} alt="post-title" /></a>
                                </figure>
                           </div>
                        </div>
                    </div>
                </article>
            </div>
            <div class="d-flex bd-highlight mb-5 align-items-center">
                <div className="me-auto p-2">
                    <div className="entry-meta">
                        <span>{moment().format('ll',props.createdTime)}</span>
                        <span className="middotDivider"></span>
                        <span className="readingTime" title="3 min read">5 min read</span>
                    
                    </div>               
                </div>
                <div className="p-2">
                    <span className="svgIcon svgIcon--star ml-5">
                        <Link data-toggle="modal" data-target="#save-article-modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </Link>                        
                    </span>
                </div>
                <div>
                <SaveArticleModal articleId={props.id} />
                </div>
                <div className="p-2">
                    {
                    // Save Edit button only if the current user is the owner of article
                        isOwner ? (
                        <div className="entry-meta">
                            <span className="">
                                <Link to={`/new-article?action=update&updateId=${props.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </Link>
                            </span>       
                            </div>
                    )  : (
                        <div></div>
                    )          
                    }
                </div>

            </div>       
        </div>
        </>
    )
}



export default Article;