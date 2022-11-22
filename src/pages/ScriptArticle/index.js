import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AboutContent, TitleScript } from '../../common/components/Contents';
import { getQueryParams } from '../../common/utils/routerHelpers';
import { getScriptData } from '../../store/scriptsContent';

function ScriptArticle(){
    const dispatch = useDispatch();
    const content = useSelector((state) => state.scriptsContent.current_script);
    const scriptTitle = content.name?.split("_").join(" ");

    const lastScriptCommit = content.script?.last_commit.commit.author.date;
    const decodedTextContent = content.script ? atob(content.script.data_text.content).split("\n").join("<br>") : '';
    const decodedCodeContent = content.script ? atob(content.script.data_code.content).split("\n").join("<br>") : '';
    
    useEffect(() => {
        const { project_name, script_name }= getQueryParams();
        const [ projectName, scriptName] = [ project_name, script_name ];

        dispatch(getScriptData({projectName, scriptName}));
      }, []);

    return (
        <div className='mb-4 mb-lg-5'>
            <TitleScript className="h2 my-4 my-lg-5 fw-bold text-capitalize">{scriptTitle}</TitleScript>

            <AboutContent
                hasUnlimitedLines={true}
                dangerouslySetInnerHTML={{__html: decodedTextContent}}
            />

            <div className="p-2 p-lg-3" style={{backgroundColor: '#00000014',borderRadius: '15px'}}>
                <code dangerouslySetInnerHTML={{__html: decodedCodeContent}} />
            </div>
        </div>
        
    )
}

export default ScriptArticle;