import './modal.scss'
import React, { FC, ReactNode } from 'react';
import { ToggleModal } from '../../app/features/modalSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';


interface ModalProps {
  children: ReactNode; 
}

const Modal: FC<ModalProps> = ({children }) => {
  const dispatch = useAppDispatch()
  const themeModal = useAppSelector((state:any) => state.modal)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(ToggleModal("modal"))
    }
  };

  return (
    <div  id="modal"  className={ themeModal.modalOpen} 
     onClick={handleOverlayClick}>
      
      <div className='modalContent '>
        <button 
         className='closeButton btn'
          onClick={() =>  dispatch(ToggleModal("modal"))}
          aria-label="Закрыть"
        >
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;