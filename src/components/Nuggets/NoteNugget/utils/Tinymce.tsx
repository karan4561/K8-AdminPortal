import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState, useContext } from "react";
import { NuggetsContext } from "../../../../context/NuggetsContext";

const TinyMCE = (props: { kind: string; idx: number; idj?: number }) => {
  const { bullet, updateContentItem, updateListItem } =
    useContext(NuggetsContext);
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    if (props.kind == "OL" && props.idj) {
      updateListItem && updateListItem(props.idx, content, "OL", props.idj);
    } else if (props.kind == "UL" && props.idj) {
      updateListItem && updateListItem(props.idx, content, "UL", props.idj);
    } else {
      updateContentItem && updateContentItem(props.idx, content, props.kind);
    }
  };

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

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (props.kind == "OL" && props.idj) {
  //       updateListItem && updateListItem(props.idx, content, "OL", props.idj);
  //     } else if (props.kind == "UL" && props.idj) {
  //       //console.log(".......ul it is......");
  //       updateListItem && updateListItem(props.idx, content, "UL", props.idj);
  //     } else {
  //       //console.log(".......else it is......");
  //       updateContentItem && updateContentItem(props.idx, content, props.kind);
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [content]);
  return (
    <div className="text-editor">
      <Editor
        // onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={"2gzhpfsdrqpzlgs2servolzz08ba2ww1vypt3mvwuc8x16an"}
        init={{
          height: 200,
          width: "30vw",
          draggable_modal: false,
          paste_preprocess: function (plugin, args) {
            args.content = args.content.replace(/&nbsp;/g, " ");
          },
          menubar: false,
          plugins: [
            "tiny_mce_wiris",
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "math",
            "tex",
            "button",
          ],
          selector: "textarea",
          contextmenu_avoid_overlap: ".mce-spelling-word",
          branding: false,
          external_plugins: {
            mathjax:
              "/your-path-to-plugin/@dimakorotkov/tinymce-mathjax/plugin.min.js",
          },
          toolbar:
            "mathjax | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
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

export default TinyMCE;

//RESTRUCTURE THE CODE
//COMPLETE THE INDIVIDUAL FEATURES
