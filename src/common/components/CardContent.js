import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AboutContent, CardImage, HighlightedItem } from "./Contents";
import { useNavigate  } from "react-router-dom";

const ScriptTag = styled.span`
  top: 0.5rem;
  left: 0.5rem;
  
  background: var(--theme-red);
  position: absolute;
  border-radius: 0.8rem;
  padding: 0.5rem 0.6rem;

  opacity: 0.7;

  font-size: 0.7rem;

  &:hover {
    transition: all 0.3s;
    opacity: 1;
  }

  &, & * {
    text-decoration: none;
    font-weight: bold;
    color: var(--theme-white) !important;
  }
`;

const DateScriptFormatter = styled.div`
  &:before {
    font-size: 0.7rem;
    content: ${props => `'${moment(props.dateScript).format('MMMM Do, YYYY')}'`};
  }
`;

export default function CardContent ({content, index, className = ""}) {
  const navigate = useNavigate();
  const scriptName = content.name.split("_").join(" ");
  const lastScriptCommit = content.script?.last_commit.commit.author.date;
  const decodedTextContent = atob(content.script?.data_text.content).split("\n").join("<br>");
  const imageBanner = `https://picsum.photos/seed/${content?.script?.data_text?.sha}/400/300`

  const urlRedirect = `/scripts/?project_name=${content.repository.repository_name}&script_name=${content.name}`;

  return (
    <div className={`pb-4 pb-lg-0 ${className}`}>
      <Link
        to={urlRedirect}
        key={index}
        style={{textDecoration: 'none'}}
        >
          <CardImage
            className="random-image"
            alt={`script ${scriptName} random image`}
            backgroundUrl={imageBanner}
          >
            <ScriptTag onClick={() => navigate(`/scripts/?project_name=${content.repository.repository_name}`)}>
              {content.repository.name}
            </ScriptTag>
          </CardImage>
        </Link>

      <DateScriptFormatter className="pt-2 pt-lg-3" dateScript={lastScriptCommit} />
      
      <div className="mb-3 pt-2 pt-lg-3">
        <Link
          to={urlRedirect}
          key={index}
          style={{textDecoration: 'none', color: "var(--theme-white)"}}
          className="h6 fw-bold text-capitalize"
        >
            <HighlightedItem noLetterSpacing fontSize="0.8rem" className="text-capitalize">
              {scriptName}
            </HighlightedItem>
        </Link>
      </div>

      <AboutContent dangerouslySetInnerHTML={{__html: decodedTextContent}} />
    </div>
  )

}