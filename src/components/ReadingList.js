import React, { useEffect, useState } from 'react'
import { GetAllReadingLists } from '../services/Requests/ReadingList'
import Reading from './Reading'
import { useParams } from 'react-router-dom'

const ReadingList = (props) => {
    const [readingLists, setReadingLists] = useState([])
    const { userProfileId } = useParams();


    useEffect(() => {
        const loadData = async () => {
            const lists = await GetAllReadingLists(userProfileId)
            setReadingLists(lists)
        }
        loadData()
    },[])


  return (
    <>
        {
            readingLists.map(r => 
                <Reading 
                key={r.id}
                id={r.id}
                name={r.name}
                image={null}
                userProfileId={props.userProfileId}
                articleCount={r.articleCount} />    
            )
        }
    </>
  )
}


export default ReadingList;