import React from "react";
import styled from "styled-components";

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 1.576;
  border-radius: 10px;
`;

const PreviewContent = styled.p`
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function CardContent ({content, className = ""}) {
  const scriptName = content.name.split("_").join(" ");
  const decodedTextContent = atob(content.script.data_text.content).split("\n").join("<br>");

  const imgsRandom = document.querySelectorAll(".random-image");
  imgsRandom.forEach((img, index) => img.src = `https://picsum.photos/300/200?random=${index + 1}`);

  return (
    <div className={`pb-4 pb-lg-0 ${className}`}>
      <CardImage
        className="random-image"
        loading="lazy"
        alt="random image thumbnail"
      />

      <h5 className="h6 fw-bold text-capitalize mb-3 pt-3 pt-lg-4" style={{color: "var(--theme-white)"}}>
          {scriptName}
      </h5>
      
      <PreviewContent dangerouslySetInnerHTML={{__html: decodedTextContent}} />
      
      {/* <div className="p-2 p-lg-3">
          <code dangerouslySetInnerHTML={{__html: decodedCodeContent}} />
      </div> */}
    </div>
  )

}