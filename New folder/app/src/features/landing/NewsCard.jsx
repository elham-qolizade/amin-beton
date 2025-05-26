/*eslint-disable */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import NewsModalWindow from "./NewsModalWindow";

const StyledNewsCard = styled.div`
  position: relative;
  width: 29rem;
  height: 50rem;
  background-color: var(--color-grey-200);
  padding-bottom: 0rem;
  border-radius: 1rem;
  transition: all 0.3s;
  box-shadow: 0 1rem 2.5rem 0.5rem rgba(0, 0, 0, 0.2);

  flex: 0 0 auto;
  margin: 3rem;

  // 1000px
  @media screen and (max-width: 62.5em) {
    width: 25rem;
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
  }

  p {
    padding: 0.5rem 2rem;
    margin-bottom: 2rem;
  }

  .cont-btn {
    position: absolute;
    bottom: 0;
  }

  &:hover {
    transform: scale(1.01) translateY(-0.5rem);
    box-shadow: 0 0.2rem 3.5rem 0.5rem rgba(0, 0, 0, 0.2);
  }
`;

function NewsCard({ news }) {
  return (
    <StyledNewsCard>
      {/* Image */}
      <img src={news.image} alt="news image" />

      {/* Title */}
      <Heading as={"h3"}>{news.title}</Heading>
      {/* Text */}
      <p>{news.summary}</p>

      <Modal>
        <Modal.Open opens="news">
          <Button className="cont-btn" variation="continue">
            ادامه ...
          </Button>
        </Modal.Open>
        <Modal.Window name="news">
          <NewsModalWindow news={news} />
        </Modal.Window>
      </Modal>
    </StyledNewsCard>
  );
}

export default NewsCard;
