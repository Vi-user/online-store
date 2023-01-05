import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasketContext } from '../../App';
import { basketActionTypes } from '../../hooks/basketReducer';
import { useInput } from '../../hooks/formInput';
import './Personal-data-Form.scss';

const PersonalDataForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { dispatch } = useContext(BasketContext);

  const name = useInput('', { isEmpty: true, name: true });
  const phone = useInput('', { isEmpty: true, phone: true });
  const address = useInput('', { isEmpty: true, address: true });
  const email = useInput('', { isEmpty: true, email: true });
  const creditCardNumber = useInput('', { isEmpty: true, creditCardNumber: true });
  const creditCardExpDate = useInput('', { isEmpty: true, creditCardExpDate: true });
  const creditCardCVV = useInput('', { isEmpty: true, creditCardCVV: true });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({ type: basketActionTypes.RESET, payload: 0 });
    alert('your order is placed, in 3 seconds you will return to the main page');
    setTimeout(() => navigate('/'), 3000);
    console.log('submit');
  };

  const formatCardNumberVal = (value: string) => {
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
          onBlur={() => name.handleBlur()}
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
          onBlur={() => phone.handleBlur()}
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
          onBlur={() => address.handleBlur()}
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
          onBlur={() => email.handleBlur()}
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
            value={formatCardNumberVal(creditCardNumber.value)}
            onChange={(e) => creditCardNumber.handleCardNumber(e)}
            onBlur={() => creditCardNumber.handleBlur()}
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
              onBlur={() => creditCardExpDate.handleBlur()}
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
              onBlur={() => creditCardCVV.handleBlur()}
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
            !name.inputValid ||
            !address.inputValid ||
            !email.inputValid ||
            !phone.inputValid ||
            !creditCardNumber.inputValid ||
            !creditCardExpDate.inputValid ||
            !creditCardCVV.inputValid
          }
        >
          Confirm
        </button>
      </form>
    </>
  );
};

export default PersonalDataForm;
