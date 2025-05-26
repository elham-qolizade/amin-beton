/*eslint-disable */
import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledNewsModalWindow = styled.div`
  height: 50vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  h3 {
    font-weight: 900;
    font-size: 2rem;
    margin-bottom: 4rem;
  }

  p {
    line-height: 2;
  }
`;

function NewsModalWindow({ news }) {
  return (
    <StyledNewsModalWindow>
      <Heading as="h3">{news.title}</Heading>
      <p>{news.news_text}</p>
    </StyledNewsModalWindow>
  );
}

export default NewsModalWindow;
