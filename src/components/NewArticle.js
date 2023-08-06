import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InsertArticle } from '../services/Requests/Article';
import { useSelector } from 'react-redux';
import { GetAllCategories } from '../services/Requests/Category';


const NewArticle = () => {
    const activeUser = useSelector(state => state.auth.activeUser)
    const [categories,setCategories]  = useState([])

    const [form, setForm] = useState({
        image:'',
        title:'',
        content:'',
        isPublished:-1,
        categoryId:-1,
        userProfileId:-1
    })

    const [isPublished,setIsPublished] = useState(1)

    useEffect(() => {
        const load = async () => {
            const categories = await GetAllCategories()
            setCategories(categories)
            setForm({...form, userProfileId:activeUser.userProfileId})
        }
        load()
    },[])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        setForm({...form, isPublished:1})
        console.log("form: : ", form);

        var res = await InsertArticle(form)
    }

    const saveDraftHandler = async (e) => {
        e.preventDefault();
        setForm({...form, isPublished:0})
        console.log("form: : ", form);

        var res = await InsertArticle(form)
    }

    return(
        <div className='container'>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" id="title"
                    onChange={(e) => {setForm({...form, title:e.target.value})}}/>
                </div>

                <div className='form-group'>
                    <label for="categoryId">Category</label>
                    <select class="form-select" aria-label="Default select example" id='categoryId' 
                    onChange={(e) => {setForm({...form, categoryId:e.target.value}); console.log("Selected : ",e.target.value);}}>
                        {categories.map((c) => {
                            return(
                                <option value={c.id}>{c.id} {c.name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label for="content">Content</label>
                    <CKEditor
                        id='content'
                        editor={ClassicEditor}
                        placeholder="<h2>Write...</h2>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                            editor.ui.view.editable.element.style.minHeight="500px"
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setForm({...form, content:data})
                            console.log( { event, editor, data } );

                            document.getElementById('submit-btn').removeAttribute('disabled')
                            document.getElementById('draft-btn').removeAttribute('disabled')

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
                        <div class="col-md-12 bg-light text-right">
                            <button type="submit" className="btn btn-success mr-4" id='submit-btn' disabled value="">Publish</button>             
                            <button type="button" onClick={saveDraftHandler} className="btn btn-outline-success" id='draft-btn' disabled value="">Save Draft</button>             
                        </div>                            
                   </div>
                </div>     
            </form>
        </div>
    )
}

export default NewArticle;