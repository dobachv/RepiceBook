import React from 'react';
import './footer.scss'

const Footer: React.FC = () => {
 
  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <p className='footer__text list-reset'> Приятного аппетита!</p>
      </div>
    </footer>
  );
};

export default Footer;