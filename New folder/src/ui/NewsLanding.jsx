/*eslint-disable */
import styled from "styled-components";
import Heading from "./Heading";
import NewsCard from "./NewsCard";

const StyledNewsLanding = styled.div`
  width: 85%;
  padding-top: 5rem;
  margin: 0 auto;
  margin-bottom: 20rem;

  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 7rem;
  }

  // 1100px
  @media screen and (max-width: 69em) {
    width: 100%;
    padding: 5rem;
    padding-bottom: 0;
  }

  // 1000px
  @media screen and (max-width: 62.5em) {
    margin-bottom: 10rem;
  }
`;

const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  grid-gap: 5rem;

  // 1200px
  @media screen and (max-width: 75em) {
    grid-gap: 2.5rem;
  }

  // 1000px
  @media screen and (max-width: 62.5em) {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
  }

  // 400px
  @media screen and (max-width: 25em) {
    grid-template-columns: 1fr;
  }
`;

const fakeNews = [
  {
    title: "تیتر خبر",
    news: "متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر",
  },
  {
    title: "تیتر خبر",
    news: "متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر",
  },
  {
    title: "تیتر خبر",
    news: "متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر",
  },
  {
    title: "تیتر خبر",
    news: "متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر متن خبر",
  },
];

function NewsLanding() {
  return (
    <StyledNewsLanding>
      {/* Title */}
      <Heading as="h2">اخبار</Heading>

      {/* News Cards */}
      <NewsContainer>
        {fakeNews.map((news) => (
          <NewsCard title={news.title} news={news.news} key={Math.random()} />
        ))}
      </NewsContainer>
    </StyledNewsLanding>
  );
}

export default NewsLanding;
