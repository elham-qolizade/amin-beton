/*eslint-disable */
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import VibratorForm from "./VibratorForm";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

import { useCreateVibratorOrder } from "./useOrders";

const StyledVibratorOrderForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: stretch;
  }
`;

function VibratorOrderForm({ orderId }) {
  const methods = useForm();

  const { isCreatingVibratorOrder, createVibratorOrder } =
    useCreateVibratorOrder();

  const [vibrators, setVibrators] = useState([]);

  function onSubmit(data) {
    // we work with data.vibrators
    // console.log(data);

    let shouldCallApi = true;

    if (data.vibrators === undefined) {
      createVibratorOrder([]);
      shouldCallApi = false;
    }

    data?.vibrators?.forEach(function (vibrator) {
      if (vibrator.vibrator === "0") {
        toast.error("نوع ویبراتور را در هر سطر انتخاب کنید!");
        shouldCallApi = false;
      }

      if (vibrator.sub_vibrator === "0") {
        toast.error("نوع ویبراتور زیرمجموعه را در هر سطر انتخاب کنید!");
        shouldCallApi = false;
      }
    });

    const vibratorsWithOrderId = data?.vibrators?.map((vibrator) => ({
      ...vibrator,
      order: Number(orderId),
    }));

    console.log("vibrators with orderID", vibratorsWithOrderId);
    if (shouldCallApi) createVibratorOrder(vibratorsWithOrderId);
  }

  function onError(error) {
    console.log("errors:", error);
  }

  function addVibrators() {
    setVibrators([...vibrators, { id: Date.now() }]);
  }

  function deleteVibrator(vibratorId, index) {
    // Remove the pump from the state
    setVibrators((currentVibrators) =>
      currentVibrators.filter((vibrator) => vibrator.id !== vibratorId)
    );

    // Get all form values
    const formValues = methods.getValues();

    // Create a new pumps array without the deleted item
    const newVibrators = formValues.vibrators.filter((_, i) => i !== index);

    // Update the form values for pumps
    methods.setValue("vibrators", newVibrators);

    // If necessary, manually trigger a re-render of the form
    methods.trigger();
  }

  return (
    <StyledVibratorOrderForm>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          {vibrators.map((vibrator, index) => (
            <VibratorForm
              name={`vibrators[${index}]`}
              id={vibrator.id}
              key={vibrator.id}
              register={methods.register}
              control={methods.control}
              errors={methods.formState.errors}
              index={index}
              // data={methods.getValues()?.vibrators?.at(index)}
              data={methods.getValues()?.vibrators}
              deleteVibrator={deleteVibrator}
            />
          ))}

          <Button
            style={{ alignSelf: "flex-start" }}
            variation="tertiary"
            type="button"
            onClick={addVibrators}
          >
            افزودن ویبراتور
          </Button>
          <Button type="submit" disabled={isCreatingVibratorOrder}>
            ثبت و رفتن به مرحله بعد
          </Button>
        </Form>
      </FormProvider>
    </StyledVibratorOrderForm>
  );
}

export default VibratorOrderForm;
