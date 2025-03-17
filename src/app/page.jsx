import CharacterGrid from "@/components/CharacterGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-slate-100">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Naruto Characters
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore the world of Naruto with detailed information about your
            favorite characters from the legendary anime and manga series.
          </p>
        </div>
        <CharacterGrid />
      </div>
    </div>
  );
}
