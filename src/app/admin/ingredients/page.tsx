"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { createIngredient, getAllIngredients } from "../actions"

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newIngredientName, setNewIngredientName] = useState("")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    loadIngredients()
  }, [])

  const loadIngredients = async () => {
    const result = await getAllIngredients()
    if (result.success) {
      setIngredients(result.data)
    }
    setLoading(false)
  }

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    setError("")

    const result = await createIngredient(newIngredientName)
    
    if (result.success) {
      setNewIngredientName("")
      await loadIngredients()
    } else {
      setError(result.error || "Fehler beim Hinzufügen der Zutat")
    }
    
    setAdding(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Zutaten verwalten</h1>
        <p className="text-neutral-400">
          Füge neue Zutaten hinzu oder verwalte bestehende
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500">
          {error}
        </div>
      )}

      <Card className="p-6 bg-neutral-900 border-neutral-800 mb-8">
        <h2 className="text-xl font-bold mb-4">Neue Zutat hinzufügen</h2>
        <form onSubmit={handleAddIngredient} className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="ingredient-name">Zutat Name</Label>
            <Input
              id="ingredient-name"
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
              placeholder="z.B. Tomaten"
              required
              className="mt-1 bg-neutral-800 border-neutral-700"
            />
          </div>
          <Button
            type="submit"
            disabled={adding}
            className="mt-7 bg-white text-black hover:bg-neutral-200"
          >
            {adding ? "Wird hinzugefügt..." : "Hinzufügen"}
          </Button>
        </form>
      </Card>

      <Card className="p-6 bg-neutral-900 border-neutral-800">
        <h2 className="text-xl font-bold mb-4">
          Alle Zutaten ({ingredients.length})
        </h2>
        
        {loading ? (
          <p className="text-neutral-400">Wird geladen...</p>
        ) : ingredients.length > 0 ? (
          <div className="grid gap-2 max-h-[600px] overflow-y-auto">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex items-center justify-between p-3 bg-neutral-800 rounded hover:bg-neutral-750 transition-colors"
              >
                <div>
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-sm text-neutral-500 ml-2">
                    ID: {ingredient.id}
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  {new Date(ingredient.created_at).toLocaleDateString('de-DE')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-400">Noch keine Zutaten vorhanden</p>
        )}
      </Card>
    </div>
  )
}
