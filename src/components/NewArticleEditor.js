import React, { useEffect, useRef } from 'react'

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import Image from '@editorjs/image'; 
import { UPLOAD_IMAGE } from '../helpers/fileHelper';


const NewArticleEditor =() => {
    const ejInstance = useRef();

    const DEFAULT_INITIAL_DATA = () => {
        return {
          "time": new Date().getTime(),
          "blocks": [
            {
                "type": "heading",
                "data": {
                    "heading": "Write...",
                    "level": 1
                }
            },
            {
                "id": "f312osP2lf",
                "type": "paragraph",
                "data": {
                    "text": "eftaerfer"
                }
            },
            {
                "id": "gzdWcT2cb9",
                "type": "header",
                "data": {
                    "text": "headddsdcdvmkfdjnchheheleododldldldldldldld",
                    "level": 2
                }
            },
            {
                "id": "xrbq5CmJE8",
                "type": "paragraph",
                "data": {
                    "text": "yeni"
                }
            }
        ]
        }
      }

    const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);
    const EDITOR_HOLDER_ID = 'editorjs';

    const initEditor = () => {
        const editor = new EditorJS({
            holder:EDITOR_HOLDER_ID,
            logLevel: "ERROR",
            readOnly:false,
            config : {
                uploader: {
                    async uploadByFile(file) {
                        const imageUrl = UPLOAD_IMAGE(file)
                        return{
                            success:1,
                            file:{
                                url:imageUrl
                            }
                        }
                    }
                }
            },
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
                header: Header,
                image:Image
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