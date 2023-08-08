import React from 'react'
import RelatedArticle from './RelatedArticle';

const RelatedArticleList = (props) => {
    console.log("rel list : ",props.relatedArticles);



  return (
    <div className="related-posts mb-5">
        <h4 className="spanborder text-center">
            <span>Related Posts</span>
        </h4>
        <div className="row justify-content-between">
             <div className="divider-2"></div>
             {props.relatedArticles.map((a) => <RelatedArticle
                key={a.id}
                article={a}
             />)}


        </div>
    </div>
  )
}


export default RelatedArticleList;
