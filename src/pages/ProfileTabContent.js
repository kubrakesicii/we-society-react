import React, { useEffect, useState } from 'react'
import ArticleList from '../components/ArticleList'
import ReadingList from '../components/ReadingList'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { articleService } from "../services/article";

const ProfileTabContent = (props) => {
    const [articlesByUser,setArticles]  = useState([])
    const [userDrafts,setUserDrafts]  = useState([])
    const [selectedTab, setSelectedTab] = useState(1)
    const { userProfileId } = useParams();
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const activeUser = useSelector(state => state.auth.activeUser)
    
    useEffect(() => {
        if(activeUser.userProfileId == userProfileId) setIsCurrentUser(true)
        const loadData = async() => {
            await Promise.all([
                articleService.getAllByUser(1,20,userProfileId).then(({data}) => setArticles(data.items)),
                articleService.getAllDraftsByUser(1,20,userProfileId).then(({data}) => setUserDrafts(data.items)),
            ])
        }
        loadData()
    }, [userProfileId])


  return (
    <>
    {/* PROFILE TABS */}
        <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <a onClick={() => {setSelectedTab(1);}} 
                className={`nav-link ${selectedTab === 1 ? 'active' : ''}`} id="latest-tab" href='#latest' data-bs-toggle="tab" data-bs-target="#latest" type="button" role="tab" aria-controls="latest" aria-selected="true">Latest Articles</a>
            </li>

            {
                isCurrentUser && (
                    <li className="nav-item" role="presentation">
                    <a onClick={() => {setSelectedTab(2)}} 
                    className={`nav-link ${selectedTab === 2 ? 'active' : ''}`} href='#drafts' id="drafts-tab" data-bs-toggle="tab" data-bs-target="#draft" type="button" role="tab" aria-controls="draft" aria-selected="false">Drafts</a>
                </li>
                )
            }

            <li className="nav-item" role="presentation">
                <a onClick={() => {setSelectedTab(3)}} 
                className={`nav-link ${selectedTab === 3 ? 'active' : ''}`} id="reading-tab" href='#lists' data-bs-toggle="tab" data-bs-target="#reading" type="button" role="tab" aria-controls="reading" aria-selected="false">Reading List</a>
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
                <ReadingList userProfileId={props.userProfileId}/>
            )
        }

    </>
    )
}


export default ProfileTabContent;