import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import {  useGetRecipesQuery } from '../../services/recipeApi';

const RecipesPage: React.FC = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery();
 

  if (isLoading) {
    return <div>Загрузка рецептов...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке рецептов</div>;
  }
 

  return (
    <>
      <h2 className='recipe__title list-reset'>Рецепты</h2>
      <ul className="recipe__list list-reset">
        {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            data={recipe}
            id={recipe.id}
          />
        ))
      ) : (
        <p>Нет доступных рецептов</p>
      )}
      </ul>
    </>
  );
};

export default RecipesPage;