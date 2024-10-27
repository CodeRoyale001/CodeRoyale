import React from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import "./MarkdownEditor.css";

type MarkdownPreviewProps = {
  content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="markdown-preview">
      <MDEditor.Markdown source={content} rehypePlugins={[[rehypeSanitize]]} />
    </div>
  );
};

export default MarkdownPreview;