import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const Container = styled.div`
  padding: 2rem;
  max-height: 80vh;
  overflow-y: auto;
`;

const BillCard = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  background: #f9f9f9;
  position: relative;
`;

const Button = styled.button`
  background-color: var(--color-brand-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #c0392b;
  }
`;

const Form = styled.form`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px dashed var(--color-grey-400);
  border-radius: 1rem;
  background: #f1f1f1;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.5rem;
`;

BillsOfLadingWindow.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BillsOfLadingWindow;
