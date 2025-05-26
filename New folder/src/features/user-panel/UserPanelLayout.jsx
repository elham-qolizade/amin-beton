import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../ui/Logo";
import LogoutButton from "../../ui/LogoutButton";
import Footer from "../../ui/Footer";
import Button from "../../ui/Button";

const StyledUserPanelLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Header = styled.header`
  padding: 4rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);

  font-size: 2rem;
  font-weight: 800;

  display: flex;
  gap: 2rem;
  align-items: center;

  .title {
    flex-grow: 1;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  /* overflow: scroll; */
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function UserPanelLayout() {
  return (
    <StyledUserPanelLayout>
      {/* Header */}
      <Header>
        <Logo color="black" />
        <p className="title">داشبورد کاربری</p>
        <Button variation="secondary">بازکشت به صفحه پروژه ها</Button>
        <LogoutButton />
      </Header>

      {/* Main Content */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      {/* Footer */}
      <Footer />
    </StyledUserPanelLayout>
  );
}

export default UserPanelLayout;
