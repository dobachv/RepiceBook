
import {createApi,  fakeBaseQuery} from "@reduxjs/toolkit/query/react"
import { addDoc, collection, getDocs, updateDoc  } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase'
import { serverTimestamp } from "firebase/database";
import { z } from "zod";

export const RecipeSchema = z.object({
  name: z.string().nonempty("Введите название рецепта"),
  ingredients: z.string().nonempty("Введите ингредиенты"),
  instructions: z.string().nonempty("Введите инструкции"),
  mealType: z.enum(["Обед", "Завтрак", "Ужин", "Перекус"]),
  createdAt: z.string().nonempty() 
});


type RecipeWithId = {
  id: string;
} & z.infer<typeof RecipeSchema>;

export type RecipeList = RecipeWithId[];

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipe'],
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeWithId[], void>({
            async queryFn() {
                try {
                const recipeRef = collection(db, 'recipe')
                const querySnapshot = await getDocs(recipeRef )
                const recipes:RecipeWithId[] = []
                querySnapshot?.forEach((doc) => {
                    recipes.push({ id: doc.id, ...doc.data() } as RecipeWithId)
                })
                return { data: recipes }
                } catch (err) {
                return { error: err }
                }
            },
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Recipe' as const, id })),
                    { type: 'Recipe', id: 'LIST' },]
                    : [{ type: 'Recipe', id: 'LIST' }],
        }),   
        addRecipe: builder.mutation({
            async queryFn(data){
            try {
                 await addDoc(collection(db, 'recipe'), {
            ...data,
            timestamp: serverTimestamp()
                })

            } catch(err){
                return {error: err}
            }
            return{data: 'ok'}
        },
        invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
        }),
        deleteRecipe: builder.mutation<{ success: boolean }, string>({
        async queryFn(id) {
            try {
            const docRef = doc(db, 'recipe', id);
            await deleteDoc(docRef);
            return { data: { success: true } };
            } catch (err) {
            return { error: err };
            }
        },
        invalidatesTags: (_result, _error, id) => [{ type:'Recipe', id }],
        }),
        updateRecipe: builder.mutation<{ success: boolean }, { id: string; data: Partial<z.infer<typeof RecipeSchema>> }>({
            async queryFn({ id, data }) {
                try {
                const docRef = doc(db, 'recipe', id);
                await updateDoc(docRef, {
                    ...data,
                });
                return { data: { success: true } };
                } catch (err) {
                return { error: err };
                }
            },
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Recipe', id }],
        }),

    }),

})

export const {useAddRecipeMutation, useGetRecipesQuery, useDeleteRecipeMutation,useUpdateRecipeMutation} = recipeApi

