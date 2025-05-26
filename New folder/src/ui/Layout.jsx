import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styled from "styled-components";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Layout() {
  return (
    <StyledLayout>
      <main>
        <Outlet />
      </main>
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
