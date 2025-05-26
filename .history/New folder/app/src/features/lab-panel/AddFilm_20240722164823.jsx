/*eslint-disable */
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCreateLabResult } from "./useCreateLabResult";
import { useLabCategories } from "./useLabCategories";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";

const StyledAddFilm = styled.div`
  h3 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .alarm {
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--color-red-600);
    margin-bottom: 4rem;
  }

  .isCreating {
    color: var(--color-brand-600);
  }
`;

function AddFilm({ onCloseModal }) {
  const { orderId } = useParams(); // type of String
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;
  const { isCreating, createLabResult } = useCreateLabResult();
  const { isLoadingLabCategories, labCategories } = useLabCategories();
  console.log(labCategories);

  if (isLoadingLabCategories) return <Spinner />;

  const customFormRowStyle = {
    gridTemplateRows: "1fr 1fr",
  };

  function onSubmit(data) {
    const submitData = {
      ...data,
      video: data.video[0],
      order: orderId,
    };

    createLabResult(submitData);
    // onCloseModal();
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <StyledAddFilm>
      <Form
        type="modal"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Heading as="h3">ثبت فایل آزمایشگاه</Heading>
        <Heading as="h4" className="alarm">
          بعد از ارسال، منتظر اتمام آپلود فایل شوید. این فرایند ممکن است کمی
          زمان‌بر باشد.{" "}
        </Heading>

        <FormRow error={errors?.title?.message} style={customFormRowStyle}>
          <Input
            type="text"
            placeholder="نام"
            disabled={isCreating}
            {...register("title", {
              required: "این فیلد الزامی است.",
            })}
          />
        </FormRow>

        <FormRow label="کتگوری" error={errors?.category?.message}>
          <Controller
            name="category"
            control={control}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
            render={({ field }) => (
              <Select
                options={labCategories}
                {...field}
                disabled={isLoadingLabCategories || isCreating}
              />
            )}
          />
        </FormRow>

        <FormRow error={errors?.video?.message} style={customFormRowStyle}>
          <FileInput
            accept="video/*, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            disabled={isCreating}
            {...register("video", {
              required: "این فیلد الزامی است.",
            })}
          />
        </FormRow>

        <FormRow style={{ display: "flex", alignItems: "center" }}>
          <Button size="small" disabled={isCreating}>
            {isCreating ? <SpinnerMini /> : "ارسال"}
          </Button>
          {isCreating && <h4 className="isCreating">در حال آپلود فایل...</h4>}
        </FormRow>
      </Form>
    </StyledAddFilm>
  );
}

export default AddFilm;
