// /*eslint-disable */
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toGregorian } from "jalaali-js";

import Spinner from "../../ui/Spinner";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Radio from "../../ui/Radio";
import Button from "../../ui/Button";
import PersianDatePicker from "../../ui/PersianDatePicker";

import {
  useConcreteList,
  useConcretePouringTypeList,
  useConcreteResistanceClassList,
} from "../../hooks/useDropdownsData";
import { useCreateInitialOrder } from "./useOrders";

const StyledAddInitialOrderForm = styled.div`
  button {
    margin-bottom: 3rem;
  }

  h2 {
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-brand-500);
`;

function AddInitialOrderForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;

  const { projectId } = useParams(); // type of String

  // Dropdowns data
  const { isLoadingConcreteList, concreteList } = useConcreteList();
  const { isLoadingConcretePouringTypeList, concretePouringTypeList } =
    useConcretePouringTypeList();
  const { isLoadingConcreteResistanceClassList, concreteResistanceClassList } =
    useConcreteResistanceClassList();
  //////////////////////////////////////////

  // CreateOrder hook
  const { isCreatingInitialOrder, createInitialOrder } =
    useCreateInitialOrder();

  if (
    isLoadingConcreteList ||
    isLoadingConcretePouringTypeList ||
    isLoadingConcreteResistanceClassList
  )
    return <Spinner />;

  function onSubmit(data) {
    const date = data.delivery_datetime.split(" ")[0].split("/");
    const time = data.delivery_datetime.split(" ")[1];

    const gregorianDate = toGregorian(
      Number(date[0]),
      Number(date[1]),
      Number(date[2])
    );

    if (gregorianDate.gm < 10) gregorianDate.gm = `0${gregorianDate.gm}`;
    if (gregorianDate.gd < 10) gregorianDate.gd = `0${gregorianDate.gd}`;

    const finalDate = `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`;

    const finalDateTime = `${finalDate} ${time}`;

    const submitData = {
      ...data,
      project: projectId,
      delivery_datetime: finalDateTime,
    };
    console.log(submitData);
    createInitialOrder(submitData);
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <StyledAddInitialOrderForm onSubmit={handleSubmit(onSubmit, onError)}>
      <Button
        variation="secondary"
        size="small"
        onClick={() => navigate(-1)}
        disabled={isCreatingInitialOrder}
      >
        بازگشت
      </Button>

      <Title>مرحله اول سفارش</Title>
      <Form>
        <FormRow label="نوع بتن" error={errors?.concrete_type?.message}>
          <Controller
            name="concrete_type"
            control={control}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
            render={({ field }) => (
              <Select
                options={concreteList}
                {...field}
                disabled={isCreatingInitialOrder}
              />
            )}
          />
        </FormRow>

        <FormRow
          label="مقطع بتن ریزی"
          error={errors?.concrete_pouring_type?.message}
        >
          <Controller
            name="concrete_pouring_type"
            control={control}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
            render={({ field }) => (
              <Select
                options={concretePouringTypeList}
                {...field}
                disabled={isCreatingInitialOrder}
              />
            )}
          />
        </FormRow>

        <FormRow
          label="رده مقاومت بتن"
          error={errors?.concrete_resistance_class?.message}
        >
          <Controller
            name="concrete_resistance_class"
            control={control}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
            render={({ field }) => (
              <Select
                options={concreteResistanceClassList}
                {...field}
                disabled={isCreatingInitialOrder}
              />
            )}
          />
        </FormRow>

        <FormRow label="متراژ بتن" error={errors?.concrete_area_size?.message}>
          <Input
            type="text"
            id="concreteAreaSize"
            placeholder="متر مکعب  ( عدد به انگلیسی )"
            disabled={isCreatingInitialOrder}
            {...register("concrete_area_size", {
              required: "این فیلد الزامی می‌باشد.",
              pattern: {
                value: /^[0-9]+$/, // Regex for numbers only
                message: "ورودی باید عدد باشد.",
              },
              min: {
                value: 1,
                message: "ورودی باید بیشتر از ۱ باشد.",
              },
              max: {
                value: 99999,
                message: "ورودی باید کمتر از ۹۹۹۹۹ باشد.",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="شیفت کاری"
          error={errors?.power_trowel?.message}
          style={{
            display: "flex",
            gap: "5rem",
          }}
        >
          <Controller
            name="shift"
            control={control}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
            render={({ field }) => (
              <>
                <Radio
                  id="shiftMorning"
                  value={1}
                  checked={field.value == 1}
                  onChange={field.onChange}
                  disabled={isCreatingInitialOrder}
                >
                  صبح
                </Radio>
                <Radio
                  id="shiftNight"
                  value={2}
                  checked={field.value == 2}
                  onChange={field.onChange}
                  disabled={isCreatingInitialOrder}
                >
                  شب
                </Radio>
              </>
            )}
          />
        </FormRow>

        <FormRow
          label="تاریخ و ساعت درخواستی"
          error={errors?.delivery_datetime?.message}
        >
          <Controller
            name="delivery_datetime"
            control={control}
            render={({ field }) => <PersianDatePicker field={field} />}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
          />
        </FormRow>

        <Button size="small">ثبت این مرحله و رفتن به مرحله بعد</Button>
      </Form>
    </StyledAddInitialOrderForm>
  );
}

export default AddInitialOrderForm;
