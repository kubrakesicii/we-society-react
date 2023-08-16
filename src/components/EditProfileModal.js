import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom';
import { UpdateUserProfile } from '../services/Requests/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { b64toBlob } from '../helpers/fileHelper';
import { authActions } from '../store/auth.slice';
import Swal from 'sweetalert2';

const EditProfileModal = (props) => {
    console.log("Props user : ",props);

    const activeUser = useSelector(state => state.auth.activeUser)
    const [form,setForm] = useState({})

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("submit handler");
        console.log("Sent form : ", form);
        var res = await UpdateUserProfile(activeUser.userProfileId,form)

        const storeImg=URL.createObjectURL(await b64toBlob(res.data.image));
        dispatch(authActions.edit({...res.data, image:storeImg}))
        props.onModalClosedHandler()

        Swal.fire({
            icon: 'success',
            title: 'Your profile has been updated!',
            showConfirmButton: false,
            timer: 1000,
            width:'20em'
        })
    }

    const dispatch = useDispatch(submitHandler)

    useEffect(() => {
        setForm({
            fullName: props.userInfo.fullName,
            bio: props.userInfo.bio,
            image:null
        })
    },[props.userInfo])


    const preview = (e) => {
        var img = document.getElementById('profile-img');
        let imgSrc = URL.createObjectURL(e.target.files[0]);
        img.src=imgSrc;
    }

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
                                            {/* <img alt="author avatar" 
                                            src={`${form.image !== null ? getImage() : props.userInfo.image !== null ? `data:image/jpeg;base64,${props.userInfo.image}` : '/assets/images/default.jpg'}`}
                                            id="edit-author-avatar" /> */}
                                                 <img alt="author avatar" 
                                                src={`${props.userInfo.image !== null ? `data:image/jpeg;base64,${props.userInfo.image}` : '/assets/images/default.jpg'}`}
                                                id="profile-img" />
                                        </div>  
                                        <label htmlFor="updImg" 
                                            className="btn btn-outline-success d-inline mb-auto ml-2 mr-2">
                                            Upload 
                                        </label>
                                        <input className='d-none' type='file' name='image' id='updImg' href='#' title=''
                                        onChange={(e) => {setForm({...form, image:e.target.files[0]}); 
                                        preview(e);}}/>

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