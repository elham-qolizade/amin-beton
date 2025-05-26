import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 6rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-dark);
  margin-bottom: 1rem;
`;

const InvoiceCard = styled.div`
  background-color: #f9f9f9;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const StatusText = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-800);
`;

const PriceText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-green-600);
`;

const CreatedAtText = styled.p`
  font-size: 1rem;
  color: var(--color-grey-600);
`;

const InvoiceLink = styled.a`
  color: var(--color-blue-600);
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    color: var(--color-blue-800);
  }
`;

const DenyReason = styled.p`
  font-size: 1rem;
  color: var(--color-red-600);
  font-weight: bold;
`;

const FormWrapper = styled.form`
  background-color: #f1f1f1;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 3rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-800);
  }

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;

export default InvoicesListWithForm;
