import  './sidebar.scss';
import { Link } from 'react-router-dom';


export const Sidebar = () => {

  return (
    <aside className='sidebar'>
      <h2 className='sidebar__title list-reset'>Меню</h2>
      <nav className="siderbar__nav nav">
        <ul className="nav__list list-reset">
            <li className="nav__item">
                <Link to={"/"}>
                Главная страница
                </Link> 
            </li>
            <li className="nav__item">
                <Link to={"/recipe"}>
                Рецепты
                </Link> 
            </li>
        </ul>
      </nav>
    </aside>
  );
};