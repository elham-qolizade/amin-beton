import styled from "styled-components";
import ContactUsLanding from "../../features/landing/ContactUsLanding";
import GetFamiliarLanding from "../../features/landing/GetFamiliarLanding";
import Hero from "../../features/landing/Hero";
import NewsLanding from "../../features/landing/NewsLanding";

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function Home() {
  return (
    <StyledHome>
      <Hero />
      <GetFamiliarLanding />
      <NewsLanding />
      <ContactUsLanding />
    </StyledHome>
  );
}

export default Home;
