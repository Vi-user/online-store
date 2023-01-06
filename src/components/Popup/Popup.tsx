import React, { FC } from 'react';
import './Popup.scss';

interface PopupProps {
  isOpenPopup: boolean;
  togglePopup: () => void;
  message: string;
}

const Popup: FC<PopupProps> = ({ isOpenPopup, togglePopup, message }) => {
  return (
    <>
      {isOpenPopup && (
        <div className='popup'>
          <p className='popup__text'>{message}</p>
          <span className='popup-close-btn' onClick={togglePopup} />
        </div>
      )}
    </>
  );
};

export default Popup;
