"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Ingredient = {
  id: number;
  name: string;
  ai_keywords?: string[] | null;
};

type SelectedIngredient = {
  ingredientid: number;
  name: string;
  quantity: number;
  unit: string;
};

type Props = {
  selectedIngredients: SelectedIngredient[];
  onIngredientsChange: (ingredients: SelectedIngredient[]) => void;
};

export default function IngredientSelector({
  selectedIngredients,
  onIngredientsChange,
}: Props) {
  const supabase = createClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Ingredient[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const searchIngredients = async () => {
      // Search in both name and ai_keywords
      const { data, error } = await supabase
        .from("ingredients")
        .select("id, name, ai_keywords")
        .or(`name.ilike.%${searchTerm}%,ai_keywords.cs.{${searchTerm}}`)
        .limit(10);

      if (data) {
        setSearchResults(data);
      }
    };

    const debounce = setTimeout(searchIngredients, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const addIngredient = (ingredient: Ingredient) => {
    // Check if already added
    if (selectedIngredients.some((i) => i.ingredientid === ingredient.id)) {
      return;
    }

    onIngredientsChange([
      ...selectedIngredients,
      {
        ingredientid: ingredient.id,
        name: ingredient.name,
        quantity: 0,
        unit: "",
      },
    ]);
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  const createAndAddIngredient = async () => {
    if (!searchTerm.trim() || creating) return;

    setCreating(true);

    try {
      // Create new ingredient
      const { data, error } = await supabase
        .from("ingredients")
        .insert({ name: searchTerm.trim() })
        .select()
        .single();

      if (error) {
        alert("Fehler beim Erstellen der Zutat: " + error.message);
        setCreating(false);
        return;
      }

      if (data) {
        // Add the new ingredient
        addIngredient(data);
      }
    } catch (err) {
      alert("Ein Fehler ist aufgetreten");
    } finally {
      setCreating(false);
    }
  };

  const updateIngredient = (
    index: number,
    field: "quantity" | "unit",
    value: string | number
  ) => {
    const updated = [...selectedIngredients];
    updated[index] = { ...updated[index], [field]: value };
    onIngredientsChange(updated);
  };

  const removeIngredient = (index: number) => {
    onIngredientsChange(selectedIngredients.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label className="text-slate-900">Zutat suchen oder hinzufügen</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="flex-1 bg-white border-slate-300 text-slate-900"
            placeholder="z.B. Tomaten, Kirschtomaten..."
          />
          <Button
            type="button"
            onClick={createAndAddIngredient}
            disabled={!searchTerm.trim() || creating}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {creating ? "..." : "Neu erstellen"}
          </Button>
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((ingredient) => (
              <button
                key={ingredient.id}
                type="button"
                onClick={() => addIngredient(ingredient)}
                className="w-full text-left px-4 py-2 text-slate-900 hover:bg-slate-100 transition"
              >
                <div className="font-medium">{ingredient.name}</div>
                {ingredient.ai_keywords &&
                  ingredient.ai_keywords.length > 0 && (
                    <div className="text-xs text-slate-500 mt-1">
                      Keywords: {ingredient.ai_keywords.join(", ")}
                    </div>
                  )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedIngredients.length > 0 && (
        <div className="space-y-3">
          <Label className="text-slate-900">Ausgewählte Zutaten</Label>
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex gap-2 items-end p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex-1">
                <Input
                  value={ingredient.name}
                  disabled
                  className="bg-white border-slate-300 text-slate-900"
                />
              </div>
              <div className="w-24">
                <Label className="text-xs text-slate-700">Menge</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={ingredient.quantity || ""}
                  onChange={(e) =>
                    updateIngredient(
                      index,
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="bg-white border-slate-300 text-slate-900"
                  placeholder="100"
                />
              </div>
              <div className="w-24">
                <Label className="text-xs text-slate-700">Einheit</Label>
                <Input
                  value={ingredient.unit}
                  onChange={(e) =>
                    updateIngredient(index, "unit", e.target.value)
                  }
                  className="bg-white border-slate-300 text-slate-900"
                  placeholder="g"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeIngredient(index)}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Entfernen
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
