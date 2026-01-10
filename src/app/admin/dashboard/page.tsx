import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: meals, error } = await supabase
    .from("meals")
    .select("*")
    .order("id", { ascending: false })
    .limit(20);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Verwalte deine Rezepte und Zutaten</p>
        </div>
        <Link href="/admin/recipes/new">
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            Neues Rezept erstellen
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
          Fehler beim Laden der Rezepte: {error.message}
        </div>
      ) : meals && meals.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <Card
              key={meal.id}
              className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-slate-100">
                {meal.image ? (
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    Kein Bild
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                {meal.name}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {meal.description}
              </p>
              <div className="flex gap-2 flex-wrap text-xs">
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                  {meal.category}
                </span>
                {meal.difficulty && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                    {meal.difficulty}
                  </span>
                )}
                {meal.time && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                    {meal.time} Min
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-600 mb-4">Noch keine Rezepte vorhanden</p>
          <Link href="/admin/recipes/new">
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              Erstes Rezept erstellen
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
