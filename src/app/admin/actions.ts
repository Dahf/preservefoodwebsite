"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type CreateMealInput = {
  name: string
  description: string
  category: string
  difficulty?: string
  time?: number
  servingsize: string
  image: string
  steps: string[]
  type?: string
  calories?: number
  carbohydrates?: number
  fat?: number
  protein?: number
  sodium?: number
  sugar?: number
  energy?: number
  ingredients: {
    ingredientid: number
    quantity?: number
    unit?: string
  }[]
}

export async function createMeal(input: CreateMealInput) {
  const supabase = await createClient()

  try {
    // Erstelle das Rezept
    const { data: meal, error: mealError } = await supabase
      .from("meals")
      .insert({
        name: input.name,
        description: input.description,
        category: input.category,
        difficulty: input.difficulty,
        time: input.time,
        servingsize: input.servingsize,
        image: input.image,
        steps: input.steps,
        type: input.type,
        calories: input.calories,
        carbohydrates: input.carbohydrates,
        fat: input.fat,
        protein: input.protein,
        sodium: input.sodium,
        sugar: input.sugar,
        energy: input.energy,
      })
      .select()
      .single()

    if (mealError) {
      return { success: false, error: mealError.message }
    }

    // Füge Zutaten-Verknüpfungen hinzu
    if (input.ingredients.length > 0) {
      const mealIngredients = input.ingredients.map((ing) => ({
        mealid: meal.id,
        ingredientid: ing.ingredientid,
        quantity: ing.quantity,
        unit: ing.unit,
      }))

      const { error: ingredientsError } = await supabase
        .from("meal_ingredient")
        .insert(mealIngredients)

      if (ingredientsError) {
        // Lösche das Rezept wenn Zutaten nicht hinzugefügt werden konnten
        await supabase.from("meals").delete().eq("id", meal.id)
        return { success: false, error: ingredientsError.message }
      }
    }

    revalidatePath("/admin/dashboard")
    return { success: true, data: meal }
  } catch (error) {
    return { success: false, error: "Ein unerwarteter Fehler ist aufgetreten" }
  }
}

export async function searchIngredients(query: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(10)

  if (error) {
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data: data || [] }
}

export async function createIngredient(name: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("ingredients")
    .insert({ name })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/ingredients")
  return { success: true, data }
}

export async function getAllIngredients() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data: data || [] }
}
