/*eslint-disable */
import { useRef } from "react";
import styled from "styled-components";

import Heading from "../../ui/Heading";
import NewsCard from "./NewsCard";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import { useNews } from "./useNews";

const StyledNewsLanding = styled.div`
  width: 95%;
  padding-top: 5rem;
  margin: 0 auto;
  margin-bottom: 20rem;

  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 3rem 5rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const NewsContainer = styled.div`
  width: 85%;
  padding: 5rem 0;
  margin: 0rem auto;
  display: flex;
  align-items: center;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function NewsLanding() {
  const { isLoading, news } = useNews();
  const scrollRef = useRef(null);

  function scroll(scrollOffset) {
    scrollRef.current.scrollLeft += scrollOffset;
  }

  return (
    <StyledNewsLanding id="news">
      {/* Title */}
      <Heading as="h2">اخبار</Heading>

      {/* News Cards */}
      <NewsContainer ref={scrollRef}>
        {isLoading ? (
          <Spinner />
        ) : (
          news.map((newsItem) => <NewsCard news={newsItem} key={newsItem.id} />)
        )}
      </NewsContainer>

      <div className="button-container">
        <Button onClick={() => scroll(300)} className="scroll-btn right-btn">
          &lt;
        </Button>

        <Button onClick={() => scroll(-300)} className="scroll-btn left-btn">
          &gt;
        </Button>
      </div>
    </StyledNewsLanding>
  );
}

export default NewsLanding;
