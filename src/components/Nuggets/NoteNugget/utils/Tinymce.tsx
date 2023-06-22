import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadImage } from "@/api/utils";
import { useContext } from "react";
import { NuggetsContext } from "../../../../context/NuggetsContext";

const TinyMCE = (props: { kind: string; idx: number; idj?: number }) => {
  const { bullet, updateContentItem, updateListItem } =
    useContext(NuggetsContext);
  const editorRef = useRef(null);
  const [content, setContent] = useState<string>("");

  const handleEditorChange = (content: any) => {
    setContent(content);
    // if (props.kind == "OL" && props.idj) {
    //   updateListItem && updateListItem(props.idx, content, "OL", props.idj);
    // } else if (props.kind == "UL" && props.idj) {
    //   updateListItem && updateListItem(props.idx, content, "UL", props.idj);
    // } else {
    //   updateContentItem && updateContentItem(props.idx, content, props.kind);
    // }
  };

  useEffect(() => {
    if (props.kind == "OL" && props.idj) {
      updateListItem && updateListItem(props.idx, content, "OL", props.idj);
    } else if (props.kind == "UL" && props.idj) {
      //console.log(".......ul it is......");
      updateListItem && updateListItem(props.idx, content, "UL", props.idj);
    } else {
      //console.log(".......else it is......");
      updateContentItem && updateContentItem(props.idx, content, props.kind);
    }
  }, [content]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.on("init", () => {
        editorRef.current?.editor.formatter.register("mycustomformat", {
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
        //value={props.value}
        // onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={"2gzhpfsdrqpzlgs2servolzz08ba2ww1vypt3mvwuc8x16an"}
        init={{
          height: 200,
          width: "30vw",
          draggable_modal: false,
          paste_preprocess: function (plugin, args) {
            args.content = args.content.replace(/&nbsp;/g, " ");
          },
          menubar: "tools",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              var file = input?.files && input.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                const formData = new FormData();
                const token = localStorage.getItem("TOKEN");
                formData.append("file", file);
                uploadImage(formData).then((data) => {
                  cb(data.baseUrl + data.key, {
                    title: data.name,
                  });
                });
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
            "MathType",
            "tex",
            "button",
            "image",
            "code",
          ],
          selector: "textarea",
          contextmenu_avoid_overlap: ".mce-spelling-word",
          branding: false,
          external_plugins: {
            tiny_mce_wiris:
              "https://www.wiris.net/demo/plugins/tiny_mce/plugin.js",
            tiny_mce_mathType:
              "https://mathtype-main.s3.ap-south-1.amazonaws.com/mathTypeIntegration.min.js",
          },
          menubar: false,
          toolbar:
            "link image | code| mathjax | mathtype | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
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
