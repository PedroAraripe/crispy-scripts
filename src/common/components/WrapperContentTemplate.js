import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { setShowBannerValue } from "../../store/banner";
import scriptsList from "../constants/scriptsList";
import { HighlightedItem } from "./Contents";

const DivisorColumn = styled.div`
  opacity: 0.6;
  background-color: white;
  height: 1.5px;
  width: 100%;

  @media (min-width: 1199px) {
    height: 100%;
    width: 1.5px;
  }
`;

const ArticleBanner = styled.div`
  max-height: 250px;
  aspect-ratio: 3;
  background: linear-gradient(to bottom, #cc33331a, #6c6069ba), url("${props => props.backgroundUrl}");
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

  useEffect(() => {
      if(content?.script) {
        const urlImage = `https://picsum.photos/seed/${content.script?.data_code.sha}/800/600`;
        dispatch(setShowBannerValue(urlImage));
      }
  }, [content]);
  const extraItems = [
    {
      name: "Crispy",
      repositoryName: "crispy-scripts",
    },
    ...scriptsList,
  ];
  

    return (
      <div className="container  py-4" style={{ borderRadius: "10px" }}>
        <div className="bg-dark">
          {scriptName ? <ArticleBanner backgroundUrl={bannerUrl} /> : ''}
          <div className="px-2 px-lg-4">
            <div className="row py-2 py-lg-4">
              <div className="col-lg-9 px-lg-4">{children}</div>

              <div className="px-lg-2 col-lg-3 d-lg-flex">
                <DivisorColumn className="mb-4 mb-lg-0" />

                <div className="px-lg-4">
                    <div className="pt-lg-2 my-4 my-lg-5">
                      <HighlightedItem fontSize="1.6rem">
                        Also check:
                      </HighlightedItem>
                    </div>

                  <ul className="p-0">
                    {extraItems.map((script, index) => (
                      <div key={script.name}>
                        <a
                          href={`https://github.com/PedroAraripe/${script.repositoryName}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{textDecoration: "none"}}
                        >
                          <HighlightedItem fontSize="1.2rem" className="text-capitalize">
                            {index + 1}.{" "} 
                          </HighlightedItem>

                          <HighlightedItem fontSize="1.2rem" className="text-capitalize" themeReverse>
                            {script.name.toLowerCase()} source
                          </HighlightedItem>
                        </a>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
};
