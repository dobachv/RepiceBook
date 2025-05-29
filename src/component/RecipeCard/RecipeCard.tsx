import React, { useState } from 'react';
import './recipeCard.scss';
import { useDeleteRecipeMutation } from '../../services/recipeApi';
import ModalClose from '../ModalClose/ModalClose';
import { useCountdown } from '../../ hooks/useCountdown';
import { RecipeEdit } from '../RecipeEdit/RecipeEdit';
import { RecipeInput } from '../RecipeCreate/RecipeCreate';
import ModalEdit from '../ModalEdit/ModalEdit';

interface RecipeCardProps {
  data: RecipeInput
  id:string
  onEdit?: () => void;    
}

const RecipeCard: React.FC<RecipeCardProps> = ({data, id}) => {

    const [deleteRecipe] = useDeleteRecipeMutation() 
    const [open, setOpen] = useState("modal");
    const [isActive, setIsActive] = useState(false); 
   
    const handleRemoveClass = () => {
      setIsActive(false); }

  
    const handleCountdownComplete = () => {
       setOpen("modal");
       deleteRecipe(id); 
    };

    const handleDeleteClick = () => {
        setOpen("modal active");
        start(); 
    };

    const { secondsLeft, start } = useCountdown(5, handleCountdownComplete);
    
    const handleClickEdit = () =>{
      setIsActive(true);
    }

   return (
    <li  className="recipe-card">
        <ModalEdit id={id} classActive={isActive} onRemoveClass={handleRemoveClass} >
           <RecipeEdit dataEdit={data} id={id} onRemoveClass={handleRemoveClass}/> 
        </ModalEdit> 

        <ModalClose 
            message='Удаление'
            durationSeconds={secondsLeft}
            classOpen={open}
        />

        <div className="recipe-card__icon">
          <button className="btn-icon " onClick={handleClickEdit}>
             <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"/></svg>
          </button>
          <button className="btn-icon " onClick={handleDeleteClick}>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"/></svg>
          </button>
      </div>
      <h2 className="recipe-card__title">{data.name}</h2>
      <div className="recipe-card__category">{data.mealType}</div>
      <div className="recipe-card__section">
        <h3>Ингредиенты</h3>
        <p>{data.ingredients}</p>
      </div>
      <div className="recipe-card__section">
        <h3>Приготовление</h3>
        <p>{data.instructions}</p>
      </div>
    </li>
  );
};

export default RecipeCard;