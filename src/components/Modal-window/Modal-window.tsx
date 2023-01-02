import React, { FC } from 'react';
import './Modal-window.scss';

interface ModalWindowProps {
  isOpen: boolean;
  changeModalVisibility: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ isOpen, changeModalVisibility }) => {
  return (
    <>
      {isOpen && (
        <div className='modal-overlay' onClick={changeModalVisibility}>
          <div className='modal-window'>ModalWindow Component</div>
        </div>
      )}
    </>
  );
};

export default ModalWindow;
