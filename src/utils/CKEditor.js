import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import List from '@ckeditor/ckeditor5-list/src/list';
import Link from '@ckeditor/ckeditor5-link/src/link';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';


// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

// import Heading from '@ckeditor/ckeditor5-heading/src/heading';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import Table from '@ckeditor/ckeditor5-table/src/table';
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
// import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';

export default class ClassicEditor extends ClassicEditorBase {
}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
    BalloonToolbar,
    Font,
    Essentials,
    Link,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    BlockQuote,
    MediaEmbed,
    Base64UploadAdapter


    // CKFinder,
    // EasyImage,
    // Image,
    // ImageCaption,
    // ImageStyle,
    // ImageToolbar,
    // UploadAdapter,
    // ImageUpload,
    // ImageResize
];

// Editor configuration.
ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            "blockquote",
            'removeFormat',
            '|',
            'alignment',
            'numberedList',
            'bulletedList',
            '|',
            'indent',
            'outdent',
            '|',
            // 'imageupload',
            "link",
            // "mediaembed"
        ]
    },
    image: {
        // toolbar: [
        //     'imageStyle:full',
        //     'imageStyle:side',
        //     '|',
        //     'imageTextAlternative'
        // ],
        styles: [
            // This option is equal to a situation where no style is applied.
            'full',

            // This represents an image aligned to the left.
            'alignLeft',
            'alignCenter',
            // This represents an image aligned to the right.
            'alignRight'
        ],
        resizeUnit: 'px'
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    fontSize: {
        options: [
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            20,
            22,
            24
        ]
    },
    fontFamily: {
        options: [
            'Arial',
            'sans-serif',
            'Comic Sans MS',
            'Courier New',
            'Georgia',
            'Lucida Sans Unicode',
            'Tahoma',
            'Geneva',
            'Times New Roman',
            'Trebuchet MS',
            'Verdana',
            'Muli'
        ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'tr'
};
