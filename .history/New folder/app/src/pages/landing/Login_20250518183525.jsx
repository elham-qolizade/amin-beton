import styled from "styled-components";
import LoginForm from "../../features/auth/LoginForm";

const StyledLogin = styled.div`
  min-height: 95vh;
  background-color: var(--color-green-100);
  padding: 10rem 5rem 15rem 10rem;
  margin-bottom: -5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  // 1100px
  @media screen and (max-width: 68.75em) {
    flex-direction: column;
    padding: 10rem 5rem 15rem 5rem;
  }
  // 700px
  @media screen and (max-width: 43.75em) {
    padding: 10rem 1rem 15rem 1rem;
  }
  // 600px
  @media screen and (max-width: 37.5em) {
    padding: 10rem 1rem 5rem 1rem;
  }
`;

const FormImage = styled.img`
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);

  margin-bottom: 5rem;
  transform: translateY(8rem);

  align-self: stretch;
  object-fit: cover;

  // ~1700px
  @media screen and (max-width: 106em) {
    width: 75rem;
  }
  // ~1600px
  @media screen and (max-width: 100em) {
    width: 70rem;
  }
  // ~1500px
  @media screen and (max-width: 94em) {
    width: 60rem;
  }
  // ~1400px
  @media screen and (max-width: 87.5em) {
    width: 52rem;
  }
  // ~1300px
  @media screen and (max-width: 81.25em) {
    width: 45rem;
  }
  // ~1100px
  @media screen and (max-width: 68.75em) {
    width: 70rem;
    align-self: center;
    transform: translateY(5rem);
  }
  // ~600px
  @media screen and (max-width: 37.5em) {
    width: 50rem;
  }
  // ~400px
  @media screen and (max-width: 25em) {
    width: 40rem;
  }
`;

function Login() {
  return (
    <StyledLogin>
      <LoginForm />
      {/* <FormImage src="/images/concrete-2.jpg" alt="Concrete Building" /> */}
    </StyledLogin>
  );
}

export default Login;
