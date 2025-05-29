import './recipe.scss'
import React from 'react';
import RecipesPage from '../../component/RecipeList/RecipesList';


const Recipe: React.FC = () => {

  return (
    <section className='recipe'>
      <div className="container recipe__container">
       <RecipesPage/>
      </div>
    </section>
  );
};

export default Recipe;