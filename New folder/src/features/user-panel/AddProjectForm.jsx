import styled from "styled-components";
import { PiListPlusBold } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineDescription, MdOutlineMyLocation } from "react-icons/md";

import Input from "../../ui/Input";

const StyledAddProjectForm = styled.div`
  background-color: var(--color-grey-800);
  color: var(--color-grey-100);
  margin-top: 5rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px dashed var(--color-brand-500);

  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2rem;

  input {
    background-color: var(--color-grey-100);
  }

  .project-name {
    grid-column: 1/2;
    grid-row: 2/3;
  }

  .start-date {
    grid-column: 1/2;
    grid-row: 3/4;
  }

  .description {
    grid-column: 2/3;
    grid-row: 2/4;
    input {
      height: 100%;
    }
  }

  .location {
    grid-column: 3/4;
    grid-row: 2/4;
    input {
      height: 100%;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.8rem;
  font-weight: 700;
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

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

const AddButton = styled.button`
  background-color: var(--color-brand-500);
  color: var(--color-grey-800);
  height: 50%;
  border-radius: 1rem;
  border: none;
  grid-column: 3/4;
  grid-row: 1/2;
  align-self: center;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function AddProjectForm() {
  return (
    <StyledAddProjectForm>
      <Title>
        <PiListPlusBold />
        <p>افزودن پروژه</p>
      </Title>

      <FormRow className="project-name">
        <Label>
          <FaRegBuilding />
          نام پروژه
        </Label>
        <Input />
      </FormRow>

      <FormRow className="start-date">
        <Label>
          <CiCalendar />
          تاریخ آغاز پروژه
        </Label>
        <Input />
      </FormRow>

      <FormRow className="description">
        <Label>
          <MdOutlineDescription />
          توضیحات
        </Label>
        <Input />
      </FormRow>

      <FormRow className="location">
        <Label>
          <MdOutlineMyLocation />
          مکان
        </Label>
        <Input />
      </FormRow>

      <AddButton>افرودن پروژه</AddButton>
    </StyledAddProjectForm>
  );
}

export default AddProjectForm;
