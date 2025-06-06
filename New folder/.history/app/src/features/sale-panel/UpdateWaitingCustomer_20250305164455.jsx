/*eslint-disable */
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

const StyledUpdateWaitingCustomer = styled.div`
  padding: 3rem 1.5rem;

  form {
    width: 40rem;
  }
`;

function UpdateWaitingCustomer({
  customer,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: customer,
  });
  const { errors } = formState;

  function onSubmit(data) {
    onConfirm?.({ updatedObject: data, id: customer.id });
    onCloseModal();
  }

  function onError(errors) {
    console.log(" from update window : ", errors);
  }

  return (
    <StyledUpdateWaitingCustomer>
      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.phone?.message}>
          <Input
            placeholder="شماره تلفن"
            disabled={disabled}
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

        <FormRow error={errors?.first_name?.message}>
          <Input
            placeholder="نام"
            disabled={disabled}
            {...register("first_name", {
              required: "این فیلد الزامی می باشد!",
              maxLength: {
                value: 256,
                message: "نام نباید بیشتر از ۲۵۶ کاراکتر باشد!",
              },
              minLength: {
                value: 1,
                message: "نام نباید کمتر از ۱ کاراکتر باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.last_name?.message}>
          <Input
            placeholder="نام خانوادگی"
            disabled={disabled}
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

        <FormRow>
          <Button variation="tertiary" disabled={disabled}>
            تایید ویرایش
          </Button>
          <Button variation="danger" onClick={onCloseModal} disabled={disabled}>
            لغو
          </Button>
        </FormRow>
      </Form>
    </StyledUpdateWaitingCustomer>
  );
}

export default UpdateWaitingCustomer;
