import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import SaveArticleModal from "./SaveArticleModal";
import { GetIsSaved, UndoSaveArticleToReadingList } from "../services/Requests/ReadingListArticles";
import Swal from "sweetalert2";
import { DeleteArticle } from "../services/Requests/Article";

function Article(props){
    const navigate = useNavigate();

    const activeUser = useSelector(state => state.auth.activeUser)
    const [isOwner, setIsOwner] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [savedId, setSavedId] = useState(0)
    const [articleId, setArticleId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const undoSaveHandler = async() => {
        console.log("SavedID : ", savedId);
        await UndoSaveArticleToReadingList(savedId)
        load()
    }

    const load = async () => {
        setIsLoading(true)
        console.log("LOAD AGAIN");
        setArticleId(props.id)
        const savedData = await GetIsSaved(activeUser.userProfileId, props.id)

        console.log("ArticleId : ",props.id);
        console.log("IsSaved data : ",savedData.isSaved);
        console.log("IsSaved id : ",savedData.id);

        setIsSaved(savedData.isSaved)
        setSavedId(savedData.id)
        setIsLoading(false)
    }

    useEffect(() => {
        console.log("Run again");
        if(activeUser.userProfileId === props.userProfile.id) setIsOwner(true)
        load()
    },[])

    
    const deleteArticleHandler = () => {
        //Swal are you sure cıkar ok ise del request
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await DeleteArticle(props.id)
                if(res.message === 'OK') {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }          
            }
          })
    }

    return(
        <>
        {
            isLoading ? (
                <div></div>
            ) : (
                <div className="container mb-5">
                <div className="row mb-3">
                    <div className="entry-meta col-12">
                        <a onClick={() => {
                            console.log("user prof id : ",props.userProfile.id);
                            navigate(`/user-profile/${props.userProfile.id}/tabs`)
                            }}>
                            {props.userProfile.fullName}</a> in <a  onClick={() => {
                                navigate(`/home?categoryId=${props.category.id}&categoryName=${props.category.name}`)
                            }}>{props.category.name}</a><br/>                  
                    </div>
                </div>
                <div className="row mb-2"
                    style={{height:'150px'}}
                    id="article-row"
                    onClick={() => {
                        if(props.isPublished === -1) navigate(`/new-article?action=update&updateId=${props.id}`)
                        else {
                            navigate(`/article-detail/${props.id}`)
                        }
                    }}>                                
                    <article className="col-12">
                        <div className="row p-0" >
                            <div className="mb-1 col-9">
                                <h3 className="entry-title mb-3">{props.title}</h3>
                                <div className="entry-excerpt">
                                    {/* <div dangerouslySetInnerHTML={{__html:props.content.substr(0,256).substr(0, Math.min(props.content.substr(0,256).length, props.content.substr(0,256).lastIndexOf(" ")))}}>
                                    </div> */}
                                    <div className="line-clamp-3" dangerouslySetInnerHTML={{__html:props.content}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <figure><a href="#">
                                    {/* <img src="/assets/images/article.jpg" alt="post-title" /></a> */}
                                    {/* <img src={`${props.mainImage !== null ? `data:image/jpeg;base64,${props.image}` : '/assets/images/article.jpg'}`} alt="post-title" /></a> */}
                                    <img src={`${props.mainImage !== null ? `data:image/jpeg;base64,${props.mainImage}` : '/assets/images/article.jpg'}`} alt="post-title" /></a>
                                </figure>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="d-flex justify-content-end mb-5 align-items-center">
                    <div className="mr-auto p-2">
                        <div className="entry-meta">
                            <span>{moment().format('ll',props.createdTime)}</span>
                        </div>               
                    </div>
                    <div className="p-2">
                        {
                            !isSaved ? (
                                // Save icon
                                <span className="svgIcon svgIcon--star ml-5">
                                    <Link data-toggle="modal" data-target={`#save-article-modal-${articleId}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mw">
                                            <path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000">
                                            </path>
                                        </svg>
                                    </Link>                        
                                </span>
                            ) : (
                                /* Already saved icon */
                               <Link onClick={undoSaveHandler}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="aij">
                                        <path d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z" fill="#000">
                                        </path>
                                    </svg>
                                </Link>
                            )
                        }
                    </div>
                    <div>
                        <SaveArticleModal articleId={articleId} saveHandler={load} />
                    </div>
                    <div className="p-2">
                        {
                        //  Edit button only if the current user is the owner of article
                            isOwner ? (
                            <div className="entry-meta">
                                <span className="mr-3">
                                    <Link to={`/new-article?action=update&updateId=${props.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </Link>
                                </span>  
                                {/* <span>
                                    <Link onClick={deleteArticleHandler}>
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                        </svg>
                                    </Link>
                                </span>      */}
                            </div>
                        )  : (
                            <div></div>
                        )          
                        }
                    </div>
    
                </div>       
            </div>
            )
        }
        </>
    )
}



export default Article;