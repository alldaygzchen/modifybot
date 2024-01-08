import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Markdown = ({ markdownText }) => {
  const handleCopyToClipboard = async (codeContext) => {
    try {
      // Use navigator.clipboard.writeText to copy content to clipboard
      await navigator.clipboard.writeText(codeContext);
      alert("Content copied to clipboard!");
    } catch (error) {
      console.error("Unable to copy to clipboard", error);
    }
  };

  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "language-js");
          const codeContext = String(children).replace(/\n$/, "");
          return !inline ? (
            <div className="relative">
              <button
                className="bg-blue-200 rounded-md text-black text-right p-1 absolute top-0 right-0"
                onClick={() => handleCopyToClipboard(codeContext)}
              >
                Copy code
              </button>
              <SyntaxHighlighter
                {...props}
                style={atomDark}
                language={match[1]}
                PreTag="div"
              >
                {codeContext}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
};

export default Markdown;

Markdown.propTypes = {
  markdownText: PropTypes.string,
};
