import styled from "styled-components";
import ContactUsLanding from "../ui/ContactUsLanding";
import GetFamiliarLanding from "../ui/GetFamiliarLanding";
import Hero from "../ui/Hero";
import NewsLanding from "../ui/NewsLanding";

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
