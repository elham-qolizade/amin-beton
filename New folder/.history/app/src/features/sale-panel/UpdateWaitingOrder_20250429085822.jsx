// ... imports remain the same

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

  const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const Label = styled.label`
    margin-bottom: 0.25rem;
    font-weight: bold;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  `;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onError)}>
      <GridContainer>
        <InputWrapper>
          <Label>مساحت بتن</Label>
          <Input {...register("concrete_area_size", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>مساحت لوله‌گذاری</Label>
          <Input {...register("piping_area_size", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>ارتفاع ریختن بتن</Label>
          <Input {...register("concrete_pouring_height", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>تعداد دستگاه فرز</Label>
          <Input {...register("power_trowel_count", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>تاریخ و زمان تحویل</Label>
          <Input
            type="datetime-local"
            {...register("delivery_datetime", { required: true })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>شیفت</Label>
          <Input {...register("shift", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>وضعیت</Label>
          <Input {...register("status", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>نوع بتن</Label>
          <Input {...register("concrete_type", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>نوع ریختن بتن</Label>
          <Input {...register("concrete_pouring_type", { required: true })} />
        </InputWrapper>
        <InputWrapper>
          <Label>کلاس مقاومت بتن</Label>
          <Input
            {...register("concrete_resistance_class", { required: true })}
          />
        </InputWrapper>
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
