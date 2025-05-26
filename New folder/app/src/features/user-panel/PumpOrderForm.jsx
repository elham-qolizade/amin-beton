/*eslint-disable */
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import PumpForm from "./PumpForm";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useCreatePumpOrder } from "./useOrders";
import toast from "react-hot-toast";

const StyledPumpOrderForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: stretch;
  }
`;

function PumpOrderForm({ orderId }) {
  const methods = useForm();

  const { isCreatingPumpOrder, createPumpOrder } = useCreatePumpOrder();
  const [pumps, setPumps] = useState([]);

  function onSubmit(data) {
    // we work with data.pumps
    // console.log(data);
    let shouldCallApi = true;

    if (data.pumps === undefined) {
      createPumpOrder([]);
      shouldCallApi = false;
    }

    data?.pumps?.forEach(function (pump) {
      if (pump.pump === "0") {
        toast.error("نوع پمپ را در هر سطر انتخاب کنید!");
        shouldCallApi = false;
      }

      if (pump.sub_pump === "0") {
        toast.error("نوع پمپ زیرمجموعه را در هر سطر انتخاب کنید!");
        shouldCallApi = false;
      }
    });

    const pumpsWithOrderId = data?.pumps?.map((pump) => ({
      ...pump,
      order: Number(orderId),
    }));

    console.log("pumps with orderID", pumpsWithOrderId);
    if (shouldCallApi) createPumpOrder(pumpsWithOrderId);
  }

  function onError(error) {
    console.log("errors:", error);
  }

  function addPump() {
    setPumps([...pumps, { id: Date.now() }]);
  }

  function deletePump(pumpId, index) {
    // Remove the pump from the state
    setPumps((currentPumps) =>
      currentPumps.filter((pump) => pump.id !== pumpId)
    );

    // Get all form values
    const formValues = methods.getValues();

    // Create a new pumps array without the deleted item
    const newPumps = formValues.pumps.filter((_, i) => i !== index);

    // Update the form values for pumps
    methods.setValue("pumps", newPumps);

    // If necessary, manually trigger a re-render of the form
    methods.trigger();
  }

  return (
    <StyledPumpOrderForm>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          {pumps.map((pump, index) => (
            <PumpForm
              name={`pumps[${index}]`}
              id={pump.id}
              key={pump.id}
              register={methods.register}
              control={methods.control}
              errors={methods.formState.errors}
              index={index}
              // data={methods.getValues()?.pumps?.at(index)}
              data={methods.getValues()?.pumps}
              deletePump={deletePump}
            />
          ))}

          <Button
            style={{ alignSelf: "flex-start" }}
            variation="tertiary"
            type="button"
            onClick={addPump}
          >
            افزودن پمپ
          </Button>
          <Button type="submit" disabled={isCreatingPumpOrder}>
            ثبت و رفتن به مرحله بعد
          </Button>
        </Form>
      </FormProvider>
    </StyledPumpOrderForm>
  );
}

export default PumpOrderForm;
