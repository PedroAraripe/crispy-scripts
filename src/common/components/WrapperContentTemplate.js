import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { setShowBannerValue } from "../../store/banner";
import scriptsList from "../constants/scriptsList";
import { HighlightedItem } from "./Contents";

const ArticleBanner = styled.div`
  max-height: 250px;
  aspect-ratio: 3;
  background: linear-gradient(to bottom, #26030366, #00000000), url("${props => props.backgroundUrl}");
  background-repeat: no-repeat;
  width: 100%;
  background-color: gray;
  border-radius: 10px;
  filter: brightness(90%);
  background-size: cover;
  position: relative;
  background-position: center center;
`
export default function WrapperContent({children})  {
  const content = useSelector((state) => state.scriptsContent.current_script);
  const bannerUrl = useSelector((state) => state.banner.showBanner);
  const dispatch = useDispatch();
  
  const [searchParams] = useSearchParams();
  const scriptName = searchParams.get("script_name");
  const projectName = searchParams.get("project_name");
  
  const sourceCodes = [
    {
      name: "Crispy",
      repositoryName: "crispy-scripts",
    },
    ...scriptsList,
  ];

  useEffect(() => {
      if(content?.script) {
        const urlImage = `https://picsum.photos/seed/${content.script.data_text.sha}/800/600`;
        dispatch(setShowBannerValue(urlImage));
      }
  }, [content]);

    return (
      <div className="container  py-4" style={{ borderRadius: "10px" }}>
        <div className="bg-dark" style={{border: '1px solid #00000080', borderRadius: '15px'}}>
          {scriptName ? <ArticleBanner backgroundUrl={bannerUrl} /> : ''}
          <div className="px-3 px-lg-4">
            <div className="row py-2 py-lg-4">
              <div className="col-lg-9 px-lg-4">{children}</div>

              <div className="px-lg-2 col-lg-3 d-lg-flex">
                
              <div className="d-none d-lg-flex" style={{height: '100%'}}>
                <div className="vr"></div>
              </div>

              <hr className="d-lg-none"/>

              <div className="text-center text-lg-start pe-lg-4 ps-lg-5 mb-5 pb-4 d-flex flex-column align-items-center d-lg-block">
                  <div className="my-4 my-lg-5 pt-1"> </div>

                  <HighlightedItem noHover fontSize="1.2rem" className="text-capitalize">
                    Source Codes:
                  </HighlightedItem>

                  <ul className="d-flex flex-column d-lg-block align-items-center p-0 ps-2 pt-2">
                    {sourceCodes.map((script) => (
                      <div key={script.name}>
                        <a
                          href={`https://github.com/PedroAraripe/${script.repositoryName}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{textDecoration: "none"}}
                        >

                          <HighlightedItem fontSize="1.0rem" className="text-capitalize" themeReverse>
                            {script.repositoryName.split("-").join(" ").toLowerCase()}
                          </HighlightedItem>
                        </a>
                      </div>
                    ))}
                  </ul>


                  {!(content?.script?.script_language && projectName) ? '' : <>
                    <div className="my-4 my-lg-5" />

                    <HighlightedItem noHover fontSize="1.2rem">
                      Check on github:
                    </HighlightedItem>

                    <div className="p-0 ps-2 pt-2">
                      <a href={`https://github.com/PedroAraripe/${projectName}/tree/main/${scriptName}/${content.script.data_code.name}`} style={{textDecoration: "none"}}>
                        <HighlightedItem fontSize="1rem" className="text-capitalize" themeReverse>
                          {content?.name?.split("_")?.join(" ")?.toLowerCase()}
                        </HighlightedItem>
                      </a>
                    </div>

                    <div className="p-0 ps-2 pt-2">
                      <a href={`https://github.com/PedroAraripe/${projectName}/tree/main/${scriptName}/${content.script.data_code.name}`} style={{textDecoration: "none"}}>
                        <HighlightedItem fontSize="1rem" className="text-capitalize" themeReverse>
                          {projectName?.split("-")?.join(" ")?.toLowerCase()}
                        </HighlightedItem>
                      </a>
                    </div>
                  </> }

                  
                  {!content?.script?.script_language ? '' : <>
                    <div className="my-4 my-lg-5" />

                    <HighlightedItem noHover fontSize="1.2rem">
                      Continue reading:
                    </HighlightedItem>

                    <div className="p-0 ps-2 pt-2">
                      <NavLink
                        to={{
                          pathname: "/",
                          search: `?project_name=${projectName}`,
                          state: { fromDashboard: true }
                        }}
                        style={{textDecoration: 'none'}}
                      >
                        <HighlightedItem fontSize="1rem" className="text-capitalize pe-2" themeReverse>
                          {content.script.script_language}
                        </HighlightedItem>
                      </NavLink>
                      
                      <HighlightedItem noHover fontSize="1rem">
                        Articles
                      </HighlightedItem>
                    </div>
                  </> }
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
