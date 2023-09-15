import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import {readingListService} from "../services/readingList"

const NewReadingListModal = (props) => {
    const activeUser = useSelector(state => state.auth.activeUser)

    const [form, setForm] = useState({
        name:'',
        userProfileId:activeUser.userProfileId
    })
    

    const submitHandler = async (e) => {
        e.preventDefault()
        await readingListService.insert(form)
        props.onModalClosedHandler()
    }


  return (
    <div className="modal fade" id="create-list-modal" tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add Reading List</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                
                <div className="container">
                        <div className='registerForm'>
                            <Form onSubmit={submitHandler}>

                                <label htmlFor='name'>Name</label>
                                <input type="text" name="name"  
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    value={form.name}                                    
                                />
        
                                <div className="modal-footer">
                                    <button type="submit" onClick={submitHandler} className="btn btn-warning" data-dismiss="modal">Create</button>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
                </div>
    </div>
</div>
  )
}


export default NewReadingListModal;