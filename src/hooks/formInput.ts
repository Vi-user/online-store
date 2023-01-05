import React, { useState } from 'react';
import { useValidation, Validation } from './validation';

const CVV_LENGTH = 3;
const EXP_DATE_LENGTH = 5;
const CARD_NUMBER_LENGTH = 19;

export const useInput = (initValue: string, validations: Validation) => {
  const [value, setValue] = useState(initValue);
  const [isInputBlur, setInputBlur] = useState(false);
  const validationCheck = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setInputBlur(true);
  };

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/gi, '');
    const newVal = value.replace(/ */g, '');
    e.target.value.length <= CARD_NUMBER_LENGTH ? setValue(newVal) : '';
  };

  const handleExpDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/gi, '');
    const newVal = value.replace(/\//g, '');
    e.target.value.length <= EXP_DATE_LENGTH ? setValue(newVal) : '';
  };

  const handleCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length <= CVV_LENGTH ? setValue(e.target.value) : '';
  };

  return {
    value,
    isInputBlur,
    onChange,
    handleCVV,
    handleCardNumber,
    handleExpDate,
    handleBlur,
    ...validationCheck,
  };
};
