import { Link, useNavigate } from 'react-router-dom';
import Article from './Article';

function ArticleList(props){
    const navigate = useNavigate()

    console.log("Article list Props : ", props.articles);
    return(
        <>
        {
          props.articles.length == 0 ? (
            <>
            <div className='container align-items-center'>
              <div>
                <img src='/assets/images/nocontent.png' />
              </div>
                {/* <button onClick={() => {
                  navigate('/new-article?action=insert')
                }} className="btn btn-outline-success">Write Your First Article</button> */}
            </div>
            
            </>
          ) : (
            props.articles.map((a) => 
          <Article 
              key={a.id} 
              id={a.id} 
              category={a.category} 
              userProfile={a.userProfile} 
              title={a.title} 
              content={a.content} 
              createdTime={a.createdTime}
              isPublished={a.isPublished}
              mainImage={a.mainImage} />)
          )
        }
      </> 
    );
}

export default ArticleList;

