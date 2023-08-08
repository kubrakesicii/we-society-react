import React, { useEffect, useState } from 'react'
import { GetArticleDetail, InsertArticle, UpdateArticle } from '../services/Requests/Article';
import { useSelector } from 'react-redux';
import { GetAllCategories } from '../services/Requests/Category';
import { useSearchParams } from 'react-router-dom';
import { UPLOAD_IMAGE } from '../helpers/fileHelper';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
//  import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
//  import { Image } from '@ckeditor/ckeditor5-image';
// import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
// import { Link } from '@ckeditor/ckeditor5-link';
// import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';


const NewArticle = () => {
    const activeUser = useSelector(state => state.auth.activeUser)
    const [categories,setCategories]  = useState([])
    const [article,setArticle]  = useState({})

    const [form, setForm] = useState({
        image:'',
        title:'',
        content:'',
        isPublished:-1,
        categoryId:-1,
        userProfileId:-1
    })
    const [isPublished,setIsPublished] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    // const {action} = searchParams.get('action')

    const HANDLE_IMAGE_ADDED = async(file, Editor, cursorLocation, resetUploader) => {
        const url = await UPLOAD_IMAGE(file);
        if (url) {
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        } else {
          this.SET_ALERT_BOX("danger", this.$t("imageCouldntUpload"));
        }
    }


    useEffect(() => {
        const updateLoad = async () => {
            console.log("Upload :", searchParams.get('updateId'));
            const categories = await GetAllCategories()
            setCategories(categories)
           const article = await GetArticleDetail(searchParams.get('updateId'))

           console.log("Article : ",article);

            setForm({
                ...form,
                userProfileId:activeUser.userProfileId, 
                title:article.title,
                content:article.content,
                categoryId:article.category.id
            })
            console.log("Form : ",form);
        }
        
        const load = async () => {
            const categories = await GetAllCategories()
            setCategories(categories)
            setForm({...form, userProfileId:activeUser.userProfileId})
        }
        load()
        if(searchParams.get('action') === 'update') {
            console.log("Upd load");
            updateLoad()
        }
        else{
            load()
        }
    },[])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        setForm({...form, isPublished:1})

        if(searchParams.get('action') === 'insert'){
            var res = await InsertArticle(form)
        } else if(searchParams.get('action') === 'update') {
            console.log("Update submit");
            var res = await UpdateArticle(searchParams.get('updateId'),form)
        }
        console.log("form: : ", form);
    }

    const saveDraftHandler = async (e) => {
        e.preventDefault();
        setForm({...form, isPublished:0})
        console.log("form: : ", form);

        var res = await InsertArticle(form)
    }

    const editorConfiguration = {
        // plugins: [ Image,EasyImage, Bold, Italic, Essentials ],
        plugins: [ Image],
        toolbar: {
            items:[ 'bold', 'italic','heading','|','link','bulletedList','numberedList','|','outdent','indent','|','imageUpload','blockQuote',
            'insertTable','mediaEmbed','undo','redo','alignment','code','codeBlock','findAndReplace','fontColor','fontFamily','fontSize','fontBackgroundColor',
            'hihglight','horizontalLine','htmlEmbed','imageInsert' ]
        },
        image: {
            toolbar: [
                'imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline','imageStyle:block','imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn','tableRow','mergeTableCells'
            ]
        }
    };

    return(
        <div className='container'>
            <h3 className='mb-5'>Publish your article with WeSociety!</h3>
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
                        // config={editorConfiguration}
                        config={
                            {
                                ckfinder:{
                                    uploadUrl:'/uploads'
                                }
                            }
                        }
                        data={form.content}
                        placeholder="<h2>Write...</h2>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );

                            editor.ui.view.editable.element.style.height="500px"
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setForm({...form, content:data})
                            console.log( { event, editor, data } );

                            if(searchParams.get('action') === 'insert'){
                                document.getElementById('submit-btn').removeAttribute('disabled')
                                document.getElementById('draft-btn').removeAttribute('disabled')
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
                </div>

                <div className='container'>
                   <div className='row'>
                        <div className="col-md-12 bg-light text-right">
                            {
                                searchParams.get('action') === 'insert' ? (
                                    <>
                                        <button type="submit" className="btn btn-success mr-4" id='submit-btn' disabled value="">Publish</button>             
                                        <button type="button" onClick={saveDraftHandler} className="btn btn-outline-success" id='draft-btn' disabled value="">Save Draft</button>   
                                    </>
                                ) : (
                                    <button type="submit" className="btn btn-warning" id='submit-btn' value="">Save Changes</button>             
                                )
                            }
                        </div>                            
                   </div>
                </div>     
            </form>
        </div>
    )
}

export default NewArticle;