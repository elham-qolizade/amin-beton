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
    console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledUpdateConfirmedCustomer>
      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.phone_number?.message}>
          <Input
            placeholder="شماره تلفن"
            {...register("phone_number", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow error={errors?.first_name?.message}>
          <Input
            placeholder="نام"
            {...register("first_name", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow error={errors?.last_name?.message}>
          <Input
            placeholder="نام خانوادگی"
            {...register("last_name", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow>
          <Input
            disabled
            placeholder="شماره مشتری "
            {...register("customer_id", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow>
          <Button variation="tertiary" onClick={onConfirm} disabled={disabled}>
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
