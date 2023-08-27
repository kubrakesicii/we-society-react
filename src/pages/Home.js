import { useSearchParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import {GetAllArticles, GetAllPopularArticles} from '../services/Requests/Article'
import { GetAllCategories } from "../services/Requests/Category";
import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import Pagination from "../components/Pagination";
import PopularArticleList from "../components/PopularArticleList";

const Home = () => {
    const [articles,setArticles]  = useState([])
    const [categories,setCategories]  = useState([])
    const [popularArticles,setPopularArticles]  = useState([])

    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [pageIndex, setPageIndex] = useState(1)

    const [selectedCategoryId, setSelectedCategoryId] = useState(0)
    const [searchKey, setSearchKey] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const pageIndexHandler = (pageInd) => setPageIndex(pageInd)
    const selectedCategoryHandler = (categoryId) => {
        setSelectedCategoryId(categoryId)
        setPageIndex(1)
    }

    useEffect(() => {
        if(searchParams.get('categoryId') != null) setSelectedCategoryId(searchParams.get('categoryId'))

        const loadData = async() => {
                setIsLoading(true)
                const [articles,categories, popularArticles] = await Promise.all([
                    GetAllArticles(pageIndex,pageSize,selectedCategoryId,searchKey),
                    GetAllCategories(),
                    GetAllPopularArticles(selectedCategoryId)
                ]);

                setPageCount(Math.ceil(articles.count/pageSize))
                setArticles(articles.items)
                setCategories(categories)
                setPopularArticles(popularArticles)
                setIsLoading(false)           
        }

        loadData()
    }, [pageIndex,selectedCategoryId])

    return(
        <div className="section-featured featured-style-1">
        <div className="content-widget">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                    <CategoryList categories={categories} selectedCategoryHandler={selectedCategoryHandler} />
                        <h2 className="spanborder h4">
                            <span>Most Recent</span>
                        </h2>
                        <ArticleList articles={articles}/> 
                        <Pagination count={pageCount} pageIndexHandler={pageIndexHandler}  />
                    </div>

                    <PopularArticleList popularArticles={popularArticles}/>  
                </div>
            </div>
        </div>
    </div>
    )
}


export default Home;