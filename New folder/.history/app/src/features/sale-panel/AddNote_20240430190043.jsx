/*eslint-disable */
import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

const StyledAddNote = styled.div`
  h3 {
    margin-bottom: 3rem;
  }
`;

function AddNote({ onCloseModal, onConfirm, disabled, orderId }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    const submitData = {
      ...data,
      order: orderId,
    };
    console.log(submitData);
    onConfirm?.(submitData);
    onCloseModal();
  }

  function onError(data) {
    console.log(data);
  }

  return (
    <StyledAddNote>
      <h3>افزودن یادداشت</h3>

      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.text?.message}>
          <Input
            type="text"
            placeholder="یادداشت"
            disabled={disabled}
            {...register("text", {
              required: "این فیلد الزامی است!",
            })}
          />
        </FormRow>

        <FormRow>
          <Button disabled={disabled}>ارسال</Button>
        </FormRow>
      </Form>
    </StyledAddNote>
  );
}

export default AddNote;
