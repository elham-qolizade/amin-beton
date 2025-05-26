/*eslint-disable */
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

import Spinner from "../../ui/Spinner";
import Logo from "../../ui/Logo";
import LogoutButton from "../../ui/LogoutButton";
import Footer from "../../ui/Footer";

import { useUser } from "../auth/useUser";

const StyledUserPanelLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Header = styled.header`
  width: 100vw;
  padding: 4rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);

  font-size: 2rem;
  font-weight: 800;

  display: flex;
  gap: 2rem;
  align-items: center;

  .dashboard-title {
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
    &:hover {
      border-bottom: 1px solid var(--color-grey-900);
    }
  }

  .grow {
    flex-grow: 1;
    // 500px
    @media screen and (max-width: 31.25em) {
      flex-grow: 0;
    }
  }

  .user {
    margin-right: 3rem;
    font-weight: 600;
    display: flex;
    gap: 1rem;
  }

  // 500px
  @media screen and (max-width: 31.25em) {
    font-size: 1.6rem;
    padding: 2.5rem 2rem;
    justify-content: space-between;
    gap: 1rem;
  }

  // 400px
  @media screen and (max-width: 25em) {
    font-size: 1.4rem;
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
  const { isLoadingUser, user } = useUser();

  if (isLoadingUser) return <Spinner />;

  return (
    <StyledUserPanelLayout>
      {/* Header */}
      <Header>
        <Link to={"/"}>
          <Logo color="black" />
        </Link>
        <Link to={"/user-panel"}>
          <div className="dashboard-title">داشبورد کاربری</div>
        </Link>
        {user && (
          <div className="user grow">
            <FaUser /> {user.first_name} {user.last_name}
          </div>
        )}

        <LogoutButton />
      </Header>

      {/* Main Content */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      {/* Footer */}
      {/* <Footer /> */}
    </StyledUserPanelLayout>
  );
}

export default UserPanelLayout;
