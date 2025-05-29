import React, { FC, ReactNode,  useEffect, useState } from 'react';

interface ModalProps {
  children: ReactNode;
  id: string;
  classActive: boolean;
  onRemoveClass: () => void;
}

const ModalEdit:FC<ModalProps> = ({ children, id , classActive, onRemoveClass}) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() =>{
    setIsActive(classActive)
  },[classActive])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onRemoveClass()
    }
  };

   const handlelick = () => {
      onRemoveClass()
  };
  

  return (
    <div id={id} 
     className={isActive ? 'modal active' : 'modal'}
     onClick={handleOverlayClick}>
      <div className='modalContent'>
        <button
          className='closeButton btn'
          onClick={handlelick}
          aria-label="Закрыть" >
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalEdit;
