import React, { useEffect, useState } from 'react';
import './Personal-data-Form.scss';

interface Validation {
  isEmpty?: boolean;
  name?: boolean;
  phone?: boolean;
  address?: boolean;
  email?: boolean;
}

const useValidation = (value: string, validations: Validation) => {
  const [isEmpty, setEmpty] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
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
          // const re = /^([+]?[0-9\s-\(\)]{3,25})*$/i;
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
    inputValid,
  };
};

const useInput = (initValue: string, validations: Validation) => {
  console.log('validations', validations);
  const [value, setValue] = useState(initValue);
  const [isInputBlur, setInputBlur] = useState(false);
  const validationCheck = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputBlur(true);
  };

  return {
    value,
    isInputBlur,
    onChange,
    handleBlur,
    ...validationCheck,
  };
};

const PersonalDataForm = (): JSX.Element => {
  const name = useInput('', { isEmpty: true, name: true });
  const phone = useInput('', { isEmpty: true, phone: true });
  const address = useInput('', { isEmpty: true, address: true });
  const email = useInput('', { isEmpty: true, email: true });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <>
      <h2 className='form-title'>Personal details</h2>

      <form className='personal-data__form' onSubmit={handleSubmit}>
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
