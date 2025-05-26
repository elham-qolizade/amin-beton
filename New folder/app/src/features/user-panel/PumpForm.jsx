/*eslint-disable */
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";

import { usePumpList, useSubPumpList } from "../../hooks/useDropdownsData";

const StyledPumpForm = styled.div`
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

function PumpForm({ id, control, register, errors, index, data, deletePump }) {
  const { unregister, ...formMethods } = useFormContext();
  const [pumpType, setPumpType] = useState(4);

  const { isLoadingPumpList, pumpList } = usePumpList();
  const { isLoadingSubPumpList, subPumpList } = useSubPumpList(pumpType);

  function handlePumpTypeChange(e) {
    // Update state to the new value
    const newPumpType = e.target.value;

    // for handling the situation when user goes back on "انتخاب کنید..."
    if (newPumpType === "0") {
      setPumpType(4);
      return;
    }
    setPumpType(newPumpType);

    // Call the original onChange handler for react-hook-form
    formMethods.setValue(`pumps[${index}].pump`, newPumpType);

    // Determine if the sub_pump is applicable for this pump type
    const needsSubPump = newPumpType === "1" || newPumpType === "2";

    if (!needsSubPump) {
      // If the new pump type does not need a sub_pump, unregister it
      unregister(`pumps[${index}].sub_pump`);
    }
  }

  if (isLoadingPumpList || isLoadingSubPumpList) return <Spinner />;

  return (
    <StyledPumpForm>
      <DeleteIcon onClick={() => deletePump(id, index)}>
        <FaTrash />
      </DeleteIcon>

      <Controller
        name={`pumps[${index}].pump`}
        control={control}
        rules={{ required: "این فیلد الزامی است." }}
        render={({ field }) => (
          <Select
            {...field}
            onChange={(e) => {
              // Hook form onChange :
              field.onChange(e);

              // Custom onChange:
              handlePumpTypeChange(e);
            }}
            options={pumpList}
          />
        )}
      />

      {/* SubPomps Logic */}
      {pumpType === "1" && (
        <Controller
          name={`pumps[${index}].sub_pump`}
          control={control}
          rules={{ required: "این فیلد الزامی است." }}
          render={({ field }) => <Select {...field} options={subPumpList} />}
        />
      )}

      {pumpType === "2" && (
        <Controller
          name={`pumps[${index}].sub_pump`}
          control={control}
          rules={{ required: "این فیلد الزامی است." }}
          render={({ field }) => <Select {...field} options={subPumpList} />}
        />
      )}

      <Input
        type="number"
        placeholder="تعداد پمپ"
        {...register(`pumps[${index}].count`, {
          required: "این فیلد الزامی است.",
        })}
      />

      {errors?.pumps?.at(index) && (
        <span className="error">تمام فیلد ها را پر کنید!</span>
      )}
    </StyledPumpForm>
  );
}

export default PumpForm;
