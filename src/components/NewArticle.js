import React, { useEffect, useState } from 'react'
import { GetArticleDetail, InsertArticle, UpdateArticle } from '../services/Requests/Article';
import { useSelector } from 'react-redux';
import { GetAllCategories } from '../services/Requests/Category';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import Loader from './Loader';
import { ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import Cropper from 'react-easy-crop';
import * as Yup from "yup";

const NewArticle = () => {
    const activeUser = useSelector(state => state.auth.activeUser)
    const [categories,setCategories]  = useState([])
    const [article,setArticle]  = useState({mainImage:null})
    const [uploadedImage, setUploadedImage] = useState('/assets/images/noimg.jpg')

    const [crop, setCrop] = useState({
        x:100,y:200
    })

    const navigate = useNavigate()
    const [form, setForm] = useState({
        title:'',
        content:'',
        isPublished:-1,
        categoryId:-1,
        userProfileId:-1,
        mainImage:null
    })
    const [isLoading,setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [errors,setErrors] = useState([])

    // const {action} = searchParams.get('action')

    const updateLoad = async () => {
        setIsLoading(true)
        const categories = await GetAllCategories()
        setCategories(categories)
        const article = await GetArticleDetail(searchParams.get('updateId'))

        setArticle(article)
        console.log("updating art : ", article);
        setForm({
            ...form,
            userProfileId:activeUser.userProfileId, 
            title:article.title,
            content:article.content,
            categoryId:article.category.id,
            mainImage:article.mainImage,
            isPublished:article.isPublished
        })
        setIsLoading(false)

        console.log("Upd form : ",form);
    }
        
    const insertLoad = async () => {
        setIsLoading(true)
        const categories = await GetAllCategories()
        setCategories(categories)
        setForm({...form, userProfileId:activeUser.userProfileId})
        setIsLoading(false)
    }

    useEffect(() => {
        if(searchParams.get('action') === 'update') {
            updateLoad()
        }
        else{
            insertLoad()
        }
    },[])
    
    const newArticleValidationSchema = Yup.object({
        title: Yup.string().min("Title must longer than 10 character").required("Please enter title"),
        content: Yup.string().required("Content is required")
    })
    const submitHandler = async (e) => {
        e.preventDefault();
        if(searchParams.get('action') === 'insert'){
            try{
                await newArticleValidationSchema.validate(form,{abortEarly:false})
            } catch(errors){
                setErrors(errors.errors)
            }
    
            var res = await InsertArticle({...form, isPublished:1})
            if(res.message === 'OK') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your article has been published!',
                    showConfirmButton: false,
                    timer: 1500
                })

                navigate(`/user-profile/${activeUser.userProfileId}/tabs#latest`)
            }
        } else if(searchParams.get('action') === 'update') {
            var res = await UpdateArticle(searchParams.get('updateId'),{...form, isPublished:1})

            if(res.message === 'OK') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your article has been updated!',
                    showConfirmButton: false,
                    timer: 1500
                })

                navigate(`/user-profile/${activeUser.userProfileId}/tabs#latest`)
            }
        }
    }

    const saveDraftHandler = async (e) => {
        e.preventDefault();
        var res = await InsertArticle({...form, isPublished:-1})
        if(res.message === 'OK') navigate(`/user-profile/${activeUser.userProfileId}/tabs#drafts`)
    }

    const preview = (e) => {
        var img = document.getElementById('main-img');
        let imgSrc = URL.createObjectURL(e.target.files[0]);
        setUploadedImage(imgSrc)
        //img.src=imgSrc;
    }

    const handleOnCropChange = (crop) => {
        setCrop(crop)
        console.log("Crop on : ",crop);
    }

    return(
        <>
            {isLoading ? (
                <Loader />
        ) : (
                <>
            <div className='container p-3 mb-5'>
                <div className='row mb-5 p-4'>
                   <div className='col-6'>
                            {/* <img src={`${article.mainImage !== null ? `data:image/png;base64,${article.mainImage}` : '/assets/images/default.jpg'}`}
                            id='main-img' /> */}

                            <div style={{width:'300px',height:'250px'}}>
                                 <Cropper
                                    image={uploadedImage}
                                    crop={crop}
                                    onCropChange={handleOnCropChange}
                                    aspect={16/9}
                                    />                                                                                        
                            </div>
                     

                   </div>
                   <div className='col-6 align-self-center'>
                        <label htmlFor="updImg" className="btn btn-success align-center"> Upload Main Image </label>
                        <input className='d-none' type='file' name='image' id='updImg' 
                        onChange={(e) => {
                            setForm({...form, mainImage:e.target.files[0]}); 
                            preview(e)
                            }} />
                   </div>
                </div>

                <h3 className='mb-5'>Publish your article with WeSociety!</h3>
                <div>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title"
                                value={form.title}
                                onChange={(e) => {setForm({...form, title:e.target.value})}}/>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="categoryId">Category  {form.categoryId}</label>
                            <select className="form-select" aria-label="Default select example" id='categoryId' 
                            value={form.categoryId}
                            onChange={(e) => {setForm({...form, categoryId:e.target.value}); console.log("Selected : ",e.target.value);}}>
                                {categories.map((c) => {
                                    return(
                                        <option key={c.id} value={c.id}>{c.id} {c.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <CKEditor
                                id='content'
                                editor={ClassicEditor}
                                data={form.content}
                                placeholder="<h2>Write...</h2>"
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );

                                    editor.ui.view.editable.element.style.height="500px"
                                    // editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                    //     return new UploadAdapter(loader)
                                    // }
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setForm({...form, content:data})
                                    console.log( { event, editor, data } );

                                    if(searchParams.get('action') === 'insert'){
                                        document.getElementById('submit-btn').removeAttribute('disabled')
                                        //document.getElementById('draft-btn').removeAttribute('disabled')
                                    }

                                    console.log("FORM : ", form);
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />

                            <div id='editor'></div>
                        </div>

                        <div className='container'>

                        {/* Error Row */}
                        <div className='row'>                          
                            {
                                errors.length > 0 ? (
                                    errors.map(e => 
                                        <p className="text-danger">{e} !</p>
                                    )
                                ) : (
                                    <p></p>
                                )
                            }
                        </div>
                        <div className='row'>
                                <div className="col-md-12 bg-light text-right">
                                    {
                                        searchParams.get('action') === 'insert' ? (
                                            <>
                                                <button type="submit" className="btn btn-success mr-4" id='submit-btn' disabled value="">Publish</button>             
                                                <button type="button" id='draft-btn' onClick={(e) => {
                                                    console.log("save draft clicked");
                                                    saveDraftHandler(e)
                                                }} className="btn btn-outline-warning">Save Draft</button>   
                                            </>
                                        ) : (
                                            <>
                                            <button type="submit" className="btn btn-outline-warning" id='submit-btn' value="">Save Changes</button>      
                                           
                                            {
                                                form.isPublished === -1 ? (
                                                <button type="submit" className="btn btn-success ml-4" id='submit-btn' value="">Publish</button>      
                                            ) : (<div></div>)    
                                            }
                                            </>                                          
                                        )
                                    }
                                </div>                            
                        </div>
                        </div>     
                    </form> 
                </div>

            </div>

            <div className='container p-3'>
                
            </div>
                </>
            )
            }
        </>
    )
}

export default NewArticle;