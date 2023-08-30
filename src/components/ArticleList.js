import { Link, useNavigate } from 'react-router-dom';
import Article from './Article';
import Loader from './Loader';

function ArticleList(props){
    const navigate = useNavigate()
    return(
        <>
        {
          props.articles.length == 0 ? (
            <div>--- No Articles found! ---</div>
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
              mainImage={a.mainImage} />
              )
          )
        }
      </> 
    );
}

export default ArticleList;

