import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const StyledFinancialPanelLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Header = styled.header`
  padding: 4rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);

  grid-column: 1/-1;

  font-size: 2rem;
  font-weight: 800;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function FinancialPanelLayout() {
  return (
    <StyledFinancialPanelLayout>
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header>داشبورد مالی</Header>

      {/* Main Content */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledFinancialPanelLayout>
  );
}

export default FinancialPanelLayout;
