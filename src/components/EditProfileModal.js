import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom';
import { UpdateUserProfile } from '../services/Requests/UserProfile';
import { useSelector } from 'react-redux';

const EditProfileModal = (props) => {
    console.log("Props user : ",props);

    const activeUser = useSelector(state => state.auth.activeUser)
    const [form,setForm] = useState({
        fullName: props.userInfo.fullName,
        bio: props.userInfo.bio,
        image:props.userInfo.image
    })

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("submit handler");
        console.log("Sent form : ", form);
        var res = await UpdateUserProfile(activeUser.userProfileId,form)
        props.onModalClosedHandler()
    }

    useEffect(() => {
        setForm({
            fullName: props.userInfo.fullName,
            bio: props.userInfo.bio,
            image:[]})

            console.log("EDIT form: ", form);
    },[])


  return (
    <div className="modal fade" id="edit-modal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    
                    <div className="container">
                            <div className='registerForm'>
                                <Form onSubmit={submitHandler}>
                                    <div className='row mb-4'>
                                        <div className="author-img ml-3">
                                            <img alt="author avatar" 
                                            src={`${props.userInfo.image !== null ? `data:image/jpeg;base64,${props.userInfo.image}` : '/assets/images/default.jpg'}`}
                                            id="edit-author-avatar" />
                                        </div>  
                                        <label htmlFor="updImg" 
                                            className="btn btn-outline-success d-inline mb-auto ml-2 mr-2">
                                            Upload 
                                        </label>
                                        <input className='d-none' type='file' name='image' id='updImg' href='#' title=''
                                        // value={form.image}
                                        onChange={(e) => {setForm({...form, image:e.target.files[0]}); console.log("New img upl : ",form);}}/>

                                        <label
                                            className="btn btn-outline-success d-inline mb-auto"
                                            onClick={() => {setForm({...form,image:null}); console.log("removed existing img : ",form);}}>
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

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" onClick={submitHandler} className="btn btn-primary" data-dismiss="modal">Save changes</button>
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