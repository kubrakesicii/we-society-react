import React, { useEffect, useState } from 'react'
import { GetAllClappingUsers } from '../services/Requests/ArticleClap'
import FollowUser from './FollowUser'
import ClapUser from './ClapUser'

const ClapListModal = (props) => {
    const [clapUsers, setClapUsers] = useState([])
    const [totalClaps, setTotalClaps] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const loadData = async () => {
        setIsLoading(true)
        let users =  await GetAllClappingUsers(props.articleId)
        setClapUsers(users)

        let total=0;
        users.map(c => {
            total += c.count;
            setTotalClaps(total)
        }) 
        console.log("Clap users : ",clapUsers);
        setIsLoading(false)
       
    }
    
    useEffect(() => {
        if(props.showClapUserModal){
            loadData()
        }          
    },[props.showClapUserModal])


  return (
    <div className="modal fade p-5" id="clap-list-modal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLongTitle">
                        <span>
                        <svg width="30" height="30"><g fillRule="evenodd">
                            <path d="M7.94 1h-.89L7.5 2.9zM10.09 1.33l-.84-.3-.23 1.95zM5.73 1.04l-.84.3L5.97 3zM5.63 11.57a3043.52 3043.52 0 0 0-1.6-1.6C2.32 8.26 1.25 7.5 1.75 7c.25-.25.62-.3.93 0 .45.46 1.54 1.65 1.54 1.65a.69.69 0 0 0 .34.2c.17.04.36-.06.5-.2.14-.13.06-.47-.06-.6L2.94 5.98c-.29-.29-.39-.78-.08-1.09.3-.29.64-.14.9.12l2.1 2.15a.33.33 0 0 0 .24.1.42.42 0 0 0 .26-.12c.13-.12.2-.36.07-.49L5 5.2c-.56-.56-.6-.95-.36-1.2.35-.35.82-.24 1.45.48l2.8 2.95-.59-1.46s-.37-.97 0-1.17c.37-.2.74.33 1 .72l1.37 2.62a3.29 3.29 0 0 1-.57 4.05c-1.22 1.22-3.18.69-4.48-.6z"></path><path d="M11.37 4.73c-.26-.4-.7-.4-.98-.19-.19.15-.16.48-.15.7l1.18 2.07c.91 1.49 1.23 2.7.19 4.1.31-.14.4-.27.58-.49.65-.8 1.05-2.47.39-3.88a3.35 3.35 0 0 0-.03-.05l-1.18-2.26z">
                            </path></g></svg>
                        </span>
                        <b>{totalClaps}</b> claps from <b>{clapUsers.length}</b> people for "{props.title}"
                    </h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                            {clapUsers.map((u) => <ClapUser 
                                key={u.id}
                                id={u.id}
                                followId={u.userProfileId}
                                count={u.count}
                                image={u.image}
                                fullName={u.fullName}
                                bio={u.bio}  
                                loadClapData={loadData}/>)} 
                    </div>
                </div>
        </div>
    </div>
  )
}



export default ClapListModal;
