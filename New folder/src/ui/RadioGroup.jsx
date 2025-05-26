/*eslint-disable */
import styled from "styled-components";

export const RadioGroup = styled.div``;

export const RadioLabel = styled.label`
  cursor: pointer;
  position: relative;
`;

export const RadioHtmlInput = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  visibility: hidden;
`;

export const RadioButton = styled.span`
  height: 2rem;
  width: 2rem;
  border: 3px solid var(--color-brand-500);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 0rem;
  left: -3rem;

  &::after {
    content: "";
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 3px solid var(--color-brand-500);
    display: inline-block;
    position: absolute;
    top: 50%; //top: 13%;
    left: 50%; //left: 12%; //without transform
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
  }
`;

// <RadioGroup className="radio-group">
//   <RadioHtmlInput className="radio-input" id={id} name={name} />
//   <RadioLabel htmlFor={id} className="radio-label">
//     <RadioButton className="radio-button" />
//     {title}
//   </RadioLabel>
// </RadioGroup>
