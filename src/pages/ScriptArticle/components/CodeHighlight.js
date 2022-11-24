import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function CodeBlock({ code, language }) {

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div className="Code">
      <pre style={{borderRadius: '15px'}}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}