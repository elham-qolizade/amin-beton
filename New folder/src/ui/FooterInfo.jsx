import styled from "styled-components";
import Heading from "./Heading";
import Tag from "./Tag";
import useWindowDimensions from "../hooks/useWindowDimensions";

const StyledFooterInfo = styled.div`
  height: 70%;
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  margin-top: 3rem;
  padding-bottom: 6rem;
  border-bottom: 1px solid var(--color-grey-0);

  @media screen and (max-width: 50em) {
    grid-template-columns: repeat(2, 1fr);
  }

  ul {
    text-align: start;

    .item-with-tag {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      span {
        color: var(--color-grey-700);
      }
    }

    h4 {
      margin-bottom: 1.5rem;
      color: var(--color-grey-1a00);
    }

    li {
      margin-top: 0.6rem;
      color: var(--color-grey-400);
    }
  }
`;

function FooterInfo() {
  const dims = useWindowDimensions();
  return (
    <StyledFooterInfo>
      <ul>
        <Heading as="h4">درباره ما</Heading>
        <li>
          <a href="#get-familiar">درباره ما</a>
        </li>
        <div className="item-with-tag">
          <li>فرصت های شغلی</li>
          {dims.width > 500 && <Tag color="brand"> درحال استخدام </Tag>}
        </div>
        <li>بلاگ</li>
      </ul>

      {dims.width > 800 && (
        <ul>
          <Heading as="h4">محصولات</Heading>
          <li>بتن پرطرفدار ۱</li>
          <li>بتن پرطرفدار ۲</li>
        </ul>
      )}

      <ul>
        <Heading as="h4">ارتباطات</Heading>
        <li>ارتباط با تیم فروش</li>
        <li>ارتباط با پشتیبانی</li>
      </ul>
    </StyledFooterInfo>
  );
}

export default FooterInfo;
