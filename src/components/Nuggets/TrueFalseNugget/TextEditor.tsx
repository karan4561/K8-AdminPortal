import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState,useContext } from "react";
// import { NuggetContext } from "../K-8ContextProvider";
const TextEditor = (props) => {
//   const { nugget,updateTFSolution } = useContext(NuggetContext);
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

  const handleEditorChange = (content, editor) => {
    setContent(content);
    props.onUpdate(content,props.id)
  };
//   console.log(props.onUpdate.name);
  
useEffect(() => {
  if (editorRef.current) {
    editorRef.current.editor.on("init", () => {
      editorRef.current.editor.formatter.register("mycustomformat", {
        inline: "span",
        styles: {
          color: "%value",
          backgroundColor: "%value",
          fontWeight: "bold",
          fontStyle: "italic",
          textDecoration: "underline",
        },
      });
    });
  }
}, []);
return (
  <div className="text-editor">
    <Editor
    value={props.value}
      // onInit={(evt, editor) => (editorRef.current = editor)}
      apiKey={'2gzhpfsdrqpzlgs2servolzz08ba2ww1vypt3mvwuc8x16an'}
      init={{
        height: 200,
        width: "60vw",
        draggable_modal: false,
        paste_preprocess: function (plugin, args) {
          args.content = args.content.replace(/&nbsp;/g, ' ');
        },
        menubar: false,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = 'blobid' + (new Date()).getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        plugins: [
          "tiny_mce_wiris",
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "math",
          "tex",
          "button",
          "image"
        ],
        selector: 'textarea',
        contextmenu_avoid_overlap: '.mce-spelling-word',
        branding: false,
        external_plugins: { 'mathjax': '/your-path-to-plugin/@dimakorotkov/tinymce-mathjax/plugin.min.js' },
        toolbar: "link image | code| mathjax | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
        content_style:
          "body { font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px}",
        formats: {
          mycustomformat: { inline: "span" },
        },
        setup: (editor) => {
          editor.on("init", () => {
            editor.formatter.apply("mycustomformat", { value: "red" });
          });
        },
      }}
      onEditorChange={handleEditorChange}
    />
    {/* <p>Content: {content}</p>  */}
  </div>
);
};

export default TextEditor;