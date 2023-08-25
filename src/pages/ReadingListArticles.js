import React, { useEffect, useState } from 'react'
import Article from '../components/Article';
import { GetAllArticlesByReadingList } from '../services/Requests/ReadingListArticles';
import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';

const ReadingListArticles = (props) => {
    const [listArticles, setListArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()
    const { readingListId } = useParams()
    const { name } = useParams()


    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const articles = await GetAllArticlesByReadingList(readingListId)
            setListArticles(articles)
            setIsLoading(false)
        }
        loadData()
    },[])

    return(
        <>
       {
        isLoading ? (
             <Loader />
            ): (
           <div className='container'>
                 <h3 className='entry-title'>{name}</h3>
                <div className="divider"></div>

             {
                listArticles.map((a) => 
                <Article 
                    key={a.id} 
                    id={a.id} 
                    category={a.category} 
                    userProfile={a.userProfile} 
                    title={a.title} 
                    content={a.content} 
                    createdTime={a.createdTime}
                    mainImage={a.mainImage} />)
             }
           </div>
        )
       }
      </> 
    );
}


export default ReadingListArticles;