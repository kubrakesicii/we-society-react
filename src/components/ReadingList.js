import React, { useEffect, useState } from "react";
import { GetAllReadingLists } from "../services/Requests/ReadingList";
import Reading from "./Reading";
import { useNavigate, useParams } from "react-router-dom";
import NewReadingListModal from "./NewReadingListModal";
import { useSelector } from "react-redux";

const ReadingList = (props) => {
  const [readingLists, setReadingLists] = useState([]);
  const { userProfileId } = useParams();
  const activeUser = useSelector(state => state.auth.activeUser)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  const navigate = useNavigate()

  const loadData = async () => {
    const lists = await GetAllReadingLists(userProfileId);
    setReadingLists(lists);
  };

  const onModalClosedHandler = () => {
    console.log("modal close handler");
    loadData()
}

  useEffect(() => {
    loadData();
    if(activeUser.userProfileId == userProfileId) setIsCurrentUser(true)
  }, []);

  return (
    <>      
        {
            isCurrentUser ? (
                <div className="container mb-4">
                <div className="row d-flex justify-content-end" id="add-list-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-square"
                    viewBox="0 0 16 16"
                    data-toggle="modal" data-target="#create-list-modal"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
              </div>
            ) : (
                <div></div>
            )
        }

        <NewReadingListModal onModalClosedHandler={onModalClosedHandler}/>

        {
           readingLists.length == 0 ? (
            <div>
              <img src='/assets/images/nocontent.png' />
            </div>
          ) : (
            readingLists.map((r) => (
              <Reading
                key={r.id}
                id={r.id}
                name={r.name}
                image={null}
                userProfileId={props.userProfileId}
                articleCount={r.articleCount}
              />
            ))
          )
        }
    </>
  );
};

export default ReadingList;
