/*eslint-disable */
import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const StyledNewsCard = styled.div`
  width: 25rem;
  background-color: var(--color-grey-200);
  padding-bottom: 0rem;
  border-radius: 1rem;
  transition: all 0.3s;
  box-shadow: 0 1rem 2.5rem 1rem rgba(0, 0, 0, 0.2);

  // 1000px
  @media screen and (max-width: 62.5em) {
    width: 40rem;
    margin-bottom: 5rem;
  }
  // 700px
  @media screen and (max-width: 42em) {
    width: 30rem;
  }
  // 500px
  @media screen and (max-width: 42em) {
    width: 25rem;
  }
  // 400px
  @media screen and (max-width: 25em) {
    width: 100%;
  }

  img {
    border-radius: 1rem;
    padding: 2rem;
    padding-bottom: 0;
    width: 100%;
  }

  h3 {
    margin: 1rem 2rem;
    font-weight: 800;
    font-size: 1.9rem;
    /* padding: 2rem; */
  }

  p {
    padding: 0.5rem 2rem;
    margin-bottom: 2rem;
  }

  &:hover {
    transform: scale(1.05) translateY(-1rem);
    box-shadow: 0 0.8rem 3.5rem 2rem rgba(0, 0, 0, 0.2);
  }
`;

function NewsCard({ title, news }) {
  return (
    <StyledNewsCard>
      {/* Image */}
      <img src="/images/brick-2.jpg" alt="brick image" />

      {/* Title */}
      <Heading as={"h3"}>{title}</Heading>
      {/* Text */}
      <p>{news}</p>

      <Button variation="continue">ادامه ...</Button>
    </StyledNewsCard>
  );
}

export default NewsCard;
