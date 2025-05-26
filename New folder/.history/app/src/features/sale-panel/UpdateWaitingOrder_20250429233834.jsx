/* eslint-disable */
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../../ui/Button";

function UpdateWaitingOrder({ order, onConfirm, disabled, onCloseModal }) {
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: updatedOrder,
  });

  const { errors } = formState;

  const fetchUpdatedOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${order.id}`);
      const data = await res.json();
      setUpdatedOrder(data);
      reset(data);
    } catch (error) {
      console.error("Error fetching updated order:", error);
    }
  };

  async function onSubmit(data) {
    const updatedData = {
      ...data,
      project: order.project.id,
    };

    onConfirm?.({ updatedData: updatedData, id: order.id });

    try {
      await fetchUpdatedOrder();
      onCloseModal();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  function onError(errors) {
    console.log(" from update window : ", errors);
  }

  useEffect(() => {
    reset(updatedOrder);
  }, [updatedOrder, reset]);

  const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    width: 100%;
  `;

  const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  `;
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <GridContainer>
        <label htmlFor="">fff</label>
        <Input
          placeholder="مساحت بتن"
          {...register("concrete_area_size", { required: true })}
        />
        <Input
          placeholder="مساحت لوله گذاری"
          {...register("piping_area_size", { required: true })}
        />
        <Input
          placeholder="ارتفاع ریختن بتن"
          {...register("concrete_pouring_height", { required: true })}
        />
        <Input
          placeholder="تعداد دستگاه فرز"
          {...register("power_trowel_count", { required: true })}
        />
        c
        <Input
          type="datetime-local"
          {...register("delivery_datetime", { required: true })}
        />
        <Input placeholder="شیفت" {...register("shift", { required: true })} />
        <Input
          placeholder="وضعیت"
          {...register("status", { required: true })}
        />
        <Input
          placeholder="نوع بتن"
          {...register("concrete_type", { required: true })}
        />
        <Input
          placeholder="نوع ریختن بتن"
          {...register("concrete_pouring_type", { required: true })}
        />
        <Input
          placeholder="کلاس مقاومت بتن"
          {...register("concrete_resistance_class", { required: true })}
        />
      </GridContainer>
      <Button variation="tertiary" disabled={disabled}>
        تایید ویرایش
      </Button>
      <Button variation="danger" onClick={onCloseModal} disabled={disabled}>
        لغو
      </Button>
    </FormContainer>
  );
}
export default UpdateWaitingOrder;
