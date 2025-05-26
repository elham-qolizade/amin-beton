/*eslint-disable */
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";

import {
  useVibratorList,
  useSubVibratorList,
} from "../../hooks/useDropdownsData";

const StyledVibratorForm = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 1fr 1fr;
  grid-gap: 3rem;
  padding: 4rem 0;
  border-bottom: 1px solid var(--color-grey-200);

  /* 500px */
  @media screen and (max-width: 31.25em) {
    grid-template-columns: 3rem 1fr 1fr;
  }

  input {
    grid-column: -2/-1;
  }

  .error {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-red-600);
    grid-column: 2/-1;
    grid-row: 2/3;
    align-self: center;

    /* 500px */
    @media screen and (max-width: 31.25em) {
      grid-column: 1/3;
      text-align: center;
      font-size: 1.4rem;
    }
  }
`;

const DeleteIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-red-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-red-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function VibratorForm({
  id,
  control,
  register,
  errors,
  index,
  data,
  deleteVibrator,
}) {
  const { unregister, ...formMethods } = useFormContext();

  const [vibratorType, setVibratorType] = useState(1);

  const { isLoadingVibratorList, vibratorList } = useVibratorList();
  const { isLoadingSubVibratorList, subVibratorList } =
    useSubVibratorList(vibratorType);

  function handleVibratorTypeChange(e) {
    // Update state to the new value
    const newVibratorType = e.target.value;
    if (newVibratorType === "0") {
      setVibratorType(1);
      return;
    }

    setVibratorType(newVibratorType);

    // Call the original onChange handler for react-hook-form
    formMethods.setValue(`vibrators[${index}].vibrator`, newVibratorType);

    // Determine if the sub_pump is applicable for this pump type
    const needsSubVibrator = newVibratorType === "1" || newVibratorType === "2";

    if (!needsSubVibrator) {
      // If the new pump type does not need a sub_pump, unregister it
      unregister(`vibrators[${index}].sub_vibrator`);
    }
  }

  if (isLoadingVibratorList || isLoadingSubVibratorList) return <Spinner />;

  return (
    <StyledVibratorForm>
      <DeleteIcon onClick={() => deleteVibrator(id, index)}>
        <FaTrash />
      </DeleteIcon>

      <Controller
        name={`vibrators[${index}].vibrator`}
        control={control}
        rules={{ required: "این فیلد الزامی است." }}
        render={({ field }) => (
          <Select
            {...field}
            onChange={(e) => {
              // Hook form onChange :
              field.onChange(e);

              // Custom onChange:
              handleVibratorTypeChange(e);
            }}
            options={vibratorList}
          />
        )}
      />

      {/* SubVibrators Logic */}
      {vibratorType === "1" && (
        <Controller
          name={`vibrators[${index}].sub_vibrator`}
          control={control}
          rules={{ required: "این فیلد الزامی است." }}
          render={({ field }) => (
            <Select {...field} options={subVibratorList} />
          )}
        />
      )}

      {vibratorType === "2" && (
        <Controller
          name={`vibrators[${index}].sub_vibrator`}
          control={control}
          rules={{ required: "این فیلد الزامی است." }}
          render={({ field }) => (
            <Select {...field} options={subVibratorList} />
          )}
        />
      )}

      <Input
        type="number"
        placeholder="تعداد ویبراتور"
        {...register(`vibrators[${index}].count`, {
          required: "این فیلد الزامی است.",
        })}
      />

      {errors?.vibrators?.at(index) && (
        <span className="error">تمام فیلد ها را پر کنید!</span>
      )}
    </StyledVibratorForm>
  );
}

export default VibratorForm;
