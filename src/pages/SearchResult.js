import React, { useEffect, useState } from 'react'
import PopularArticleList from '../components/PopularArticleList'
import Loader from '../components/Loader'
import FollowUser from '../components/FollowUser'
import {searchService} from "../services/search"
import {articleService} from "../services/article"

const SearchResult = () => {
    const [popularArticles,setPopularArticles]  = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchKey, setSearchKey] = useState()
    const [searchResults, setSearchResults] = useState({articles:[],useres:[]})

    useEffect(() => {
        const loadData = async() => {  
            setIsLoading(true)
            const queryParams = new URLSearchParams(window.location.search)
            setSearchKey(queryParams.get("key"))
  
            await Promise.all([
                articleService.getAllPopulars(0).then(({data}) => setPopularArticles(data)),
                searchService.search(queryParams.get("key")).then(({data}) => setSearchResults(data))
            ]);
            setIsLoading(false)           
        }

        loadData()
    }, [])
  return (
    <>
     {
        isLoading ? (
            <Loader />
        ) : (
            <div className="section-featured featured-style-1">
                <div className="content-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="spanborder h4 mb-5">
                                    <span className='text-secondary'>Search Result for</span> <span>'{searchKey}' ...</span>
                                </h2>
            
                                <h4>Articles</h4>
                                <div className="divider"></div>
                                {
                                    searchResults.articles.length == 0 ? (
                                        <div>No articles found</div>
                                    ) : (
                                        searchResults.articles.map(a => 
                                            <>
                                                <a href='#'>
                                                <article className="col-12">
                                                    <div className="row p-0">
                                                        <div className="mb-1 col-9">
                                                        <h3 className="entry-title mb-3">{a.title}</h3>
                                                        <div className="entry-excerpt">
                                                            <div
                                                            className="line-clamp-3"
                                                            dangerouslySetInnerHTML={{ __html: a.content }}
                                                            ></div>
                                                        </div>
                                                        </div>
                                                        <div className="col-3">
                                                        <figure>
                                                            <a href="#">                                                  
                                                            <img
                                                                src='/assets/images/article.png'
                                                                alt="post-title"
                                                            />
                                                            </a>
                                                        </figure>
                                                        </div>
                                                    </div>
                                                </article>     

                                                </a>               
                                            </>    
                                        )
                                    )
                                }
            
                                <h4>Users</h4>
                                <div className="divider"></div>
                                {
                                    searchResults.users.length == 0 ? (
                                        <div>No users found</div>
                                    ) : (
                                        
                                        searchResults.users.map(u => 
                                            <>
                                                <a href="#">
                                                    <FollowUser
                                                        key={u.userd}
                                                        id={u.userId}
                                                        followId={u.userId}
                                                        image={null}
                                                        fullName={u.fullName}
                                                        bio={u.bio}  
                                                    />
                                                </a>
                                            </>    
                                        )
                                    )
                                }
                                
                            </div>
            
                            <PopularArticleList popularArticles={popularArticles}/>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    </>
  )
}


export default SearchResult;