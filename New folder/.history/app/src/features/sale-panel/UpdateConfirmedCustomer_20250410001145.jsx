/*eslint-disable */
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

const StyledUpdateConfirmedCustomer = styled.div`
  padding: 3rem 1.5rem;
  form {
    width: 40rem;
  }
`;

function UpdateConfirmedCustomer({
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
    console.log(errors);
  }

  return (
    <StyledUpdateConfirmedCustomer>
      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.first_name?.message}>
          <label htmlFor="first_name">نام</label>
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
          <label htmlFor="first_name">نام خانوادگی</label>
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

        <FormRow error={errors?.username?.message}>
          <Input
            disabled
            placeholder="شماره مشتری "
            {...register("username", {
              required: "این فیلد الزامی می باشد!",
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
    </StyledUpdateConfirmedCustomer>
  );
}

export default UpdateConfirmedCustomer;
