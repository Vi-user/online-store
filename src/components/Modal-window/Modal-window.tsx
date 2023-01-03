import React, { FC } from 'react';
import './Modal-window.scss';
import PersonalDataForm from '../Personal-data-Form/Personal-data-Form';

interface ModalWindowProps {
  isOpen: boolean;
  changeModalVisibility: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ isOpen, changeModalVisibility }) => {
  return (
    <>
      {isOpen && (
        <div className='modal-overlay' onClick={changeModalVisibility}>
          <div
            className='modal-window'
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
          >
            <PersonalDataForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWindow;
