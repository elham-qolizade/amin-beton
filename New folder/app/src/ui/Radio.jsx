/*eslint-disable */
import styled from "styled-components";

const StyledRadio = styled.div`
  display: flex;
  /* width: 10rem; */

  &:not(:last-child) {
    /* padding-bottom: 2rem; */
  }

  .form__radio-input {
    opacity: 0;
    visibility: hidden;
  }

  .form__radio-text {
    margin-right: 3rem;
  }

  .form__radio-label {
    font-size: 1.5rem;
    cursor: pointer;

    display: flex;
    align-items: center;

    .form__radio-button {
      height: 2rem;
      width: 2rem;
      border: 3px solid var(--color-brand-500);
      border-radius: 50%;
      display: inline-block;
      position: absolute;

      &::after {
        content: "";
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        border: 3px solid var(--color-brand-700);
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.2s;
      }
    }
  }
`;

function Radio({ id, name, value, checked, onChange, children }) {
  return (
    <StyledRadio>
      <input
        className="form__radio-input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="form__radio-label">
        <div className="form__radio-button" />
        <div className="form__radio-text">{children}</div>
      </label>
    </StyledRadio>
  );
}

export default Radio;
