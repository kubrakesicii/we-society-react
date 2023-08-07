import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom';
import { UpdateUserProfile } from '../services/Requests/UserProfile';
import { useSelector } from 'react-redux';

const EditProfileModal = (props) => {
    const activeUser = useSelector(state => state.auth.activeUser)
    const [form,setForm] = useState({
        fullName: props.userInfo.fullName,
        bio: props.userInfo.bio
    })

    const submitHandler = async (event) => {
        event.preventDefault();
        var res = await UpdateUserProfile(activeUser.userProfileId,form)
    }

    useEffect(() => {
        setForm({
            fullName: props.userInfo.fullName,
            bio: props.userInfo.bio})

            console.log("EDIT form: ", form);
    },[])


  return (
    <div class="modal fade" id="edit-modal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    
                    <div className="container">
                            <div className='registerForm'>
                                <Form onSubmit={submitHandler}>
                                    <div className='row mb-4'>
                                            <div class="author-img ml-3">
                                                <img alt="author avatar" 
                                               src={`${props.userInfo.image != "" ? `data:image/jpeg;base64,${props.userInfo.image}` : '/assets/images/default.jpg'}`}
                                                id="edit-author-avatar" />
                                            </div>  
                                            <label htmlFor="updImg" 
                                                class="btn btn-outline-success d-inline mb-auto ml-2 mr-2">
                                                Upload 
                                            </label>
                                            <input className='d-none' type='file' name='image' id='updImg' href='#' title=''/>

                                            <label htmlFor="updImg" 
                                                class="btn btn-outline-success d-inline mb-auto">
                                                Remove 
                                            </label>
                                    </div>
                                        
                                    <input type="text" hidden name="id"  
                                        value={activeUser.userProfileId}   
                                        onChange={()=>{}}                                 
                                    />
                                    <input type="text" required name="fullName" placeholder="Tam Ad giriniz.."  
                                        onChange={(e) => setForm({...form, fullName: e.target.value})}
                                        value={form.fullName}                                    
                                    />
                                    <textarea rows={3} required name="bio" placeholder="Bio Girin.." 
                                        onChange={(e) => setForm({...form, bio: e.target.value})}
                                        value={form.bio}                                    
                                    />

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Save changes</button>
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




export default EditProfileModal;