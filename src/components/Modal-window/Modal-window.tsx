import React, { FC } from 'react';
import './Modal-window.scss';
import PersonalDataForm from '../Personal-data-Form/Personal-data-Form';

interface ModalWindowProps {
  isOpen: boolean;
  changeModalVisibility: () => void;
  togglePopup: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ isOpen, changeModalVisibility, togglePopup }) => {
  return (
    <>
      {isOpen && (
        <div className='modal-overlay' onClick={changeModalVisibility}>
          <div
            className='modal-window'
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
          >
            <PersonalDataForm togglePopup={togglePopup} />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWindow;
