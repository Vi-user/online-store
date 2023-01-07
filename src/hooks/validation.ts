import { useEffect, useState } from 'react';

export interface Validation {
  isEmpty?: boolean;
  name?: boolean;
  phone?: boolean;
  address?: boolean;
  email?: boolean;
  creditCardNumber?: boolean;
  creditCardExpDate?: boolean;
  creditCardCVV?: boolean;
}

export interface ValidationErrors {
  isEmpty?: boolean;
  nameError?: boolean;
  phoneError?: boolean;
  addressError?: boolean;
  emailError?: boolean;
  creditCardNumberError?: boolean;
  creditCardExpDateError?: boolean;
  creditCardCVVError?: boolean;
  inputValid?: boolean;
}

export const useValidation = (value: string, validations: Validation): ValidationErrors => {
  const [isEmpty, setEmpty] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [creditCardNumberError, setCreditCardNumberError] = useState(false);
  const [creditCardExpDateError, setCreditCardExpDateError] = useState(false);
  const [creditCardCVVError, setCreditCardCVVError] = useState(false);
  const [inputValid, setInputValid] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'name': {
          const re = /[A-Za-z]{3,}.[A-Za-z]{3,}/;
          re.test(String(value).toLowerCase()) ? setNameError(false) : setNameError(true);
          break;
        }
        case 'phone': {
          const re = /^\+\d{9,}$/;
          re.test(String(value).trim()) ? setPhoneError(false) : setPhoneError(true);
          break;
        }
        case 'address': {
          const re = /[A-Za-z]{5,}.[A-Za-z]{5,}.[A-Za-z]{5,}/;
          re.test(String(value).toLowerCase()) ? setAddressError(false) : setAddressError(true);
          break;
        }
        case 'email': {
          const re =
            /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
          re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
          break;
        }
        case 'creditCardNumber': {
          const re = /^\d{16}$/;
          const newVal = String(value.replace(/ */g, ''));
          re.test(String(newVal))
            ? setCreditCardNumberError(false)
            : setCreditCardNumberError(true);
          break;
        }
        case 'creditCardExpDate': {
          const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
          const newVal = String(value.replace(/\//g, ''));
          re.test(String(newVal))
            ? setCreditCardExpDateError(false)
            : setCreditCardExpDateError(true);
          break;
        }
        case 'creditCardCVV': {
          const re = /^\d{3}$/;
          re.test(String(value)) ? setCreditCardCVVError(false) : setCreditCardCVVError(true);
          break;
        }
      }
    }
  }, [value, validations]);

  useEffect(() => {
    isEmpty ||
    nameError ||
    phoneError ||
    addressError ||
    emailError ||
    creditCardNumberError ||
    creditCardExpDateError ||
    creditCardCVVError
      ? setInputValid(false)
      : setInputValid(true);
  }, [
    isEmpty,
    nameError,
    phoneError,
    addressError,
    emailError,
    creditCardNumberError,
    creditCardExpDateError,
    creditCardCVVError,
  ]);

  return {
    isEmpty,
    nameError,
    phoneError,
    addressError,
    emailError,
    creditCardNumberError,
    creditCardExpDateError,
    creditCardCVVError,
    inputValid,
  };
};
