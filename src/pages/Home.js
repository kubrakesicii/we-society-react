import { useSearchParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import Pagination from "../components/Pagination";
import PopularArticleList from "../components/PopularArticleList";

import { categoryService } from "../services/category";
import { articleService } from "../services/article";


const Home = () => {
    const [articles,setArticles]  = useState([])
    const [categories,setCategories]  = useState([])
    const [popularArticles,setPopularArticles]  = useState([])

    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [pageIndex, setPageIndex] = useState(1)

    const [selectedCategoryId, setSelectedCategoryId] = useState(0)

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
                await Promise.all([
                    articleService.getAll(pageIndex,pageSize,selectedCategoryId).then(({data}) => {
                        setArticles(data.items)
                    }),
                    categoryService.getAll().then(({data}) => {
                        setCategories(data);
                      }),
                    articleService.getAllPopulars(selectedCategoryId).then(({data}) => {
                        setPopularArticles(data)
                    }),
                ]);
                setPageCount(Math.ceil(articles.count/pageSize))
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