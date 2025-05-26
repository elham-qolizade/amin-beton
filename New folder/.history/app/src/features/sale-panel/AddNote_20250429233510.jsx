/* eslint-disable */
import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useState } from "react";

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
    reset,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "https://amin-beton-back.chbk.app/api/order-management/add-note/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order: orderId,
            text: data.text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در ثبت یادداشت");
      }

      const result = await response.json();
      console.log("Note added:", result);
      onConfirm?.(result); // ارسال یادداشت ثبت‌شده
      reset();
      onCloseModal(); // بستن مودال
    } catch (error) {
      console.error("Error adding note:", error.message);
    } finally {
      setSubmitting(false);
    }
  }

  function onError(data) {
    console.log("Validation error:", data);
  }

  return (
    <StyledAddNote>
      <h3>افزودن یادداشت</h3>

      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow error={errors?.text?.message}>
          <Input
            type="text"
            placeholder="یادداشت"
            disabled={disabled || submitting}
            {...register("text", {
              required: "این فیلد الزامی است!",
            })}
          />
        </FormRow>

        <FormRow>
          <Button disabled={disabled || submitting}>
            {submitting ? "در حال ارسال..." : "ارسال"}
          </Button>
        </FormRow>
      </Form>
    </StyledAddNote>
  );
}

export default AddNote;
