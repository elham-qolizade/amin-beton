/*eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TfiHeadphoneAlt } from "react-icons/tfi";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Textarea from "../../ui/Textarea";
import { usePostContact } from "../landing/usePostContact";

const StyledContactUsForm = styled.div`
  width: 40vw;
  background-color: var(--color-green-100);
  padding: 5rem 0;
  justify-self: flex-start;
  position: relative;

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
  width: 70%;
  margin: 0 auto;

  svg {
    width: 8rem;
    height: 8rem;
    fill: var(--color-brand-500);
    grid-column: 1 /-1;
    position: absolute;
    left: -3rem;
    top: -3rem;
    // 1100px
    @media screen and (max-width: 68.75em) {
      left: 0rem;
      top: 0rem;
    }
  }

  h3 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
  }

  p {
    font-weight: 200;
    margin-bottom: 1.5rem;
  }
`;

function ContactUsForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { postContact, isPostingContact } = usePostContact();

  function onSubmit(data) {
    console.log(data);
    postContact(data);
    reset();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledContactUsForm>
      <TitleBox>
        <TfiHeadphoneAlt />
        <Heading as={"h3"}>ارتباط با ما</Heading>
        <p>
          متخصصان ما به شما برای دستیابی به بهترین محصول متناسب با نیازتان، کمک
          می‌کنند.
        </p>
      </TitleBox>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.first_name?.message}>
          <Input
            type="text"
            id="firstName"
            placeholder="نام"
            disabled={isPostingContact}
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
            disabled={isPostingContact}
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
            disabled={isPostingContact}
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

        <FormRow error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            placeholder="ایمیل"
            disabled={isPostingContact}
            {...register("email", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow error={errors?.company?.message}>
          <Input
            type="text"
            id="companyName"
            placeholder="نام شرکت"
            disabled={isPostingContact}
            {...register("company", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow error={errors?.description?.message}>
          <Textarea
            id="message"
            placeholder="توضیحات"
            disabled={isPostingContact}
            {...register("description", {
              required: "این فیلد الزامی می باشد!",
              maxLength: {
                value: 256,
                message: "توضیحات نباید بیشتر از ۲۵۶ کاراکتر باشد!",
              },
              minLength: {
                value: 1,
                message: "توضیحات نباید کمتر از ۱ کاراکتر باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Button variation="primary" size="small">
            ارسال
          </Button>
          <Button
            variation="secondary"
            size="small"
            type="reset"
            style={{ color: "var(--color-grey-600)" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            بازگشت به صفحه اصلی
          </Button>
        </FormRow>
      </Form>
    </StyledContactUsForm>
  );
}

export default ContactUsForm;
