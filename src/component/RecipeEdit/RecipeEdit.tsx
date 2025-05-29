import './../RecipeCreate/RecipeCreate.scss'
import  React, { useEffect} from "react"
import { RecipeSchema,  useUpdateRecipeMutation } from "../../services/recipeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export type RecipeInput = z.infer<typeof RecipeSchema>
type RecipeFormInputs = Omit<RecipeInput, 'createdAt'>;

interface RecipeEditProps{
   dataEdit: RecipeInput;
   id:string;
   onRemoveClass: () => void;
}
export const RecipeEdit: React.FC<RecipeEditProps> = ({dataEdit,id, onRemoveClass}) => {

 const [updateRecipe] = useUpdateRecipeMutation();
  
 const {register, handleSubmit,  formState:{errors,isSubmitting}, reset} = useForm<RecipeFormInputs>({
    resolver: zodResolver(RecipeSchema.omit({ createdAt: true })), defaultValues: dataEdit
})

useEffect(() => {
    reset({
      name: dataEdit.name,
      ingredients: dataEdit.ingredients,
      instructions: dataEdit.instructions,
      mealType: dataEdit.mealType,
    });
  }, [dataEdit, reset]);

  const onSubmit = async (data: RecipeFormInputs) => {
    try {
       const dataWithDate = {
      ...data,
      createdAt: new Date().toISOString()
      };
      await updateRecipe({ id: id, data: dataWithDate })
      reset(); // сброс формы после успешной отправки
      onRemoveClass()
    } catch (error) {
      console.error(error);
      alert("Ошибка при добавлении рецепта");
    }
  };

  return <>
    <>
      <h2>Создать рецепт</h2>
      
      <form className="form" style={{ marginBottom: '10px' }} 
     onSubmit={handleSubmit(onSubmit)}>
       <div className="form__block">
          <label className="form__title" htmlFor="name">Название рецепта:</label><br />
          <input className="form__input"
            {...register("name")}
              id="name"
              name="name"
              type="text"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
             {errors.name && (
            <p  className="form__error list-reset"style={{ color: 'red', marginTop: '4px' }}>{errors.name.message}</p>
          )}
       </div>
       
      <div className="form__block" style={{ marginTop: '10px' }}>
          <label className="form__title"  htmlFor="mealType">Тип приема пищи:</label>
          <br />
          <select
            {...register("mealType")}
            id="mealType"
            name="mealType"
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            defaultValue="Обед"
          >
            <option value="Обед">Обед</option>
            <option value="Завтрак">Завтрак</option>
            <option value="Ужин">Ужин</option>
            <option value="Перекус">Перекус</option>
          </select>
        </div>

      <div className="form__block" style={{ marginBottom: '10px' }}>
        <label className="form__title"  htmlFor="ingredients">Ингредиенты:</label><br />
        <textarea className="form__text" 
         {...register("ingredients")}
          id="ingredients"
          name="ingredients"
          rows={4}
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
        />
      </div>
      
      <div className="form__block" style={{ marginBottom: '10px' }}>
        <label className="form_title" htmlFor="instructions">Приготовление:</label><br />
        <textarea className="form__text"
        {...register("instructions")}
          id="instructions"
          name="instructions"
          rows={4}
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
        />
      </div>
      
      <button type="submit" className="btn"
      disabled={isSubmitting}>
        Отправить
      </button>
      </form>
    </>
    </>
  
};

