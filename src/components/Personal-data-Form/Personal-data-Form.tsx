import React, { useEffect, useState } from 'react';
import './Personal-data-Form.scss';

interface Validation {
  isEmpty?: boolean;
  name?: boolean;
  phone?: boolean;
  address?: boolean;
  email?: boolean;
  creditCardNumber?: boolean;
  creditCardExpDate?: boolean;
  creditCardCVV?: boolean;
}

const CVV_LENGTH = 3;
const EXP_DATE_LENGTH = 5;
const CARD_NUMBER_LENGTH = 19;

const useValidation = (value: string, validations: Validation) => {
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
    isEmpty || nameError || phoneError || addressError || emailError
      ? setInputValid(false)
      : setInputValid(true);
  }, [isEmpty, nameError, phoneError, addressError, emailError]);

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

const useInput = (initValue: string, validations: Validation) => {
  const [value, setValue] = useState(initValue);
  const [isInputBlur, setInputBlur] = useState(false);
  const validationCheck = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

const PersonalDataForm = (): JSX.Element => {
  const name = useInput('', { isEmpty: true, name: true });
  const phone = useInput('', { isEmpty: true, phone: true });
  const address = useInput('', { isEmpty: true, address: true });
  const email = useInput('', { isEmpty: true, email: true });
  const creditCardNumber = useInput('', { isEmpty: true, creditCardNumber: true });
  const creditCardExpDate = useInput('', { isEmpty: true, creditCardExpDate: true });
  const creditCardCVV = useInput('', { isEmpty: true, creditCardCVV: true });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('submit');
  };

  const getCardNumberVal = (value: string) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
  };

  const getExpDateVal = (value: string) => {
    return value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
  };

  return (
    <>
      <form className='personal-data__form' onSubmit={handleSubmit}>
        <h2 className='form-title'>Personal details</h2>
        <input
          className='form-input'
          type='text'
          name='name'
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.handleBlur(e)}
          placeholder='Name Surname'
          value={name.value}
        />
        {name.isInputBlur && name.isEmpty && <p className='error-message'>Field must be filled</p>}
        {name.isInputBlur && name.nameError && <p className='error-message'>Incorrect name</p>}
        <input
          className='form-input'
          type='tel'
          name='phone'
          placeholder='Phone number: +111111111'
          value={phone.value}
          onChange={(e) => phone.onChange(e)}
          onBlur={(e) => phone.handleBlur(e)}
        />
        {phone.isInputBlur && phone.isEmpty && (
          <p className='error-message'>Field must be filled</p>
        )}
        {phone.isInputBlur && phone.phoneError && <p className='error-message'>Incorrect phone</p>}
        <input
          className='form-input'
          type='text'
          name='address'
          placeholder='Delivery address'
          value={address.value}
          onChange={(e) => address.onChange(e)}
          onBlur={(e) => address.handleBlur(e)}
        />
        {address.isInputBlur && address.isEmpty && (
          <p className='error-message'>Field must be filled</p>
        )}
        {address.isInputBlur && address.addressError && (
          <p className='error-message'>Incorrect address</p>
        )}
        <input
          className='form-input'
          type='email'
          name='email'
          placeholder='E-mail'
          value={email.value}
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.handleBlur(e)}
        />
        {email.isInputBlur && email.isEmpty && (
          <p className='error-message'>Field must be filled</p>
        )}
        {email.isInputBlur && email.emailError && <p className='error-message'>Incorrect email</p>}

        <h2 className='form-title'>Credit card details</h2>
        <div className='credit-card__container'>
          <input
            className='form-input__credit-card'
            type='text'
            name='credit-card-number'
            placeholder='Card number'
            value={getCardNumberVal(creditCardNumber.value)}
            onChange={(e) => creditCardNumber.handleCardNumber(e)}
            onBlur={(e) => creditCardNumber.handleBlur(e)}
          />

          <label className='form-label'>
            Exp. date:{' '}
            <input
              className='form-input__credit-card'
              type='text'
              name='credit-card-exp-date'
              placeholder='Card number'
              value={getExpDateVal(creditCardExpDate.value)}
              onChange={(e) => creditCardExpDate.handleExpDate(e)}
              onBlur={(e) => creditCardExpDate.handleBlur(e)}
            />
          </label>

          <label className='form-label'>
            CVV:{' '}
            <input
              className='form-input__credit-card'
              type='number'
              name='credit-card-CVV'
              placeholder='CVV'
              value={creditCardCVV.value}
              onChange={(e) => creditCardCVV.handleCVV(e)}
              onBlur={(e) => creditCardCVV.handleBlur(e)}
            />
          </label>
        </div>

        <div className='credit-card_error-container'>
          {creditCardNumber.isInputBlur &&
            (creditCardNumber.isEmpty || creditCardNumber.creditCardNumberError) && (
              <p className='error-message'>Card number error</p>
            )}
          {creditCardExpDate.isInputBlur &&
            (creditCardExpDate.isEmpty || creditCardExpDate.creditCardExpDateError) && (
              <p className='error-message'>Card expiration date error</p>
            )}
          {creditCardCVV.isInputBlur &&
            (creditCardCVV.isEmpty || creditCardCVV.creditCardCVVError) && (
              <p className='error-message'>Card CVV error</p>
            )}
        </div>

        <button
          type='submit'
          className='form-button'
          disabled={
            !name.inputValid || !address.inputValid || !email.inputValid || !phone.inputValid
          }
        >
          Confirm
        </button>
      </form>
    </>
  );
};

export default PersonalDataForm;
