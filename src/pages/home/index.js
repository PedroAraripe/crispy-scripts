import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../store/scriptsContent';

export default function Home () {
    const scriptsContent = useSelector((state) => state.scriptsContent.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
      }, []);

    return (
        <div>
            {
                scriptsContent
                    .map((item, index) => {
                        const isLast = index !== scriptsContent.length -1;
                        const scriptName = item.name.split("_").join(" ");
                        const decodedTextContent = atob(item.script.data_text.content).split("\n").join("<br>");
                        const decodedCodeContent = atob(item.script.data_code.content).split("\n").join("<br>");

                        return (
                            <>
                                <h3 className={`h3 text-capitalize mb-3 ${index && 'mt-5'}`} style={{color: "var(--theme-white)"}}>
                                    {scriptName}
                                </h3>
                                
                                <p dangerouslySetInnerHTML={{__html: decodedTextContent}}></p>
                                
                               <div className="p-3">
                                <code
                                        dangerouslySetInnerHTML={{__html: decodedCodeContent}}
                                        key={index}
                                        className={`${!isLast && 'mb-2'}`}
                                    ></code>
                               </div>
                            </>
                        )
                    })
            }
        </div>
    )
  }