import { useNavigate } from "react-router-dom"

function Article(props){
    const navigate = useNavigate();

    return(
        <>
        <div className="container mb-4">
            <div className="row mb-3">
                <div className="entry-meta align-items-center">
                    <a onClick={() => {
                        console.log("user prof id : ",props.userProfile.id);
                        navigate(`/user-profile/${props.userProfile.id}`)
                        }}>
                        {props.userProfile.fullName}</a> in <a href="archive.html">{props.category.name}</a><br/>                  
                </div>
            </div>
            <div className="row" id="article-row"
                onClick={() => {
                    navigate(`/article-detail/${props.id}`)
                }}>
                <article className="row justify-content-between mb-3 mr-0">
                    <div className="col-md-9 ">
                        <div className="align-self-center">
                            <h3 className="entry-title mb-3"><a href="single.html">{props.title}</a></h3>
                            <div className="entry-excerpt">
                                <div dangerouslySetInnerHTML={{__html:props.content.substr(0,256).substr(0, Math.min(props.content.substr(0,256).length, props.content.substr(0,256).lastIndexOf(" ")))}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 bgcover" style={{backgroundImage:`url(${'assets/images/thumb/thumb-512x512-2.jpg'})`}}></div>
                </article>
            </div>
            <div className="row  mb-5">
                <div className="entry-meta align-items-center">
                    <span>{props.createdTime}</span>
                    <span className="middotDivider"></span>
                    <span className="readingTime" title="3 min read">5 min read</span>
                    <span className="svgIcon svgIcon--star">
                        <svg className="svgIcon-use" width="15" height="15">
                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}



export default Article;