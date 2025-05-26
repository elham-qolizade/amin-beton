/*eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { toGregorian } from "jalaali-js";

import { PiListPlusBold } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineDescription, MdOutlineMyLocation } from "react-icons/md";

import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import LocationInput from "./LocationInput";
import PersianDatePicker from "../../ui/PersianDatePicker";

import { useCreateProject } from "./useProjects";
import { convertJalaliDateToGregorian } from "../../utils/helpers";

const StyledAddProjectForm = styled.div`
  background-color: var(--color-grey-800);
  color: var(--color-grey-100);
  padding: 4rem;
  border-radius: 1rem;
  border: 1px dashed var(--color-brand-500);
  overflow: scroll;

  // 500px
  @media screen and (max-width: 31.25em) {
    padding: 1rem 2.5rem;
    width: 100vw;
    height: 100svh;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* grid-template-rows: repeat(3, auto); */
    grid-gap: 2rem;
    overflow: scroll;
    height: 75svh;

    // 500px
    @media screen and (max-width: 31.25em) {
      display: flex;
      flex-direction: column;
      width: 80vw;
      height: 85svh;
      margin: 0 auto;
    }
  }

  input,
  textarea {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    height: 100%;
  }

  .add-btn {
    grid-column: 1/-1;
    /* grid-row: -2/-1; */
    align-self: center;
    transition: all 0.3s;

    // 500px
    @media screen and (max-width: 31.25em) {
      align-self: stretch;
      margin-top: 2.5rem;
    }
  }

  .project-name {
    /* grid-column: 1/2; */
    grid-row: 2/3;
  }

  .start-date {
    /* grid-column: 1/2; */
    grid-row: 3/4;
  }

  .end-date {
  }

  .description {
    /* grid-column: 2/3; */
    grid-row: 2/4;
  }

  .address {
  }

  .postal-code {
  }

  .registered-plate {
  }

  .case-number {
  }

  .supervising-engineer {
  }

  .builder {
  }

  .employer {
  }

  .type {
  }

  .location {
    grid-column: 1/-1;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.8rem;
  font-weight: 700;

  margin-bottom: 3rem;

  // 500px
  @media screen and (max-width: 31.25em) {
    margin: 2.5rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  grid-gap: 0.3rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function AddProjectForm({ onCloseModal }) {
  const [latitude, setLatitude] = useState(35.7);
  const [longitude, setLongitude] = useState(51.4);

  const { isCreating, createProject } = useCreateProject();

  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const gregorianStartDate = convertJalaliDateToGregorian(data.start_date);

    const gregorianEndDate = convertJalaliDateToGregorian(data.end_date);

    const submitData = {
      ...data,
      start_date: gregorianStartDate,
      end_date: gregorianEndDate,
      latitude: String(latitude.toFixed(10)),
      longitude: String(longitude.toFixed(10)),
    };

    console.log(submitData);

    createProject(submitData);
    onCloseModal();
    reset();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledAddProjectForm>
      <Title>
        <PiListPlusBold />
        <p>افزودن پروژه</p>
      </Title>

      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow className="form-row project-name">
          <Label>
            <FaRegBuilding />
            نام پروژه
          </Label>
          <Input
            type="text"
            placeholder="عنوان"
            disabled={isCreating}
            {...register("title", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row start-date">
          <Label>
            <CiCalendar />
            تاریخ آغاز پروژه
          </Label>
          <Input
            type="text"
            placeholder="تاریخ : به شکل 1403/1/1"
            disabled={isCreating}
            {...register("start_date", {
              required: "این فیلد الزامی می باشد!",
            })}
          />

          {/* <Controller
            name="start_date"
            control={control}
            render={({ field }) => <PersianDatePicker field={field} />}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
          /> */}
        </FormRow>

        <FormRow className="form-row end-date">
          <Label>
            <CiCalendar />
            تاریخ پایان پروژه
          </Label>
          <Input
            type="text"
            placeholder="تاریخ : به شکل 1404/2/2"
            disabled={isCreating}
            {...register("end_date", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row description">
          <Label>
            <MdOutlineDescription />
            توضیحات
          </Label>
          <Textarea
            type="text"
            placeholder="توضیحات کلی مرتبط با پروژه را وارد کنید."
            disabled={isCreating}
            {...register("description", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row address">
          <Label>
            <MdOutlineDescription />
            آدرس
          </Label>
          <Textarea
            type="text"
            placeholder="آدرس پروژه"
            disabled={isCreating}
            {...register("address", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row postal-code">
          <Label>
            <FaRegBuilding />
            کد پستی
          </Label>
          <Input
            type="text"
            placeholder="کد پستی"
            disabled={isCreating}
            {...register("postal_code", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row registered-plate">
          <Label>
            <FaRegBuilding />
            پلاک ثبتی
          </Label>
          <Input
            type="text"
            placeholder="پلاک ثبتی"
            disabled={isCreating}
            {...register("registered_plate", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row case-number">
          <Label>
            <FaRegBuilding />
            شماره پرونده
          </Label>
          <Input
            type="text"
            placeholder="شماره پرونده"
            disabled={isCreating}
            {...register("case_number", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row supervising-engineer">
          <Label>
            <FaRegBuilding />
            مهندس ناظر
          </Label>
          <Input
            type="text"
            placeholder="مهندس ناظر"
            disabled={isCreating}
            {...register("supervising_engineer", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row builder">
          <Label>
            <FaRegBuilding />
            سازنده
          </Label>
          <Input
            type="text"
            placeholder="سازنده"
            disabled={isCreating}
            {...register("builder", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row employer">
          <Label>
            <FaRegBuilding />
            کارفرما
          </Label>
          <Input
            type="text"
            placeholder="کارفرما"
            disabled={isCreating}
            {...register("employer", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        <FormRow className="form-row type">
          <Label>
            <FaRegBuilding />
            کاربری
          </Label>
          <Input
            type="text"
            placeholder="کاربری"
            disabled={isCreating}
            {...register("type", {
              required: "این فیلد الزامی می باشد!",
            })}
          />
        </FormRow>

        {/* ############################  Map  ########################### */}
        <FormRow className="form-row location">
          <Label>
            <MdOutlineMyLocation />
            مکان
          </Label>

          <LocationInput
            latitude={latitude}
            setLatitude={setLatitude}
            longitude={longitude}
            setLongitude={setLongitude}
          />
        </FormRow>

        <Button className="add-btn" disabled={isCreating}>
          افرودن پروژه
        </Button>
      </Form>
    </StyledAddProjectForm>
  );
}

export default AddProjectForm;
