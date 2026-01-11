"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    // OAuth callback handling
    if (code) {
      router.push(`/auth/callback?code=${code}`);
    }
  }, [code, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                PreserveFood
              </h1>
            </div>
            <Link href="/login">
              <Button className="bg-slate-900 text-white hover:bg-slate-800">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <span className="text-green-700 font-medium text-sm">
              Schluss mit Lebensmittelverschwendung
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Keine Lebensmittel mehr{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              verschwenden.
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-4 leading-relaxed max-w-3xl mx-auto">
            PreserveFood ist eine minimalistische App, die dir hilft,
            Lebensmittelverschwendung konsequent zu reduzieren – ohne unnötigen
            Schnickschnack.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Du trägst deine Lebensmittel ein, siehst sofort, was bald abläuft,
            und bekommst klare Erinnerungen, bevor etwas im Müll landet. Statt
            Chaos im Kühlschrank hast du Überblick, statt schlechtem Gewissen
            Kontrolle.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg"
              >
                Jetzt starten
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Fokus auf das Wesentliche
            </h3>
            <p className="text-slate-600">
              Keine Rezepte. Keine Social-Features. Nur das, was wirklich
              zählt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Sofortiger Überblick
              </h3>
              <p className="text-slate-600">
                Sieh auf einen Blick, was bald abläuft. Kein Durchsuchen des
                Kühlschranks mehr.
              </p>
            </Card>

            <Card className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Klare Erinnerungen
              </h3>
              <p className="text-slate-600">
                Bekommst Benachrichtigungen, bevor Lebensmittel schlecht werden.
                Nie wieder vergessen.
              </p>
            </Card>

            <Card className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Volle Kontrolle
              </h3>
              <p className="text-slate-600">
                Inventar verwalten, Gruppen erstellen, Einkaufsliste führen.
                Alles an einem Ort.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              So einfach geht's
            </h2>
            <p className="text-slate-600">
              Drei Schritte zu weniger Lebensmittelverschwendung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Lebensmittel eintragen
              </h3>
              <p className="text-slate-600">
                Scanne oder trage manuell ein, was du gekauft hast. Mit
                Ablaufdatum.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Überblick behalten
              </h3>
              <p className="text-slate-600">
                Sieh in der App, was bald abläuft. Sortiert nach Priorität.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Nutzen, nicht wegwerfen
              </h3>
              <p className="text-slate-600">
                Bekommst Erinnerungen und kannst rechtzeitig handeln. Retten
                statt wegwerfen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Warum PreserveFood?
              </h2>
              <p className="text-slate-600">
                Für Leute, die ihre Lebensmittel ernst nehmen
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  0
                </div>
                <div className="text-slate-600">
                  Rezepte aufgezwungen
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  100%
                </div>
                <div className="text-slate-600">
                  Fokus auf Wesentliches
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ∞
                </div>
                <div className="text-slate-600">
                  Gerettete Lebensmittel
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Minimal Design Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Minimalistisch. Klar. Effektiv.
              </h2>
              <p className="text-slate-600 mb-6">
                Die App zwingt dir keine unnötigen Features auf. Kein
                Social-Feed, keine komplizierten Rezept-Vorschläge, keine
                Ablenkung.
              </p>
              <p className="text-slate-600 mb-6">
                Nur das, was du brauchst: Einen klaren Überblick, rechtzeitige
                Erinnerungen und die Kontrolle über deine Vorräte.
              </p>
              <p className="font-semibold text-slate-900">
                PreserveFood ist für Leute, die ihre Lebensmittel ernst nehmen
                und keine Lust mehr haben, ständig Dinge wegzuwerfen, die man
                locker noch hätte essen können.
              </p>
            </div>

            <Card className="p-8 bg-white border-slate-200 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-900">
                    Bald ablaufend
                  </span>
                  <span className="text-sm text-red-600 font-medium">
                    3 Produkte
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Milch</div>
                      <div className="text-xs text-slate-500">
                        Läuft morgen ab
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Käse</div>
                      <div className="text-xs text-slate-500">
                        Läuft in 3 Tagen ab
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Joghurt</div>
                      <div className="text-xs text-slate-500">
                        Läuft in 5 Tagen ab
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Bereit, Lebensmittel zu retten?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Starte jetzt und reduziere deine Lebensmittelverschwendung
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded"></div>
              <span className="font-semibold text-slate-900">
                PreserveFood
              </span>
            </div>
            <p className="text-sm text-slate-600">
              © 2026 PreserveFood. Schluss mit Verschwendung.
            </p>
            <div className="flex gap-4">
              <Link
                href="/datenschutz"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
