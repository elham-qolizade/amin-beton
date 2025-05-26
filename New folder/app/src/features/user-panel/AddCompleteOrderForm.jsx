/*eslint-disable */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import Radio from "../../ui/Radio";
import Button from "../../ui/Button";

import { useCreateCompleteOrder } from "./useOrders";

const StyledAddCompleteOrderForm = styled.div`
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

function AddCompleteOrderForm() {
  const [powerTrowelExists, setPowerTrowelExists] = useState(false);

  const { register, handleSubmit, formState, control, setValue } = useForm({
    defaultValues: {
      power_trowel_count: 0,
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (!powerTrowelExists) {
      setValue("power_trowel_count", 0, { shouldValidate: true });
    }
  }, [powerTrowelExists, setValue]);

  // CreateOrder hook
  const { isCreatingCompleteOrder, createCompleteOrder } =
    useCreateCompleteOrder();

  function onSubmit(data) {
    console.log(data);
    createCompleteOrder(data);
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <StyledAddCompleteOrderForm onSubmit={handleSubmit(onSubmit, onError)}>
      <Title>مرحله نهایی سفارش</Title>
      <Form>
        <FormRow
          label="حداکثر متراژ لوله کشی "
          error={errors?.piping_area_size?.message}
        >
          <Input
            type="text"
            id="pipingAreaSize"
            placeholder="متر  ( عدد به انگلیسی )"
            disabled={isCreatingCompleteOrder}
            {...register("piping_area_size", {
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
                value: 999,
                message: "ورودی باید کمتر از ۹۹۹ باشد.",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="ارتفاع بتن ریزی از محل استقرار پمپ"
          error={errors?.concrete_pouring_height?.message}
        >
          <Input
            type="text"
            id="concretePouringHeight"
            placeholder="متر ( عدد به انگلیسی )"
            disabled={isCreatingCompleteOrder}
            {...register("concrete_pouring_height", {
              required: "این فیلد الزامی می‌باشد.",
              pattern: {
                value: /^[0-9]+$/, // Regex for numbers only
                message: "ورودی باید عدد باشد.",
              },
              max: {
                value: 999,
                message: "ورودی باید کمتر از ۹۹۹ باشد.",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="اجرا و نظارت آبندی ( اختیاری )"
          error={errors?.sealing_implementation?.message}
        >
          <Input
            type="text"
            id="sealingImplementation"
            placeholder="توضیحات"
            disabled={isCreatingCompleteOrder}
            {...register("sealing_implementation")}
          />
        </FormRow>

        <FormRow
          label="ماله پروانه"
          error={errors?.power_trowel?.message}
          style={{
            display: "flex",
            gap: "5rem",
          }}
        >
          <Controller
            name="power_trowel"
            control={control}
            rules={{ required: "این فیلد الزامی می‌باشد." }}
            render={({ field }) => {
              const handlePowerTrowelChange = (event) => {
                const { value } = event.target;
                setPowerTrowelExists(value === "true");
                field.onChange(value);
              };
              return (
                <>
                  <Radio
                    id="powerTrowelYes"
                    value="true"
                    checked={field.value === "true"}
                    onChange={handlePowerTrowelChange}
                    disabled={isCreatingCompleteOrder}
                  >
                    بله
                  </Radio>
                  <Radio
                    id="powerTrowelNo"
                    value="false"
                    checked={field.value === "false"}
                    onChange={handlePowerTrowelChange}
                    disabled={isCreatingCompleteOrder}
                  >
                    خیر
                  </Radio>
                </>
              );
            }}
          />
        </FormRow>

        <FormRow
          label="تعداد ماله پروانه"
          error={errors?.power_trowel_count?.message}
        >
          <Input
            type="number"
            id="powerTrowelCount"
            placeholder="تعداد ماله پروانه"
            disabled={!powerTrowelExists || isCreatingCompleteOrder}
            {...register("power_trowel_count", {
              valueAsNumber: true,
              required: powerTrowelExists && "این فیلد الزامی می‌باشد!",
              min: {
                value: powerTrowelExists ? 1 : 0,
                message: "حداقل مقدار برای تعداد ماله پروانه ۱ می‌باشد!",
              },
              max: {
                value: powerTrowelExists ? 10 : 0,
                message: "حداکثر مقدار برای تعداد ماله پروانه ۱۰ می‌باشد!",
              },
            })}
          />
        </FormRow>

        <FormRow label="نحوه تسویه" error={errors?.settlement_type?.message}>
          <Input
            type="text"
            id="settlemenType"
            placeholder="نحوه تسویه"
            disabled={isCreatingCompleteOrder}
            {...register("settlement_type", {
              required: "این فیلد الزامی می‌باشد.",
            })}
          />
        </FormRow>

        <FormRow
          label="توضیحات تکمیلی"
          error={errors?.additional_description?.message}
        >
          <Textarea
            id="additionalDescription"
            placeholder="توضیحات تکمیلی"
            disabled={isCreatingCompleteOrder}
            {...register("additional_description", {
              required: "این فیلد الزامی می‌باشد.",
            })}
          />
        </FormRow>

        <Button size="small">ثبت این مرحله و نهایی سازی سفارش</Button>
      </Form>
    </StyledAddCompleteOrderForm>
  );
}

export default AddCompleteOrderForm;
