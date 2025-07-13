import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

function RTE({ name, defaultvalue = "", control, label }) {
  const [editorState, setEditorState] = useState(() => {
    if (defaultvalue) {
      try {
        const contentBlock = htmlToDraft(defaultvalue);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          return EditorState.createWithContent(contentState);
        }
      } catch (error) {
        console.log("Error converting HTML to Draft:", error);
      }
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (defaultvalue && defaultvalue !== "") {
      try {
        const contentBlock = htmlToDraft(defaultvalue);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.log("Error converting HTML to Draft:", error);
      }
    }
  }, [defaultvalue]);

  return (
    <>
      <div>
        {label && <label className="rte-label">{label}</label>}
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultvalue}
          render={({ field: { onChange, value } }) => (
            <div className="draft-editor-container">
              <Editor
                editorState={editorState}
                onEditorStateChange={(newState) => {
                  setEditorState(newState);
                  let htmlContent = draftToHtml(
                    convertToRaw(newState.getCurrentContent())
                  );
                  htmlContent = htmlContent.replace(/<p><br><\/p>/g, "");
                  htmlContent = htmlContent.trim();
                  onChange(htmlContent);
                }}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "list",
                    "textAlign",
                    "link",
                    "remove",
                    "history",
                  ],
                  inline: {
                    inDropdown: false,
                    options: ["bold", "italic", "underline", "strikethrough"],
                  },
                  blockType: {
                    inDropdown: true,
                    options: [
                      "Normal",
                      "H1",
                      "H2",
                      "H3",
                      "H4",
                      "H5",
                      "H6",
                      "Blockquote",
                    ],
                  },
                  list: {
                    inDropdown: false,
                    options: ["unordered", "ordered"],
                  },
                  textAlign: {
                    inDropdown: false,
                    options: ["left", "center", "right", "justify"],
                  },
                  link: {
                    inDropdown: false,
                    options: ["link", "unlink"],
                  },
                }}
                wrapperClassName="draft-wrapper"
                editorClassName="draft-editor"
                placeholder="Write your blog content here..."
              />
            </div>
          )}
        />
      </div>
    </>
  );
}

export default RTE;
