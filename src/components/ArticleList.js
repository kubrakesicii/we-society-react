import Article from './Article';

function ArticleList(props){
    console.log("Article list Props : ", props.articles);
    return(
        <>
        {props.articles.map((a) => 
          <Article 
              key={a.id} 
              id={a.id} 
              category={a.category} 
              userProfile={a.userProfile} 
              title={a.title} 
              content={a.content} 
              createdTime={a.createdTime}
              mainImage={a.mainImage} />)}
      </> 
    );
}

export default ArticleList;

