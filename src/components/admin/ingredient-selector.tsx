"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Ingredient = {
  id: number
  name: string
}

type SelectedIngredient = {
  ingredientid: number
  name: string
  quantity: number
  unit: string
}

type Props = {
  selectedIngredients: SelectedIngredient[]
  onIngredientsChange: (ingredients: SelectedIngredient[]) => void
}

export default function IngredientSelector({ selectedIngredients, onIngredientsChange }: Props) {
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Ingredient[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([])
      return
    }

    const searchIngredients = async () => {
      const { data, error } = await supabase
        .from("ingredients")
        .select("id, name")
        .ilike("name", `%${searchTerm}%`)
        .limit(10)

      if (data) {
        setSearchResults(data)
      }
    }

    const debounce = setTimeout(searchIngredients, 300)
    return () => clearTimeout(debounce)
  }, [searchTerm])

  const addIngredient = (ingredient: Ingredient) => {
    // Prüfe ob bereits hinzugefügt
    if (selectedIngredients.some(i => i.ingredientid === ingredient.id)) {
      return
    }

    onIngredientsChange([
      ...selectedIngredients,
      {
        ingredientid: ingredient.id,
        name: ingredient.name,
        quantity: 0,
        unit: "",
      },
    ])
    setSearchTerm("")
    setSearchResults([])
    setShowResults(false)
  }

  const updateIngredient = (index: number, field: "quantity" | "unit", value: string | number) => {
    const updated = [...selectedIngredients]
    updated[index] = { ...updated[index], [field]: value }
    onIngredientsChange(updated)
  }

  const removeIngredient = (index: number) => {
    onIngredientsChange(selectedIngredients.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label>Zutat suchen</Label>
        <Input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          className="mt-1 bg-neutral-800 border-neutral-700"
          placeholder="Zutat eingeben..."
        />
        
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((ingredient) => (
              <button
                key={ingredient.id}
                type="button"
                onClick={() => addIngredient(ingredient)}
                className="w-full px-4 py-2 text-left hover:bg-neutral-700 transition"
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedIngredients.length > 0 && (
        <div className="space-y-3">
          <Label>Ausgewählte Zutaten</Label>
          {selectedIngredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  value={ingredient.name}
                  disabled
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="w-24">
                <Label className="text-xs">Menge</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={ingredient.quantity || ""}
                  onChange={(e) => updateIngredient(index, "quantity", parseFloat(e.target.value) || 0)}
                  className="bg-neutral-800 border-neutral-700"
                  placeholder="100"
                />
              </div>
              <div className="w-24">
                <Label className="text-xs">Einheit</Label>
                <Input
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                  className="bg-neutral-800 border-neutral-700"
                  placeholder="g"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeIngredient(index)}
                variant="outline"
                className="border-neutral-700 hover:bg-red-500/10 hover:border-red-500"
              >
                Entfernen
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
