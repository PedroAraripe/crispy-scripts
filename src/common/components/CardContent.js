import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardImage = styled.div`
  background: url("${props => props.backgroundUrl}") no-repeat;
  width: 100%;
  aspect-ratio: 1.5;
  background-color: gray;
  border-radius: 10px;
  filter: brightness(90%);
  background-size: cover;
  position: relative;
`;

const ScriptTag = styled.span`
  top: 0.5rem;
  left: 0.5rem;
  
  background: var(--theme-red);
  position: absolute;
  border-radius: 0.8rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--theme-red);

  font-size: 0.7rem;

  &:hover {
    transition: all 0.3s;

    & {
      background: var(--theme-white);
    }
    
    & * {
      color: var(--theme-red);
    }
  }

  & * {
    text-decoration: none;
    font-weight: bold;
    color: var(--theme-white);
  }
`;

const DateScriptFormatter = styled.div`
  &:before {
    font-size: 0.7rem;
    content: ${props => `'${moment(props.dateScript).format('MMMM Do, YYYY')}'`};
  }
`;

const PreviewContent = styled.p`
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function CardContent ({content, index, className = ""}) {
  const scriptName = content.name.split("_").join(" ");
  const lastScriptCommit = content.script?.last_commit.commit.author.date;
  const decodedTextContent = atob(content.script.data_text.content).split("\n").join("<br>");

  return (
    <div className={`pb-4 pb-lg-0 ${className}`}>
      <CardImage
        className="random-image"
        alt={`script ${scriptName} random image`}
        backgroundUrl={`https://picsum.photos/seed/${index + 1}/400/300`}
      >
        <ScriptTag>
          <Link
            to={`/scripts/?project_name=${content.repository.repository_name}`}
            key={index}
            style={{textDecoration: 'none'}}
          >
              {content.repository.name}
          </Link>
        </ScriptTag>
      </CardImage>

      <DateScriptFormatter className="pt-2 pt-lg-3" dateScript={lastScriptCommit} />

      <h6 className="h6 fw-bold text-capitalize mb-3 pt-2 pt-lg-3" style={{color: "var(--theme-white)"}}>
          {scriptName}
      </h6>

      <PreviewContent dangerouslySetInnerHTML={{__html: decodedTextContent}} />

      {/* <div className="p-2 p-lg-3">
          <code dangerouslySetInnerHTML={{__html: decodedCodeContent}} />
      </div> */}
    </div>
  )

}