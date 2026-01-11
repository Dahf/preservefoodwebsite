"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

type Ingredient = {
  id: number;
  name: string;
  ai_keywords: string[] | null;
  created_at: string;
};

export default function IngredientsPage() {
  const supabase = createClient();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editKeywords, setEditKeywords] = useState("");

  useEffect(() => {
    loadIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadIngredients = async () => {
    const { data, error } = await supabase
      .from("ingredients")
      .select("*")
      .order("name", { ascending: true });

    if (data) {
      setIngredients(data);
    }
    setLoading(false);
  };

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError("");

    try {
      const keywordsArray = newKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      const { error: insertError } = await supabase.from("ingredients").insert({
        name: newIngredientName,
        ai_keywords: keywordsArray.length > 0 ? keywordsArray : null,
      });

      if (insertError) {
        setError(insertError.message);
      } else {
        setNewIngredientName("");
        setNewKeywords("");
        await loadIngredients();
      }
    } catch (err) {
      setError("Fehler beim Hinzufügen der Zutat");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdateKeywords = async (id: number) => {
    const keywordsArray = editKeywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const { error } = await supabase
      .from("ingredients")
      .update({ ai_keywords: keywordsArray.length > 0 ? keywordsArray : null })
      .eq("id", id);

    if (!error) {
      setEditingId(null);
      setEditKeywords("");
      await loadIngredients();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Zutaten verwalten
        </h1>
        <p className="text-slate-600">
          Füge neue Zutaten hinzu und verwalte AI-Keywords für bessere
          Suchfunktion
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <Card className="p-6 bg-white border-slate-200 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Neue Zutat hinzufügen
        </h2>
        <form onSubmit={handleAddIngredient} className="space-y-4">
          <div>
            <Label htmlFor="ingredient-name" className="text-slate-900">
              Zutat Name *
            </Label>
            <Input
              id="ingredient-name"
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
              placeholder="z.B. Tomaten"
              required
              className="mt-1 bg-white border-slate-300 text-slate-900"
            />
          </div>
          <div>
            <Label htmlFor="keywords" className="text-slate-900">
              AI Keywords (kommagetrennt)
            </Label>
            <Input
              id="keywords"
              value={newKeywords}
              onChange={(e) => setNewKeywords(e.target.value)}
              placeholder="z.B. cherry tomatoes, roma tomatoes, plum tomatoes"
              className="mt-1 bg-white border-slate-300 text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1">
              Diese Keywords helfen bei der Suche. Z.B. wenn jemand &quot;cherry
              tomatoes&quot; sucht, werden &quot;Tomaten&quot; gefunden.
            </p>
          </div>
          <Button
            type="submit"
            disabled={adding}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            {adding ? "Wird hinzugefügt..." : "Hinzufügen"}
          </Button>
        </form>
      </Card>

      <Card className="p-6 bg-white border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Alle Zutaten ({ingredients.length})
        </h2>

        {loading ? (
          <p className="text-slate-600">Wird geladen...</p>
        ) : ingredients.length > 0 ? (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="p-4 bg-slate-50 rounded border border-slate-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-slate-900">
                      {ingredient.name}
                    </span>
                    <span className="text-sm text-slate-500 ml-2">
                      ID: {ingredient.id}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(ingredient.created_at).toLocaleDateString(
                      "de-DE"
                    )}
                  </span>
                </div>

                {editingId === ingredient.id ? (
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={editKeywords}
                      onChange={(e) => setEditKeywords(e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      className="flex-1 bg-white border-slate-300 text-slate-900 text-sm"
                    />
                    <Button
                      onClick={() => handleUpdateKeywords(ingredient.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Speichern
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setEditKeywords("");
                      }}
                      size="sm"
                      variant="outline"
                      className="border-slate-300"
                    >
                      Abbrechen
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      {ingredient.ai_keywords &&
                      ingredient.ai_keywords.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                          {ingredient.ai_keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Keine Keywords
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        setEditingId(ingredient.id);
                        setEditKeywords(
                          ingredient.ai_keywords?.join(", ") || ""
                        );
                      }}
                      size="sm"
                      variant="outline"
                      className="border-slate-300 text-slate-600"
                    >
                      Keywords bearbeiten
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">Noch keine Zutaten vorhanden</p>
        )}
      </Card>
    </div>
  );
}
