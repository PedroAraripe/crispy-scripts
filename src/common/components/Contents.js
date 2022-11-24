import styled from "styled-components";

export const AboutContent = styled.div`
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

export const CardImage = styled.div`
  background: linear-gradient(to bottom, #26030366, #00000000),url("${props => props.backgroundUrl}");
  background-repeat: no-repeat;
  width: 100%;
  aspect-ratio: 1.5;
  background-color: gray;
  border-radius: 10px;
  filter: brightness(90%);
  background-size: cover;
  position: relative;
`;

export const HighlightedItem = styled.span`
  &, & > * {
    color: ${props => props.themeReverse ? 'var(--theme-red)' : 'var(--theme-white)'};
    text-decoration: none;
    font-weight: bold;
    font-size: ${(props) => props.fontSize ? props.fontSize : '0.8rem'};

    // Letter Spacing
    ${props => {
      if(props.noLetterSpacing) {
        return;
      }

      return 'letter-spacing: -0.1rem};'
    }}
    
    transition: all 0.2s;
    
    @media (min-width: 1200px) {
      font-size: ${(props) => props.fontSize ? `calc(${props.fontSize} * ${1.2})` : '1.2rem'};
    }
  }

    // Hover effect
    ${props => {
      if(props.noHover) {
        return;
      }

      const hoverColor = props.themeReverse ? 'var(--theme-white)' : 'var(--theme-red)';

      return `&:hover { color : ${hoverColor};}`
    }
}
`;