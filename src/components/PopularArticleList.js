import React from 'react'
import PopularArticle from './PopularArticle'

export default function PopularArticleList(props) {
  return (
    <div className="col-md-4 pl-md-5 sticky-sidebar">
        <div className="sidebar-widget latest-tpl-4">
            <h4 className="spanborder">
                <span>Popular Articles</span>
            </h4>
            <ol>
                {props.popularArticles.map((popArticle,ind) => 
                    <PopularArticle 
                        order={ind+1} 
                        key={popArticle.id}
                        id={popArticle.id}
                        category={popArticle.category}
                        userProfile={popArticle.userProfile}
                        title={popArticle.title}
                        content={popArticle.content}
                        mainImage={popArticle.mainImage}
                        createdTime={popArticle.createdTime} />)}

            </ol>
        </div>
    </div>
  )
}
