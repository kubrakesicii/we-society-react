import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import {readingListService} from "../services/readingList"
import {readingListArticleService} from "../services/readingListArticles"

const SaveArticleModal = (props) => {
  const [readingLists, setReadingLists] = useState([]);
  const activeUser = useSelector((state) => state.auth.activeUser);

  const [form, setForm] = useState({
    readingListId: 0,
    articleId: props.articleId,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setForm({ ...form, articleId: props.articleId });
    await readingListArticleService.saveArticle(form)
    props.saveHandler();
  };

  useEffect(() => {
    const loadData = async () => {
      readingListService.getAll(activeUser.userProfileId).then(({data}) => setReadingLists(data))
    };
    loadData();
  }, []);

  return (
    <div
      className="modal fade"
      id={`save-article-modal-${props.articleId}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLongTitle">
              Article will be saved to the selected reading list
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <Form onSubmit={submitHandler}>
                {readingLists.map((l) => (
                  <>
                    <div key={l.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={`check-${l.id}`}
                        onChange={(e) => {
                          console.log("Check : ", e.target.checked);
                          if (e.target.checked)
                            setForm({ ...form, readingListId: l.id });
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`check-${l.id}`}
                      >
                        {l.name}
                      </label>
                    </div>
                  </>
                ))}

                <div className="modal-footer mt-3">
                  <button
                    type="submit"
                    onClick={submitHandler}
                    className="btn btn-warning"
                    data-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveArticleModal;
