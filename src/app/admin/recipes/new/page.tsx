"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { createMeal, searchIngredients } from "../../actions"

type IngredientInput = {
  ingredientid: number
  name: string
  quantity?: number
  unit?: string
}

export default function NewRecipe() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Basisdaten
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [time, setTime] = useState("")
  const [servingsize, setServingsize] = useState("")
  const [image, setImage] = useState("")
  const [type, setType] = useState("")

  // Schritte
  const [steps, setSteps] = useState<string[]>([""])

  // Zutaten
  const [ingredients, setIngredients] = useState<IngredientInput[]>([])
  const [ingredientSearch, setIngredientSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearch, setShowSearch] = useState(false)

  // Nährwerte
  const [calories, setCalories] = useState("")
  const [carbohydrates, setCarbohydrates] = useState("")
  const [fat, setFat] = useState("")
  const [protein, setProtein] = useState("")
  const [sodium, setSodium] = useState("")
  const [sugar, setSugar] = useState("")
  const [energy, setEnergy] = useState("")

  const handleSearchIngredients = async (query: string) => {
    setIngredientSearch(query)
    if (query.length > 1) {
      const result = await searchIngredients(query)
      if (result.success) {
        setSearchResults(result.data)
        setShowSearch(true)
      }
    } else {
      setSearchResults([])
      setShowSearch(false)
    }
  }

  const addIngredient = (ingredient: any) => {
    if (!ingredients.find((i) => i.ingredientid === ingredient.id)) {
      setIngredients([
        ...ingredients,
        {
          ingredientid: ingredient.id,
          name: ingredient.name,
          quantity: 0,
          unit: "",
        },
      ])
    }
    setIngredientSearch("")
    setSearchResults([])
    setShowSearch(false)
  }

  const removeIngredient = (ingredientid: number) => {
    setIngredients(ingredients.filter((i) => i.ingredientid !== ingredientid))
  }

  const updateIngredientQuantity = (ingredientid: number, quantity: number) => {
    setIngredients(
      ingredients.map((i) =>
        i.ingredientid === ingredientid ? { ...i, quantity } : i
      )
    )
  }

  const updateIngredientUnit = (ingredientid: number, unit: string) => {
    setIngredients(
      ingredients.map((i) =>
        i.ingredientid === ingredientid ? { ...i, unit } : i
      )
    )
  }

  const addStep = () => {
    setSteps([...steps, ""])
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const updateStep = (index: number, value: string) => {
    setSteps(steps.map((s, i) => (i === index ? value : s)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await createMeal({
        name,
        description,
        category,
        difficulty: difficulty || undefined,
        time: time ? parseInt(time) : undefined,
        servingsize,
        image,
        steps: steps.filter((s) => s.trim() !== ""),
        type: type || undefined,
        calories: calories ? parseInt(calories) : undefined,
        carbohydrates: carbohydrates ? parseInt(carbohydrates) : undefined,
        fat: fat ? parseInt(fat) : undefined,
        protein: protein ? parseInt(protein) : undefined,
        sodium: sodium ? parseInt(sodium) : undefined,
        sugar: sugar ? parseInt(sugar) : undefined,
        energy: energy ? parseInt(energy) : undefined,
        ingredients: ingredients.map((i) => ({
          ingredientid: i.ingredientid,
          quantity: i.quantity,
          unit: i.unit,
        })),
      })

      if (result.success) {
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Fehler beim Erstellen des Rezepts")
        setLoading(false)
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Neues Rezept erstellen</h1>
        <p className="text-neutral-400">
          Füge ein neues Rezept mit Zutaten und Schritten hinzu
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basisdaten */}
        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">Grundinformationen</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>

            <div>
              <Label htmlFor="description">Beschreibung *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Kategorie *</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="z.B. Hauptgericht, Dessert"
                  required
                  className="mt-1 bg-neutral-800 border-neutral-700"
                />
              </div>

              <div>
                <Label htmlFor="difficulty">Schwierigkeit</Label>
                <Select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="mt-1 bg-neutral-800 border-neutral-700"
                >
                  <option value="">Wählen...</option>
                  <option value="Einfach">Einfach</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Schwer">Schwer</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time">Zeit (Minuten)</Label>
                <Input
                  id="time"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="30"
                  className="mt-1 bg-neutral-800 border-neutral-700"
                />
              </div>

              <div>
                <Label htmlFor="servingsize">Portionsgröße *</Label>
                <Input
                  id="servingsize"
                  value={servingsize}
                  onChange={(e) => setServingsize(e.target.value)}
                  placeholder="4 Personen"
                  required
                  className="mt-1 bg-neutral-800 border-neutral-700"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Bild-URL *</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                required
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>

            <div>
              <Label htmlFor="type">Typ</Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="z.B. Vegetarisch, Vegan"
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
          </div>
        </Card>

        {/* Zutaten */}
        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">Zutaten</h2>
          
          <div className="mb-4 relative">
            <Label htmlFor="ingredient-search">Zutat hinzufügen</Label>
            <Input
              id="ingredient-search"
              value={ingredientSearch}
              onChange={(e) => handleSearchIngredients(e.target.value)}
              placeholder="Suche nach Zutat..."
              className="mt-1 bg-neutral-800 border-neutral-700"
            />
            
            {showSearch && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => addIngredient(result)}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-700 transition-colors"
                  >
                    {result.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.ingredientid}
                className="flex items-center gap-2 p-3 bg-neutral-800 rounded"
              >
                <span className="flex-1">{ingredient.name}</span>
                <Input
                  type="number"
                  step="0.01"
                  value={ingredient.quantity || ""}
                  onChange={(e) =>
                    updateIngredientQuantity(
                      ingredient.ingredientid,
                      parseFloat(e.target.value)
                    )
                  }
                  placeholder="Menge"
                  className="w-24 bg-neutral-900 border-neutral-700"
                />
                <Input
                  value={ingredient.unit || ""}
                  onChange={(e) =>
                    updateIngredientUnit(ingredient.ingredientid, e.target.value)
                  }
                  placeholder="Einheit"
                  className="w-24 bg-neutral-900 border-neutral-700"
                />
                <Button
                  type="button"
                  onClick={() => removeIngredient(ingredient.ingredientid)}
                  variant="outline"
                  size="sm"
                  className="border-neutral-700 hover:bg-red-500/10 hover:border-red-500"
                >
                  Entfernen
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Schritte */}
        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">Zubereitungsschritte</h2>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor={`step-${index}`}>Schritt {index + 1}</Label>
                  <Textarea
                    id={`step-${index}`}
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    placeholder="Beschreibe diesen Schritt..."
                    rows={2}
                    className="mt-1 bg-neutral-800 border-neutral-700"
                  />
                </div>
                {steps.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeStep(index)}
                    variant="outline"
                    size="sm"
                    className="mt-7 border-neutral-700 hover:bg-red-500/10 hover:border-red-500"
                  >
                    Entfernen
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={addStep}
            variant="outline"
            className="mt-4 border-neutral-700 hover:bg-neutral-800"
          >
            Schritt hinzufügen
          </Button>
        </Card>

        {/* Nährwerte */}
        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">Nährwerte (optional)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="calories">Kalorien (kcal)</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
            <div>
              <Label htmlFor="carbohydrates">Kohlenhydrate (g)</Label>
              <Input
                id="carbohydrates"
                type="number"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
            <div>
              <Label htmlFor="fat">Fett (g)</Label>
              <Input
                id="fat"
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
            <div>
              <Label htmlFor="sodium">Natrium (mg)</Label>
              <Input
                id="sodium"
                type="number"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
            <div>
              <Label htmlFor="sugar">Zucker (g)</Label>
              <Input
                id="sugar"
                type="number"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
            <div>
              <Label htmlFor="energy">Energie (kJ)</Label>
              <Input
                id="energy"
                type="number"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className="mt-1 bg-neutral-800 border-neutral-700"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-white text-black hover:bg-neutral-200"
          >
            {loading ? "Wird erstellt..." : "Rezept erstellen"}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
            className="border-neutral-700 hover:bg-neutral-800"
          >
            Abbrechen
          </Button>
        </div>
      </form>
    </div>
  )
}
