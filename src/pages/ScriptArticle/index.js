import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getScriptData } from '../../store/scriptsContent';

import { AboutContent, TitleScript } from '../../common/components/Contents';
import { getQueryParams } from '../../common/utils/routerHelpers';

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import CodeBlock from './components/CodeHighlight';

function ScriptArticle(){
    const dispatch = useDispatch();
    const content = useSelector((state) => state.scriptsContent.current_script);
    const scriptTitle = content.name?.split("_").join(" ");

    const decodedTextContent = content.script ? atob(content.script.data_text.content).split("\n").join("<br>") : '';
    const decodedCodeContent = content.script ? atob(content.script.data_code.content) : '';

    
    useEffect(() => {
        const { project_name, script_name }= getQueryParams();
        const [ projectName, scriptName] = [ project_name, script_name ];

        dispatch(getScriptData({projectName, scriptName}));

        Prism.highlightAll();
      }, []);

    return (
        <div className='mb-4 mb-lg-5'>
            <TitleScript className="h2 my-4 my-lg-5 fw-bold text-capitalize">{scriptTitle}</TitleScript>

            <AboutContent
                hasUnlimitedLines={true}
                dangerouslySetInnerHTML={{__html: decodedTextContent}}
            />

            <CodeBlock
                code={decodedCodeContent}
                language={content?.script?.script_language}>
            </CodeBlock>
        </div>
        
    )
}

export default ScriptArticle;