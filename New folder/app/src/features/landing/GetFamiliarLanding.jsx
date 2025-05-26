import styled from "styled-components";
import Heading from "../../ui/Heading";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const StyledGetFamiliarLanding = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-top: 5rem;
  margin-bottom: 15rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  // 1100px
  @media screen and (max-width: 68.75em) {
    width: 80%;
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const BrickPicture = styled.img`
  width: 30vw;
  height: auto;

  // 800px
  @media screen and (max-width: 68.75em) {
    width: 50vw;
    height: auto;
    margin-top: 5rem;
  }
`;

const FamiliarText = styled.div`
  /* width: 60%;  */
  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 3rem;
  }

  p {
    line-height: 2;
    color: var(--color-grey-400);
    font-weight: 500;

    span {
      color: var(--color-brand-700);
      font-weight: 800;
    }
  }
`;

function GetFamiliarLanding() {
  const dims = useWindowDimensions();
  return (
    <StyledGetFamiliarLanding id="get-familiar">
      {/* Picture while width > 1100 */}
      {dims.width > 1100 && (
        <BrickPicture src="/images/brick-1.jpg" alt="Brick Picture" />
      )}

      {/* Text */}
      <FamiliarText>
        <Heading as="h2">آشنایی با ما</Heading>
        <p>
          شرکت بتن <span> امین بتن</span>
          &nbsp;با سال‌ها تجربه در عرصه ساخت و ساز، به عنوان یک نماینده برجسته
          در این صنعت شناخته می‌شود. ما با استفاده از مواد با کیفیت بالا و تخصص
          فنی، در اجرای پروژه‌های متنوع به عنوان یک شریک مورد اعتماد شناخته
          می‌شویم. هدف ما تولید بتن با دوام و مقاومت بالا برای ساختمان‌ها و
          زیرساخت‌های پایدار است. به دنبال ارتقاء فرآیندها و خدمات، ما با افتخار
          به ارائه راهکارهای بتنی منحصربه‌فرد ادامه می‌دهیم. شرکت بتن{" "}
          <span> امین بتن</span>
          &nbsp;با سال‌ها تجربه در عرصه ساخت و ساز، به عنوان یک نماینده برجسته
          در این صنعت شناخته می‌شود. ما با استفاده از مواد با کیفیت بالا و تخصص
          فنی، در اجرای پروژه‌های متنوع به عنوان یک شریک مورد اعتماد شناخته
          می‌شویم. هدف ما تولید بتن با دوام و مقاومت بالا برای ساختمان‌ها و
          زیرساخت‌های پایدار است. به دنبال ارتقاء فرآیندها و خدمات، ما با افتخار
          به ارائه راهکارهای بتنی منحصربه‌فرد ادامه می‌دهیم.
        </p>
      </FamiliarText>

      {/* Picture while width < 1100 */}
      {dims.width < 1100 && (
        <BrickPicture src="/images/brick-1.jpg" alt="Brick Picture" />
      )}
    </StyledGetFamiliarLanding>
  );
}

export default GetFamiliarLanding;
