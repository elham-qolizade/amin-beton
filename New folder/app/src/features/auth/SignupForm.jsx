/*eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IoPeople } from "react-icons/io5";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Row from "../../ui/Row";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSignup } from "./useSignup";

const StyledSignupForm = styled.div`
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

function SignupForm() {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useSignup();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    signup(data);
    reset();
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <StyledSignupForm>
      <TitleBox>
        <IoPeople />
        <Link to={"/login"}> ورود |&nbsp; </Link>
        <Link to={"/signup"}>
          <span> ثبت نام </span>
        </Link>
      </TitleBox>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.first_name?.message}>
          <Input
            type="text"
            id="firstName"
            placeholder="نام"
            disabled={isSigningUp}
            {...register("first_name", {
              required: "این فیلد الزامی می باشد!",
              maxLength: {
                value: 256,
                message: "اسم نباید بیشتر از ۲۵۶ کاراکتر باشد!",
              },
              minLength: {
                value: 1,
                message: "اسم نباید کمتر از ۱ کاراکتر باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.last_name?.message}>
          <Input
            type="text"
            id="lastName"
            placeholder="نام خانوادگی"
            disabled={isSigningUp}
            {...register("last_name", {
              required: "این فیلد الزامی می باشد!",
              maxLength: {
                value: 256,
                message: "نام خانوادگی نباید بیشتر از ۲۵۶ کاراکتر باشد!",
              },
              minLength: {
                value: 1,
                message: "نام خانوادگی نباید کمتر از ۱ کاراکتر باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.phone?.message}>
          <Input
            type="text"
            id="phoneNumber"
            placeholder="شماره تماس"
            disabled={isSigningUp}
            {...register("phone", {
              required: "این فیلد الزامی می باشد!",
              maxLength: {
                value: 11,
                message: "شماره تماس نباید بیشتر از ۱۱ رقم باشد!",
              },
              minLength: {
                value: 1,
                message: "شماره تماس نباید کمتر از ۱ رقم باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Row>
            <Link to={"/login"}>حساب کاربری دارید؟ وارد شوید.</Link>

            <Row type="horizontal">
              <Button variation="primary" size="small" disabled={isSigningUp}>
                ارسال درخواست ثبت نام
              </Button>
              <Button
                variation="secondary"
                size="small"
                type="reset"
                disabled={isSigningUp}
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
    </StyledSignupForm>
  );
}

export default SignupForm;
