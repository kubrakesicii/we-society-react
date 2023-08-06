import React, { useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 

const NewArticleEditor =() => {
    const ejInstance = useRef();

    const DEFAULT_INITIAL_DATA = () => {
        return {
          "time": new Date().getTime(),
          "blocks": [
            {
              "type": "heading",
              "data": {
                "placeholder": "Write...",
                "level": 1
              }
            },
          ]
        }
      }

    const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);
    const EDITOR_HOLDER_ID = 'editorjs';

    const initEditor = () => {
        const editor = new EditorJS({
            holder:EDITOR_HOLDER_ID,
            logLevel: "ERROR",
            data:editorData,
            placeholder: 'Let`s write an awesome story!',
            onReady : () => {
                ejInstance.current=editor;
            },
            autofocus:true,
            onChange: async () => {
                let content = await editor.saver.save();

                setEditorData(content);
                console.log(content);
            },
            tools:{
                header: Header
            }
        });
    }

    useEffect(() => {
        console.log("EJ INS : ",ejInstance);
        if(ejInstance.current === undefined){
            console.log("init start");
            initEditor();
        }
        return () => {
            ejInstance.current.destroy();
            ejInstance.current = null;
        }
    },[])

  return (
    <React.Fragment>
        {/* <div className='container' style={{ backgroundColor: '#d4ecff', minHeight: "100vh" }}
        maxWidth="xl">
        </div> */}
        <div id={EDITOR_HOLDER_ID}></div>
    </React.Fragment>
  )
}


export default NewArticleEditor;