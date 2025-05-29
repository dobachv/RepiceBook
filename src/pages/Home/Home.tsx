import React from 'react';
import './home.scss'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

 
  return (
    <section className='welcome'>
      <div className='container welcome__container'>
        <h2 className='welcome__title list-reset' >
            Добро пожаловать в мир кулинарии!
        </h2>
        <p className='welcome__text list-reset'> 
            Мы рады приветствовать вас на нашем сайте рецептов. Здесь вы найдете множество вкусных блюд и сможете сохранить свои собственные рецепты.
        </p>
        <Link to={`/recipe`}>
           <button className='welcome__btn btn' >
              Начать
           </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;