import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-grey-800);
    background-color: var(--color-brand-500);
    padding: 1rem 3rem;

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,

  white: css`
    color: var(--color-grey-800);
    background-color: var(--color-grey-0);
    padding: 1rem 3rem;

    &:hover {
      background-color: var(--color-grey-200);
    }
  `,

  secondary: css`
    color: var(--color-grey-500);
    background-color: rgba(255, 255, 255, 0.3);

    border: 1px solid var(--color-brand-500);
    padding: 1rem 3rem;

    &:hover {
      color: var(--color-grey-900);
      /* background-color: var(--color-grey-100); */
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-500);
    padding: 1rem 3rem;
    &:hover {
      background-color: var(--color-red-700);
    }
  `,

  continue: css`
    width: 100%;
    color: var(--color-grey-600);
    background-color: var(--color-brand-500);
    font-weight: 800;
    &:hover {
      background-color: var(--color-brand-700);
    }
  `,

  tertiary: css`
    color: var(--color-grey-100);
    background-color: var(--color-indigo-500);
    padding: 1rem 3rem;

    &:hover {
      background-color: var(--color-indigo-700);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  cursor: pointer;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
