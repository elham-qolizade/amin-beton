/*eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { MdEmojiPeople } from "react-icons/md";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Row from "../../ui/Row";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";

const StyledLoginForm = styled.div`
  width: 50vw;

  form {
    width: 70%;
    margin: 0 auto;
  }

  // 1100px
  @media screen and (max-width: 68.75em) {
    width: 70vw;
  }
  // 900px
  @media screen and (max-width: 56.25em) {
    width: 90%;
  }
  // 700px
  @media screen and (max-width: 43.75em) {
    width: 100%;
  }
  // 500px
  @media screen and (max-width: 31.25em) {
    form {
      width: 90%;
    }
  }
`;

const TitleBox = styled.div`
  padding: 0 4rem;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: auto auto;

  width: 70%;
  margin: 0 auto;

  // 1100px
  @media screen and (max-width: 68.75em) {
    padding: 0;
    justify-items: center;
  }
  // 500px
  @media screen and (max-width: 31.25em) {
    justify-items: start;
    width: 90%;
  }

  svg {
    width: 4rem;
    height: 4rem;
    fill: var(--color-brand-500);
    grid-column: 1 /-1;
    justify-self: flex-start;
  }
  a {
    font-size: 3rem;
    font-weight: 300;
    color: var(--color-grey-400);
    margin-bottom: 2rem;

    span {
      font-weight: 900;
      color: var(--color-grey-700);
    }
  }
`;

function LoginForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { login, isLoggingIn } = useLogin();

  function onSubmit(data) {
    console.log(data);
    login(data);
    reset();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledLoginForm>
      <TitleBox>
        <MdEmojiPeople />
        <Link to={"/login"}>
          {" "}
          <span>ورود</span>&nbsp;|{" "}
        </Link>
        <Link to={"/signup"}> &nbsp;ثبت نام</Link>
      </TitleBox>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.username?.message}>
          <Input
            type="text"
            id="userName"
            placeholder="نام کاربری"
            disabled={isLoggingIn}
            {...register("username", {
              required: "این فیلد الزامی می باشد!",
              minLength: {
                value: 1,
                message: "نام کاربری نباید کمتر از ۱ کاراکتر باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.password?.message}>
          <Input
            type="password"
            id="password"
            placeholder="رمز عبور"
            disabled={isLoggingIn}
            {...register("password", {
              required: "این فیلد الزامی می باشد!",
              minLength: {
                value: 1,
                message: "رمز عبور نباید کمتر از ۱ کاراکتر باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Row>
            <Link to="/signup">حساب کاربری ندارید؟ ثبت نام کنید.</Link>
            <Link>رمز عبور خود را فراموش کرده اید؟</Link>

            <Row type="horizontal">
              <Button variation="primary" size="small" disabled={isLoggingIn}>
                ورود
              </Button>
              <Button
                variation="secondary"
                size="small"
                type="reset"
                disabled={isLoggingIn}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                بازگشت به صفحه اصلی
              </Button>
            </Row>
          </Row>
        </FormRow>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
