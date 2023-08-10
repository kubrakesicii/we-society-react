import React, { useEffect, useState } from 'react'
import Article from './Article';
import { GetAllArticlesByReadingList } from '../services/Requests/ReadingListArticles';
import { useSearchParams } from 'react-router-dom';

const ReadingListArticles = (props) => {
    const [listArticles, setListArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const articles = await GetAllArticlesByReadingList(searchParams.get('listId'))

            console.log("Articles : ", articles);
            console.log("list id : ", searchParams.get('listId'));
            setListArticles(articles)
            setIsLoading(false)
        }
        loadData()
    },[])

    return(
        <>
       {
        isLoading ? (
            <div>Loading</div>
        ): (
           <div className='container'>
                 <h3 className='entry-title'>{searchParams.get('name')}</h3>
                <div class="divider"></div>

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