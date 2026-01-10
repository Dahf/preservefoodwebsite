import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: meals, error } = await supabase
    .from("meals")
    .select("*")
    .order("id", { ascending: false })
    .limit(20)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-neutral-400">Verwalte deine Rezepte und Zutaten</p>
        </div>
        <Link href="/admin/recipes/new">
          <Button className="bg-white text-black hover:bg-neutral-200">
            Neues Rezept erstellen
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500">
          Fehler beim Laden der Rezepte: {error.message}
        </div>
      ) : meals && meals.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <Card
              key={meal.id}
              className="p-6 bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-neutral-800">
                {meal.image ? (
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600">
                    Kein Bild
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
              <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                {meal.description}
              </p>
              <div className="flex gap-2 flex-wrap text-xs">
                <span className="px-2 py-1 bg-neutral-800 rounded">
                  {meal.category}
                </span>
                {meal.difficulty && (
                  <span className="px-2 py-1 bg-neutral-800 rounded">
                    {meal.difficulty}
                  </span>
                )}
                {meal.time && (
                  <span className="px-2 py-1 bg-neutral-800 rounded">
                    {meal.time} Min
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-400 mb-4">Noch keine Rezepte vorhanden</p>
          <Link href="/admin/recipes/new">
            <Button className="bg-white text-black hover:bg-neutral-200">
              Erstes Rezept erstellen
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
