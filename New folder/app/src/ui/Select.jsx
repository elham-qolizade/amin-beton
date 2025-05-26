/*eslint-disable */
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  -webkit-appearance: none;
`;

function Select({ options, value, onChange, ref, ...props }) {
  // for adding the first line to the dropdown
  const editedOptions = [
    { id: 0, title: "انتخاب کنید...", is_active: true },
    ...options,
  ];

  const activeOptions = editedOptions.filter(
    (option) => option.is_active === true
  );

  return (
    <StyledSelect value={value} onChange={onChange} ref={ref} {...props}>
      {activeOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
