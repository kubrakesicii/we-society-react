import React, { useEffect, useState } from 'react'
import { GetAllArticleDraftsByUser, GetAllArticlesByUser } from '../services/Requests/Article'
import ArticleList from './ArticleList'

const ProfileTabContent = (props) => {
    const [articlesByUser,setArticles]  = useState([])
    const [userDrafts,setUserDrafts]  = useState([])
    const [userReadingLists,setUserReadingLists]  = useState([])

    const [selectedTab, setSelectedTab] = useState(1)

    useEffect(() => {
        const loadData = async() => {
                const [articles, userDrafts,userReadingLists] = await Promise.all([
                    GetAllArticlesByUser(props.userProfileId,1,20),
                    GetAllArticleDraftsByUser(props.userProfileId,1,20),
                ])
                setArticles(articles.items)
                setUserDrafts(userDrafts.items)
        }
        loadData()
    }, [props.userProfileId])


  return (
    <>
    {/* PROFILE TABS */}
        <ul className="nav nav-tabs mb-5" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <a onClick={() => {setSelectedTab(1);}} 
                className={`nav-link ${selectedTab === 1 ? 'active' : ''}`} id="latest-tab" data-bs-toggle="tab" data-bs-target="#latest" type="button" role="tab" aria-controls="latest" aria-selected="true">Latest Posts</a>
            </li>

            {
                props.isCurrentUser && (
                    <li className="nav-item" role="presentation">
                    <a onClick={() => {setSelectedTab(2)}} 
                    className={`nav-link ${selectedTab === 2 ? 'active' : ''}`} id="drafts-tab" data-bs-toggle="tab" data-bs-target="#draft" type="button" role="tab" aria-controls="draft" aria-selected="false">Drafts</a>
                </li>
                )
            }

            <li className="nav-item" role="presentation">
                <a onClick={() => {setSelectedTab(3)}} 
                className={`nav-link ${selectedTab === 3 ? 'active' : ''}`} id="reading-tab" data-bs-toggle="tab" data-bs-target="#reading" type="button" role="tab" aria-controls="reading" aria-selected="false">Reading List</a>
            </li>
        </ul>

        {
            selectedTab === 1 && (
                <ArticleList articles={articlesByUser}/>
            )
        }
        {
            selectedTab === 2 && (
                <ArticleList articles={userDrafts}/>
            )
        }
        {
            selectedTab === 3 && (
                <ArticleList articles={articlesByUser}/>
            )
        }

    </>
    )
}


export default ProfileTabContent;