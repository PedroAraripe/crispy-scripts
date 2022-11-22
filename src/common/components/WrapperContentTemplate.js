import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setShowBannerValue } from "../../store/banner";
import scriptsList from "../constants/scriptsList";

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
  ${props => props.backgroundUrl? 'aspect-ratio: 3': ''};
  background: url("${props => props.backgroundUrl}") no-repeat;
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
          <ArticleBanner backgroundUrl={bannerUrl} />
          <div className="px-2 px-lg-4">
            <div className="row py-2 py-lg-4">
              <div className="col-lg-9 px-lg-4">{children}</div>

              <div className="px-lg-2 col-lg-3 d-lg-flex">
                <DivisorColumn className="mb-4 mb-lg-0" />

                <div className="px-lg-4">
                  <div className="pt-lg-2">
                    <h5 className="h4 my-4 my-lg-5">
                      Also check out:
                    </h5>
                  </div>

                  <ul className="p-0">
                    {extraItems.map((script, index) => (
                      <div className="h6" key={script.name}>
                        <span>{index + 1}.</span>{" "}
                        <a
                          href={`https://github.com/PedroAraripe/${script.repositoryName}`}
                          style={{
                            color: "var(--theme-red)",
                            textUnderlineOffset: "0.3rem",
                            textDecorationThickness: "0px",
                          }}
                          target="_blank"
                          rel="noreferrer"
                          className="text-uppercase"
                        >
                          {script.name} scripts
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
