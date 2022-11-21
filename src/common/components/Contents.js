import styled from "styled-components";

export const AboutContent = styled.p`
  letter-spacing: 0.2rem;
  font-size: 0.9rem;
  color: var(--theme-white);

${props => !props.hasUnlimitedLines ? `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    ` : `
      letter-spacing: 0.1rem;
      font-size: 1.05rem;
      line-height: 1.8rem;
  ` }
`;

export const TitleScript = styled.h1`
  textDecoration: none;
  color: var(--theme-white)
;`

export const CardImage = styled.div`
  background: url("${props => props.backgroundUrl}") no-repeat;
  width: 100%;
  aspect-ratio: 1.5;
  background-color: gray;
  border-radius: 10px;
  filter: brightness(90%);
  background-size: cover;
  position: relative;
`;