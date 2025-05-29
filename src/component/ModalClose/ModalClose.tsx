import '../Modal/modal.scss'
import React from 'react';


interface ModalCloseProms{
    message: string;
    durationSeconds: number;
    classOpen:string;
}
const AutoCloseModal: React.FC<ModalCloseProms> =({ message, durationSeconds, classOpen }) => {

  return (
   <div className={ classOpen} >
        <div className="modalContent">
           <h2>{message}</h2>
           <p>Закроется через {durationSeconds} секунд</p>
        </div>
    </div>
  );
}

export default AutoCloseModal;

